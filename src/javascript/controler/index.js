

class Controller {
    constructor() {
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

    animationRead() {
        
    }

    removeElement(element) {
        this.content.classList.add('slide-out-left')
        setTimeout(() => {
            if (this.contentchild) {
                this.content.classList.remove('slide-out-left')
                if (element == 'contact') {
                    this.createContactElement()
                    return
                }
                if (element == 'home') {
                    this.createHomeElement()
                    return
                }
                if (element == 'project') {
                    this.createProjectElement()
                    return
                }
                if (element == 'message') {
                    this.createMessageElement()
                    return
                }
                if (element == 'profile') {
                    this.createAboutElement()
                    return
                }
            }
        }, 1000)
    }

    createContactElement() {
        this.about.style.display = 'none'
        this.home.style.display = 'none'
        this.project.style.display = 'none'
        this.message.style.display = 'none'
        this.contact.style.display = 'grid'

    }
    createHomeElement() {
        this.about.style.display = 'none'
        this.contact.style.display = 'none'
        this.project.style.display = 'none'
        this.message.style.display = 'none'
        this.home.style.display = 'grid'
    }
    createProjectElement() {
        this.about.style.display = 'none'
        this.home.style.display = 'none'
        this.contact.style.display = 'none'
        this.message.style.display = 'none'
        this.project.style.display = 'grid'
    }
    createMessageElement() {
        this.about.style.display = 'none'
        this.home.style.display = 'none'
        this.contact.style.display = 'none'
        this.project.style.display = 'none'
        this.message.style.display = 'grid'
    }
    createAboutElement() {
        //let profile = document.querySelector('.header--left')
        //profile.style.display = 'none'
        this.home.style.display = 'none'
        this.contact.style.display = 'none'
        this.project.style.display = 'none'
        this.message.style.display = 'none'
        this.about.style.display = 'grid'

    }
    menuClick() {
        let elem = 'home'
        this.list.forEach((item) => {
            item.addEventListener('click', () => {
                console.log('item', item)
                item.classList.forEach((element, index) => {
                    if (index == 1) {
                        if (element != elem) {
                            elem = element
                            this.removeElement(element)
                        }
                    }
                })
            })
        })
    }
}