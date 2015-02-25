
// Button class
class Button {
    private _img: createjs.Bitmap;
    private _x: number;
    private _y: number;

    constructor(path: string, x: number, y: number) {
        this._x = x;
        this._y = y;
        this._img = new createjs.Bitmap(path);
        this._img.x = this._x;
        this._img.y = this._y;

        this._img.addEventListener("mouserover", this._buttonOut);
        this._img.addEventListener("mouseout", this._buttonOut);
    }

    //Public properties
    public setX(x: number): void {
        this._x = x;
    }

    public setY(y: number): void {
        this._y = y;
    }

    public getX(): number {
        return this._x;
    }

    public getY(): number {
        return this._y;
    }

    public getImg(): createjs.Bitmap {
        return this._img;
    }

    //Private event handlers
    private _buttonOut(event: createjs.MouseEvent): void {
        event.currentTarget.alpha = 1;
    }

    private _buttonOver(event: createjs.MouseEvent): void {
        event.currentTarget.alpha = 0.5;
    }
}

//Variables
var canvas;
var stage: createjs.Stage;
var titles: createjs.Bitmap[] = []
var reelContainers: createjs.Container[] = [];

// Game constants
var NUM_REELS: number = 3;

//Game Variables
var playerMoney = 1000;
var winnings = 0;
var jackpot = 5000;
var turn = 0;
var playerBet = 0;
var winNum = 0;
var lossNum = 0;
var spinResult;
var fruits = "";
var winRatio = 0;

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
var spinButton: Button;
var betMaxButton: Button;
var betOneButton: Button;
var resetButton: Button;
var powerButton: Button;

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
    var betLine = [" ", " ", " "];
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
                betLine[spin] = "bell";
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
            case checkRange(outCome[spin], 63, 64): //3.1%
                betLine[spin] = "seven";
                sevens++;
                break;
            case checkRange(outCome[spin], 28, 37): //1.5%
                betLine[spin] = "clover";
                clovers++;
                break;
            /*case checkRange(outCome[spin], 1, 27): //41.5%
                betLine[spin] = "dollar";
                dollars++;
                break;
            case checkRange(outCome[spin], 55, 59): //7.7%
                betLine[spin] = "diamond";
                diamonds++;
                break;*/
        }
        
    }
    return betLine;
}

function determineWinnings() {
    if (blanks == 0) {
        if (grapes == 3) {
            winnings = playerBet * 10;
        }
        else if (bells == 3) {
            winnings = playerBet * 20;
        }
        else if (oranges == 3) {
            winnings = playerBet * 30;
        }
        else if (cherries == 3) {
            winnings = playerBet * 40;
        }
        else if (bars == 3) {
            winnings = playerBet * 10;
        }
        else if (sevens == 3) {
            winnings = playerBet * 10;
        }
        /*else if (diamonds == 3) {
            winnings = playerBet * 10;
        }
        else if (dollars == 3) {
            winnings = playerBet * 10;
        }*/
        else if (clovers == 3) {
            winnings = playerBet * 10;
        }
        else if (grapes == 2) {
            winnings = playerBet * 5;
        }
        else if (bells == 2) {
            winnings = playerBet * 5;
        }
        else if (oranges == 2) {
            winnings = playerBet * 5;
        }
        else if (cherries == 2) {
            winnings = playerBet * 5;
        }
        else if (bars == 2) {
            winnings = playerBet * 5;
        }
        else if (sevens == 2) {
            winnings = playerBet * 5;
        }
        /*else if (diamonds == 2) {
            winnings = playerBet * 5;
        }
        else if (dollars == 2) {
            winnings = playerBet * 5;
        }*/
        else if (clovers == 2) {
            winnings = playerBet * 5;
        }
        else
            winnings = playerBet * 1;

        winNum++;
    }
    else
        lossNum++;
}

// spin button event
function spinButtonClicked(event: createjs.MouseEvent) {
    spinResult = Reels();
    fruits = spinResult[0] + "-" + spinResult[1] + "-" + spinResult[2];

    for (var index = 0; index < NUM_REELS; index++) {
        reelContainers[index].removeAllChildren();
        titles[index] = new createjs.Bitmap("assets/images/" + spinResult[index] + ".png");
        reelContainers[index].addChild(titles[index]);
    }
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
    spinButton = new Button("assets/images/spin.png", 304, 541);
    game.addChild(spinButton.getImg());

    //spin button event listeners
    spinButton.getImg().addEventListener("click", spinButtonClicked);

    //bet max button
    betMaxButton = new Button("assets/images/betMax.png", 54, 541);
    game.addChild(betMaxButton.getImg());
    betMaxButton.getImg().addEventListener("click", spinButtonClicked);

    //bet one button
    betOneButton = new Button("assets/images/betOne.png", 54, 606);
    game.addChild(betOneButton.getImg());
    betOneButton.getImg().addEventListener("click", spinButtonClicked);

    //Reset button
    resetButton = new Button("assets/images/reset.png", 179, 606);
    game.addChild(resetButton.getImg());
    resetButton.getImg().addEventListener("click", spinButtonClicked);

    //Power button
    powerButton = new Button("assets/images/power.png", 179, 541);
    game.addChild(powerButton.getImg());
    powerButton.getImg().addEventListener("click", spinButtonClicked);
}

function main() {
    game = new createjs.Container(); // Instantiates the game container

    createUI();

    stage.addChild(game); // adds the game container to the stage
}