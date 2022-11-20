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
    strings:["", "FullStack Developer" , "JavaScript" ,"Node.js" , "React.js" , "React-Native" ,"Python" , "Django"],
    typeSpeed: 100, 
    BackSpeed:200,
    loop: true
})