function fetchWeatherData(){return new Promise(e=>{setTimeout(()=>{console.log("Weather data fetched"),e()},1e3)})}document.getElementById("loadingAnimation").style.display="block",fetchWeatherData().then(()=>{document.getElementById("loadingAnimation").style.display="none"}),document.addEventListener("DOMContentLoaded",function(){window.addEventListener("scroll",function(){var e=document.querySelector("nav.navbar");window.pageYOffset>0?e.classList.add("scrolled"):e.classList.remove("scrolled")}),new SimpleLightbox(".simple-lightbox"),"undefined"!=typeof Swiper?new Swiper(".swiper-container",{spaceBetween:30,navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"},breakpoints:{640:{slidesPerView:3,spaceBetween:20},768:{slidesPerView:3,spaceBetween:40},1024:{slidesPerView:5,spaceBetween:50}}}):console.error("Swiper is not defined. Ensure the Swiper script is loaded."),"undefined"!=typeof Swiper?new Swiper(".swiper-container2",{spaceBetween:30,navigation:{nextEl:".swiper-container2 .swiper-button-next",prevEl:".swiper-container2 .swiper-button-prev"},breakpoints:{640:{slidesPerView:1,spaceBetween:20},768:{slidesPerView:1,spaceBetween:40},1024:{slidesPerView:1,spaceBetween:50}}}):console.error("Swiper is not defined. Ensure the Swiper script is loaded.");let e=document.querySelectorAll("#forecastTabs a");e.forEach(function(t){t.addEventListener("click",function(t){t.preventDefault(),e.forEach(function(e){e.classList.remove("active")}),this.classList.add("active");let n=this.getAttribute("href").substring(1),i=document.querySelectorAll(".tab-pane");i.forEach(function(e){e.classList.remove("active")}),document.getElementById(n).classList.add("active")})});let t=document.getElementById("scrollToTop");window.addEventListener("scroll",function(){window.scrollY>300?t.classList.remove("d-none"):t.classList.add("d-none")}),t.addEventListener("click",function(){window.scrollTo({top:0,behavior:"smooth"})});let n=document.getElementById("contactForm");n.addEventListener("submit",function(e){e.preventDefault();let t=document.getElementById("name").value,i=document.getElementById("email").value,s=document.getElementById("message").value;t&&i&&s?(alert("Thank you for contacting us. We will get back to you soon."),n.reset()):alert("Please fill in all fields.")});let i=document.getElementById("newsletterForm");i.addEventListener("submit",function(e){e.preventDefault();let t=document.getElementById("email").value;console.log("Subscribed with email:",t),i.reset()})});
