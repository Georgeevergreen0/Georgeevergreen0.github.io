const FILE_TO_CACHE = [
    "/",
    "/manifest.json",
    "/pictures/portfolio-school.png",
    "/pictures/portfolio-gym.png",
    "/pictures/portfolio-burger.png",
    "/pictures/landing.jpg",
    "/pictures/landing-2.jpg",
    "/pictures/portfolio-evergreen.png",
    "/pictures/landing-3.jpg",
    "/pictures/web-design.jpg",
    "/pictures/creative.jpg",
    "/pictures/img-01.png",
    "/pictures/coding.jpg",
    "/pictures/evergreen.png",
    "/pictures/javascript.jpg",
    "/pictures/about-mongodb.jpg",
    "/pictures/about-html5.jpg",
    "/pictures/about-react.jpg",
    "/pictures/about-node.jpg",
    "/pictures/about-css3.png",
    "/pictures/about-javascript.jpg",
    "http://127.0.0.1:3000/pictures/evergreen-small.png",
    "/css/custom.css",
    "/js/custom.js",
    "/js/smoothscroll.js",
    "https://fonts.googleapis.com/css?family=Muli:300,700|Nunito",
    "https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/assets/owl.theme.default.min.css",
    "https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/assets/owl.carousel.min.css",
    "https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/owl.carousel.min.js",
    "https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js",
    "https://unpkg.com/scrollreveal@4.0.0/dist/scrollreveal.min.js",
    "https://fonts.googleapis.com/css?family=Pacifico&display=swap",
]

const CATCH_NAME = "catchVersion-0"


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
                    cache.put(e.request, networkResponse.clone());
                    return networkResponse;
                })
            }).catch(err => {
                console.log(err)
            })
        })
    )


})