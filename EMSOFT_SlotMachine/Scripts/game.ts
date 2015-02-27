//Variables
var canvas;
var stage: createjs.Stage;
var titles: createjs.Bitmap[] = []
var reelContainers: createjs.Container[] = [];

// Game constants
var NUM_REELS: number = 3;

//Game Variables
var playerMoney = 10;
var winnings = 0;
var jackpot = 5000;
var turn = 0;
var playerBet = 0;
var winNum = 0;
var lossNum = 0;
var spinResult;
var fruits = "";
var winRatio = 0;
var playerMoneyTxt: createjs.Text;
var playerBetTxt: createjs.Text;
var winningsTxt: createjs.Text;

// Tally Variables
var grapes = 0;
var oranges = 0;
var cherries = 0;
var bars = 0;
var bells = 0;
var sevens = 0;
var dollars = 0;
var grape = 0;
var bonus = 0;
var clovers = 0;
var diamonds = 0;

var blanks = 0;

//Game ovjects
var game: createjs.Container; // main game container object
var background: createjs.Bitmap;
var spinButton: createjs.Bitmap;
var betMaxButton: createjs.Bitmap;
var betOneButton: createjs.Bitmap;
var resetButton: createjs.Bitmap;
var powerButton: createjs.Bitmap;

function init() {
    canvas = document.getElementById("canvas");
    stage = new createjs.Stage(canvas); // parent object
    stage.enableMouseOver(20); // turn on mouse over events
    
    createjs.Ticker.setFPS(60); // set the frame rate to 60 fps
    createjs.Ticker.addEventListener("tick", gameLoop);

    main();
}

// Game loop
function gameLoop() {
    stage.update();
}    

// Utility function to reset all fruit tallies
function resetTally() {
    grapes = 0;
    oranges = 0;
    cherries = 0;
    bars = 0;
    bells = 0;
    sevens = 0;
    dollars = 0;
    grape = 0;
    bonus = 0;
    clovers = 0;
    diamonds = 0;
    blanks = 0;
}

// Utility function to reset the player states
function resetAll() {
    playerMoney = 1500;
    winnings = 0;
    jackpot = 10000;
    turn = 0;
    playerBet = 0;
    winNum = 0;
    lossNum = 0;
    winRatio = 0;
    document.getElementById("spinButton").disabled = false;
}

//Utility function to show a loss message and reduece player money
function showLossMessage() {
    playerMoney -= playerBet;
    resetTally();
}

function showWinMessage() {
    playerMoney += winnings;
    resetTally();
    checkJackPot(); 
}

// Utility function to check if a value falls within a range of bounds
function checkRange(value, lowerBounds, upperBounds) {
    if (value >= lowerBounds && value <= upperBounds) {
        return value;
    } else {
        return !value;
    }
}

//When this function is called it determines the betline results
function Reels() {
    var betLine = ["", "", ""];
    var outCome = [0, 0, 0];

    for (var spin = 0; spin < 3; spin++) {
        outCome[spin] = Math.floor((Math.random() * 65) + 1);
        switch (outCome[spin]) {
            
            case checkRange(outCome[spin], 1, 27): //41.5%
                betLine[spin] = "blank";
                blanks++;
                break;
            case checkRange(outCome[spin], 28, 37): //15.4%
                betLine[spin] = "grape";
                grapes++;
                break;
            case checkRange(outCome[spin], 38, 46): //13.8%
                betLine[spin] = "diamond";
                bells++;
                break;
            case checkRange(outCome[spin], 47, 54): //12.3%
                betLine[spin] = "orange";
                oranges++;
                break;
            case checkRange(outCome[spin], 55, 59): //7.7%
                betLine[spin] = "cherry";
                cherries++;
                break;
            case checkRange(outCome[spin], 60, 62): //4.6%
                betLine[spin] = "bar";
                bars++;
                break;
            case checkRange(outCome[spin], 65, 65): //1.5%
                betLine[spin] = "seven";
                sevens++;
                break;
            case checkRange(outCome[spin], 63, 64): //3.1%
                betLine[spin] = "clover";
                clovers++;
                break;
            default:
                betLine[spin] = "blank";
                blanks++;
                break;            
        }       
    }
    return betLine;
}

