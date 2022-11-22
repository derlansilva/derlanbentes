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
    strings:["         ", "Back-end Developer" , "Node.js" ,"Python","Django" , "Front-end Developer" , "React.js" ,"Javascript"],
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
        const a = navList[i].querySelector('a')
 
        a.addEventListener("click" , function(){
            for(let i=0; i <totalSection ; i++){
                allSection[i].classList.remove("back-section")
            }

            for(let x = 0 ; x<totalNavList ; x++){
                if(navList[x].querySelector("a").classList.contains('active')){
                    allSection[x].classList.add("back-section")
                }
                navList[x].querySelector('a').classList.remove('active')
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