'use strict';

let money = parseFloat(prompt("What is your budget per month?", 0)) || 0;
let time = prompt("Enter date in following format: YYYY-MM-DD", "2019-01-30");
let expensesTopic = prompt("Enter expecses topic", "");
let expenses = parseFloat(prompt("How much is it costs?", 0)) || 0;

let appData = {
    budget: typeof money === 'number' ? money : 0,
    timeDate: time,
    expenses: {},
    optionalExpences: {},
    income: [],
    savings: true,
    calculateNetBudget: function() {
        let totalBudget = this.budget;
        totalBudget += this.income.length > 0 ? 
            this.income.reduce((a, b) => 
                a + b, 0) : 0;
        let netBudget = totalBudget - this.expenses.expensesTopic;
        netBudget -= this.savings === true ? totalBudget * 0.1 : 0;
        netBudget -= this.optionalExpences.length > 0 ?
            this.optionalExpences.reduce((a, b) => 
                a - b, 0) : 0;
        return netBudget;
    }
};

appData.expenses.expensesTopic = typeof expenses === 'number' ? expenses : 0;

const budgetPerDay = appData.calculateNetBudget()/30;
alert('Budget per day is ' + budgetPerDay);