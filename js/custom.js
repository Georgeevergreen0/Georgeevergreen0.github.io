(function ($) {

  "use strict";

  //PRE LOADER
  $(window).load(function () {
    $('.preloader').fadeOut(1000); // set duration in brackets
  });

  // HOME SLIDER & COURSES & CLIENTS
  $('.home-slider').owlCarousel({
    animateOut: 'fadeOut',
    items: 1,
    loop: true,
    dots: false,
    autoplay: true,
    autoplayTimeout: 5000,
    autoplayHoverPause: false,
    smartSpeed: 1000,
  })

  $('.owl-courses').owlCarousel({
    animateOut: 'fadeOut',
    loop: true,
    autoplayHoverPause: false,
    autoplay: true,
    autoplayTimeout: 2000,
    smartSpeed: 1000,
    dots: false,
    nav: true,
    navText: [
      '<i class="fa fa-angle-left"></i>',
      '<i class="fa fa-angle-right"></i>'
    ],
    responsiveClass: true,
    responsive: {
      0: {
        items: 1,
      },
      1000: {
        items: 3,
      }
    }
  });

  $('.owl-client').owlCarousel({
    animateOut: 'fadeOut',
    loop: true,
    autoplay: true,
    autoplayTimeout: 2000,
    autoplayHoverPause: false,
    smartSpeed: 1000,
    responsiveClass: true,
    responsive: {
      0: {
        items: 1,
      },
      1000: {
        items: 2,
      }
    }
  });

  //smootscroll
  $(function () {
    $('#home a').on('click', function (event) {
      var $anchor = $(this);
      $('html, body').stop().animate({
        scrollTop: $($anchor.attr('href')).offset().top - 49
      }, 1500);
      event.preventDefault();
    });
  });


})(jQuery);

//scrollReveal
ScrollReveal().reveal("#feature");
ScrollReveal().reveal(".feature-thumb");
ScrollReveal().reveal("#about");
ScrollReveal().reveal("#team");
ScrollReveal().reveal(".skill-flex > div");
ScrollReveal().reveal("#courses");
ScrollReveal().reveal("#testimonial");
ScrollReveal().reveal("#contact");
ScrollReveal().reveal("#footer");

//navbar  overlay
function openNav(e) {
  document.querySelector(".overlay-nav").style.width = "70%";
  document.querySelector(".back-drop").style.display = "block";
}
function closeNav(e) {
  event.preventDefault();
  document.querySelector(".overlay-nav").style.width = "0";
  document.querySelector(".back-drop").style.display = "none";

}

//navbar background change on scroll and active anchor tag
const navSideBar = document.getElementsByClassName("costume-navbar");
const href = document.querySelectorAll(".costume-navbar-content a");



window.onscroll = function () {
  const scrollPosition = window.pageYOffset || document.body.scrollTop || window.scrollY;
  const height = window.innerHeight || document.documentElement.clientHeight;

  if (scrollPosition > (height * 0.3)) {
    navSideBar[0].style.backgroundColor = "blue";

  } else {
    navSideBar[0].style.backgroundColor = "transparent";
  }

  href.forEach(link => {
    let section = document.querySelector(link.hash);

    if (section.offsetTop - 50 <= scrollPosition && section.offsetTop + section.offsetHeight - 50 > scrollPosition) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");

    }
  });

}
