'use strict';

window.addEventListener('load',mainFn);

function mainFn(){
  bgVidFn();
  toggleHamFn();
}

function toggleHamFn(){
  const hamBar=document.getElementById('_ham_svg');
  
  hamBar.addEventListener('click',()=>{
    hamBar.toggleAttribute('active');
  })
}

