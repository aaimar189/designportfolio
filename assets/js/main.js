/*
	Strata by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

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
			xlarge:  [ '1281px',  '1800px' ],
			large:   [ '981px',   '1280px' ],
			medium:  [ '737px',   '980px'  ],
			small:   [ '481px',   '736px'  ],
			xsmall:  [ null,      '480px'  ],
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
				if (browser.name == 'ie'
				||	browser.mobile)
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

		// Lightbox gallery.
			$(function() {
    var $gallery = $('#two, .extra-projects-container'); // Ensure both sections are included
    var $discoverMoreBtn = $('#portfolio-btn');

    function initPoptrox() {
        // Destroy any existing Poptrox instance
        $gallery.poptrox('destroy'); 
        
        // Reinitialize with ALL visible elements
        $gallery.poptrox({
            caption: function($a) { return $a.attr('data-title'); },
            overlayColor: '#2c2c2c',
            overlayOpacity: 0.85,
            popupCloserText: '',
            popupLoaderText: '',
            selector: '.work-item a.image', // Make sure it targets only image links
            usePopupCaption: true,
            usePopupDefaultStyling: false,
            usePopupEasyClose: false,
            usePopupNav: true,
            windowMargin: (breakpoints.active('<=small') ? 0 : 50)
        });
    }

    // Initial Poptrox load for visible projects
    initPoptrox();

    // Click event for "Discover More"
    $discoverMoreBtn.click(function(e) {
        e.preventDefault();

        // Show hidden extra projects
        $('.extra-project').fadeIn(400, function() {
            initPoptrox(); // Reinitialize Poptrox AFTER they become visible
        });

        $(this).hide(); // Hide the button after use
    });
});



})(jQuery);



	// New functionality for "Learn More" button (toggling extra text)

		document.addEventListener("DOMContentLoaded", function() {
    		var button = document.getElementById('reveal-btn');
    		var extraText = document.querySelector('.extra-text');

	// Ensure the extra text is hidden at the start
   		extraText.classList.remove("show");

    		button.addEventListener('click', function(event) {
        	event.preventDefault();  // Prevents scrolling to the top when clicking

        	extraText.classList.toggle("show");  // Toggle visibility
        
	// Update button text
        	button.textContent = extraText.classList.contains("show") ? "Show Less" : "Learn More";
    });
});


		document.getElementById('portfolio-btn').addEventListener('click', function(event) {
    		event.preventDefault(); // Prevent default link behavior
    		var extraProjects = document.querySelectorAll('.extra-project');
    		var button = document.getElementById('portfolio-btn');

    extraProjects.forEach(function(project) {
        if (project.style.display === "none" || project.style.display === "") {
            project.style.display = "block"; // Show extra projects
        } else {
            project.style.display = "none"; // Hide them again
        }
    });

    // Toggle button text
    if (button.textContent === "Full Portfolio") {
        button.textContent = "Show Less";
    } else {
        button.textContent = "Full Portfolio";
    }
});
