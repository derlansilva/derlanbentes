

class Controller{
    constructor(){
        this.content = document.querySelector('.content')
        this.contentchild = document.querySelector('.content > *')
        this.list = document.querySelectorAll('.list')
        this.home = document.querySelector('.content--home')
        this.contact = document.querySelector('.content--contact')
        this.project = document.querySelector('.content--project')
        this.message = document.querySelector('.content--message')
        this.about = document.querySelector('.content--profile')
    
        this.menuClick()
        this.animationRead()
    }

    animationRead(){
        const read = document.querySelector(".animation--read")
        let txt = document.createElement('div')
        let verificatio = false
        let text = [ 'TypesCript' , 'Javascript' ,'Python']
        for (let i =0 ; i <=text.length ; i++){
            setTimeout(() => {
                console.log(text[i])
            }, 5000)
        }

    }

    removeElement(element){
        this.content.classList.add('slide-out-left')
        setTimeout(() => {
            console.log(this.contentchild.classList[0])
            if(this.contentchild){
                this.content.classList.remove('slide-out-left')
                if(element == 'contact'){
                    this.createContactElement()
                    return
                }
                if(element == 'home'){
                    this.createHomeElement()
                    return
                }
                if(element == 'project'){
                    this.createProjectElement()
                    return
                }
                if(element =='message'){
                    this.createMessageElement()
                    return
                }
                if(element == 'profile'){
                    this.createAboutElement()
                    return
                }
            }
        }, 1000)
    }

    createContactElement(){
        this.about.style.display = 'none'
        this.home.style.display = 'none'
        this.project.style.display = 'none'
        this.message.style.display = 'none'
        this.contact.style.display = 'grid'
       
    }
    createHomeElement(){
        this.about.style.display = 'none'
        this.contact.style.display = 'none'
        this.project.style.display = 'none'
        this.message.style.display = 'none'
        this.home.style.display = 'grid'
    }
    createProjectElement(){
        this.about.style.display = 'none'
        this.home.style.display = 'none'
        this.contact.style.display = 'none'
        this.message.style.display = 'none'
        this.project.style.display = 'grid'
    }
    createMessageElement(){
        this.about.style.display = 'none'
        this.home.style.display = 'none'
        this.contact.style.display = 'none'
        this.project.style.display = 'none'
        this.message.style.display = 'grid'
    }
    createAboutElement(){
        this.home.style.display = 'none'
        this.contact.style.display = 'none'
        this.project.style.display = 'none'
        this.message.style.display = 'none'
        this.about.style.display = 'grid'
    }
    menuClick(){
        let elem = 'home'
        this.list.forEach((item) => {
            item.addEventListener('click' ,() => {
                console.log('item' , item)
                item.classList.forEach((element, index) => {               
                    if(index == 1){
                        if(element == elem){
                            console.log("são iguais")
                        }else{
                            console.log('não são iguais' , element , elem)
                            elem = element
                            this.removeElement(element)
                        }
                    }
                })
            })
        })
    }
}