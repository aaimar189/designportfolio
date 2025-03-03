(function($) {

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

    // Disable parallax on IE (smooth scrolling is jerky), and on mobile platforms (= better performance).
    if (browser.name == 'ie' || browser.mobile)
        settings.parallax = false;

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

    // Main Sections: Two.


     $(function() {
        var $gallery = $('#two');
        var $discoverMoreBtn = $('#portfolio-btn');
        var $extraProjects = $('.extra-project');

        function initPoptrox() {
            if ($gallery.data('poptrox')) {
                $gallery.poptrox('destroy');
            }

            $gallery.poptrox({
                caption: function($a) { return $a.attr('data-title'); },
                overlayColor: '#2c2c2c',
                overlayOpacity: 0.85,
                popupCloserText: '',
                popupLoaderText: '',
                selector: '.work-item a.image',
                usePopupCaption: true,
                usePopupDefaultStyling: false,
                usePopupEasyClose: false,
                usePopupNav: true,
                windowMargin: (breakpoints.active('<=small') ? 0 : 50)
            });
        }

        // Initial Load
        initPoptrox();

        // Click event for "Discover More"
        $discoverMoreBtn.click(function(e) {
            e.preventDefault();
            $extraProjects.fadeIn(400, function() {
                initPoptrox();  // Reinitialize Poptrox after new items appear
            });
            $(this).hide();
        });
    });

    // New functionality for "Learn More" button
    document.addEventListener("DOMContentLoaded", function() {
        var button = document.getElementById('reveal-btn');
        var extraText = document.querySelector('.extra-text');

        extraText.classList.remove("show");

        button.addEventListener('click', function(event) {
            event.preventDefault();
            extraText.classList.toggle("show");
            button.textContent = extraText.classList.contains("show") ? "Show Less" : "Learn More";
        });
    });

    // Ensure the extra projects are toggled correctly
    document.getElementById('portfolio-btn').addEventListener('click', function(event) {
        event.preventDefault();
        var extraProjects = document.querySelectorAll('.extra-project');
        var button = document.getElementById('portfolio-btn');

        extraProjects.forEach(function(project) {
            if (project.style.display === "none" || project.style.display === "") {
                project.style.display = "block";
            } else {
                project.style.display = "none";
            }
        });

        if (button.textContent === "Full Portfolio") {
            button.textContent = "Show Less";
        } else {
            button.textContent = "Full Portfolio";
        }

        // Reinitialize Poptrox after projects are revealed
        initPoptrox();
    });

})(jQuery);
