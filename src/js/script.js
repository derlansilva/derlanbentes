
function setActiveStyle(color){
    const alternateStyles = document.querySelectorAll('.alternate-style')

    alternateStyles.forEach(style => {
        if(color === style.getAttribute('title')){
            style.removeAttribute('disabled')
        }else{
            style.setAttribute('disabled' , 'true')
        }
    })

}


var typed = new Typed(".typing" , {
strings:["         ", "Back-end Developer" , "Node.js" ,"Python","Django" , "Java" , "Front-end Developer" , "React.js" ,"Javascript"],
    typeSpeed: 100, 
    BackSpeed:200,
    loop: true
})

const nav = document.querySelector(".nav"),
    navList = nav.querySelectorAll("li"),
    totalNavList = navList.length,
    allSection = document.querySelectorAll(".section"),
    totalSection = allSection.length

    for(let i = 0 ;i<totalNavList;i++){
        const a = navList[i]
 
        a.addEventListener("click" , function(){
            
            removeBackSection()

            for(let x = 0 ; x<totalNavList ; x++){
                if(navList[x].classList.contains('active')){
                    //allSection[x].classList.add("back-section")
                    addBackSection(x)
                }
                navList[x].classList.remove('active')
            }
            this.classList.add('active')
            showSection(this)
            if(window.innerWidth < 1200){
                asideSectionTogglerBtn()
            }
        })
    }

function showSection(element){
    for(let i=0; i <totalSection ; i++){
        allSection[i].classList.remove("active")
    }
    const target = element.getAttribute('href').split('#')[1]
    document.querySelector('#'+target).classList.add('active')
   
}

function updateNav(element){
  
    for(let i = 0 ; i<totalNavList; i++){
        navList[i].classList.remove("active")
        const target = element.getAttribute('href').split('#')[1]
        if(target === navList[i].getAttribute("href").split("#")[1]){
            navList[i].classList.add("active")
        }
    }

   
}

document.querySelector(".hire-me").addEventListener("click" , function(){
    const sectionIndex = this.getAttribute("data-section-index")
    showSection(this)
    updateNav(this)
    removeBackSection()
    addBackSection(sectionIndex)
})

const navTogglerBtn = document.querySelector(".nav-toggler"),
    aside = document.querySelector('.aside');


    navTogglerBtn.addEventListener("click" , function(){
        asideSectionTogglerBtn()
    })


    function asideSectionTogglerBtn(){
        aside.classList.toggle("open")
        navTogglerBtn.classList.toggle('open')
        for(let i= 0 ; i<totalSection; i++){
            allSection[i].classList.toggle("open")
        }
    }


//====REMOVER O FUNDO QUANDO TROCAR TELA 

function removeBackSection(){
    for(let i=0; i <totalSection ; i++){
        allSection[i].classList.remove("back-section")
    }
}

//=====ADCIONAR UM FUNDO ANTES DE TROCAR A TELA 

function addBackSection(index){
    allSection[index].classList.add("back-section")
}