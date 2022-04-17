// This is my first attempt of making a lottery simulation in Javascript.

function generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function generateDraw(amountOfNumbers, maximumNumber) {
    draw = []
    for (let i = 0; i < amountOfNumbers; i++) {
        draw[i] = generateRandomNumber(1, maximumNumber + 1);

        // to make sure the numbers don't duplicate
        for (let j = 0; j < i; j++) {
            if (draw[j] === draw[i]) {
                i--;
            }
        }
    }

    // To sort smallest to largest
    draw.sort(function(a, b) { return a - b });

    return draw;
}

function checkMatchingNumbers(ticketNumbers, drawNumbers) {
    let numberOfMatching = 0;
    for (t in ticketNumbers) {
        for (d in drawNumbers) {
            if (drawNumbers[d] === ticketNumbers[t]) {
                numberOfMatching++;
            }
        }
    }

    return numberOfMatching;
}

function runLottery() {
    for (let i = 0; i < numberOfSimulations; i++) {
        let drawMainNumbers = generateDraw(numberOfMainBalls, maxMainNumber);
        let drawBonusNumbers = generateDraw(numberOfBonusBalls, maxBonusNumber);

        let amountOfMatchingMainNumbers = checkMatchingNumbers(ticketMainNumbers, drawMainNumbers);
        let amountOfMatchingBonusNumbers = checkMatchingNumbers(ticketBonusNumbers, drawBonusNumbers);

        console.log(`Main ${amountOfMatchingMainNumbers}`);
        console.log(`Bonus ${amountOfMatchingBonusNumbers}`);

        addToWinningArray(amountOfMatchingMainNumbers, amountOfMatchingBonusNumbers);
    }
}

function addToWinningArray(matchingMainNumbers, matchingBonusNumbers) {
    for (let i = 0; i <= numberOfBonusBalls; i++) {
        for (let j = 0; j <= numberOfMainBalls; j++) {
            if (j == matchingMainNumbers && i == matchingBonusNumbers) {
                winningArray[i, j]++;
            }
        }
    }
}

function printNumberOfEachMatch() {
    for (let i = 0; i <= numberOfBonusBalls; i++) {
        for (let j = 0; j <= numberOfMainBalls; j++) {
            console.log(`Main: ${j} - Bonus ${i} - ${winningArray[i][j]}`);
        }
    }
}

function createResultsArray() {
    delArrTest = 0;
    for (let i = 0; i <= numberOfBonusBalls; i++) {

        winningArray.push([new Array(numberOfMainBalls + 1)]);
        //winningArray[i].length = numberOfMainBalls + 1;

        for (let j = 0; j <= numberOfMainBalls; j++) {
            winningArray[i][j] = delArrTest;
            delArrTest++;
        }
    }

    console.log(winningArray[3, 0]);

}


const numberOfSimulations = 1;
const maxMainNumber = 50;
const maxBonusNumber = 12;
const numberOfMainBalls = 5;
const numberOfBonusBalls = 2;

const ticketMainNumbers = [1, 2, 3, 4, 5];
const ticketBonusNumbers = [1, 5];

let winningArray = [];

createResultsArray();

runLottery();

printNumberOfEachMatch();

// TODO - CREATE MULTI DIMENTIONAL ARRAY FOR WINNING QUANTITIES