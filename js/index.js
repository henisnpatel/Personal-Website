(function($) {

	var	$window   = $(window),
		$body     = $('body'),
		$wrapper  = $('#page-wrapper'),
		$banner   = $('#banner'),
		$header   = $('#header');

	// Breakpoints.
		breakpoints({
			xlarge:   [ '1281px',  '1680px' ],
			large:    [ '981px',   '1280px' ],
			medium:   [ '737px',   '980px'  ],
			small:    [ '481px',   '736px'  ],
			xsmall:   [ null,      '480px'  ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Mobile?
		if (browser.mobile)
			$body.addClass('is-mobile');
		else {

			breakpoints.on('>medium', function() {
				$body.removeClass('is-mobile');
			});

			breakpoints.on('<=medium', function() {
				$body.addClass('is-mobile');
			});

		}

	// Scrolly.
		$('.scrolly')
			.scrolly({
				speed: 1500,
				offset: $header.outerHeight()
			});

	// Menu.
		$('#menu')
			.append('<a href="#menu" class="close"></a>')
			.appendTo($body)
			.panel({
				delay: 500,
				hideOnClick: true,
				hideOnSwipe: true,
				resetScroll: true,
				resetForms: true,
				side: 'right',
				target: $body,
				visibleClass: 'is-menu-visible'
			});

	// Header.
		if ($banner.length > 0
		&&	$header.hasClass('alt')) {

			$window.on('resize', function() { $window.trigger('scroll'); });

			$banner.scrollex({
				bottom:		$header.outerHeight() + 1,
				terminate:	function() { $header.removeClass('alt'); },
				enter:		function() { $header.addClass('alt'); },
				leave:		function() { $header.removeClass('alt'); }
			});

		}
	
	// —— Make each “spotlight” in #two clickable —— 
		$('#two .spotlight').each(function() {
			var $card = $(this),
				href  = $card.data('href');      // read from data-href on the <section>
			if (href) {
				$card
				.css('cursor','pointer')
				.on('click', function() {
					window.location.href = href;
				});
			}
		});

	// Banner
		const typingElement = document.querySelector('.typing');
		const texts = [
			'Web Developer.',
			'AI Explorer.',
			'UI/UX Enthusiast.',
			'Full Stack Innovator.'
		];
		let index = 0;
		let charIndex = 0;
		let isDeleting = false;

		function type() {
			const current = texts[index];
			if (isDeleting) {
			typingElement.textContent = current.substring(0, charIndex--);
			if (charIndex < 0) {
				isDeleting = false;
				index = (index + 1) % texts.length;
			}
			} else {
			typingElement.textContent = current.substring(0, charIndex++);
			if (charIndex === current.length) {
				isDeleting = true;
				setTimeout(type, 1000);
				return;
			}
			}
			setTimeout(type, isDeleting ? 60 : 120);
		}
		document.addEventListener('DOMContentLoaded', type);

	// —— seamless, continuous-scrolling for every .carousel —— 
		$('.carousel').each(function() {
			var $carousel = $(this),
				$track    = $carousel.find('.carousel-track'),
				$slides   = $track.children('img'),
				count     = $slides.length,
				// reverse if container has .reverse
				speed     = $carousel.hasClass('reverse') ? -2 : 2,
				xPos      = 0;

			// Clone originals for wrap
			$track.append($slides.clone());

			// Measure width of one set
			var slideW     = $slides.first().outerWidth(true),
				totalWidth = slideW * count;

			// Drive it with RAF for zero-jump looping
			(function loop() {
			xPos -= speed;
			if (xPos <= -totalWidth) xPos += totalWidth;
			if (xPos >= 0)          xPos -= totalWidth;
			$track.css('transform','translateX(' + xPos + 'px)');
			requestAnimationFrame(loop);
			})();
		});


})(jQuery);
