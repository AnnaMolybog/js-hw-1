let money, time;

function start() {
    money = +(prompt("What is your budget per month?", ''));
    time = prompt("Enter date in following format: YYYY-MM-DD", "2019-01-30");

    while(isNaN(money) || money == '' || money == null) {
        money = +(prompt("What is your budget per month?", ''));
    }
}

function checkInputText(input) {
    return typeof input === 'string' &&
        typeof input != null &&
        input != '' &&
        input.length < 50;
}

function processIncomeInput(input) {
    if (checkInputText(input)) {
        let processedArray = [];
        
        input.split(', ').filter(function(item) {
            if (checkInputText(item)) {
                return item;
            }
        }).forEach(function(item, i) {
            processedArray[i + 1] = item;
        });

        return processedArray;
    }
    return null;
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
    savings: true,
    chooseExpenses: function() {
        for (let i = 0; i < 2; i++) {
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
    },
    detectDayBudget: function() {
        appData.moneyPerDay = (appData.budget/30).toFixed(2);
        alert('Budget per day is ' + appData.moneyPerDay);
    },
    detectLevel: function() {
        if (appData.moneyPerDay < 20) {
            console.log('Min level');
        } else {
            console.log('Ok');
        }
    },
    checkSavings: function() {
        if (appData.savings === true) {
            let savings = +prompt('Amount of savings?'),
                percent = +prompt('Percent for savings?');
            appData.monthIncome = (savings/100/12 * percent).toFixed(2);
            alert('Income per month from your savings is: ' + appData.monthIncome);
        }
    },
    chooseOptExpenses: function() {
        for (let i = 0; i < 3; i++) {
            let optExpenses = prompt("Optional expenses?");
            if (checkInputText(optExpenses)) {
                appData.optionalExpences[i] = optExpenses;
            }
        }
    },
    chooseIncome: function() {
        let items = prompt('what can bring additional income? (List via coma)', '');
        console.log(items);
        appData.income = processIncomeInput(items);

        if (appData.income != null) {
            let moreIncome = prompt('Anything else? (List via coma)', '');
            let processedIncome = processIncomeInput(moreIncome);
            if (processedIncome != null ) {
                appData.income.push(processedIncome);
            }
            appData.income.sort();
            alert('Variants of additional income: ' + appData.income); 
        } else {
            this.chooseIncome();  
        }
    }
};

appData.chooseOptExpenses();
appData.chooseExpenses();
appData.chooseIncome();
appData.checkSavings();
appData.detectDayBudget();

console.log('Program uses following data: ');
for (let value of appData) {
    console.log(value);
}