window.addEventListener('DOMContentLoaded', () => {
  const cartBtn = document.querySelector('#cartBtn'),
        cart = document.querySelector('#cart'),
        minusBtn = document.querySelector('.minus'),
        plusBtn = document.querySelector('.plus'),
        counter = document.querySelector('.counter__count'),
        toCartBtn = document.querySelector('.to-cart'),
        cartProductWrapper = document.querySelector('.cart-product__flex');
        linkActive = document.querySelectorAll('.nav__list-item a'),
        cartCounter = document.querySelector('#cart-counter');
  let count = 1;

// Переменные и функционал для бургер меню
const burgerBtn = document.querySelector('.burger'),
      navList = document.querySelector('.nav__list'),
      bodyHTML = document.body,
      navLink = document.querySelectorAll('.nav__list-item a');

burgerBtn.addEventListener('click', () => {
    navList.classList.toggle('menu--visible');
    burgerBtn.classList.toggle('burger--close');
    bodyHTML.classList.toggle('burger-menu-open');
});

navLink.forEach(link => {
    link.addEventListener('click', () => {
        navList.classList.remove('menu--visible');
        burgerBtn.classList.remove('burger--close');
        bodyHTML.classList.remove('burger-menu-open');
    });
});

  // Переменные для modal Swiper
  const slides = document.querySelectorAll('.swiper-wrapper'),
        modal = document.querySelector('.modal'),
        closeBtnModal = document.querySelector('.close-slider');
        

  // активация modal swiper по нажатию на большую картинку
  slides.forEach(slide => {
    slide.addEventListener('click', () => {
      if (slide.closest('.mySwiper2')){
        openModal();
      }
    });
  });


  closeBtnModal.addEventListener('click', () => {
    closeModal();
  });


  function openModal(){
    modal.style.display = 'flex';
    modal.classList.add('animate__animated', 'animate__fadeIn');
    // Удаление классов animate__animated и animate__fadeIn после их применения
    setTimeout(function() {
      modal.classList.remove('animate__animated', 'animate__fadeIn');
    }, 1000);
  }
  
  function closeModal(){
    modal.classList.add('animate__animated', 'animate__fadeOut');
    // Удаление классов animate__animated и animate__fadeOut после их применения
    setTimeout(function() {
      modal.style.display = "none";
      modal.classList.remove('animate__animated', 'animate__fadeOut');
    }, 1000);
  }



  // Функционал по работе с корзиной товаров
  function showCartContent() {
    const cartProduct = cartProductWrapper.querySelector('.cart-product__title div'),
          empty = document.querySelector('.empty-cart'),
          checkoutWrapper = document.querySelector('.checkout__wrapper');

    if (cartProduct && cartProduct.textContent.includes('Fall Limited Edition Sneaker')) {
      // если товар есть в корзине, то скрываем текст "Нет товара"
      empty.style.display = 'none';
      checkoutWrapper.style.display = 'block';
    } else {
      // если товара нет в корзине, то показываем текст "Нет товара"
      empty.style.display = 'block';
      checkoutWrapper.style.display = 'none';
    }
  }

  showCartContent();


  cartBtn.addEventListener('click', () => {
    openCart();
  });


  document.addEventListener('click', (e) => {
    const target = e.target;
    // проверяем, был ли клик выполнен внутри элемента cart
    if (!target.closest('#cart') && !target.closest('#cartBtn')) {
      closeCart();
    }
  });

  minusBtn.addEventListener('click', () => {
    decrement();
  });

  plusBtn.addEventListener('click', () => {
    increment();
  });

  toCartBtn.addEventListener('click', () => {
    addProductToCart();
    showCartContent();
  });


  // Добавляем активный класс для ссылок в навигации
    linkActive.forEach(link => {
      link.addEventListener('click', () => {
        linkActive.forEach(a => {
          a.classList.remove('active');
        });
        link.classList.add('active');
      });
    });



  function openCart(){
    cart.classList.toggle('open');
    cart.classList.add('animate__animated', 'animate__fadeIn');
    setTimeout(function() {
      cart.classList.remove('animate__animated', 'animate__fadeIn');
    }, 1000);
  }

  function closeCart(){
    cart.classList.remove('open');
  }


  function decrement(){
    count--;
    if (count < 1){
      count = 1;
      counter.textContent = count;
    } else {
      counter.textContent = count;
    }
  }

  function increment(){
    count++;
    counter.textContent = count;
  }


  function calcSumProducts(){
    const currentPrice = document.querySelector('.price__current');

    let current = parseFloat(currentPrice.textContent.slice(1)),
        total = current * count;
    return {total, current};
  }

  function checkProductCount(){
    cartCounter.classList.add('active');

    const cartProduct = cartProductWrapper.querySelector('.cart-product__title div');
    if (cartProduct && cartProduct.textContent.includes('Fall Limited Edition Sneaker')) {
      cartCounter.textContent = count;
      return;
    } else {
      cartCounter.textContent = count++;
    }
  }

  function deleteProductCart(){
    const deleteBtn = document.querySelector('#delete'),
          cartProduct = cartProductWrapper.querySelector('.cart-product__title div');
    deleteBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (cartProduct) {
        cartProductWrapper.innerHTML = '';
        cartCounter.classList.remove('active');
        cartCounter.textContent = '';
      }
      showCartContent();
    });
  }



  function addProductToCart(){
    cartProductWrapper.innerHTML = `
      <div class="cart-product__img">
        <img src="./images/image-product-1-thumbnail.jpg" alt="Product Name">
      </div>
      <div class="cart-product__title">
        <div>Fall Limited Edition Sneaker</div>
        <p><span id="current-price"></span> x <span id="quantity">${count}</span><span id="total-price"></span></p>
      </div >
      <button class="cart-product__delete" id="delete">
        <img src="./images/icon-delete.svg" alt="delete product">
      </button>
    `;

    const {total, current} = calcSumProducts();
    const totalPrice = document.querySelector('#total-price');
    totalPrice.textContent = '$' + total;

    const currentPrice = document.querySelector('#current-price');
    currentPrice.textContent = '$' + current;

    count = 1;
    counter.textContent = count;

    // Добавляем активный класс и условие показывающие сколько элементов находится при добавлении товара в корзину
    checkProductCount();
    // Удаляем товар из корзины
    deleteProductCart();
  }

  // Настройка слайдера lightbox
  let swiper = new Swiper(".mySwiper", {
      loop: true,
      spaceBetween: 20,
      slidesPerView: 4,
      freeMode: true,
      watchSlidesProgress: true,
    });
    let swiper2 = new Swiper(".mySwiper2", {
      loop: true,
      spaceBetween: 10,
      navigation: {},
      thumbs: {
        swiper: swiper,
      },
    });



    // Настройка слайдера lightbox-modal
  let swiperr = new Swiper(".mySwiperr", {
      loop: true,
      spaceBetween: 20,
      slidesPerView: 4,
      freeMode: true,
      watchSlidesProgress: true,
    });
    let swiperr2 = new Swiper(".mySwiperr2", {
      loop: true,
      spaceBetween: 10,
      navigation: {
        nextEl: ".swiper-button__next",
        prevEl: ".swiper-button__prev",
      },
      thumbs: {
        swiper: swiperr,
      },
    });


    // Настройка слайдера slider-mobile
    let swiperMobile = new Swiper(".mySwiper2mobile", {
      loop: true,
      spaceBetween: 10,
      navigation: {
        nextEl: ".swiper-button__next",
        prevEl: ".swiper-button__prev",
      },
    });

});