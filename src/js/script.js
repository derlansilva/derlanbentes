
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
strings:[
    "         ", 
    '<i class="fa fa-code"></i> Back-end Developer' , 
    '<i class="fab fa-node-js"></i>  Node.js' ,
    '<i class="fab fa-python"></i>  Python',
    "Django" , 
    '<i class="fab fa-java"></i>   Java' , 
    '<i class="fa fa-laptop-code"></i> Front-end Developer' , 
    '<i class="fab fa-react"></i>  React.js' ,
    '<i class="fab fa-js"></i> Javascript'
],
    typeSpeed: 150, 
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

//function responsible change screen
function showSection(element){
    for(let i=0; i <totalSection ; i++){
        allSection[i].classList.remove("active")
        
    }
    const target = element.getAttribute('href').split('#')[1]
    animationBack(target)
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

function animationBack(element){
    let row = document.querySelector(`.row-${element}`)
    let animation =["animation-left" , "animation-right" , "animation-bottom", "animation-bottom" , "animation-bottom" , "animation-bottom" , "animation-bottom" , "animation-bottom"]
    
    let firstElement = row.firstElementChild
    console.log("animationBack " ,firstElement)
    let count = firstElement.childElementCount ;

    for(let i = 0 ; i< count ; i++){
        firstElement.children[i].classList.add(animation[i])
    }
  
    

}

function removeAnimation(){
    let animation =["animation-left" , "animation-right" , "animation-bottom", "animation-bottom" , "animation-bottom" , "animation-bottom" , "animation-bottom" , "animation-bottom"]

    for(let i = 0 ; i< totalSection ; i++){
        let row =allSection[i].firstElementChild.classList;
        console.log(row)
        /*for(let x = 0 ; x< child ; x++){
            row.children[x].classList.remove(animation[x])
        }

        console.log("espero ter removido " , row)*/

        for(let x = 0 ; x<allSection[i].classList.length ; x++){
            
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
    removeAnimation()
    for(let i=0; i <totalSection ; i++){
        allSection[i].classList.remove("back-section")
    }
}

//=====ADCIONAR UM FUNDO ANTES DE TROCAR A TELA 

function addBackSection(index){
    allSection[index].classList.add("back-section")
    
}

// =================SCROLL REVEAL ==============



// animation canvas 
/*
const canvas = document.querySelector("#canvas")
const ctx = canvas.getContext('2d')
ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;

let particleArray = [];
const colours = [
    
    '#151515',
    '#222222',
    '#393939',
    '#e9e9e9',
    '#bdbdc9',
  

    
]

const maxSize =  40;
const minSize = 0;
//const mouseRadius = 60;

let mouse = {
    x: null,
    y: null
}

//funcion initial mouse

window.addEventListener('mousemove' , function(event){
    //pega a posição do mouse 
    mouse.x = event.x;
    mouse.y = event.y;

    //console.log(mouse.y)
})

//create constructor function for particle 

function Particle(x,y , directionX , directionY , size , colour ){
    this.x = x;
    this.y = y;
    this.directionX = directionX;
    this.directionY = directionY;
    this.size = size;
    this.colour = colour
}

//add draw methods to particle prototype

Particle.prototype.draw = function(){
    ctx.beginPath();
    ctx.arc(this.x , this.y , this.size ,0, Math.PI * 2 , false)
    ctx.fillStyle = this.colour;
    ctx.fill()
}

//add update method to particle prototype 
Particle.prototype.update = function(){
    if(this.x + this.size *2 > canvas.width || this.x - this.size *2 < 0){
        this.directionX= -this.directionX;
    }
    if(this.y +this.size * 2 > canvas.height || this.y - this.size *2 < 0){
        this.directionY = -this.directionY
    }

    this.x += this.directionX;
    this.y += this.directionY;

    //mouse interactyve 
    let mouseRadius = 50;
    if(mouse.x - this.x  < mouseRadius && mouse.x -this.x  >- mouseRadius && mouse.y - this.y < mouseRadius && mouse.y -this.y >- mouseRadius){
        if(this.size < maxSize){
            this.size += 3 ;
            this.x -= 1.5;
        }
    }else if(this.size > minSize){
        this.size -=.1;
    }
    if(this.size < 0){
        this.size = 0 ;
    }

    this.draw();
}

//create particle array 

function init(){
    particleArray = []

    for(let i=0 ; i< 1000 ; i++){
        let size = 10;
        let x = (Math.random() * ((innerWidth - size * 2 ) - (size * 2 )) + size * 2);
        let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);

        let directionX = (Math.random() * .2) - .1 ;
        let directionY = (Math.random() * .2) - .1;
        let colour  = colours[Math.floor(Math.random()   * colours.length)];

        particleArray.push(new Particle(x ,y ,directionX , directionY , size , colour));
    }
}

//animation loop 
function animate(){
    requestAnimationFrame(animate);
    ctx.clearRect( 0 , 0 , innerWidth , innerHeight);
    for(let i =0 ; i < particleArray.length; i++ ){
        particleArray[i].update();
    }
}
//init();
animate();

window.addEventListener('resize' , () => {
    canvas.width = window.innerWidth;
    canvas.height = window.height;
    init();
})

//remove mouse position periodically 

setInterval(() => {
    mouse.x = undefined;
    mouse.y = undefined
} , 1000);

*/
//mouse animation

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let spots = [];
let hue = 0;
const mouse = {
    x: undefined,
    y: undefined
}

canvas.addEventListener("mousemove"  ,(event ) => {
    mouse.x = event.x;
    mouse.y  = event.y;
    for(let i = 0 ; i< 3 ; i++){
        spots.push(new Particle())
    }
} )


class Particle{
    constructor(){
        this.x = mouse.x;
        this.y = mouse.y;

        this.size = Math.random() * 2 + 0.1;
        this.speedX = Math.random() * 2 - 1 ;
        this.speedY = Math.random() *2 - 1 ;
        this.colors = ['#ec1839' , '#fa5b0f' , '#37b182' ,'#1854b4' , '#f021b2']
        this.color  =  this.colors[Math.floor(Math.random() * this.colors.length)];
        console.log('color' , this.color)
    }

    update(){
        this.x += this.speedX;
        this.y += this.speedY ;
        if(this.size > 0.1) this.size -= 0.03;
    }

    draw(){
        ctx.fillStyle = this.color ;
        ctx.beginPath();
        ctx.arc(this.x , this.y  , this.size , 0 , Math.PI * 2);

        ctx.fill()
    }
}


function handleParticle(){
    for(let i = 0 ; i< spots.length ; i++){
        spots[i].update();
        spots[i].draw();
        for(let j = i ; j < spots.length ; j++){
            const dx = spots[i].x - spots[j].x;
            const dy = spots[i].y - spots[j].y;

            const distance = Math.sqrt(dx * dx + dy * dy );
            if(distance < 90){
                ctx.beginPath();
                ctx.strokeStyle = spots[i].color;
                ctx.lineWidth = spots[i].size / 5;
                ctx.moveTo(spots[i].x , spots[i].y);
                ctx.lineTo(spots[j].x , spots[j].y);
                ctx.stroke();
            }
        }
        if(spots[i].size <= 0.3){
            spots.splice(i , 1) ; 
            i--;
        }
    }
}

function animate(){
    ctx.clearRect( 0 , 0 , canvas.width , canvas.height);
    handleParticle()
    hue++
    requestAnimationFrame(animate)



}

window.addEventListener('resize' , function(){
    canvas.width  = innerWidth;
    canvas.height = innerHeight;

    init()
})

window.addEventListener("mouseout" , function(){
    mouse.x = undefined;
    mouse.y = undefined;
})

animate()