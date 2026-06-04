/**
 * Tish Cricket Club HTML Template
 * JavaScript Main File
 * Version 1.0
 * Copyright 2025
 */

(function($) {
    'use strict';

    /**
     * Loading Animation
     */
    document.getElementById("loadingAnimation").style.display = "block";

    /**
     * Simulate Data Fetching
     */
    function fetchData() {
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log("Cricket template data loaded");
                resolve();
            }, 1000);
        });
    }

    /**
     * Initialize on Document Ready
     */
    $(document).ready(function() {

        // Fetch data and hide loading animation
        fetchData().then(() => {
            $("#loadingAnimation").fadeOut(500);
        });

        /**
         * Sticky Header on Scroll
         */
        const header = document.getElementById('header-sticky');
        if (header) {
            window.addEventListener('scroll', function() {
                if (window.pageYOffset > 100) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
            });
        }

        /**
         * Smooth Scrolling for Anchor Links
         */
        $('a[href*="#"]').not('[href="#"]').not('[href="#0"]').click(function(event) {
            if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') &&
                location.hostname == this.hostname) {
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                if (target.length) {
                    event.preventDefault();

                    // Close mobile menu if it's open
                    if ($(window).width() < 992) {
                        $('.mainmenu').removeClass('active');
                        $('.mobile-menu-toggle').removeClass('active');
                    }

                    $('html, body').animate({
                        scrollTop: target.offset().top - 80
                    }, 800, function() {
                        var $target = $(target);
                        $target.focus();
                        if ($target.is(":focus")) {
                            return false;
                        } else {
                            $target.attr('tabindex','-1');
                            $target.focus();
                        }
                    });
                }
            }
        });

        /**
         * Navbar Active State on Scroll
         */
        const sections = document.querySelectorAll('section[id], div[id]');
        const navLinks = document.querySelectorAll('.mainmenu a');

        window.addEventListener('scroll', () => {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (pageYOffset >= (sectionTop - 150)) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').includes(current)) {
                    link.classList.add('active');
                }
            });
        });

        /**
         * Mobile Menu Toggle
         */
        $('.mobile-menu-toggle').on('click', function() {
            $('.mainmenu').toggleClass('active');
            $(this).toggleClass('active');
        });

        /**
         * Dropdown Menu on Hover/Click
         */
        // Desktop hover behavior
        if ($(window).width() >= 992) {
            $('.mainmenu ul li').hover(
                function() {
                    $(this).children('.sub-menu').stop(true, true).slideDown(200);
                },
                function() {
                    $(this).children('.sub-menu').stop(true, true).slideUp(200);
                }
            );
        }

        // Mobile touch support for dropdown
        $('.mainmenu ul li > a').on('click', function(e) {
            if ($(window).width() < 992) {
                // Only prevent default if this item has a submenu AND it's a parent menu item
                if ($(this).next('.sub-menu').length > 0 && !$(this).parent().parent().hasClass('sub-menu')) {
                    e.preventDefault();
                    e.stopPropagation();
                    $(this).next('.sub-menu').toggleClass('active');
                }
                // For regular links and submenu items, let the smooth scroll handler take over
            }
        });

        // Ensure submenu items also close the menu on mobile
        $('.mainmenu .sub-menu a').on('click', function() {
            if ($(window).width() < 992) {
                setTimeout(function() {
                    $('.mainmenu').removeClass('active');
                    $('.mobile-menu-toggle').removeClass('active');
                }, 100);
            }
        });

        /**
         * Scroll to Top Button
         */
        const scrollTopBtn = $('<div class="scroll-to-top"><i class="fa fa-chevron-up"></i></div>');
        $('body').append(scrollTopBtn);

        $(window).scroll(function() {
            if ($(this).scrollTop() > 300) {
                scrollTopBtn.fadeIn();
            } else {
                scrollTopBtn.fadeOut();
            }
        });

        scrollTopBtn.click(function() {
            $('html, body').animate({scrollTop: 0}, 800);
            return false;
        });

        /**
         * Form Validation
         */
        $('.newsletter-form').on('submit', function(e) {
            e.preventDefault();
            const email = $(this).find('input[type="email"]').val();

            if (validateEmail(email)) {
                alert('Thank you for subscribing to our Cricket Club!');
                $(this).find('input[type="email"]').val('');
            } else {
                alert('Please enter a valid email address.');
            }
        });

        /**
         * Email Validation Function
         */
        function validateEmail(email) {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(email);
        }

        /**
         * Counter Animation for Stats
         */
        const counters = document.querySelectorAll('.stats-badge h3');
        const speed = 200;

        const runCounter = (counter) => {
            const target = +counter.innerText.replace(/\D/g, '');
            const count = +counter.getAttribute('data-count') || 0;
            const inc = target / speed;

            if (count < target) {
                counter.setAttribute('data-count', Math.ceil(count + inc));
                counter.innerText = Math.ceil(count + inc) + '+';
                setTimeout(() => runCounter(counter), 1);
            } else {
                counter.innerText = target + '+';
            }
        };

        // Intersection Observer for counter animation
        const counterObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    runCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(counter => {
            counterObserver.observe(counter);
        });

        /**
         * Animate on Scroll (AOS-like functionality)
         */
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Elements to animate
        const animateElements = document.querySelectorAll(
            '.team-card, .feature-card, .blog-card, .process-step, .about-images, .stats-images'
        );

        animateElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });

        /**
         * Lazy Loading Images
         */
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    observer.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });

        /**
         * Team Card Hover Effects
         */
        $('.team-card').hover(
            function() {
                $(this).find('.team-info').css('background-color', 'var(--accent-green-hover)');
            },
            function() {
                $(this).find('.team-info').css('background-color', 'var(--accent-green)');
            }
        );

        /**
         * Blog Card Read More
         */
        $('.blog-card').on('click', function() {
            // Add your blog detail page navigation here
            console.log('Blog card clicked');
        });

        /**
         * Parallax Effect for Hero Section
         */
        $(window).scroll(function() {
            const scrolled = $(this).scrollTop();
            $('.hero-background').css('transform', 'translateY(' + (scrolled * 0.5) + 'px)');
            $('.join-background').css('transform', 'translateY(' + (scrolled * 0.3) + 'px)');
        });

        /**
         * Feature Card Icon Animation
         */
        $('.feature-card').hover(
            function() {
                $(this).find('.feature-icon').css('transform', 'scale(1.1) rotate(5deg)');
            },
            function() {
                $(this).find('.feature-icon').css('transform', 'scale(1) rotate(0deg)');
            }
        );

        /**
         * Process Step Animation on Hover
         */
        $('.process-step').hover(
            function() {
                $(this).find('.step-number').css({
                    'transform': 'scale(1.1)',
                    'box-shadow': '0 5px 20px rgba(127, 182, 133, 0.5)'
                });
            },
            function() {
                $(this).find('.step-number').css({
                    'transform': 'scale(1)',
                    'box-shadow': 'none'
                });
            }
        );

        /**
         * Add Active Class to Current Page
         */
        const currentLocation = window.location.href;
        const menuItems = document.querySelectorAll('.mainmenu a, .footer-links a');

        menuItems.forEach(item => {
            if(item.href === currentLocation) {
                item.classList.add('active');
            }
        });

        /**
         * Testimonial Rating Stars Animation
         */
        const stars = document.querySelectorAll('.testimonial-rating i.fa-star');
        stars.forEach((star, index) => {
            setTimeout(() => {
                star.style.opacity = '0';
                star.style.transform = 'scale(0)';
                setTimeout(() => {
                    star.style.transition = 'all 0.3s ease';
                    star.style.opacity = '1';
                    star.style.transform = 'scale(1)';
                }, 100);
            }, index * 100);
        });

        /**
         * Log template initialization
         */
        console.log('TishCricketHTML Template Initialized Successfully!');
    });

    /**
     * Window Load Event
     */
    $(window).on('load', function() {
        // Additional functionality after page fully loads
        $('.hero-content').css('opacity', '1');

        // Adjust equal heights
        equalizeHeights('.team-card');
        equalizeHeights('.feature-card');
        equalizeHeights('.blog-card');
    });

    /**
     * Equalize Heights Function
     */
    function equalizeHeights(selector) {
        let maxHeight = 0;
        $(selector).each(function() {
            if ($(this).height() > maxHeight) {
                maxHeight = $(this).height();
            }
        });
        // Removed the actual height setting to allow responsive behavior
    }

    /**
     * Window Resize Event
     */
    $(window).on('resize', function() {
        // Re-equalize heights on window resize
        equalizeHeights('.team-card');
        equalizeHeights('.feature-card');
        equalizeHeights('.blog-card');
    });

})(jQuery);

/**
 * Additional CSS for Scroll to Top Button
 * (Add this to your CSS file)
 */
const scrollTopStyle = document.createElement('style');
scrollTopStyle.textContent = `
    .scroll-to-top {
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background-color: var(--accent-green);
        color: white;
        border-radius: 50%;
        display: none;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        z-index: 999;
        transition: all 0.3s ease;
        box-shadow: 0 5px 15px rgba(127, 182, 133, 0.3);
        line-height:50px;
        text-align:center;
    }

    .scroll-to-top:hover {
        background-color: var(--accent-green-hover);
        transform: translateY(-5px);
        box-shadow: 0 8px 20px rgba(127, 182, 133, 0.5);
    }

    .scroll-to-top i {
        font-size: 20px;
    }
`;
document.head.appendChild(scrollTopStyle);
