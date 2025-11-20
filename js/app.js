/**
 * Lógica principal da aplicação.
 * Este script é carregado em todas as páginas HTML.
 */

const contentLoader = {
	/**
	 * Busca o conteúdo do arquivo JSON local.
	 * @returns {Promise<Object>} O objeto JSON com todo o conteúdo do site.
	 */
	fetchLocalContent: async () => {
		try {
			const response = await fetch('data/content.json');
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			return await response.json();
		} catch (error) {
			console.error('Falha ao carregar content.json:', error);
			return null;
		}
	},

	/**
	 * Busca o conteúdo do Firestore (Implementação futura).
	 * @param {string} pageKey - A chave da página (ex: 'home', 'solutions').
	 * @returns {Promise<Object>} O objeto com o conteúdo da página.
	 */
	fetchFromFirestore: async (pageKey) => {
		console.warn(
			'Modo Firestore ainda não implementado. Usando JSON local.'
		);
		const allContent = await contentLoader.fetchLocalContent();
		return { ...allContent.common, ...allContent[pageKey] };
	},

	/**
	 * Popula os elementos da página com o conteúdo carregado.
	 * @param {Object} content - O objeto de conteúdo para a página atual.
	 */
	populatePage: (content) => {
		if (!content) {
			console.error('Nenhum conteúdo para popular a página.');
			return;
		}

		const elements = document.querySelectorAll('[data-key]');
		elements.forEach((element) => {
			const key = element.getAttribute('data-key');
			if (!content.hasOwnProperty(key)) {
				console.warn(`Chave não encontrada no JSON: ${key}`, element);
				return;
			}

			if (element.tagName === 'IMG') {
				element.src = content[key];
				return;
			}

			if (element.classList.contains('counter-number')) {
				element.setAttribute('data-target', content[key]);
				element.textContent = '0';
				return;
			}

			element.textContent = content[key];
		});
	},
};

/**
 * Lógica de interação da página.
 */
