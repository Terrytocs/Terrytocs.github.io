("use strict");

class BGCol{
    constructor(btn,opt){
        this.colSelect=document.getElementById(btn);
        this.colOpt=document.getElementById(opt);
        this.root=document.querySelector(":root");
        this.addEventListeners();

        if(window.localStorage.getItem("colors")){
            this.colors=JSON.parse(window.localStorage.getItem("colors"));
            this.root.style.setProperty("--primary-color",this.colors.primary);
            this.root.style.setProperty("--secondary-color",this.colors.secondary);
        }
    }
    addEventListeners(){
        window.addEventListener("click",this.handleClick.bind(this));
    }
    handleClick(e){
        if(e.target.classList.contains("col-btn")){
            this.colOpt.classList.toggle("active");
            return;
        }
        switch(e.target.id){
            case "_grey_scale":
                this.colors={
                    primary:"#3C3C3C",
                    secondary:"#C3C3C3"
                };
                this.root.style.setProperty("--primary-color",this.colors.primary);
                this.root.style.setProperty("--secondary-color",this.colors.secondary);
                window.localStorage.setItem("colors",JSON.stringify(this.colors));
                break;
            case "_fountain_blue":
                this.colors={
                    primary:"#5EBEC4",
                    secondary:"#BBEEF1"
                };
                this.root.style.setProperty("--primary-color",this.colors.primary);
                this.root.style.setProperty("--secondary-color",this.colors.secondary);
                window.localStorage.setItem("colors",JSON.stringify(this.colors));
                break;
        }
        this.colOpt.classList.remove("active");
    }
}