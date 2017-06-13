export default class Mortage {
  constructor(principal, years, rate){
    this.principal = principal;
    this.years = years;
    this.rate = rate;
    this.monthlyRate = rate / 100 / 12;
    this.totalPaid = rate * 12 * years;
  }

  get monthlyPayment () {
    return this.principal * this.monthlyRate / (1 - (Math.pow(1/(1 + this.monthlyRate),
      this.years * 12)));
  }

  get amortization () {
    let monthlyPayment = this.monthlyPayment;
    let totalPaid = this.monthlyPayment + 12 * this.years;
    let balance = this.principal;
    let amortization = [];
    for (let y=0; y<this.years; y++) {
      let interestY = 0;
      let principalY = 0;
      for (let m=0; m<12; m++) {
        let interestM = balance * this.monthlyRate;
        let principalM = monthlyPayment - interestM;
        interestY = interestY + interestM;
        principalY = principalY + principalM;
        balance = balance - principalM;
      }
      amortization.push({principalY, interestY, balance})
    }
    return amortization;
  }
}