const pageInteractions = (() => {
	let navScrollInitialized = false;
	let navScrollCleanup = null;
	let dropdownInitialized = false;
	let mobileNavInitialized = false;

	const handleNavScroll = () => {
		const nav = document.getElementById('main-nav');
		if (!nav || navScrollInitialized) return () => {};

		navScrollInitialized = true;
		nav.classList.add('bg-transparent');
		nav.classList.remove('bg-white', 'shadow-md');
		const navLinks = nav.querySelectorAll('[data-nav-link]');
		const scrollThreshold = 50;

		const updateNav = () => {
			const scrolled = window.scrollY > scrollThreshold;
			nav.classList.toggle('bg-white', scrolled);
			nav.classList.toggle('shadow-md', scrolled);
			nav.classList.toggle('bg-transparent', !scrolled);
			navLinks.forEach((link) => {
				if (link.classList.contains('text-brand-blue')) {
					return;
				}
				if (scrolled) {
					link.classList.add('text-gray-900');
					link.classList.remove('text-white');
				} else {
					link.classList.add('text-white');
					link.classList.remove('text-gray-900');
				}
			});
		};

		window.addEventListener('scroll', updateNav);
		updateNav();
		return () => {
			window.removeEventListener('scroll', updateNav);
			navScrollInitialized = false;
		};
	};

	const setNavSolid = () => {
		const nav = document.getElementById('main-nav');
		if (!nav) return;
		nav.classList.add('bg-white', 'shadow-md');
		nav.classList.remove('bg-transparent');
		const navLinks = nav.querySelectorAll('[data-nav-link]');
		navLinks.forEach((link) => {
			if (link.classList.contains('text-brand-blue')) {
				return;
			}
			link.classList.add('text-gray-900');
			link.classList.remove('text-white');
		});
	};

	const setNavMode = (mode = 'solid') => {
		if (mode === 'transparent') {
			if (!navScrollCleanup) {
				navScrollCleanup = handleNavScroll();
			}
			return;
		}

		if (navScrollCleanup) {
			navScrollCleanup();
			navScrollCleanup = null;
		}
		setNavSolid();
	};

	const initNavDropdowns = () => {
		if (dropdownInitialized) return () => {};
		const nav = document.getElementById('main-nav');
		if (!nav) return () => {};
		const dropdowns = Array.from(nav.querySelectorAll('.nav-dropdown'));
		if (!dropdowns.length) return () => {};
		dropdownInitialized = true;

		const closeAll = () => {
			dropdowns.forEach((dropdown) => {
				dropdown.classList.remove('dropdown-open');
				const trigger = dropdown.querySelector(
					'[data-dropdown-trigger]'
				);
				if (trigger) {
					trigger.setAttribute('aria-expanded', 'false');
				}
			});
		};

		const handleDocumentClick = (event) => {
			if (dropdowns.some((dropdown) => dropdown.contains(event.target))) {
				return;
			}
			closeAll();
		};

		const triggerHandlers = [];
		dropdowns.forEach((dropdown) => {
			const trigger = dropdown.querySelector('[data-dropdown-trigger]');
			if (!trigger) return;
			const menu = dropdown.querySelector('.dropdown-menu');
			const handleClick = (event) => {
				event.preventDefault();
				const isOpen = dropdown.classList.contains('dropdown-open');
				closeAll();
				if (!isOpen) {
					dropdown.classList.add('dropdown-open');
					trigger.setAttribute('aria-expanded', 'true');
				}
			};
			trigger.addEventListener('click', handleClick);
			triggerHandlers.push(() =>
				trigger.removeEventListener('click', handleClick)
			);
			if (menu) {
				menu.addEventListener('click', closeAll);
				triggerHandlers.push(() =>
					menu.removeEventListener('click', closeAll)
				);
			}
		});

		document.addEventListener('click', handleDocumentClick);
		return () => {
			triggerHandlers.forEach((remove) => remove());
			document.removeEventListener('click', handleDocumentClick);
			closeAll();
			dropdownInitialized = false;
		};
	};

	const initMobileNav = () => {
		if (mobileNavInitialized) return () => {};
		const toggleButton = document.querySelector('[data-mobile-nav-toggle]');
		const panel = document.getElementById('mobile-nav-panel');
		if (!toggleButton || !panel) return () => {};
		const closeElements = Array.from(
			panel.querySelectorAll('[data-mobile-nav-close]')
		);
		const body = document.body;
		let isOpen = false;

		const openPanel = () => {
			if (isOpen) return;
			isOpen = true;
			panel.classList.add('mobile-nav-open');
			panel.setAttribute('aria-hidden', 'false');
			toggleButton.setAttribute('aria-expanded', 'true');
			body.classList.add('mobile-nav-open');
		};

		const closePanel = () => {
			if (!isOpen) return;
			isOpen = false;
			panel.classList.remove('mobile-nav-open');
			panel.setAttribute('aria-hidden', 'true');
			toggleButton.setAttribute('aria-expanded', 'false');
			body.classList.remove('mobile-nav-open');
		};

		const handleToggle = (event) => {
			event.preventDefault();
			if (isOpen) {
				closePanel();
			} else {
				openPanel();
			}
		};

		const handleEscape = (event) => {
			if (event.key === 'Escape') {
				closePanel();
			}
		};

		const handleRouteClick = (event) => {
			const routeLink = event.target.closest('[data-route]');
			if (routeLink) {
				closePanel();
			}
		};

		toggleButton.addEventListener('click', handleToggle);
		closeElements.forEach((element) =>
			element.addEventListener('click', closePanel)
		);
		panel.addEventListener('click', handleRouteClick);
		document.addEventListener('keydown', handleEscape);
		mobileNavInitialized = true;

		return () => {
			toggleButton.removeEventListener('click', handleToggle);
			closeElements.forEach((element) =>
				element.removeEventListener('click', closePanel)
			);
			panel.removeEventListener('click', handleRouteClick);
			document.removeEventListener('keydown', handleEscape);
			closePanel();
			mobileNavInitialized = false;
		};
	};

	const initHeroCarousel = (content) => {
		const carouselContainer = document.getElementById('hero-carousel');
		const titleElement = document.getElementById('hero-title');
		const subtitleElement = document.getElementById('hero-subtitle');
		const indicatorsContainer = document.getElementById('hero-indicators');

		if (
			!carouselContainer ||
			!titleElement ||
			!subtitleElement ||
			!indicatorsContainer
		) {
			return () => {};
		}

		const slides = content?.heroSlides;
		if (!Array.isArray(slides) || !slides.length) {
			titleElement.textContent = 'Erro ao carregar';
			subtitleElement.textContent = 'Verifique o content.json';
			return () => {};
		}

		carouselContainer.innerHTML = '';
		indicatorsContainer.innerHTML = '';
		let currentIndex = 0;
		const slideDuration = 5000;
		const transitionSpeed = 700;
		const imgElements = [];
		const indicatorElements = [];

		const goToSlide = (index) => {
			if (index === currentIndex) return;
			const prevIndex = currentIndex;
			currentIndex = index;
			imgElements[prevIndex].classList.replace(
				'opacity-100',
				'opacity-0'
			);
			imgElements[currentIndex].classList.replace(
				'opacity-0',
				'opacity-100'
			);
			titleElement.classList.add('opacity-0');
			subtitleElement.classList.add('opacity-0');
			setTimeout(() => {
				titleElement.textContent = slides[currentIndex].title;
				subtitleElement.textContent = slides[currentIndex].subtitle;
				titleElement.classList.remove('opacity-0');
				subtitleElement.classList.remove('opacity-0');
			}, transitionSpeed / 2);
			indicatorElements[prevIndex].classList.replace(
				'bg-white',
				'bg-white/50'
			);
			indicatorElements[currentIndex].classList.replace(
				'bg-white/50',
				'bg-white'
			);
		};

		const nextSlide = () => {
			const nextIndex = (currentIndex + 1) % slides.length;
			goToSlide(nextIndex);
		};

		slides.forEach((slide, index) => {
			const img = document.createElement('img');
			img.src = slide.image;
			img.className =
				'absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out';
			img.classList.add(index === 0 ? 'opacity-100' : 'opacity-0');
			carouselContainer.appendChild(img);
			imgElements.push(img);

			const indicator = document.createElement('button');
			indicator.className =
				'w-3 h-3 rounded-full transition-all duration-300 ' +
				(index === 0 ? 'bg-white' : 'bg-white/50');
			indicator.addEventListener('click', () => goToSlide(index));
			indicatorsContainer.appendChild(indicator);
			indicatorElements.push(indicator);
		});

		titleElement.textContent = slides[0].title;
		subtitleElement.textContent = slides[0].subtitle;
		let slideInterval = setInterval(nextSlide, slideDuration);

		return () => {
			clearInterval(slideInterval);
		};
	};

	const initVideoCarousel = (videos = []) => {
		const container = document.getElementById('video-carousel-container');
		const track = document.getElementById('video-carousel-track');
		const nextButton = document.getElementById('video-next');
		const prevButton = document.getElementById('video-prev');

		if (!container || !track || !nextButton || !prevButton) {
			return () => {};
		}

		const toEmbedUrl = (url = '') => {
			if (!url) return '';
			const youtubeIdMatch = url.match(
				/(?:v=|\.be\/|embed\/)([A-Za-z0-9_-]{6,})/
			);
			if (!youtubeIdMatch) {
				return url;
			}
			return `https://www.youtube.com/embed/${youtubeIdMatch[1]}`;
		};

		if (Array.isArray(videos) && videos.length) {
			track.innerHTML = '';
			videos.forEach((video) => {
				const article = document.createElement('article');
				article.className =
					'bg-white border border-gray-200 rounded-2xl p-6 w-full md:w-1/2 lg:w-1/3 flex-shrink-0 shadow-sm';

				const frameWrapper = document.createElement('div');
				frameWrapper.className =
					'aspect-video rounded-xl overflow-hidden mb-4 bg-gray-900/70';

				const iframe = document.createElement('iframe');
				iframe.src = toEmbedUrl(video.link);
				iframe.title = video.title || 'Vídeo demonstrativo';
				iframe.loading = 'lazy';
				iframe.className = 'w-full h-full';
				iframe.allow =
					'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
				iframe.allowFullscreen = true;
				frameWrapper.appendChild(iframe);

				const titleEl = document.createElement('h3');
				titleEl.className = 'text-xl font-semibold text-gray-900';
				titleEl.textContent = video.title || '';

				const descEl = document.createElement('p');
				descEl.className = 'mt-2 text-gray-600';
				descEl.textContent = video.description || '';

				article.appendChild(frameWrapper);
				article.appendChild(titleEl);
				article.appendChild(descEl);
				track.appendChild(article);
			});
		}

		const slides = Array.from(track.children);
		if (!slides.length) {
			return () => {};
		}

		let isAnimating = false;

		const getGapSize = () => {
			const styles = window.getComputedStyle(track);
			const gapValue = styles.columnGap || styles.gap || '0';
			const numericGap = parseFloat(gapValue);
			return Number.isNaN(numericGap) ? 0 : numericGap;
		};

		const getSlideDistance = () => {
			const firstSlide = track.firstElementChild;
			if (!firstSlide) return 0;
			const slideWidth = firstSlide.getBoundingClientRect().width;
			return slideWidth + getGapSize();
		};

		const resetTransform = () => {
			track.style.transition = 'none';
			track.style.transform = 'translateX(0)';
			// Force reflow to apply the non-animated state before next animation
			void track.offsetWidth;
			track.style.transition = '';
		};

		const slideNext = () => {
			if (isAnimating) return;
			isAnimating = true;
			const distance = getSlideDistance();
			track.style.transition = 'transform 0.4s ease';
			track.style.transform = `translateX(-${distance}px)`;

			const handleTransitionEnd = () => {
				track.removeEventListener('transitionend', handleTransitionEnd);
				track.appendChild(track.firstElementChild);
				resetTransform();
				isAnimating = false;
			};

			track.addEventListener('transitionend', handleTransitionEnd);
		};

		const slidePrev = () => {
			if (isAnimating) return;
			isAnimating = true;
			const distance = getSlideDistance();
			track.insertBefore(track.lastElementChild, track.firstElementChild);
			track.style.transition = 'none';
			track.style.transform = `translateX(-${distance}px)`;
			void track.offsetWidth;
			track.style.transition = 'transform 0.4s ease';
			track.style.transform = 'translateX(0)';

			const handleTransitionEnd = () => {
				track.removeEventListener('transitionend', handleTransitionEnd);
				track.style.transition = '';
				isAnimating = false;
			};

			track.addEventListener('transitionend', handleTransitionEnd);
		};

		const handleResize = () => {
			if (isAnimating) return;
			resetTransform();
		};

		nextButton.addEventListener('click', slideNext);
		prevButton.addEventListener('click', slidePrev);
		window.addEventListener('resize', handleResize);

		return () => {
			nextButton.removeEventListener('click', slideNext);
			prevButton.removeEventListener('click', slidePrev);
			window.removeEventListener('resize', handleResize);
		};
	};

	const initScrollAnimations = () => {
		const elementsToAnimate =
			document.querySelectorAll('.animate-on-scroll');
		if (!elementsToAnimate.length) return () => {};

		const observerOptions = {
			root: null,
			rootMargin: '0px',
			threshold: 0.1,
		};

		const observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					entry.target.classList.add('is-visible');
					observer.unobserve(entry.target);
				}
			});
		}, observerOptions);

		elementsToAnimate.forEach((el) => observer.observe(el));
		return () => observer.disconnect();
	};

	const initCounterAnimations = () => {
		const counters = document.querySelectorAll('.counter-number');
		if (!counters.length) return () => {};

		const timers = new Set();
		const observerOptions = { threshold: 0.5 };

		const animateCounter = (counter) => {
			const targetText = counter.getAttribute('data-target');
			if (!targetText) return;
			const targetNumber = parseInt(targetText.replace(/\D/g, ''), 10);
			const prefix = targetText.replace(/[0-9]/g, '');
			const duration = 2000;
			const steps = 50;
			const stepTime = duration / steps;
			let currentStep = 0;

			const timer = setInterval(() => {
				currentStep++;
				const progress = currentStep / steps;
				const currentNumber = Math.floor(targetNumber * progress);
				if (targetText.startsWith(prefix)) {
					counter.textContent = `${prefix}${currentNumber}`;
				} else {
					counter.textContent = `${currentNumber}${prefix}`;
				}

				if (currentStep >= steps) {
					counter.textContent = targetText;
					clearInterval(timer);
					timers.delete(timer);
				}
			}, stepTime);

			timers.add(timer);
		};

		const observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					animateCounter(entry.target);
					observer.unobserve(entry.target);
				}
			});
		}, observerOptions);

		counters.forEach((counter) => observer.observe(counter));
		return () => {
			observer.disconnect();
			timers.forEach((timer) => clearInterval(timer));
			timers.clear();
		};
	};

	return {
		handleNavScroll,
		setNavMode,
		initNavDropdowns,
		initMobileNav,
		initHeroCarousel,
		initVideoCarousel,
		initScrollAnimations,
		initCounterAnimations,
	};
})();

