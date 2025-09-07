'use strict';

function returnCalculatedYearlyInterest(i) {
  var r;
  r = ((i / 100) / 12);
  r = (Math.pow(1 + r, 12) - 1);
  r = (r*100).toFixed(2);

  return r;
}

function returnInterestFrom(i,y=0) {
  if (y) {
    return (1+(i/1200));
  }
  return (1+(i/100));
}

function returnCompoundInterest(ia,i,y) {
  var r;
  r=(ia*Math.pow(returnInterestFrom(i),y));
  r=r.toFixed(2);
  r=Number(r).toLocaleString();
  
  return r;
}

function returnDebtAfterNMonths(ia,p,i,y){
  var r;
  r=((ia*Math.pow(returnInterestFrom(i,1),y))-p*((Math.pow(returnInterestFrom(i,1),y)-1)/(returnInterestFrom(i,1)-1)));
  r=r.toFixed(2);
  r=Number(r).toLocaleString();
  
  return r;
}

function returnEstimatedMonthlyPayment(ia,i,y){
  var r;
  r=((ia*Math.pow(returnInterestFrom(i,1),y*12))/((Math.pow(returnInterestFrom(i,1),y*12)-1)/(returnInterestFrom(i,1)-1)));
  r=r.toFixed(2);
  r=Number(r).toLocaleString();
  
  return r;
}