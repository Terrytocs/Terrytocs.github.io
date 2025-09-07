'use strict'

function calculateCompoundInterest() {
  var Q=[];
  Q[0]=document.getElementById('_compoundInterestInitialAmount').value;
  Q[1]=document.getElementById('_compoundInterestInterestAmount').value;
  Q[2]=document.getElementById('_compoundInterestYears').value;
  Q[3]=returnCompoundInterest(Q[0],Q[1],Q[2]);
  
  var l={};
  l.compoundInterestResultYears=document.getElementById('_compoundInterestResultYears');
  l.compoundInterestResult=document.getElementById('_compoundInterestResult');
  
  l.compoundInterestResultYears.innerText=`${Q[2]}`;
  l.compoundInterestResult.innerText=`$${Q[3]}`;
}

function clearCompInterest(){
    _compoundInterestInitialAmount.value="";
    _compoundInterestInterestAmount.value="";
    _compoundInterestYears.value="";

    var l={};
    l.compoundInterestResultYears=document.getElementById('_compoundInterestResultYears');
    l.compoundInterestResult=document.getElementById('_compoundInterestResult');
    
    l.compoundInterestResultYears.innerText=``;
    l.compoundInterestResult.innerText=``;
};