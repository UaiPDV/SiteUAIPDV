/**
 * Lógica principal da aplicação.
 * Este script é carregado em todas as páginas HTML.
 */

// Objeto para simular a busca de dados.
// ... (contentLoader - sem alterações) ...
const contentLoader = {
	/**
	 * Busca o conteúdo do arquivo JSON local.
	 * @returns {Promise<Object>} O objeto JSON com todo o conteúdo do site.
	 */
	fetchLocalContent: async () => {
		try {
			// O caminho é relativo à raiz do site (onde o HTML está).
			const response = await fetch('data/content.json');
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			return await response.json();
		} catch (error) {
			console.error('Falha ao carregar content.json:', error);
			return null; // Retorna nulo em caso de falha
		}
	},

	/**
	 * Busca o conteúdo do Firestore (Implementação futura).
	 * @param {string} pageKey - A chave da página (ex: 'home', 'solutions').
	 * @returns {Promise<Object>} O objeto com o conteúdo da página.
	 */
	fetchFromFirestore: async (pageKey) => {
		// ... (simulação de firestore)
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

		// Seleciona todos os elementos que têm o atributo 'data-key'
		const elements = document.querySelectorAll('[data-key]');

		elements.forEach((element) => {
			const key = element.getAttribute('data-key');

			// Verifica se a chave existe no objeto de conteúdo
			if (content.hasOwnProperty(key)) {
				// Atualiza o textContent do elemento
				element.textContent = content[key];
			} else {
				// Aviso se uma chave no HTML não for encontrada no JSON
				console.warn(`Chave não encontrada no JSON: ${key}`, element);
			}
		});
	},
};

/**
 * Lógica de interação da página.
 */