function determineWinnings() {
    if (blanks == 0) {
        if (grapes == 3) {
            winnings = playerBet * 10;
        }
        else if (diamonds == 3) {
            winnings = playerBet * 20;
        }
        else if (oranges == 3) {
            winnings = playerBet * 30;
        }
        else if (cherries == 3) {
            winnings = playerBet * 40;
        }
        else if (bars == 3) {
            winnings = playerBet * 50;
        }
        else if (sevens == 3) {
            winnings = playerBet * 100;
        }
        else if (clovers == 3) {
            winnings = playerBet * 75;
        }
        else if (grapes == 2) {
            winnings = playerBet * 2;
        }
        else if (bells == 2) {
            winnings = playerBet * 2;
        }
        else if (oranges == 2) {
            winnings = playerBet * 3;
        }
        else if (cherries == 2) {
            winnings = playerBet * 4;
            
        }
        else if (bars == 2) {
            winnings = playerBet * 5;
        }
        else if (sevens == 2) {
            winnings = playerBet * 20;
        }
        else if (clovers == 2) {
            winnings = playerBet * 10;
        }
        else if (sevens == 1) {
            winnings = playerBet * 5;
        }
        else
            winnings = playerBet * 1;

        winNum++;
        alert(winNum.toString());
        controlText("winningsTxt");
    }
    else {
        lossNum++;
        alert(lossNum.toString());
        controlText("lossingsTxt");
    }

    resetTally();
    
}

// spin button event
function spinButtonClicked(event: createjs.MouseEvent) {
    createjs.Sound.play("spinSound");
    spinResult = Reels();
    fruits = spinResult[0] + "-" + spinResult[1] + "-" + spinResult[2];

    if (playerMoney == 0) {
        alert("You ran out of Money! \n If you want to play again, please push the reset button");
        spinButton.alpha = 0.5;
        spinButton.mouseEnabled = false;
            
        
    } else if (playerBet > playerMoney) {
        alert("You don't have enough Money to place that bet.");        
    }
    else if (playerBet <= 0) {
        alert("All bets must be a positive $ amount.");
    }
    else if (playerBet <= playerMoney) {
        for (var index = 0; index < NUM_REELS; index++) {
            reelContainers[index].removeAllChildren();
            titles[index] = new createjs.Bitmap("assets/images/" + spinResult[index] + ".png");
            reelContainers[index].addChild(titles[index]);
        }
        determineWinnings();
        playerBetTxt.text = "";
        playerBet = 0;        
    } 
    else {
        alert("Please enter a valid bet amount");
    }
}

//this function for BetOnebutton event
function BetOneClicked(event: createjs.MouseEvent) {
    
    createjs.Sound.play("betOne");
    playerBet += 1;
    controlText("playerBetTxt");
}


//this function for BetMaxbutton event
function BetMaxClicked(event: createjs.MouseEvent) {
    createjs.Sound.play("betMax");
    playerBet = 5;
    controlText("playerBetTxt");
}

//this function for resetbutton. 
function resetClicked(event: createjs.MouseEvent) {
    spinButton.mouseEnabled = true;
    spinButton.alpha = 1;
    alert("Reset");
    resetAll();
    
}

function _buttonOver(event: createjs.MouseEvent): void {
    event.currentTarget.alpha = 0.5;
        
}

function _buttonOut(event: createjs.MouseEvent): void {
    event.currentTarget.alpha = 1;
        
}

