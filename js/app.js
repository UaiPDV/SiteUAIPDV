/**
 * Lógica principal da aplicação.
 * Este script é carregado em todas as páginas HTML.
 */

// Objeto para simular a busca de dados.
// No futuro, você pode substituir 'fetchLocalContent' pelo 'fetchFromFirestore'.
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
		// Esta é uma simulação.
		// Aqui você usaria as funções do Firebase SDK (getDoc, doc).
		// Ex:
		// const { getFirestore, doc, getDoc } = await import('firebase/firestore');
		// const db = getFirestore(app);
		// const pageRef = doc(db, 'siteContent', pageKey);
		// const pageSnap = await getDoc(pageRef);
		// const commonRef = doc(db, 'siteContent', 'common');
		// const commonSnap = await getDoc(commonRef);
		// if (pageSnap.exists() && commonSnap.exists()) {
		//     return { ...commonSnap.data(), ...pageSnap.data() };
		// } else {
		//     console.error("Conteúdo não encontrado no Firestore");
		//     return null;
		// }

		console.warn(
			'Modo Firestore ainda não implementado. Usando JSON local.'
		);
		// Como fallback, podemos chamar o local
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
				// Isso ajuda a debugar.
				console.warn(`Chave não encontrada no JSON: ${key}`, element);
			}
		});
	},
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
}

// Inicia a aplicação quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', initializePage);
