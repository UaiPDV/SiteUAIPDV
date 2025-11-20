(function () {
	const routes = {
		home: 'home.html',
		mobilidade: 'mobilidade.html',
		solutions: 'solucoes.html',
		videos: 'videos.html',
		acesso: 'acesso.html',
		segmentos: 'segmentos/index.html',
	};

	const defaultRoute = 'home';
	let currentRoute = null;
	let currentCleanup = () => {};

	const getMainContainer = () => document.getElementById('page-content');

	const setActiveNav = (route) => {
		const navLinks = document.querySelectorAll('[data-route]');
		navLinks.forEach((link) => {
			const isActive = link.dataset.route === route;
			if (isActive) {
				link.classList.add(
					'text-brand-blue',
					'font-semibold',
					'is-active'
				);
				link.classList.remove('text-white', 'text-gray-900');
			} else {
				link.classList.remove(
					'text-brand-blue',
					'font-semibold',
					'is-active'
				);
			}
			link.dataset.active = isActive ? 'true' : 'false';
		});
	};

	const fetchPageMarkup = async (routeKey) => {
		const url = routes[routeKey] || routes[defaultRoute];
		const response = await fetch(url);
		if (!response.ok) {
			throw new Error(`Falha ao carregar ${url}: ${response.status}`);
		}

		const html = await response.text();
		const parser = new DOMParser();
		const doc = parser.parseFromString(html, 'text/html');
		const pageMain = doc.querySelector('main#page-content');
		const bodyId = doc.body?.id || routeKey || defaultRoute;
		const content = pageMain
			? pageMain.innerHTML
			: doc.body?.innerHTML || html;

		return { content, bodyId };
	};

	const renderRoute = async (routeKey, { pushState = true } = {}) => {
		const main = getMainContainer();
		if (!main) {
			console.error('Elemento <main id="page-content"> não encontrado.');
			return;
		}

		if (typeof currentCleanup === 'function') {
			try {
				currentCleanup();
			} catch (error) {
				console.warn('Falha ao limpar rota anterior:', error);
			}
		}
		currentCleanup = () => {};

		const targetRoute = routes[routeKey] ? routeKey : defaultRoute;
		main.setAttribute('data-loading', 'true');
		main.innerHTML =
			'<div class="py-16 text-center text-gray-500">Carregando conteúdo...</div>';

		try {
			const { content, bodyId } = await fetchPageMarkup(targetRoute);
			main.innerHTML = content;
			main.removeAttribute('data-loading');
			main.dataset.page = bodyId;

			if (
				!window.SiteApp ||
				typeof window.SiteApp.renderPage !== 'function'
			) {
				console.error('SiteApp.renderPage não encontrado.');
				return;
			}

			const { cleanup } = await window.SiteApp.renderPage(bodyId);
			if (typeof cleanup === 'function') {
				currentCleanup = cleanup;
			}

			currentRoute = targetRoute;
			setActiveNav(targetRoute);
			if (pushState) {
				history.pushState(
					{ route: targetRoute },
					'',
					`#${targetRoute}`
				);
			} else if (!history.state || history.state.route !== targetRoute) {
				history.replaceState(
					{ route: targetRoute },
					'',
					`#${targetRoute}`
				);
			}
			window.scrollTo(0, 0);
		} catch (error) {
			console.error('Erro ao renderizar rota:', error);
			main.innerHTML =
				'<div class="py-16 text-center text-red-600">Não foi possível carregar esta página.</div>';
		} finally {
			main.removeAttribute('data-loading');
		}
	};

	const handleNavClick = (event) => {
		const link = event.target.closest('[data-route]');
		if (!link) return;
		const route = link.dataset.route;
		if (!route || currentRoute === route) {
			event.preventDefault();
			return;
		}
		event.preventDefault();
		renderRoute(route);
	};

	const handlePopState = (event) => {
		const route =
			event.state?.route ||
			window.location.hash.replace('#', '') ||
			defaultRoute;
		renderRoute(route, { pushState: false });
	};

	document.addEventListener('DOMContentLoaded', async () => {
		if (document.body.id !== 'app-shell') return;

		try {
			await (window.__SiteAppShellReady || Promise.resolve());
		} catch (error) {
			console.warn('Shell não inicializado completamente:', error);
		}

		document.addEventListener('click', handleNavClick);
		window.addEventListener('popstate', handlePopState);

		const initialRoute =
			window.location.hash.replace('#', '') || defaultRoute;
		await renderRoute(initialRoute, { pushState: false });
	});
})();
