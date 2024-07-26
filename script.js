const lightmode=[
    'rgb(248, 244, 225)',
    'rgb(175, 143, 111)',
    'rgb(116, 81, 45)',
    'rgb(84, 51, 16)'
]
const darkmode=[
    'rgb(0, 0, 0)',
    'rgb(255, 255, 255)',
    'rgb(70, 0, 0)',
    'rgb(181, 181, 181)'
];


class IconInteraction{

    constructor(){   
        
    }

    getElement(element){
        return document.querySelector(element);
        
    }

    addClassName(elementClick,element,elementListener,
        classNameONE,classNameTWO
    ){
        let roll=false;
        const menu=this.getElement(element);
        const clickElement=this.getElement(elementClick);

        clickElement.addEventListener(elementListener,()=>{
            roll=!roll;
            menu.classList.toggle('open');
           if(roll){
            clickElement.className=classNameTWO
           }
           else{
            clickElement.className=classNameONE;
           }
        })
    }
    addAnimation(
        // PODSTAWOWE
        element, animation, eventListener,
       
        //ROZSZEZONE O ZMIANE IKONY
        returnToPrev,oldIcon,newIcon,
    ) {
        const getElement = this.getElement(element);
        if(eventListener){
            getElement.addEventListener(eventListener, () => {
            getElement.style.animation = animation;

            //ROZSZEZONE O ZMIANE IKONY

           if(oldIcon && newIcon!=undefined){
            getElement.className=newIcon;
           }
          
            
            if(returnToPrev){
                getElement.addEventListener("animationend",()=>{
                    getElement.style.animation="none";        
    
                    if(oldIcon && newIcon!=undefined){
                        getElement.className=oldIcon;
                       }
                })
            }
            //---  
             
        });
        }else{
            getElement.style.animation = animation;
        }
    }
    #applyMode(isDarkMode, lightmode_colors, darkmode_colors, root){
        let colors=isDarkMode ? darkmode_colors: lightmode_colors;

        for(let i=0;i<colors.length;i++){
            root.style.setProperty(`--color${i+1}`,colors[i])
        }
    }
    changemode(lightmode_colors,darkmode_colors,element){
        const root=document.documentElement;
        const item=this.getElement(element);

        let change=localStorage.getItem("MODE")==="dark" ? true: false;
        this.#applyMode(change,lightmode_colors,darkmode_colors,root);

        item.addEventListener("click",()=>{
            console.log('zmaina')
            item.style.pointerEvents="none";
            change=!change;

             //ZAPIS DO LOCAL STORAGE
             localStorage.setItem("MODE",change ? "dark": "light");
            //--

            item.addEventListener("animationend",()=>{
                console.log('koniec')
                item.style.pointerEvents="all";
            });

            this.#applyMode(change,lightmode_colors,darkmode_colors,root);
        });   
    }
   
}

const navBar=new IconInteraction();
navBar.addClassName(".barIcon",'.navMenu',"click","fa-solid fa-bars barIcon","fa-solid fa-xmark barIcon");

const modeBtn=new IconInteraction();
modeBtn.addAnimation('.navIconDiv .modeIcon',"changemode 1s forwards","click",true);

modeBtn.changemode(lightmode,darkmode,'.navIconDiv .modeIcon');



// NAWIGACJA DO ELEMENTÓW:
class Navigation{
    #element;
    #purposeElement;
    #eventListener;
    constructor(element,purposeElement,eventListener){
        this.#element=element;
        this.#purposeElement=purposeElement;
        this.#eventListener=eventListener;

        this.scroll();
    }
    #getElement(element){
        const item=document.querySelector(element);
       
        return item;
    }
    scroll(){
        const element=this.#getElement(this.#element);
        const purposeElement=this.#getElement(this.#purposeElement);

        element.addEventListener(this.#eventListener,()=>{
           
            console.log('click')
            purposeElement.scrollIntoView({
                behavior:"smooth",
                
            })

        })

    }
    

} 

new Navigation(".donateBtn","section","click")





//ANIMACJE NA SCROLLU:
const mouse = {
    x: undefined,
    y: undefined
};

window.addEventListener('mousemove', function(event) {
    mouse.x = event.x;
    mouse.y = event.y;
});

