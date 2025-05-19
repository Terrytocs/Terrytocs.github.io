('use strict');

class Main{
  constructor(){
    this.setLogo('_logo_svg');
    this.setHamBar('_ham_bar_svg','_link_list');
  }
  setLogo(id){
    this.logo=new LogoSVG(id);
  }
  setHamBar(id,linksID){
    this.hamBar=new HamBarSVG(id,linksID);
  }
}