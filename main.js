const input = require('sync-input');


const welcomeText = 'Welcome to Currency Converter!';
const currency ={
    'USD': 1.0,
    'JPY': 113.5,
    'EUR': 0.89,
    'RUB': 74.36,
    'GBP': 0.75
}

const intObj = {}

function displayCurrency(currency) {
    for (const [key, value] of Object.entries(currency)) {
        console.log(`1 USD equals ${value} ${key}`);
    }
}

function menu() {
    console.log('What do you want to do?');
    console.log('1-Convert currencies 2-Exit program');

    const choseOption = Number(input());

    switch (choseOption) {
        case 1:
            displayPossibilities();
            break;
        case 2:
            console.log('Have a nice day!');
            break;
        default:
            console.log('Unknown input');
            menu();
            break;
    }
}

function displayPossibilities() {
    console.log('What do you want to convert?');
    checkCurrency(currency, intObj);
}

function checkCurrency(currency, intObj) {
    const questionTextFrom = 'From: ';
    const questionText = 'To: ';
    const questionAmount = 'Amount: ';

    let inputCurrencyFrom = input(questionTextFrom).toUpperCase();
    const hasCurrencyFrom = inputCurrencyFrom in currency;
    intObj.currencyFrom = inputCurrencyFrom;

    if (!hasCurrencyFrom) {
        console.log('Unknown currency');
        menu();
    } else {
        let inputCurrency = input(questionText).toUpperCase();
        const hasCurrency = inputCurrency in currency;
        intObj.currency = inputCurrency;

        if (!hasCurrency) {
            console.log('Unknown currency');
            menu();
        } else {
            let inputAmount = input(questionAmount);
            intObj.amount = inputAmount;

            if (isNaN(inputAmount)) {
                console.log('The amount has to be a number');
                menu();
            } else if (inputAmount < 1) {
                console.log('The amount cannot be less than 1');
                menu();
            }

            currencyConversion(currency, intObj);
        }
    }

}

function currencyConversion(currency, intObj) {

    let valueFirstCurrency = 0;
    let valueSecondCurrency = 0;

    for (const [key, value] of Object.entries(currency)) {
        if (intObj.currencyFrom === key) {
            valueFirstCurrency = value;
        } else if (intObj.currency === key ) {
            valueSecondCurrency = value;
        }
    }

    if (intObj.currencyFrom === intObj.currency) {
        let sameCurrency = Number(intObj.amount);
        let testCur = sameCurrency.toFixed(4)
        console.log(`Result: ${intObj.amount} ${intObj.currencyFrom} equals ${testCur} ${intObj.currency}`);
    } else {
        const result = ((intObj.amount / valueFirstCurrency) * valueSecondCurrency).toFixed(4);
        console.log(`Result: ${intObj.amount} ${intObj.currencyFrom} equals ${result} ${intObj.currency}`);
    }
    menu();
}

console.log(welcomeText);
displayCurrency(currency, intObj);
menu();
