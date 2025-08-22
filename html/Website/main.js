('use strict');

window.addEventListener('load',mainFn);

function mainFn(){
  toggleHamFn();
}

function toggleHamFn(id){
  const ham_bar=document.getElementById('_ham_svg');

  ham_bar.addEventListener('click',(e)=>{
    e.stopPropagation()
    ham_bar.classList.toggle('active');
  },{capture:true});

  window.addEventListener('click',(e)=>{
    if(e.target.classList.contains('nav__link')){
      ham_bar.classList.remove('active');
    }else if(!e.target){
      return;
    }else{
      ham_bar.classList.remove('active')
    }
  });
}

  

  