class Particle {
    constructor(x, y, ctx) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 7 + 1;
        this.dx = Math.random() * 3 - 1.5;
        this.dy = Math.random() * 3 - 1.5;
        this.ctx = ctx;
    }

    update() {
        this.x += this.dx;
        this.y += this.dy;
        if (this.size > 0.2) this.size -= 0.1;
    }

    draw(special=false) {
        const gradient = this.ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size);
        gradient.addColorStop(0, 'rgba(190, 191, 211, 1)');
        gradient.addColorStop(1, 'rgba(190, 191, 211, 0)');

        this.ctx.fillStyle = gradient;
        this.ctx.shadowBlur = 20;
        this.ctx.shadowColor = 'rgba(190, 191, 211, 0.5)';
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        this.ctx.fill();

        this.ctx.shadowBlur = 0;
        this.ctx.shadowColor = 'transparent';

        if(special){
            this.ctx.fillStyle = 'goldenrod';
            this.ctx.shadowBlur = 10;
            this.ctx.shadowColor = 'goldenrod';
            this.ctx.beginPath();
            this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            this.ctx.fill();

            this.ctx.shadowBlur = 0;
            this.ctx.shadowColor = 'transparent';
        }
    }
}

class MagicCanvas {
    constructor(canvasClass) {
        this.particles = [];
        this.canvas = document.querySelector(canvasClass);
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        window.addEventListener('resize', () => {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
        });
    }

    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    updateParticles() {
        for (let i = 0; i < this.particles.length; i++) {
            this.particles[i].update();
            this.particles[i].draw();
            if (this.particles[i].size <= 0.2) {
                this.particles.splice(i, 1);
                i--;
            }
            if(i%1000===0){
                this.particles[i].update();
                this.particles[i].draw(true);
                if (this.particles[i].size <= 0.2) {
                    this.particles.splice(i, 1);
                    i--;
                }
            }
        }
    }

    appendDraw(number, eventListener1,eventListener2) {
        this.canvas.addEventListener(eventListener1, (e) => {
            for (let i = 0; i < number; i++) {
                this.particles.push(new Particle(e.clientX, e.clientY, this.ctx));
            }
        });

        this.canvas.addEventListener(eventListener2, (e) => {
            for (let i = 0; i < number; i++) {
                this.particles.push(new Particle(e.clientX, e.clientY, this.ctx));
            }
        });

        const animate = () => {
            this.clear();
            this.updateParticles();
            requestAnimationFrame(animate);
        };
        animate();
    }
}




// ANIMACJA NA SCROLLU:
function createObserver(className){
    return new IntersectionObserver((entries)=>{
        entries.forEach(entry=>{
            if(entry.isIntersecting){
                entry.target.classList.add(className);
            }
            else{
                entry.target.classList.remove(className);
            }
        });
    });
}

const hiddenElements=document.querySelectorAll('.hidden');
const observer=createObserver('show');
hiddenElements.forEach(el=>observer.observe(el));

const hiddenElements2=document.querySelectorAll('.hidden2');
const observer2=createObserver('show2');
hiddenElements2.forEach(el=>observer2.observe(el));
// SLAJDY:

class Slide{
    constructor(title,text){
        this.title=title;
        this.text=text;
        this.createSlide();
    }
    createSlide(){
        return {
            text:this.text,
            title:this.title
        }
    }
}

class Slider{
    constructor(titleDiv,textDiv,iconElem,slides){
        this.title=document.querySelector(titleDiv);
        this.text=document.querySelector(textDiv);
        this.icon=[...document.querySelectorAll(iconElem)];
        this.slides=slides;
        this.index=0;
    }
    changeSlide(className_toAdd){
        this.title.textContent=this.slides[this.index].title;
        this.text.textContent=this.slides[this.index].text;

        this.icon.forEach(icon=>{
            icon.addEventListener('click',()=>{
                this.index++;
                this.title.classList.remove(className_toAdd);
                this.text.classList.remove(className_toAdd);
    
                if(this.index===this.slides.length){
                    this.index=0;
                }
    
                this.title.textContent=this.slides[this.index].title;
    
                void this.title.offsetWidth;
                void this.text.offsetWidth;
    
                this.text.textContent=this.slides[this.index].text;
    
                this.title.classList.add(className_toAdd);
                this.text.classList.add(className_toAdd);
    
               
    
            })  
        })
    }
    changeSlide2(className_toAdd){
        this.title.textContent=this.slides[this.index].title;
        this.text.textContent=this.slides[this.index].text;
        this.icon[this.index].classList.add(className_toAdd);

        for(let i=0;i<this.icon.length;i++){
           
            this.icon[i].addEventListener('click',()=>{

                let activeIndex=this.icon.findIndex(icon=>icon.classList.contains(className_toAdd));
                if(activeIndex!=-1){
                    this.icon[activeIndex].classList.remove(className_toAdd)
                }
         
                this.title.textContent=this.slides[i].title;
                this.text.textContent=this.slides[i].text;
                this.icon[i].classList.add(className_toAdd);

                

            });
           
            
        }
    }
}



