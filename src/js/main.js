let startCalculationBtn = document.getElementById('start'),
    resultValue = document.querySelectorAll('div .result-table > div[class$="-value"]'),
    budgetValue = document.querySelector('.budget-value'),
    dayBudgetValue = document.querySelector('.daybudget-value'),
    levelValue = document.querySelector('.level-value'),
    expensesValue = document.querySelector('.expenses-value'),
    optionalExpensesValue = document.querySelector('.optionalexpenses-value'),
    incomeValue = document.querySelector('.income-value'),
    monthSavingValue = document.querySelector('.monthsavings-value'),
    yaerSavingValue = document.querySelector('.yearsavings-value'),

    expensesInput = document.getElementsByClassName('expenses-item'),
    btns = document.getElementsByTagName('button'),
    approveExpenses = btns[0],
    approveOptionalExpenses = btns[1],
    calculate = btns[2],
    optionalExpenses = document.querySelectorAll('input[class="optionalexpenses-item"]'),
    income = document.querySelector('input[class="choose-income"]'),
    savings = document.querySelector('#savings'),
    sum = document.querySelector('input[class="choose-sum"]'),
    percent = document.querySelector('input[class="choose-percent"]'),
    year = document.querySelector('input[class="year-value"]'),
    month = document.querySelector('input[class="month-value"]'),
    day = document.querySelector('input[class="day-value"]');

let money, time;

startCalculationBtn.addEventListener('click', function() {
    time = prompt("Enter date in following format: YYYY-MM-DD", "2019-02-10");
    money = +(prompt("What is your budget per month?", ''));
    
    while(isNaN(money) || money == '' || money == null) {
        money = +(prompt("What is your budget per month?", ''));
    }

    let date = new Date(Date.parse(time));

    appData.budget = money;
    appData.timeDate = time;
    budgetValue.textContent = money.toFixed();
    year.value = date.getFullYear();
    month.value = date.getMonth() + 1;
    day.value = date.getDate();
    btnStatus(false);
});

approveExpenses.addEventListener('click', function() {
    let sum = 0;
    for (let i = 0; i < expensesInput.length; i++) {
        let expensesTopic = expensesInput[i].value,
            expenses = +expensesInput[++i].value;
     
        if (checkInputText(expensesTopic) &&
            typeof expenses === 'number'
        ) {
            appData.expenses[expensesTopic] = expenses;
            sum += expenses;
        }
    }
    appData.totalExpenses = sum;
    expensesValue.textContent = sum;
});

approveOptionalExpenses.addEventListener('click', function() {
    for (let i = 0; i < optionalExpenses.length; i++) {
        let optExpenses = optionalExpenses[i].value;
        if (checkInputText(optExpenses)) {
            appData.optionalExpenses[i] = optExpenses;
            optionalExpensesValue.textContent += appData.optionalExpenses[i] + ' ';
        }
    }

});

calculate.addEventListener('click', function() {
    if (appData.budget != undefined && appData.totalExpenses != undefined) {
        appData.moneyPerDay = ((appData.budget - appData.totalExpenses)/30).toFixed();
        dayBudgetValue.textContent = appData.moneyPerDay;
    
        if (appData.moneyPerDay < 20) {
            levelValue.textContent = 'Min level';
        } else if (appData.moneyPerDay >= 20) {
            levelValue.textContent = 'Ok';
        } else {
            levelValue.textContent = 'Error';
        }
    } else {
        levelValue.textContent = 'Budget and expenses are required';
    }
});

income.addEventListener('input', function() {
    let items = income.value;
    appData.income = processIncomeInput(items);
    incomeValue.textContent = appData.income;
});

savings.addEventListener('click', function() {
    appData.savings = appData.savings ? false : true;
});

sum.addEventListener('input', function() {
    if (appData.savings == true) {
        let sumValue = +sum.value,
            percentValue = +percent.value;
        
        appData.monthIncome = (sumValue/100/12 * percentValue).toFixed(1);
        appData.yearIncome = (sumValue/100/12 * percentValue).toFixed(1);

        monthSavingValue.textContent = appData.monthIncome;
        yaerSavingValue.textContent = appData.yearIncome;
    }
});

percent.addEventListener('input', function() {
    if (appData.savings == true) {
        let sumValue = +sum.value,
            percentValue = +percent.value;

        appData.monthIncome = (sumValue/100/12 * percentValue).toFixed(1);
        appData.yearIncome = (sumValue/100 * percentValue).toFixed(1);

        monthSavingValue.textContent = appData.monthIncome;
        yaerSavingValue.textContent = appData.yearIncome;
    }
});

let appData = {
    budget: money,
    timeDate: time,
    totalExpenses: undefined,
    expenses: {},
    optionalExpenses: {},
    income: [],
    savings: false
};

if (appData.budget == undefined) {
    btnStatus(true);
}

function btnStatus(isDisabled) {
    for (let i = 0; i < btns.length; i++) {
        if (btns[i].className !== 'start') {
            btns[i].disabled = isDisabled;
        }
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
