function calculatePaymentEstimate() {
  var Q=[];
  Q[0]=document.getElementById('_paymentEstimateInitialAmount').value;
  Q[1]=document.getElementById('_paymentEstimateInterestAmount').value;
  Q[3]=document.getElementById('_paymentEstimateYears').value;
  Q[4]=returnEstimatedMonthlyPayment(Q[0],Q[1],Q[3]);
  
  var l={};
  l.paymentEstimateResultYears=document.getElementById('_paymentEstimateResultYears');
  l.paymentEstimateResult=document.getElementById('_paymentEstimateResult');
  
  l.paymentEstimateResultYears.innerText=`${Q[3]}`;
  l.paymentEstimateResult.innerText=`$${Q[4]} per month`;
}

function clearPaymentEstimate(){
    var Q=[];
    _paymentEstimateInitialAmount.value="";
    _paymentEstimateInterestAmount.value="";
    _paymentEstimateYears.value="";

    var l={};
    l.paymentEstimateResultYears=document.getElementById('_paymentEstimateResultYears');
    l.paymentEstimateResult=document.getElementById('_paymentEstimateResult');
    
    l.paymentEstimateResultYears.innerText="N";
    l.paymentEstimateResult.innerText="";
};