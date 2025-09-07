function calculateDebtNMonths(param) {
  var Q=[];
  Q[0]=document.getElementById('_debtNMonthsInitialAmount').value;
  Q[1]=document.getElementById('_debtNMonthsInterestAmount').value;
  Q[2]=document.getElementById('_debtNMonthsMonthlyPayment').value;
  Q[3]=document.getElementById('_debtNMonthsMonths').value;
  Q[4]=returnDebtAfterNMonths(Q[0],Q[2],Q[1],Q[3]);
  
  var l={};
  l.debtNMonthsResultMonths=document.getElementById('_debtNMonthsResultMonths');
  l.debtNMonthsResult=document.getElementById('_debtNMonthsResult');
  
  l.debtNMonthsResultMonths.innerText=`${Q[3]}`;
  l.debtNMonthsResult.innerText=`$${Q[4]}`;
}

function clearDebtNMonths(){
    _debtNMonthsInitialAmount.value="";
    _debtNMonthsInterestAmount.value="";
    _debtNMonthsMonthlyPayment.value="";
    _debtNMonthsMonths.value="";

    var l={};
    l.debtNMonthsResultMonths=document.getElementById('_debtNMonthsResultMonths');
    l.debtNMonthsResult=document.getElementById('_debtNMonthsResult');
    
    l.debtNMonthsResultMonths.innerText=``;
    l.debtNMonthsResult.innerText=``;
};