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
                    secondary:"hsl(220, 10%, 95%)"
                };
                this.root.style.setProperty("--primary-color",this.colors.primary);
                this.root.style.setProperty("--secondary-color",this.colors.secondary);
                window.localStorage.setItem("colors",JSON.stringify(this.colors));
                break;
            case "_fresh_citrus":
                this.colors={
                    primary:"hsl(90, 70%, 50%)",
                    secondary:"hsl(180, 10%, 98%)"
                };
                this.root.style.setProperty("--primary-color",this.colors.primary);
                this.root.style.setProperty("--secondary-color",this.colors.secondary);
                window.localStorage.setItem("colors",JSON.stringify(this.colors));
                break;
            case "_tropical_paradise":
                this.colors={
                    primary:"hsl(160, 60%, 45%)",
                    secondary:"hsl(220, 10%, 95%)"
                };
                this.root.style.setProperty("--primary-color",this.colors.primary);
                this.root.style.setProperty("--secondary-color",this.colors.secondary);
                window.localStorage.setItem("colors",JSON.stringify(this.colors));
                break;
            case "_berry_bliss":
                this.colors={
                    primary:"hsl(300, 60%, 50%)",
                    secondary:"hsl(240, 5%, 95%)"
                };
                this.root.style.setProperty("--primary-color",this.colors.primary);
                this.root.style.setProperty("--secondary-color",this.colors.secondary);
                window.localStorage.setItem("colors",JSON.stringify(this.colors));
                break;
            case "_orchard_harvest":
                this.colors={
                    primary:"hsl(45, 60%, 50%)",
                    secondary:"hsl(60, 5%, 95%)"
                };
                this.root.style.setProperty("--primary-color",this.colors.primary);
                this.root.style.setProperty("--secondary-color",this.colors.secondary);
                window.localStorage.setItem("colors",JSON.stringify(this.colors));
                break;
            case "_sunset_serenity":
                this.colors={
                    primary:"hsl(20, 70%, 50%)",
                    secondary:"hsl(30, 10%, 95%)"
                };
                this.root.style.setProperty("--primary-color",this.colors.primary);
                this.root.style.setProperty("--secondary-color",this.colors.secondary);
                window.localStorage.setItem("colors",JSON.stringify(this.colors));
                break;
        }
        this.colOpt.classList.remove("active");
    }
}