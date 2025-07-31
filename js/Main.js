('use strict');

class Main{
  constructor(){
    this.setHamBar('_ham_bar_svg','_link_list');
    this.setColor('_bg_col','_col_opt');
  }
  setHamBar(id,linksID){
    this.hamBar=new HamBarSVG(id,linksID);
  }
  setColor(btn,opt){
    this.bgCol=new BGCol(btn,opt);
  }
}