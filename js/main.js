(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // Initiate the wowjs
    new WOW().init();


    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.sticky-top').addClass('shadow-sm').css('top', '0px');
        } else {
            $('.sticky-top').removeClass('shadow-sm').css('top', '-100px');
        }
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });


    // Header carousel
    $(".header-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        items: 1,
        dots: true,
        loop: true,
        nav : true,
        navText : [
            '<i class="bi bi-chevron-left"></i>',
            '<i class="bi bi-chevron-right"></i>'
        ]
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        center: true,
        dots: false,
        loop: true,
        nav : true,
        navText : [
            '<i class="bi bi-arrow-left"></i>',
            '<i class="bi bi-arrow-right"></i>'
        ],
        responsive: {
            0:{
                items:1
            },
            768:{
                items:2
            }
        }
    });
    // Social links: keep safe fallback in lower env, inject real URLs in higher env via tokens.
    var socialLinks = window.MAB_SOCIAL_LINKS || {};
    var allowedSocialKeys = {
        x: true,
        facebook: true,
        linkedin: true,
        instagram: true
    };
    var tokenPattern = /^__[^_]+(?:_[^_]+)*__$/;
    $('[data-social]').each(function () {
        var $link = $(this);
        var key = ($link.data('social') || '').toString().toLowerCase();
        if (key === 'twitter') {
            key = 'x';
            $link.attr('data-social', 'x');
        }

        if (!allowedSocialKeys[key]) {
            $link.attr('href', 'javascript:void(0)');
            $link.attr('aria-disabled', 'true');
            $link.addClass('disabled');
            $link.removeAttr('target');
            $link.removeAttr('rel');
            return;
        }

        var configured = (socialLinks[key] || '').toString().trim();
        var isConfigured = configured && !tokenPattern.test(configured);

        if (isConfigured) {
            $link.attr('href', configured);
            if (/^https?:\/\//i.test(configured)) {
                $link.attr('target', '_blank');
                $link.attr('rel', 'noopener noreferrer');
            } else {
                $link.removeAttr('target');
                $link.removeAttr('rel');
            }
        } else {
            $link.attr('href', 'contact.html');
            $link.removeAttr('target');
            $link.removeAttr('rel');
        }
    });

    // Contact form embed
    var contactFormConfig = window.MAB_CONTACT_FORM || {};
    var contactFormContainer = document.querySelector('[data-contact-form-container]');
    var configTokenPattern = /^__[^_]+(?:_[^_]+)*__$/;
    if (contactFormContainer) {
        var statusElement = contactFormContainer.querySelector('[data-contact-form-status]');
        var errorElement = contactFormContainer.querySelector('[data-contact-form-error]');
        var frameWrapElement = contactFormContainer.querySelector('[data-contact-form-frame-wrap]');
        var frameElement = contactFormContainer.querySelector('[data-contact-form-frame]');
        var configuredFormUrl = (contactFormConfig.zohoFormUrl || '').toString().trim();
        var allowedZohoHosts = Array.isArray(contactFormConfig.allowedZohoHosts) ? contactFormConfig.allowedZohoHosts : [];
        var iframeTitle = (contactFormConfig.iframeTitle || 'MAB Polytech inquiry form').toString().trim();
        var loadTimeoutMs = parseInt(contactFormConfig.loadTimeoutMs, 10);
        var formUrl;
        var loadTimer;
        var hasLoaded = false;

        function setContactFormError(message) {
            frameWrapElement.classList.add('d-none');
            if (frameElement) {
                frameElement.removeAttribute('src');
            }

            if (statusElement) {
                statusElement.classList.add('d-none');
            }

            if (errorElement) {
                errorElement.textContent = message;
                errorElement.classList.remove('d-none');
            }
        }

        function setContactFormReady() {
            if (errorElement) {
                errorElement.classList.add('d-none');
                errorElement.textContent = '';
            }

            if (statusElement) {
                statusElement.classList.remove('d-none');
                statusElement.textContent = 'Inquiry form ready. Please complete the details below.';
            }

            frameWrapElement.classList.remove('d-none');
        }

        function isValidZohoFormUrl(candidateUrl) {
            var normalizedAllowedHosts = allowedZohoHosts
                .map(function (host) {
                    return (host || '').toString().trim().toLowerCase();
                })
                .filter(function (host) {
                    return host && !configTokenPattern.test(host);
                });

            try {
                formUrl = new URL(candidateUrl);
            } catch (error) {
                return false;
            }

            return formUrl.protocol === 'https:' && normalizedAllowedHosts.indexOf(formUrl.hostname.toLowerCase()) !== -1;
        }

        if (!configuredFormUrl || configTokenPattern.test(configuredFormUrl) || !isValidZohoFormUrl(configuredFormUrl)) {
            setContactFormError('Our inquiry form is temporarily unavailable. Please use the contact phone number or email shown on this page.');
        } else {
            if (!Number.isFinite(loadTimeoutMs) || loadTimeoutMs < 4000) {
                loadTimeoutMs = 12000;
            }

            frameElement.setAttribute('title', iframeTitle || 'MAB Polytech inquiry form');
            frameElement.addEventListener('error', function () {
                setContactFormError('We could not display the inquiry form in this browser. Please refresh and try again, or open the form directly in a new tab.');
            });

            // Keep the iframe area visible while loading so slow third-party responses do not look like a hard failure.
            frameWrapElement.classList.remove('d-none');
            frameElement.addEventListener('load', function () {
                hasLoaded = true;
                window.clearTimeout(loadTimer);
                setContactFormReady();
            }, { once: true });

            loadTimer = window.setTimeout(function () {
                if (!hasLoaded && errorElement) {
                    if (statusElement) {
                        statusElement.classList.add('d-none');
                    }

                    errorElement.textContent = 'The inquiry form is taking longer than expected. Please wait a moment, refresh the page, or use the contact details shown on this page.';
                    errorElement.classList.remove('d-none');
                }
            }, loadTimeoutMs);

            frameElement.setAttribute('src', formUrl.toString());
        }
    }

    // Portfolio isotope and filter
    if ($.fn.isotope && $('.portfolio-container').length) {
        var portfolioIsotope = $('.portfolio-container').isotope({
            itemSelector: '.portfolio-item',
            layoutMode: 'fitRows'
        });

        $('#portfolio-flters li').on('click', function () {
            $("#portfolio-flters li").removeClass('active');
            $(this).addClass('active');

            portfolioIsotope.isotope({filter: $(this).data('filter')});
        });
    }
    
})(jQuery);

