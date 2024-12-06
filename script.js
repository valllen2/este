function updateCounter() {
    const startDate = new Date("2024-07-16T00:00:00");
    const now = new Date();
  
    // Calcula a diferença em milissegundos
    const diff = now - startDate;
  
    // Calcula os anos, meses, dias, horas, minutos e segundos
    const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
    const months = Math.floor((diff % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30));
    const days = Math.floor((diff % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  
    // Atualiza os valores no HTML
    document.getElementById("years").textContent = years;
    document.getElementById("months").textContent = months;
    document.getElementById("days").textContent = days;
    document.getElementById("hours").textContent = hours;
    document.getElementById("minutes").textContent = minutes;
    document.getElementById("seconds").textContent = seconds;
  }
  
  // Atualiza o contador a cada segundo
  setInterval(updateCounter, 1000);
  updateCounter();


  const carousel = document.querySelector(".carousel");

  let isDragging = false;
  let startX = 0;
  let scrollLeft = 0;
  
  // Lista inicial de imagens
  const images = [
    "nos.jpg", "cu.jpg", "we.jpg", "us.jpg",
    "we2.jpg", "nos2.jpg", "mao.jpg", "meia.jpg",
  ];
  
  // Função para adicionar imagens ao carrossel
  function loadMoreImages(direction) {
    const newImages = images.map((src, index) => {
      const img = document.createElement("img");
      img.src = src;
      img.alt = `Imagem ${index + 1}`;
      return img;
    });
  
    if (direction === "right") {
      newImages.forEach((img) => carousel.appendChild(img));
    } else if (direction === "left") {
      newImages.reverse().forEach((img) => carousel.prepend(img));
    }
  }
  
  // Detecta o limite do carrossel
  function checkScrollEnd() {
    const maxScrollLeft = carousel.scrollWidth - carousel.clientWidth;
    if (carousel.scrollLeft <= 0) {
      loadMoreImages("left");
      carousel.scrollLeft += 200; // Ajusta a posição após adicionar imagens
    } else if (carousel.scrollLeft >= maxScrollLeft) {
      loadMoreImages("right");
    }
  }
  
  // Adiciona eventos de arraste
  carousel.addEventListener("mousedown", (e) => {
    isDragging = true;
    startX = e.pageX - carousel.offsetLeft;
    scrollLeft = carousel.scrollLeft;
    carousel.style.cursor = "grabbing";
  });
  
  carousel.addEventListener("mouseleave", () => {
    isDragging = false;
    carousel.style.cursor = "grab";
  });
  
  carousel.addEventListener("mouseup", () => {
    isDragging = false;
    carousel.style.cursor = "grab";
  });
  
  carousel.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - carousel.offsetLeft;
    const walk = (x - startX) * 1.5; // Ajuste a sensibilidade
    carousel.scrollLeft = scrollLeft - walk;
  });
  
  // Verifica os limites ao arrastar
  carousel.addEventListener("scroll", checkScrollEnd);
  
  // Inicializa as imagens
  loadMoreImages("right");
  
