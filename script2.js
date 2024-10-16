// Funções para ocultar containers e reiniciar a busca
function hideAllContainers() {
  if (!document.querySelector(".popup").classList.contains("animate")) {
    inicioContainer.style.display = "none";
    cardsContainer.style.display = "none";
    inicioContainerCopy.style.display = "none";
    document.querySelector(".header__navigation").style.display = "none";
  }
}

function resetSearch() {
  if (!document.querySelector(".popup").classList.contains("animate")) {
    searchInput.value = "";
    cards.forEach((card) => card.classList.remove("hidden"));
  }
}

// Seleciona elementos do DOM
const searchInput = document.getElementById("search-input");
const cards = document.querySelectorAll(".cards");
const inicioButton = document.querySelector(".ini_button");
const checkListsButton = document.querySelector(".library__button");
const inicioContainer = document.querySelector(".inicio-container");
const inicioContainerCopy = document.querySelector(".inicio-container-copy");
const cardsContainer = document.querySelector(".playlist-container");

// Adiciona evento de busca
searchInput.addEventListener("input", (e) => {
  const searchTerm = e.target.value.toLowerCase();
  const cardsArray = Array.from(cards);

  // Sort the arrays based on the search term
  cardsArray.sort((a, b) => {
    const textA = a.textContent.toLowerCase();
    const textB = b.textContent.toLowerCase();
    if (textA.includes(searchTerm) && textB.includes(searchTerm)) {
      return textA.localeCompare(textB);
    } else if (textA.includes(searchTerm)) {
      return -1;
    } else if (textB.includes(searchTerm)) {
      return 1;
    } else {
      return 0;
    }
  });

  // Update the display order of the elements
  cardsArray.forEach((card, index) => {
    card.style.order = index;
  });

  // Hide non-matching items
  cardsArray.forEach((card) => {
    const text = card.textContent.toLowerCase();
    if (text.includes(searchTerm)) {
      card.classList.remove("hidden");
    } else {
      card.classList.add("hidden");
    }
  });
});

// Adiciona eventos de clique nos botões
inicioButton.addEventListener("click", () => {
  hideAllContainers();
  inicioContainer.style.display = "block";
  inicioContainerCopy.style.display = "block";
  resetSearch();
  document.querySelector(".header__navigation").style.display = "none";
});

checkListsButton.addEventListener("click", () => {
  hideAllContainers();
  cardsContainer.style.display = "block";
  resetSearch();
  document.querySelector(".header__navigation").style.display = "block";
});

// Obter todos os cards do botão início
const inicioCards = document.querySelectorAll(".cards_ini");

// Seleciona todos os popups
const popups = document.querySelectorAll(".popup");

// Adiciona um evento de clique em cada card
inicioCards.forEach((card) => {
  card.addEventListener("click", (e) => {
    // Previna o comportamento padrão do link
    e.preventDefault();

    // Oculta todos os popups antes de mostrar o correto
    popups.forEach((popup) => {
      popup.style.display = "none";
      popup.classList.remove("animate");
    });

    // Mostrar o popup associado ao card
    const popupIndex = card.getAttribute("data-popup-index");
    const currentPopup = popups[popupIndex];
    currentPopup.style.display = "block";
    currentPopup.classList.add("animate");

    // Adiciona a classe ativa ao container de playlists
    const playlistContainer = document.querySelector(".playlist-container");
    playlistContainer.classList.add("active");
  });
});

// Adiciona um evento de clique no botão de fechar
document.querySelectorAll(".close-btn").forEach((closeBtn) => {
  closeBtn.addEventListener("click", () => {
    // Ocultar o popup e remover a classe de animação
    const popup = closeBtn.closest(".popup");
    popup.style.display = "none";
    popup.classList.remove("animate");

    // Remove a classe ativa do container de playlists
    const playlistContainer = document.querySelector(".playlist-container");
    playlistContainer.classList.remove("active");
  });
});