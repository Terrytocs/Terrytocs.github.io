function calculateInterest() {
  var Q=[];
  Q[0]=document.getElementById('_calculatedInterestAmount').value;
  Q[1]=returnCalculatedYearlyInterest(Q[0]);
  
  var l={};
  l.calculatedInterestResult=document.getElementById('_calculatedInterestResult');
  l.calculatedInterestResult.innerText=`${Q[1]}%`;
}

function clearCalcInterest(){
    var Q=[];
    Q[0]=document.getElementById('_calculatedInterestAmount').value;
    Q[0]="";

    var l={};
    l.calculatedInterestResult=document.getElementById('_calculatedInterestResult');
    l.calculatedInterestResult.innerText="";
};