const applyLinkKeys = (content = {}) => {
	const linkElements = document.querySelectorAll('[data-link-key]');
	linkElements.forEach((linkEl) => {
		const key = linkEl.getAttribute('data-link-key');
		if (!key) return;
		const href = content[key];
		if (href) {
			linkEl.setAttribute('href', href);
		}
	});
};

const mobilityPage = (() => {
	const renderCollection = (containerId, items = [], builder) => {
		const container = document.getElementById(containerId);
		if (!container || !Array.isArray(items)) return;
		container.innerHTML = '';
		items.forEach((item, index) => {
			const element = builder(item, index);
			if (element) {
				container.appendChild(element);
			}
		});
	};

	const buildMetricCard = (metric = {}, index = 0) => {
		const card = document.createElement('article');
		card.className =
			'bg-white border border-gray-200 rounded-3xl p-6 shadow-sm animate-on-scroll';
		card.style.transitionDelay = `${index * 80}ms`;

		if (metric.badge) {
			const badge = document.createElement('span');
			badge.className =
				'inline-flex items-center px-3 py-1 text-xs font-semibold uppercase tracking-widest rounded-full bg-brand-blue/10 text-brand-blue';
			badge.textContent = metric.badge;
			card.appendChild(badge);
		}

		const title = document.createElement('h3');
		title.className = 'mt-4 text-xl font-semibold text-gray-900';
		title.textContent = metric.title || '';
		card.appendChild(title);

		const description = document.createElement('p');
		description.className = 'mt-3 text-gray-600';
		description.textContent = metric.description || '';
		card.appendChild(description);

		return card;
	};

	const buildDeviceCard = (device = {}, index = 0) => {
		const card = document.createElement('article');
		card.className =
			'bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden flex flex-col animate-on-scroll';
		card.style.transitionDelay = `${index * 80}ms`;

		const figure = document.createElement('div');
		figure.className = 'bg-gray-50 h-56 flex items-center justify-center';
		const image = document.createElement('img');
		image.src = device.image || '';
		image.alt = device.title || 'Equipamento de mobilidade';
		image.loading = 'lazy';
		image.className = 'max-h-48 object-contain';
		figure.appendChild(image);

		const body = document.createElement('div');
		body.className = 'p-6 flex flex-col flex-1';
		const title = document.createElement('h3');
		title.className = 'text-xl font-semibold';
		title.textContent = device.title || '';
		const description = document.createElement('p');
		description.className = 'mt-3 text-gray-600 flex-1';
		description.textContent = device.description || '';
		body.appendChild(title);
		body.appendChild(description);

		card.appendChild(figure);
		card.appendChild(body);
		return card;
	};

	const buildAutonomyCard = (feature = {}, index = 0) => {
		const card = document.createElement('article');
		card.className =
			'bg-white/10 rounded-3xl p-6 backdrop-blur border border-white/10 animate-on-scroll';
		card.style.transitionDelay = `${index * 80}ms`;

		const imgWrapper = document.createElement('div');
		imgWrapper.className = 'rounded-2xl overflow-hidden bg-white/5 mb-4';
		const image = document.createElement('img');
		image.src = feature.image || '';
		image.alt = feature.title || 'Integração conectada';
		image.loading = 'lazy';
		image.className = 'w-full h-48 object-contain mix-blend-screen';
		imgWrapper.appendChild(image);

		const title = document.createElement('h3');
		title.className = 'text-xl font-semibold text-white';
		title.textContent = feature.title || '';

		const description = document.createElement('p');
		description.className = 'mt-3 text-white/80';
		description.textContent = feature.description || '';

		card.appendChild(imgWrapper);
		card.appendChild(title);
		card.appendChild(description);
		return card;
	};

	const render = (content) => {
		if (!content) return () => {};
		applyLinkKeys(content);
		renderCollection('mobility-metrics', content.metrics, buildMetricCard);
		renderCollection(
			'mobility-devices-grid',
			content.devices,
			buildDeviceCard
		);
		renderCollection(
			'mobility-autonomy-grid',
			content.autonomy,
			buildAutonomyCard
		);
		return () => {};
	};

	return { render };
})();

