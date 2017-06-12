'use strict'

// http://ccoenraets.github.io/es6-tutorial/modules/

import * as mortgage from './mortgage';

let printOneToTen = () => {
  let numbers = Array.from(new Array(10), (x,i) => i)
      
  for(num of numbers){
    console.log(num)
  }
}

document.getElementById('calcBtn').addEventListener('click', () => {
  let principal = document.getElementById("principal").value;
  let years = document.getElementById("years").value;
  let rate = document.getElementById("rate").value;
  let {monthlyPayment, monthlyRate, amortization} = mortgage.calculateAmortization(principal, years, rate);
  document.getElementById("monthlyPayment").innerHTML = monthlyPayment.toFixed(2);
  document.getElementById("monthlyRate").innerHTML = (monthlyRate * 100).toFixed(2);

  //printOneToTen()

  //amortization.forEach(month => console.log(month));
});