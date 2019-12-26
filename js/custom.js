//navbar background change on scroll and active anchor tag
const navSideBar = document.getElementsByClassName("costume-navbar");
const href = document.querySelectorAll(".costume-navbar-content a");
const scrollPosition = window.pageYOffset || document.body.scrollTop || window.scrollY;
const height = window.innerHeight || document.documentElement.clientHeight;
let deferredPrompt;

//submission
let form = document.getElementById("contact-form");
let button = document.getElementById("submit-button");
let statusMessage = document.getElementById("my-form-status");

//PWA add to home screen
let pwa = document.querySelector(".pwa");
let pwaAdd = document.querySelector(".pwa-add");
let pwaRemove = document.querySelector(".pwa-remove");




(function ($) {

  "use strict";
  //PRE LOADER
  $(window).load(function () {
    $('.preloader').fadeOut(1000); // set duration in brackets
  });

  // SLIDER
  $('.home-slider').owlCarousel({
    animateOut: 'fadeOut',
    items: 1,
    loop: true,
    dots: false,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: false,
    smartSpeed: 1000,
  })

  $('.owl-portfolio').owlCarousel({
    animateOut: 'fadeOut',
    loop: true,
    autoplayHoverPause: true,
    autoplay: true,
    autoplayTimeout: 2000,
    smartSpeed: 1000,
    dots: true,
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

  //scrollReveal
  ScrollReveal().reveal("#about");
  ScrollReveal().reveal("#skills");
  ScrollReveal().reveal(".skill-flex>div");
  ScrollReveal().reveal("#portfolio");
  ScrollReveal().reveal("#contact");
  ScrollReveal().reveal("#footer");


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


  function success() {
    form.reset();
    button.style.display = "none";
    statusMessage.textContent = "Message Sent, Thanks";
  }

  function error(e) {
    button.value = "Retry"
    statusMessage.textContent = "Oops! There was a Problem Sending Your Message"
  }

  function ajax(method, url, data, success, error) {
    var xhr = new XMLHttpRequest();
    xhr.addEventListener("load", success)
    xhr.addEventListener("error", error)
    xhr.addEventListener("timeout", function () {
      button.value = "Retry"
      statusMessage.textContent = "Oops! Time out check your networks!!!"
    })

    xhr.upload.addEventListener("progress", function (e) {
      if (e.lengthComputable) {
        button.value = `Sending ${(e.loaded / e.total) * 100}%`
      } else {
        button.value = "Sending...";
      }
    })
    xhr.upload.addEventListener("error", error)

    xhr.open(method, url);
    xhr.setRequestHeader("accept", "application/json");
    xhr.timeout = 10000;
    xhr.send(data)
  }


  form.addEventListener("submit", function (event) {
    event.preventDefault();
    button.value = "sending...";
    statusMessage.textContent = "";
    var data = new FormData(form);
    ajax(form.method, form.action, data, success, error)
  })


  // PWA
  if ("serviceWorker" in navigator) {
    console.log("will the service worker register")
    navigator.serviceWorker.register("/service-worker.js")
      .then((reg) => {
        console.log("Registered service worker")
      }).catch((err) => {
        console.log(" Error occured while registering service worker")
      })
  }

  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault()
    deferredPrompt = e;
    pwa.classList.add("showing");
    pwa.classList.remove("hide");

    pwaAdd.addEventListener("click", () => {
      deferredPrompt.prompt()
      pwa.classList.add("hide");
      pwa.classList.remove("showing");

      deferredPrompt.userChoice.then((result) => {
        if (result.outcome === "accepted") {
          deferredPrompt = null;
        } else {
          deferredPrompt = null;
        }
      })
    })

    pwaRemove.addEventListener("click", () => {
      pwa.classList.add("hide");
      pwa.classList.remove("showing");
    })


  })



})(jQuery);


//navbar  overlay
function openNav() {
  document.querySelector(".overlay-nav").style.width = "70%";
  document.querySelector(".back-drop").style.display = "block";
}

function closeNav(e) {
  event.preventDefault();
  document.querySelector(".overlay-nav").style.width = "0";
  document.querySelector(".back-drop").style.display = "none";
}

!function () {
  if (scrollPosition > (height * 0.3)) {
    navSideBar[0].style.backgroundColor = "blue";

  } else {
    navSideBar[0].style.backgroundColor = "transparent";
  }
}();
