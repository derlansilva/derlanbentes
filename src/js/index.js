

class Controller {
    constructor() {
        this.load()
        this.styleSwitcher()
        this.darkTheme()
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

}