const pageInteractions = {
	/**
	 * Alterna a barra de navegação entre transparente e sólida ao rolar.
	 */
	handleNavScroll: () => {
		const nav = document.getElementById('main-nav');
		if (!nav) return;

		// Seleciona os links de navegação para mudar a cor do texto
		const navLinks = nav.querySelectorAll(
			'.hidden.md\\:flex a, .hidden.md\\:flex button'
		);

		const scrollThreshold = 50; // Distância de scroll para mudar o nav

		const updateNav = () => {
			if (window.scrollY > scrollThreshold) {
				nav.classList.add('bg-white', 'shadow-md');
				nav.classList.remove('bg-transparent');
				// Muda a cor dos links para escuro
				navLinks.forEach((link) => {
					link.classList.add('text-gray-900');
					link.classList.remove('text-white');
					// Mantém o link ativo da cor da marca
					if (
						link.href &&
						(link.href.includes('index.html') ||
							link.href.endsWith('/'))
					) {
						link.classList.add('text-brand-blue');
						link.classList.remove('text-gray-900');
					}
				});
			} else {
				nav.classList.remove('bg-white', 'shadow-md');
				nav.classList.add('bg-transparent');
				// Muda a cor dos links para branco (exceto o ativo)
				navLinks.forEach((link) => {
					link.classList.add('text-white');
					link.classList.remove('text-gray-900');
					// Mantém o link ativo da cor da marca (ou branco se preferir)
					if (
						link.href &&
						(link.href.includes('index.html') ||
							link.href.endsWith('/'))
					) {
						link.classList.add('text-brand-blue');
						link.classList.remove('text-white');
					}
				});
			}
		};

		window.addEventListener('scroll', updateNav);
		updateNav(); // Executa uma vez no carregamento para definir o estado inicial
	},

	/**
	 * Inicializa o carrossel de imagens de fundo da seção hero.
	 */
	initHeroCarousel: (content) => {
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
			console.error('Elementos do carrossel Hero não encontrados.');
			return;
		}

		const slides = content?.heroSlides;

		if (!slides || !Array.isArray(slides) || slides.length === 0) {
			console.error(
				'Dados dos slides do Hero (heroSlides) não encontrados no content.json.'
			);
			titleElement.textContent = 'Erro ao carregar';
			subtitleElement.textContent = 'Verifique o content.json';
			return;
		}

		let currentIndex = 0;
		let slideInterval;
		const slideDuration = 5000; // FIX 3: 5 segundos
		const transitionSpeed = 700; // Duração da transição (deve ser menor que a duração do slide)

		const imgElements = [];
		const indicatorElements = [];

		// Função para ir para um slide específico
		const goToSlide = (index) => {
			if (index === currentIndex) return;

			const prevIndex = currentIndex;
			currentIndex = index;

			// Atualiza Imagens
			imgElements[prevIndex].classList.remove('opacity-100');
			imgElements[prevIndex].classList.add('opacity-0');
			imgElements[currentIndex].classList.remove('opacity-0');
			imgElements[currentIndex].classList.add('opacity-100');

			// Atualiza Texto (Fade out)
			titleElement.classList.add('opacity-0');
			subtitleElement.classList.add('opacity-0');

			setTimeout(() => {
				// Atualiza o conteúdo do texto
				titleElement.textContent = slides[currentIndex].title;
				subtitleElement.textContent = slides[currentIndex].subtitle;
				// Fade in
				titleElement.classList.remove('opacity-0');
				subtitleElement.classList.remove('opacity-0');
			}, transitionSpeed / 2); // Atualiza o texto no meio da transição

			// Atualiza Indicadores
			indicatorElements[prevIndex].classList.remove('bg-white');
			indicatorElements[prevIndex].classList.add('bg-white/50');
			indicatorElements[currentIndex].classList.remove('bg-white/50');
			indicatorElements[currentIndex].classList.add('bg-white');

			// Reseta o intervalo
			clearInterval(slideInterval);
			slideInterval = setInterval(nextSlide, slideDuration);
		};

		// Função para avançar para o próximo slide
		const nextSlide = () => {
			const nextIndex = (currentIndex + 1) % slides.length;
			goToSlide(nextIndex);
		};

		// Inicialização
		slides.forEach((slide, index) => {
			// Cria Imagens
			const img = document.createElement('img');
			img.src = slide.image;
			// FIX 3: Transição mais suave (duração maior)
			img.className =
				'absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out';
			if (index === 0) {
				img.classList.add('opacity-100');
			} else {
				img.classList.add('opacity-0');
			}
			carouselContainer.appendChild(img);
			imgElements.push(img);

			// Cria Indicadores
			const indicator = document.createElement('button');
			indicator.className =
				'w-3 h-3 rounded-full transition-all duration-300';
			if (index === 0) {
				indicator.classList.add('bg-white');
			} else {
				indicator.classList.add('bg-white/50');
			}
			indicator.addEventListener('click', () => goToSlide(index));
			indicatorsContainer.appendChild(indicator);
			indicatorElements.push(indicator);
		});

		// Define o texto inicial
		titleElement.textContent = slides[0].title;
		subtitleElement.textContent = slides[0].subtitle;

		// Inicia o intervalo
		slideInterval = setInterval(nextSlide, slideDuration);
	},

	/**
	 * --- INÍCIO: REQUISIÇÃO 3 - Lógica do Carrossel de Vídeos ---
	 * Inicializa o carrossel de vídeos da seção "Veja em Ação".
	 */
	initVideoCarousel: () => {
		const container = document.getElementById('video-carousel-container');
		const track = document.getElementById('video-carousel-track');
		const nextButton = document.getElementById('video-next');
		const prevButton = document.getElementById('video-prev');

		if (!container || !track || !nextButton || !prevButton) {
			console.warn('Elementos do carrossel de vídeo não encontrados.');
			return;
		}

		const slides = Array.from(track.children);
		if (slides.length === 0) {
			console.warn('Nenhum slide encontrado no carrossel de vídeo.');
			return;
		}

		let currentIndex = 0;
		const totalSlides = slides.length;

		// Função para saber quantos slides estão visíveis
		const getSlidesPerView = () => {
			if (window.innerWidth >= 1024) return 3; // lg (3 slides)
			if (window.innerWidth >= 768) return 2; // md (2 slides)
			return 1; // sm (1 slide)
		};

		// Função principal para atualizar a posição do carrossel
		const updateCarouselState = () => {
			const slidesPerView = getSlidesPerView();
			const maxIndex = totalSlides - slidesPerView;

			// Garante que o índice não saia dos limites
			if (currentIndex > maxIndex) {
				currentIndex = maxIndex;
			}
			if (currentIndex < 0) {
				currentIndex = 0;
			}

			// Calcula a largura de um slide.
			// Usar clientWidth do contêiner dividido por slides visíveis
			// é mais robusto do que offsetWidth do slide, pois lida
			// com o box-sizing e padding (px-4) dos slides.
			const slidePixelWidth = container.clientWidth / slidesPerView;

			// Aplica a transformação CSS para mover o 'track'
			track.style.transform = `translateX(-${
				currentIndex * slidePixelWidth
			}px)`;

			// Atualiza o estado (ativado/desativado) dos botões
			prevButton.disabled = currentIndex === 0;
			nextButton.disabled = currentIndex >= maxIndex;
		};

		// Adiciona os eventos de clique
		nextButton.addEventListener('click', () => {
			const slidesPerView = getSlidesPerView();
			const maxIndex = totalSlides - slidesPerView;
			if (currentIndex < maxIndex) {
				currentIndex++;
				updateCarouselState();
			}
		});

		prevButton.addEventListener('click', () => {
			if (currentIndex > 0) {
				currentIndex--;
				updateCarouselState();
			}
		});

		// Atualiza o carrossel se a tela for redimensionada
		window.addEventListener('resize', updateCarouselState);

		// Configuração inicial ao carregar a página
		updateCarouselState();
	},
	// --- FIM: REQUISIÇÃO 3 ---
};

