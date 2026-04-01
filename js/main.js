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

    // Portfolio isotope and filter
    var portfolioIsotope = $('.portfolio-container').isotope({
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
    });
    $('#portfolio-flters li').on('click', function () {
        $("#portfolio-flters li").removeClass('active');
        $(this).addClass('active');

        portfolioIsotope.isotope({filter: $(this).data('filter')});
    });
    
})(jQuery);