const solutionsPage = (() => {
	const renderCollection = (containerId, items = [], builder) => {
		const container = document.getElementById(containerId);
		if (!container || !Array.isArray(items)) return;
		container.innerHTML = '';
		items.forEach((item, index) => {
			const element = builder(item, index);
			if (element) {
				container.appendChild(element);
			}
		});
	};

	const buildBadge = (badge = {}) => {
		const wrapper = document.createElement('div');
		wrapper.className =
			'badge-glow inline-flex items-center gap-3 rounded-full bg-white/10 px-4 py-2 border border-white/20 backdrop-blur';
		if (badge.image) {
			const image = document.createElement('img');
			image.src = badge.image;
			image.alt = badge.label || 'Disponível';
			image.className = 'h-6 w-6 object-contain';
			wrapper.appendChild(image);
		}
		const label = document.createElement('span');
		label.className = 'text-sm font-semibold';
		label.textContent = badge.label || '';
		wrapper.appendChild(label);
		return wrapper;
	};

	const buildDeliveryPoint = (text = '') => {
		const item = document.createElement('li');
		item.className = 'flex items-start gap-3 text-gray-700';
		const icon = document.createElement('span');
		icon.className =
			'mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-brand-blue/10 text-brand-blue';
		icon.innerHTML =
			'<svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>';
		const textNode = document.createElement('p');
		textNode.className = 'flex-1';
		textNode.textContent = text;
		item.appendChild(icon);
		item.appendChild(textNode);
		return item;
	};

	const buildHighlight = (highlight = {}) => {
		const wrapper = document.createElement('div');
		wrapper.className =
			'rounded-2xl bg-white shadow-sm p-5 border border-gray-100';
		const title = document.createElement('h3');
		title.className = 'text-lg font-semibold text-gray-900';
		title.textContent = highlight.title || '';
		const desc = document.createElement('p');
		desc.className = 'mt-2 text-gray-600';
		desc.textContent = highlight.description || '';
		wrapper.appendChild(title);
		wrapper.appendChild(desc);
		return wrapper;
	};

	const buildIntegrationCard = (integration = {}) => {
		const article = document.createElement('article');
		article.className =
			'rounded-3xl border border-gray-100 p-6 shadow-sm bg-white flex flex-col gap-4';
		const badge = document.createElement('span');
		badge.className =
			'inline-flex w-12 h-12 items-center justify-center rounded-full bg-brand-blue/10 text-brand-blue font-semibold';
		badge.textContent = integration.badge || '•';
		const title = document.createElement('h3');
		title.className = 'text-xl font-semibold text-gray-900';
		title.textContent = integration.title || '';
		const desc = document.createElement('p');
		desc.className = 'text-gray-600';
		desc.textContent = integration.description || '';
		article.appendChild(badge);
		article.appendChild(title);
		article.appendChild(desc);
		return article;
	};

	const buildTrend = (text = '', index = 0) => {
		const row = document.createElement('div');
		row.className = 'flex items-start gap-4';
		const badge = document.createElement('span');
		badge.className =
			'flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white font-semibold';
		badge.textContent = String(index + 1).padStart(2, '0');
		const copy = document.createElement('p');
		copy.className = 'text-white/90 flex-1';
		copy.textContent = text;
		row.appendChild(badge);
		row.appendChild(copy);
		return row;
	};

	const render = (content) => {
		if (!content) return () => {};
		applyLinkKeys(content);
		renderCollection('plus-hero-badges', content.heroBadges, buildBadge);
		renderCollection(
			'delivery-points',
			content.deliveryPoints,
			buildDeliveryPoint
		);
		renderCollection(
			'payment-highlights',
			content.paymentHighlights,
			buildHighlight
		);
		renderCollection(
			'solutions-plus-integrations',
			content.integrations,
			buildIntegrationCard
		);
		renderCollection(
			'solutions-plus-trends',
			content.trendsList,
			buildTrend
		);
		return () => {};
	};

	return { render };
})();

