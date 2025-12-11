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
    '<i class="fab fa-java"></i>  Java' , 
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


// animation canvas (EFEITO COM MAIOR VISIBILIDADE E INTERATIVIDADE DO MOUSE)
const canvas = document.querySelector("#canvas")
const ctx = canvas.getContext('2d')

// Variável para a mudança de cor
let hue = 0; 

function setCanvasSize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
setCanvasSize(); // Define o tamanho inicial

let particleArray = [];
// Cores originais mantidas
const colours = [
    '#151515', 
    '#222222',
    '#393939',
    '#e9e9e9',
    '#bdbdc9',
    '#ff0077', 
];

// AJUSTE: Tamanho e contagem
const maxSize =  3; 
const minSize = 0.5; 
const particleCount = 150; 


let mouse = {
    x: undefined, 
    y: undefined
}

// NOVO: Listeners de mouse para interatividade
window.addEventListener('mousemove' , function(event){
    mouse.x = event.x;
    mouse.y = event.y;
});

window.addEventListener("mouseout" , function(){
    mouse.x = undefined;
    mouse.y = undefined;
});


//create constructor function for particle 
function Particle(x,y , directionX , directionY , size , colour ){
    this.x = x;
    this.y = y;
    this.directionX = directionX * 0.5; 
    this.directionY = directionY * 0.5; 
    this.size = size;
    this.colour = colours[Math.floor(Math.random() * colours.length)]; 
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

    // BLOCO DE INTERATIVIDADE: Mouse
    let mouseRadius = 50; // O raio de influência do mouse
    let maxSizeInteraction = 5; // O tamanho máximo que a partícula pode atingir

    // Verifica se o mouse está perto
    if(mouse.x - this.x  < mouseRadius && mouse.x -this.x  >- mouseRadius && 
       mouse.y - this.y < mouseRadius && mouse.y -this.y >- mouseRadius) {
        
        // Se perto e o tamanho for menor que o máximo de interação
        if(this.size < maxSizeInteraction){
            this.size += 1.5; // Faz a partícula crescer 
            this.x -= 0.5; // Empurra a partícula um pouco para o lado
        }
    } else if(this.size > minSize){
        // Se longe, faz a partícula encolher de volta ao tamanho normal
        this.size -= 0.1;
    }
    if(this.size < minSize){
        this.size = minSize;
    }
}

// Função para conectar as partículas e mudar as cores
function connect() {
    let opacityValue = 1;

    for (let a = 0; a < particleArray.length; a++) {
        for (let b = a; b < particleArray.length; b++) {
            
            let distance = ((particleArray[a].x - particleArray[b].x) * (particleArray[a].x - particleArray[b].x)) + 
                           ((particleArray[a].y - particleArray[b].y) * (particleArray[a].y - particleArray[b].y));
            
            // Desenha a linha se a distância for aceitável
            if (distance < 10000) { 
                opacityValue = 1 - (distance / 10000); 
                
                // Opacidade das linhas
                const finalOpacity = opacityValue * 0.15; 
                
                // Largura da linha
                ctx.lineWidth = 1.0; 
                
                // Aplica a cor dinâmica (mudando) às linhas de conexão
                ctx.strokeStyle = 'hsla(' + hue + ', 100%, 50%,' + finalOpacity + ')';
                
                ctx.beginPath();
                ctx.moveTo(particleArray[a].x, particleArray[a].y);
                ctx.lineTo(particleArray[b].x, particleArray[b].y);
                ctx.stroke();
            }
        }
    }
}


//create particle array 
function init(){
    particleArray = []

    for(let i=0 ; i< particleCount ; i++){
        let size = Math.random() * (maxSize - minSize) + minSize;
        let x = (Math.random() * ((window.innerWidth - size * 2 ) - (size * 2 )) + size * 2);
        let y = (Math.random() * ((window.innerHeight - size * 2) - (size * 2)) + size * 2);

        let directionX = (Math.random() * .4) - .2 ; 
        let directionY = (Math.random() * .4) - .2;
        
        particleArray.push(new Particle(x ,y ,directionX , directionY , size));
    }
}

//animation loop 
function animate(){
    requestAnimationFrame(animate);
    
    // LIMPEZA TOTAL DA TELA (Sem rastro)
    ctx.clearRect( 0 , 0 , canvas.width , canvas.height); 
    
    // Atualiza o movimento das partículas E DESENHA
    for(let i =0 ; i < particleArray.length; i++ ){
        particleArray[i].update();
        
        // DESENHANDO PARTÍCULAS AQUI COM OPACIDADE DE 30%
        ctx.beginPath();
        ctx.arc(particleArray[i].x , particleArray[i].y , particleArray[i].size , 0, Math.PI * 2 , false);
        
        // COR DAS PARTÍCULAS: usa a cor de nascimento com 30% de opacidade
        ctx.fillStyle = particleArray[i].colour.replace('rgb', 'rgba').replace(')', ', 0.30)'); 
        ctx.fill();
    }
    
    // Conecta as partículas (rede)
    connect(); 
    
    // Incrementa o hue para mudar a cor da rede/conexões
    hue += 0.2; 
}

// Inicialização e Animação ATIVADAS
init();
animate();

// Listener de redimensionamento CORRIGIDO
window.addEventListener('resize' , () => {
    setCanvasSize();
    init(); 
})

// remove mouse position periodically (mantido para que as partículas voltem ao normal)
setInterval(() => {
    mouse.x = undefined;
    mouse.y = undefined
} , 1000);