// function for UI
function createUI() {
    background = new createjs.Bitmap("assets/images/machine.png");
    
    game.addChild(background) // Add the background to the game container

    for (var index = 0; index < NUM_REELS; index++) {
        reelContainers[index] = new createjs.Container();
        game.addChild(reelContainers[index]);
    }
    reelContainers[0].x = 70;
    reelContainers[0].y = 369;
    reelContainers[1].x = 190;
    reelContainers[1].y = 369;
    reelContainers[2].x = 310;
    reelContainers[2].y = 369;

    //spin button
    spinButton = new createjs.Bitmap("assets/images/spin.png");
    spinButton.x = 304;
    spinButton.y = 541;
       
    game.addChild(spinButton);

    //spin button event listeners
    spinButton.addEventListener("mouseover", _buttonOver);
    spinButton.addEventListener("mouseout", _buttonOut);
    spinButton.addEventListener("click", spinButtonClicked);

    //bet max button
   
    betMaxButton = new createjs.Bitmap("assets/images/betMax.png");
    betMaxButton.x = 179;
    betMaxButton.y = 541;
    
    game.addChild(betMaxButton);

    //betMaxButton event listeners
    betMaxButton.addEventListener("click", BetMaxClicked);
    betMaxButton.addEventListener("mouseover", _buttonOver);
    betMaxButton.addEventListener("mouseout", _buttonOut);


    //bet one button
    betOneButton = new createjs.Bitmap("assets/images/betOne.png");
    betOneButton.x = 54;
    betOneButton.y = 541;
    
    game.addChild(betOneButton);

    //betOneButton event listeners
    betOneButton.addEventListener("click", BetOneClicked);
    betOneButton.addEventListener("mouseover", _buttonOver);
    betOneButton.addEventListener("mouseout", _buttonOut);

    //Reset button
    resetButton = new createjs.Bitmap("assets/images/reset.png");
    resetButton.x = 179;
    resetButton.y = 606;

    game.addChild(resetButton);

    //resetButton event listeners
    resetButton.addEventListener("click", resetClicked);
    resetButton.addEventListener("mouseover", _buttonOver);
    resetButton.addEventListener("mouseout", _buttonOut);

    //Power button
    powerButton = new createjs.Bitmap("assets/images/power.png");
    powerButton.x = 54;
    powerButton.y = 606;

    game.addChild(powerButton);

    //powerButton event listeners
    powerButton.addEventListener("click", resetClicked);
    powerButton.addEventListener("mouseover", _buttonOver);
    powerButton.addEventListener("mouseout", _buttonOut);

    playerMoneyTxt = new createjs.Text("", "20px Arial", "#ff7700");
    playerMoneyTxt.x = 160;
    playerMoneyTxt.y = 492;
    playerMoneyTxt.textAlign = "right";

    game.addChild(playerMoneyTxt);

    playerBetTxt = new createjs.Text("", "20px Arial", "#ff7700");
    playerBetTxt.x = 280;
    playerBetTxt.y = 492;
    playerBetTxt.textAlign = "right";

    game.addChild(playerBetTxt);

    winningsTxt = new createjs.Text("", "20px Arial", "#ff7700");
    winningsTxt.x = 402;
    winningsTxt.y = 492;
    winningsTxt.textAlign = "right";

    game.addChild(winningsTxt);


    var jacpotText = new createjs.Text(jackpot.toString(), "20px Arial", "#ff7700");
    jacpotText.x = 267;
    jacpotText.y = 305;
    // playerMoneyText.textAlign = "right"; 

    game.addChild(jacpotText);
}

function controlText(type: string) {
    if (type == "playerBetTxt") {

        playerBetTxt.text = playerBet.toString();
    } else if (type == "winningsTxt") {
        alert("win");
        winningsTxt.text = winnings.toString();
        playerMoney += winnings;
        playerMoneyTxt.text = playerMoney.toString();
    } else if (type == "lossingsTxt") {
        //alert("lose");
        winningsTxt.text = "-" + playerBet.toString();
        playerMoney -= playerBet;
        playerMoneyTxt.text = playerMoney.toString();

    } else if (type == "start") {
        playerMoneyTxt.text = playerMoney.toString();
    }



    
}

function checkJackPot() {
    var jackPotTry = Math.floor(Math.random() * 51 + 1);
    var jackPotWin = Math.floor(Math.random() * 51 + 1);

    if (jackPotTry == jackPotWin) {
        alert("You won the $" + jackpot + " Jackpot!!!");
        playerMoney += jackpot;
        jackpot = 5000;
    }
}

function main() {
    game = new createjs.Container(); // Instantiates the game container

    createUI();
    controlText("start");
    createjs.Sound.registerSound("assets/sounds/oneBetting.wav", "betOne", 1);
    createjs.Sound.registerSound("assets/sounds/maxBetting.mp3", "betMax", 1);
    createjs.Sound.registerSound("assets/sounds/spinSound.mp3", "spinSound", 1);
    stage.addChild(game); // adds the game container to the stage
}