/**
 * Função principal que inicializa o carregamento de conteúdo.
 */
async function initializePage() {
	// 1. Determina qual página estamos (pelo ID do <body>)
	const pageKey = document.body.id;
	if (!pageKey) {
		console.error(
			'O <body> da página precisa de um "id" (ex: "home", "solutions").'
		);
		return;
	}

	// 2. Define o modo de busca (fácil de trocar)
	const useFirestore = false; // Mude para 'true' para testar a lógica do Firestore

	let allContent = null;
	let pageContent = null;

	if (useFirestore) {
		// Lógica futura do Firestore (simulada por enquanto)
		pageContent = await contentLoader.fetchFromFirestore(pageKey);
	} else {
		// Lógica atual (JSON local)
		allContent = await contentLoader.fetchLocalContent();

		if (allContent) {
			if (allContent.hasOwnProperty(pageKey)) {
				// Combina o conteúdo comum (nav, footer) com o conteúdo da página
				pageContent = { ...allContent.common, ...allContent[pageKey] };
			} else {
				console.error(
					`Chave de página "${pageKey}" não encontrada em content.json.`
				);
				// Tenta carregar pelo menos o conteúdo comum
				pageContent = allContent.common;
			}
		}
	}

	// 3. Popula a página com o conteúdo encontrado
	if (pageContent) {
		contentLoader.populatePage(pageContent);
	} else {
		console.error('Falha ao obter qualquer conteúdo para a página.');
	}

	// --- NOVAS INTERAÇÕES ---
	// Executa as interações específicas da página 'home'
	if (document.body.id === 'home') {
		pageInteractions.handleNavScroll();
		// Passa o conteúdo carregado para a função
		pageInteractions.initHeroCarousel(pageContent);
		// Inicializa o novo carrossel de vídeos
		pageInteractions.initVideoCarousel();
	}
}

// Inicia a aplicação quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', initializePage);
