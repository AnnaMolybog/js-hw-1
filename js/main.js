let money, time;

function start() {
    money = +(prompt("What is your budget per month?", ''));
    time = prompt("Enter date in following format: YYYY-MM-DD", "2019-01-30");

    while(isNaN(money) || money == '' || money == null) {
        money = +(prompt("What is your budget per month?", ''));
    }
}

function checkSavings(appData) {
    if (appData.savings === true) {
        let savings = +prompt('Amount of savings?'),
            percent = +prompt('Percent for savings?');
        appData.monthIncome = (savings/100/12 * percent).toFixed(2);
        alert('Income per month from your savings is: ' + appData.monthIncome);
    }

    return appData;
}

function detectLevel(appData) {
    let totalBudget = appData.budget;
    totalBudget += appData.income.length > 0 ? 
    appData.income.reduce((a, b) => a + b, 0) : 0;
    
    return totalBudget - appData.expenses.totalExpenses;
}

function chooseExpenses(limit, appData) {
    for (let i = 0; i < limit; i++) {
        let expensesTopic = prompt("Enter expenses topic", ""),
            expenses = +(prompt("How much is it costs?", 0)) || 0;
        
        if (checkInputText(expensesTopic) &&
            typeof expenses === 'number'
        ) {
            appData.expenses[expensesTopic] = expenses;
            appData.expenses.totalExpenses += expenses;
        } else {
            i--;
        }
    }

    return appData;
}

function chooseOptExpenses(limit, appData) {
    for (let i = 0; i < limit; i++) {
        let optExpenses = prompt("Optional expenses?");
        if (checkInputText(optExpenses)) {
            appData.optionalExpences[i] = optExpenses;
        }
    }

    return appData;
}

function detectDayBudget(totalBudget) {
    return (totalBudget/30).toFixed(2);
}

function checkInputText(input) {
    return typeof input === 'string' &&
        typeof input != null &&
        input != '' &&
        input.length < 50;
}

start();

let appData = {
    budget: money,
    timeDate: time,
    expenses: {
        totalExpenses: 0
    },
    optionalExpences: {},
    income: [],
    savings: true
};

appData = chooseOptExpenses(3, chooseExpenses(2, appData));

alert('Budget per day is ' + detectDayBudget(detectLevel(appData)));

appData = checkSavings(appData);

console.log(appData);