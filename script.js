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

    let mainArrPosition;
    let bonusArrPosition;
    let arrayPosition;

    for (let i = 0; i <= numberOfBonusBalls; i++) {
        for (let j = 0; j <= numberOfMainBalls; j++) {
            if (j == matchingMainNumbers) {
                mainArrPosition = j;
            }
        }

        if (i == matchingBonusNumbers) {
            bonusArrPosition = i;
        }
    }

    if (bonusArrPosition === 0) {
        arrayPosition = mainArrPosition;
    } else {
        arrayPosition = ((bonusArrPosition * numberOfMainBalls) + mainArrPosition);
    }

    winningArray[arrayPosition]++;
}

function printNumberOfEachMatch() {
    for (let i = 0; i <= numberOfBonusBalls; i++) {
        for (let j = 0; j <= numberOfMainBalls; j++) {
            if (i === 0) {
                console.log(`${j} - LS ${i} - ${winningArray[j]}`);
            } else {
                console.log(`${j} - LS ${i} - ${winningArray[(i * numberOfMainBalls) + j]}`);
            }

        }
    }
}

const numberOfSimulations = 50000;
const maxMainNumber = 50;
const maxBonusNumber = 12;
const numberOfMainBalls = 5;
const numberOfBonusBalls = 2;

const ticketMainNumbers = [1, 2, 3, 4, 5];
const ticketBonusNumbers = [1, 5];

let winningArray = [];
winningArray.length = (ticketMainNumbers.length + 1) * (ticketBonusNumbers.length + 1);

for (let i = 0; i < winningArray.length; i++) {
    winningArray[i] = 0;
}

runLottery();

printNumberOfEachMatch();