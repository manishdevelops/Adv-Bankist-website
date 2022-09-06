'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault;
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};


btnsOpenModal.forEach(function(btn){
  btn.addEventListener('click',openModal);
})

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) { 
    closeModal();
  }
});


//smooth scroll
const btnScroll=document.querySelector('.btn--scroll-to');
const section1=document.querySelector('#section--1');
btnScroll.addEventListener('click',function(){
  section1.scrollIntoView(
    {
      behavior:'smooth'
    }
  );
});

// page naigation
document.querySelector('.nav__links').addEventListener('click',function(e){
  e.preventDefault();
  //matching strategy
  if(e.target.classList.contains('nav__link')){
    const id=e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({behavior:'smooth'});
  };
});


//tabbed component
const tabs=document.querySelectorAll('.operations__tab');
const tabsContainer=document.querySelector('.operations__tab-container');
const tabsContent=document.querySelectorAll('.operations__content');

tabsContainer.addEventListener('click',function(e){
  const clicked=e.target.closest('.operations__tab');
  if(!clicked){
    return;
  }
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  clicked.classList.add('operations__tab--active');

  //content
  tabsContent.forEach(c =>c.classList.remove('operations__content--active'));
  
  document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active');

});

//Menu fade navigation
const nav=document.querySelector('.nav');
const Handleover=function(e){
  if(e.target.classList.contains('nav__link')){
    const link=e.target;
    const siblings=link.closest('.nav').querySelectorAll('.nav__link');
    const logo=link.closest('.nav').querySelector('img');
    siblings.forEach(el => {
      if(el !== link){
        el.style.opacity=this;
      }
    });
    logo.style.opacity=this;
  }
};
nav.addEventListener('mouseover',Handleover.bind(0.5));
nav.addEventListener('mouseout',Handleover.bind(1));


// nav.addEventListener('mouseover',function(e){
//   Handleover(e,0.5);
//  });
 
//  nav.addEventListener('mouseout',function(e){
//    Handleover(e,1);
//  });
 

//sticky navigation
const header=document.querySelector('.header');
const stickyNav=function(entries){
  const [entry]=entries;
  // console.log(entry);
  if(!entry.isIntersecting){
    nav.classList.add('sticky');
  }else{
    nav.classList.remove('sticky');
  }
};

const headerObserver=new IntersectionObserver(stickyNav,{
  root:null,
  threshold:0,
  rootMargin:'-90px',
});

headerObserver.observe(header);

//reveal sections
const allSections=document.querySelectorAll('.section');

const revealSection=function(entries,observer){
  const[entry]=entries;
  console.log(entry);
  if(!entry.isIntersecting)return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionOserver=new IntersectionObserver(
  revealSection,{
    root:null,
    threshold:0.15,
  }
);

allSections.forEach(function(section){
  sectionOserver.observe(section);
  section.classList.add('section--hidden');
});
