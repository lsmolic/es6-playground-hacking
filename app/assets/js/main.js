'use strict'

// http://ccoenraets.github.io/es6-tutorial/modules/

import Mortgage from './mortgage2';

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
  let mortgage = new Mortgage(principal, years, rate);

  document.getElementById("totalPaid").innerHTML = (mortgage.monthlyPayment * 12 * years).toFixed(2);
  document.getElementById("monthlyPayment").innerHTML = mortgage.monthlyPayment.toFixed(2);
  document.getElementById("monthlyRate").innerHTML = (rate / 12).toFixed(2);


  let html = "<tr><th>Year</th><th>Principal</th><th>Interest Rem.</th><th>Interest</th><th>Balance</th></tr>";
  mortgage.amortization.forEach((year, index) => html += `
    <tr>
      <td>${index + 1}</td>
      <td class="currency">${Math.round(year.principalY)}</td>
      <td class"stretch">
        <div class="flex">
          <div class="bar principal"
               style="flex:${year.principalY};-webkit-flex:${year.principalY}">
          </div>
          <div class="bar principal"
               style="flex:${year.interestY};-webkit-flex:${year.interestY}">
          </div>
        </div>
      </td>
      <td class="currency left">${Math.round(year.interestY)}</td>
      <td class="currency">${Math.round(year.balance)}</td>
    </tr>
  `)

  document.getElementById("amortization").innerHTML = html;
  
});