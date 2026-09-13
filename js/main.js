$(document).ready(function () {

  // Hero bg mosaic
  var SETS = [1,2,3];
  var TILE_COUNT = 40;
  var IMAGES_PER_SET = 24;

  // ============================
  // НАСТРОЙКИ
  // ============================

  // Средняя скорость анимации в секундах
  // Больше число = медленнее
  var ANIMATION_SPEED = 12;


  // ============================
  // ОСНОВНОЙ КОД
  // ============================

  var last = parseInt(localStorage.getItem('aep_hero_set') || '0', 10);
  var idx = SETS.indexOf(last);
  var nextSet = SETS[(idx + 1) % SETS.length];

  localStorage.setItem('aep_hero_set', nextSet);

  var mosaic = document.getElementById('mosaic');
  var frag = document.createDocumentFragment();

  for (var i = 0; i < TILE_COUNT; i++){
    var tile = document.createElement('div');

    tile.className = 'tile';

    var imgNum = (i % IMAGES_PER_SET) + 1;

    var url = 'heropict/' + nextSet + '/' + imgNum + '.jpg';

    tile.style.backgroundImage = 'url(' + url + ')';

    // Случайное начало анимации
    tile.style.animationDelay =
      (Math.random() * 5).toFixed(2) + 's';

    // Случайная скорость вокруг заданной
    tile.style.animationDuration =
      (ANIMATION_SPEED + Math.random() * 8 - 4).toFixed(2) + 's';

    frag.appendChild(tile);
  }

  mosaic.appendChild(frag);





  // Count
  $('.count').each(function () {

    var count = $(this);

    var date = count.attr('data-date');

    if (!date) return;

    // Точная дата окончания из data-date
    var target = new Date(date);

    var items = count.find('.count__item');

    if (items.length < 4) return;

    var days = items.eq(0).find('span').eq(0);
    var daysText = items.eq(0).find('span').eq(1);

    var hours = items.eq(1).find('span').eq(0);
    var hoursText = items.eq(1).find('span').eq(1);

    var minutes = items.eq(2).find('span').eq(0);
    var minutesText = items.eq(2).find('span').eq(1);

    var seconds = items.eq(3).find('span').eq(0);
    var secondsText = items.eq(3).find('span').eq(1);


    // Склонение
    function getWord(number, one, few, many) {

      var n = number % 100;

      if (n >= 11 && n <= 19) {
        return many;
      }

      switch (number % 10) {

        case 1:
          return one;

        case 2:
        case 3:
        case 4:
          return few;

        default:
          return many;
      }
    }


    function updateCountdown() {

      var difference = target - new Date();

      if (difference <= 0) {

        days.text('0');
        hours.text('00');
        minutes.text('00');
        seconds.text('00');

        daysText.text('дней');
        hoursText.text('часов');
        minutesText.text('минут');
        secondsText.text('секунд');

        clearInterval(timer);

        return;
      }


      var totalSeconds = Math.floor(difference / 1000);

      var d = Math.floor(totalSeconds / 86400);

      var h = Math.floor(
        (totalSeconds % 86400) / 3600
      );

      var m = Math.floor(
        (totalSeconds % 3600) / 60
      );

      var s = totalSeconds % 60;


      days.text(d);
      hours.text(String(h).padStart(2, '0'));
      minutes.text(String(m).padStart(2, '0'));
      seconds.text(String(s).padStart(2, '0'));


      daysText.text(
        getWord(d, 'день', 'дня', 'дней')
      );

      hoursText.text(
        getWord(h, 'час', 'часа', 'часов')
      );

      minutesText.text(
        getWord(m, 'минута', 'минуты', 'минут')
      );

      secondsText.text(
        getWord(s, 'секунда', 'секунды', 'секунд')
      );
    }


    var timer;

    updateCountdown();

    timer = setInterval(updateCountdown, 1000);

  });

  // Scroll speed
  $('.anchor-link').on('click','a', function (event) {
    event.preventDefault();
    var id  = $(this).attr('href'),
      top = $(id).offset().top;
      $('body,html').animate({scrollTop: top}, 800);
  });

  // Show menu mobail
  // $('.navbar-toggle').click(function () {
  //   $(this).toggleClass('active');
  //   $('.nav').toggleClass('open');
  // });

  // Header add class
  // $(window).scroll(function() { 
  //   var top = $(document).scrollTop();
  //   if (top > 0) {
  //     $('.header').addClass('scroll-page');
  //   }
  //   else {
  //     $('.header').removeClass('scroll-page');
  //   }
  // });

  // Hidden nav
  // $(document).click(function(event) {
  //   if ($(event.target).closest('.navbar-toggle').length 
  //     || $(event.target).closest('.nav').length ) return;
  //     $('.nav').removeClass('open');
  //     $('.navbar-toggle').removeClass('active');
  //     event.stopPropagation();
  // });

  // Maskedinput
  // $(function($){
  //   $('.phone-mask').mask(('+7 ') + '(999) 999-99-99');
  // });

  // Accardion
  // var accordion = function() {
  //   var data = $('.accordion').attr('data-accordion')
  //   $('.accordion-header').on('click', function(){
  //     $(this).next('.accordion-body').not(':animated').slideToggle()
  //   })
  //   $('.accordion-header').click(function () {
  //     $(this).parent('.accordion li').toggleClass('active');
  //   });
  // }
  // accordion();

  // About
  var swiper = new Swiper(".about__sl", {
    spaceBetween: 40,
    slidesPerView: 3,
    slideToClickedSlide: true,
    watchSlidesProgress: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    breakpoints: {
      370: {
        slidesPerView: 3,
      },
      992: {
        slidesPerView: 3,
      },
      1200: {
        allowTouchMove: false
      },
    },
  });

  // Juri
  var swiper = new Swiper(".jury__sl", {
    spaceBetween: 36,
    slidesPerView: 'auto',
    slideToClickedSlide: true,
    watchSlidesProgress: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    breakpoints: {
      370: {
        // slidesPerView: 3,
      },
      992: {
        // slidesPerView: 3,
      },
      1200: {
        // allowTouchMove: false
      },
    },
  });

  // Team
  var swiper = new Swiper(".team__sl", {
    spaceBetween: 28,
    slidesPerView: 'auto',
    slideToClickedSlide: true,
    watchSlidesProgress: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    breakpoints: {
      370: {
        // slidesPerView: 3,
      },
      992: {
        // slidesPerView: 3,
      },
      1200: {
        
      },
    },
  });

});