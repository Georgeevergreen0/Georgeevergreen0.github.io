const FILE_TO_CACHE = [
    "/",
    "/manifest.json",
    "/pictures/landing.webp",
    "/pictures/landing-2.webp",
    "/pictures/landing-3.webp",
    "/pictures/portfolio-school.webp",
    "/pictures/portfolio-gym.webp",
    "/pictures/portfolio-burger.webp",
    "/pictures/portfolio-evergreen.webp",
    "/pictures/about-mongodb.webp",
    "/pictures/about-html5.webp",
    "/pictures/about-react.webp",
    "/pictures/about-node.webp",
    "/pictures/about-css3.webp",
    "/pictures/about-javascript.webp",
    "/pictures/web-design.webp",
    "/pictures/creative.webp",
    "/pictures/coding.webp",
    "/pictures/javascript.webp",
    "/pictures/img-01.png",
    "/pictures/evergreen.png",
    "/pictures/evergreen-small.png",
    "/pictures/evergreen-big.png",
    "/css/custom.css",
    "/js/custom.js",
    "/js/smoothscroll.js",
    "https://fonts.gstatic.com/s/nunito/v12/XRXV3I6Li01BKofINeaBTMnFcQ.woff2",
    "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/webfonts/fa-brands-400.woff2",
    "https://fonts.googleapis.com/css?family=Muli:300,700|Nunito",
    "https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/assets/owl.theme.default.min.css",
    "https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/assets/owl.carousel.min.css",
    "https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/owl.carousel.min.js",
    "https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js",
    "https://unpkg.com/scrollreveal@4.0.0/dist/scrollreveal.min.js",
    "https://fonts.googleapis.com/css?family=Pacifico&display=swap",
]

const CATCH_NAME = "catchVersion-2"


self.addEventListener("install", function (e) {
    e.waitUntil(
        caches.open(CATCH_NAME).then((cache) => {
            return cache.addAll(FILE_TO_CACHE)
        })
    )
})


self.addEventListener("activate", function (e) {
    e.waitUntil(
        caches.keys().then((keyList) => {
            return Promise.all(keyList.map((key) => {
                if (key !== CATCH_NAME) {
                    return caches.delete(key)
                }
            }))
        })
    )
})



self.addEventListener("fetch", function (e) {
    e.respondWith(
        caches.open(CATCH_NAME).then((cache) => {
            return cache.match(e.request).then((response) => {
                if (response) {
                    return response
                }
                return fetch(e.request).then((networkResponse) => {
                    cache.put(e.request.url, networkResponse.clone());
                    return networkResponse;
                })
            }).catch(err => {
                console.log(err)
            })
        })
    )


})