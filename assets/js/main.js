-(function($) {
    var $window = $(window),
        $body = $('body'),
        $header = $('#header'),
        $footer = $('#footer'),
        $main = $('#main'),
        settings = {
            // Parallax background effect?
            parallax: true,

            // Parallax factor (lower = more intense, higher = less intense).
            parallaxFactor: 20
        };

    // Breakpoints.
    breakpoints({
        xlarge: ['1281px', '1800px'],
        large: ['981px', '1280px'],
        medium: ['737px', '980px'],
        small: ['481px', '736px'],
        xsmall: [null, '480px'],
    });

    // Play initial animations on page load.
    $window.on('load', function() {
        window.setTimeout(function() {
            $body.removeClass('is-preload');
        }, 100);
    });

    // Touch?
    if (browser.mobile) {
        // Turn on touch mode.
        $body.addClass('is-touch');

        // Height fix (mostly for iOS).
        window.setTimeout(function() {
            $window.scrollTop($window.scrollTop() + 1);
        }, 0);
    }

    // Footer.
    breakpoints.on('<=medium', function() {
        $footer.insertAfter($main);
    });

    breakpoints.on('>medium', function() {
        $footer.appendTo($header);
    });

    // Header.
    // Parallax background.
    if (browser.name == 'ie' || browser.mobile) settings.parallax = false;

    if (settings.parallax) {
        breakpoints.on('<=medium', function() {
            $window.off('scroll.strata_parallax');
            $header.css('background-position', '');
        });

        breakpoints.on('>medium', function() {
            $header.css('background-position', 'left 0px');
            $window.on('scroll.strata_parallax', function() {
                $header.css('background-position', 'left ' + (-1 * (parseInt($window.scrollTop()) / settings.parallaxFactor)) + 'px');
            });
        });

        $window.on('load', function() {
            $window.triggerHandler('scroll');
        });
    }

    // Portfolio Section with Lightbox Gallery (Poptrox)
    $(document).ready(function() {
    var $gallery = $('#two .row'); // Main section
    var $discoverMoreBtn = $('#portfolio-btn');
    var $extraProjects = $('.extra-project');

    function initPoptrox() {
        if ($gallery.data('poptrox')) {
            $gallery.poptrox('destroy'); // Destroy existing Poptrox instance
        }

        console.log("Initializing Poptrox...");
        console.log("Extra projects found:", $extraProjects.length); // Debugging

        // Initialize Poptrox for both regular and extra projects
        $gallery.poptrox({
            caption: function($a) { return $a.attr('data-title'); },
            overlayColor: '#2c2c2c',
            overlayOpacity: 0.85,
            popupCloserText: '',
            popupLoaderText: '',
            selector: '.work-item a.image, .extra-project a.image', // Include extra projects
            usePopupCaption: true,
            usePopupDefaultStyling: false,
            usePopupEasyClose: false,
            usePopupNav: true,
            windowMargin: 50
        });
    }

    // Initial Poptrox Setup
    initPoptrox();

    // Discover More Button Click
    $discoverMoreBtn.click(function(e) {
        e.preventDefault();
        
        console.log("Discover More clicked.");
        $extraProjects.fadeIn(400, function() {
            console.log("Extra projects now visible.");
            initPoptrox(); // Reinitialize Poptrox after showing the extra projects
        });

        $(this).hide(); // Hide the button after use
    });

     
});



    // Learn More Toggle Text functionality
    document.addEventListener("DOMContentLoaded", function () {
    var learnMoreButton = document.getElementById('learn-more-btn');
    var showLessTextButton = document.getElementById('show-less-text-btn');
    var extraText = document.querySelector('.extra-text');

    var discoverMoreButton = document.getElementById('discover-more-btn');
    var showLessProjectsButton = document.getElementById('show-less-projects-btn');
    var extraProjects = document.querySelectorAll('.extra-project');

    // Ensure initial states
    extraText.style.display = "none";
    extraProjects.forEach(project => project.style.display = "none");
    showLessTextButton.style.display = "none";
    showLessProjectsButton.style.display = "none";

    // Learn More Toggle
    learnMoreButton.addEventListener('click', function (event) {
        event.preventDefault();
        extraText.style.display = "block";
        learnMoreButton.style.display = "none";
        showLessTextButton.style.display = "inline-block";
    });

    showLessTextButton.addEventListener('click', function (event) {
        event.preventDefault();
        extraText.style.display = "none";
        learnMoreButton.style.display = "inline-block";
        showLessTextButton.style.display = "none";
    });

    // Discover More Toggle
    discoverMoreButton.addEventListener('click', function (event) {
        event.preventDefault();
        extraProjects.forEach(project => project.style.display = "block");
        discoverMoreButton.style.display = "none";
        showLessProjectsButton.style.display = "inline-block";
    });

    showLessProjectsButton.addEventListener('click', function (event) {
        event.preventDefault();
        extraProjects.forEach(project => project.style.display = "none");
        discoverMoreButton.style.display = "inline-block";
        showLessProjectsButton.style.display = "none";
    });
});

})(jQuery);
