const circleShine = new MagicCanvas('.date_1_canvas');
circleShine.appendDraw(1, "mousemove","click");


function addNavigation(){
    const sectionsNumber=[...document.querySelectorAll('section')].length+1;

    for(let i=1;i<sectionsNumber;i++){
       new Navigation(`.date_${i}_btn`,`#date_${i}_div`,'click');
    }

}

addNavigation();

const slides=[
    new Slide("TYTUŁ / ZDJĘCIE 1","itatibus, veritatis culpa deserunt dignissimos adipisci quaerat quae aperiam harum quisquam minus inventore, ducimus laudantium suscipit modi. Lorem ipsum dolor sit amet consectetur adi"),
    new Slide('TYTUŁ / ZDJĘCIE 2','At amet ipsam veritatis optio deleniti, consequuntur dicta fugiat cumque nobis iure aspernatur adipisci iste inventore et aliquid, laborum harum voluptatem reiciendis!'),
    new Slide('TYTUŁ / ZDJĘCIE 3','dignissimos adipisci quaerat quae aperiam harum quisquam minus inventore, ducimus laudantium suscipit modi. Lorem ipsum dolor sit amet consectetur adi')
];

const slider_date_1=new Slider('.block h1','.text p',".arrowNext",slides);
slider_date_1.changeSlide('animate-slide');

const slider_date_2= new Slider('.text_contener b','.text_contener p','.square',slides);
slider_date_2.changeSlide2('squareOn');


//PASEK DAT:

document.addEventListener('DOMContentLoaded', function() {
    let sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav_date a');
    const navDate=document.querySelector('.nav_date');

    function updateActiveLink() {
        let index = sections.length;

        while (--index && window.scrollY + 50 < sections[index].offsetTop) {}

        navLinks.forEach((link) => link.classList.remove('active_date'));
        if(index===0){
            navDate.style.opacity="0";
        }

        if (index > 0) {
            navDate.style.opacity="1";
            navLinks[index].classList.add('active_date');
        }
    }

    navLinks.forEach(link => {
        link.parentNode.addEventListener('click', (e) => {
            e.preventDefault();

            const targetId = link.getAttribute('href')
            console.log(targetId)
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    window.addEventListener('scroll', updateActiveLink);

});