const SiteApp = (() => {
	let cachedContent = null;

	const PAGE_ALIASES = {
		solucoes: 'solutions',
		mais: 'solutions',
		precos: 'pricing',
		contato: 'contact',
	};

	const normalizePageKey = (key = 'home') => PAGE_ALIASES[key] || key;

	const loadContent = async () => {
		if (cachedContent) return cachedContent;
		cachedContent = await contentLoader.fetchLocalContent();
		return cachedContent;
	};

	const getPageContent = async (pageKey = 'home') => {
		const normalizedKey = normalizePageKey(pageKey);
		const allContent = await loadContent();
		if (!allContent) return null;
		const nextContent = {
			...allContent.common,
			...(allContent[normalizedKey] || {}),
		};
		if (!allContent[normalizedKey]) {
			console.warn(
				`Chave de página "${pageKey}" não encontrada em content.json.`
			);
		}
		return nextContent;
	};

	const renderPage = async (pageKey = 'home') => {
		const normalizedKey = normalizePageKey(pageKey);
		const pageContent = await getPageContent(pageKey);
		if (!pageContent) {
			return { content: null, cleanup: () => {} };
		}
		contentLoader.populatePage(pageContent);
		pageInteractions.setNavMode(
			normalizedKey === 'home' ? 'transparent' : 'solid'
		);
		const cleanup = (() => {
			const cleanups = [];
			if (normalizedKey === 'home') {
				cleanups.push(pageInteractions.initHeroCarousel(pageContent));
				cleanups.push(
					pageInteractions.initVideoCarousel(pageContent?.videos)
				);
				cleanups.push(pageInteractions.initScrollAnimations());
				cleanups.push(pageInteractions.initCounterAnimations());
			} else if (normalizedKey === 'mobilidade') {
				cleanups.push(mobilityPage.render(pageContent));
				cleanups.push(pageInteractions.initScrollAnimations());
			} else if (normalizedKey === 'solutions') {
				cleanups.push(solutionsPage.render(pageContent));
				cleanups.push(pageInteractions.initScrollAnimations());
			}
			return () => {
				cleanups.forEach((fn) => {
					if (typeof fn === 'function') {
						try {
							fn();
						} catch (error) {
							console.warn('Falha ao limpar interação:', error);
						}
					}
				});
			};
		})();
		return { content: pageContent, cleanup };
	};

	const initializeShell = async () => {
		const allContent = await loadContent();
		if (!allContent) return null;
		contentLoader.populatePage(allContent.common);
		pageInteractions.initNavDropdowns();
		pageInteractions.initMobileNav();
		return allContent;
	};

	const initializeStandalonePage = async () => {
		const pageKey = document.body.id || 'home';
		const result = await renderPage(pageKey);
		return result;
	};

	return {
		loadContent,
		renderPage,
		initializeShell,
		initializeStandalonePage,
	};
})();

window.SiteApp = SiteApp;

document.addEventListener('DOMContentLoaded', () => {
	if (document.body.id === 'app-shell') {
		window.__SiteAppShellReady = SiteApp.initializeShell();
	} else {
		SiteApp.initializeStandalonePage();
	}
});
