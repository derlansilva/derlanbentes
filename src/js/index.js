

class Controller {
    constructor() {
        this.load()
        this.styleSwitcher()
        this.darkTheme()
        //this.showNav()
    }

    load(){
        window.addEventListener('scroll' , () => {
            if(document.querySelector('.style-switcher').classList.contains('open')){
                document.querySelector('.style-switcher').classList.remove('open')
            }
        })
    }
    styleSwitcher(){
        const styleSwitcherToggle = document.querySelector('.style-switcher-toggler') 

        styleSwitcherToggle.addEventListener('click', () => {
            document.querySelector('.style-switcher').classList.toggle('open')
        })
    }
    darkTheme(){
        const dayNight =document.querySelector('.day-night')

        dayNight.addEventListener('click' , () => {
            dayNight.querySelector('i').classList.toggle('fa-sun')
            dayNight.querySelector('i').classList.toggle('fa-moon')

            document.body.classList.toggle('dark')
        })
        window.addEventListener('load', () => {
            if(document.body.classList.contains('dark')){
                dayNight.querySelector('i').classList.add('fa-sun')
            }else{
                dayNight.querySelector('i').classList.add('fa-moon')
            }
        })
    }
    /*
    showNav(){
       
        const nav = document.querySelector('.nav'),
            navList = nav.querySelectorAll('li'),
            totalNavList = navList.length;

            for(let i = 0  ; i<totalNavList; i++){
                const a = navList[i].querySelector('a')
                a.addEventListener('click' , function(){
                    for(let x = 0 ; x<totalNavList ; x++){
                        navList[x].querySelector('a').classList.remove('active')
                    }

                    this.classList.add('active')
                    
                })  
            }
    }

    showSection(){
        console.log("element test")
    }*/

}