async function exibirCardInfo() {
    const cardContainer = document.getElementById("cardInfo");
    if (!cardContainer)
        return;

    const response = await fetch("/json/cards.json");
    const cards = await response.json();

    // sorteia card e define grupo de cores
    const card = cards[Math.floor(Math.random() * cards.length)];
    const temas = [
        { main: "var(--bs-success-bg-subtle)", sec: "var(--bs-success-text-emphasis)" },
        { main: "var(--bs-info-bg-subtle)", sec: "var(--bs-info-text-emphasis)" },
        { main: "var(--bs-primary-bg-subtle)", sec: "var(--bs-primary-text-emphasis)" },
        { main: "var(--bs-warning-bg-subtle)", sec: "var(--bs-warning-text-emphasis)" },
        { main: "var(--bs-light)", sec: "var(--bs-light-text-emphasis)" },
    ];

    // sorteia tema e insere no DOM com estilo inline
    const tema = temas[Math.floor(Math.random() * temas.length)];
    cardContainer.innerHTML = `
        <div 
            class="card border-0 p-3 mb-4 text-white"
            style="
                background-color: ${tema.main}; 
                box-shadow: 0 5px 0 ${tema.sec}; 
                color: ${tema.sec} !important;
            " 
            data-aos="fade" 
            data-aos-duration="1500"
        >
            <div class="row">
                <div class="col-auto d-sm-flex d-none">
                    <i class="${card.icone} fa-2xl mt-3"></i>
                </div>
                <div class="col">
                    <b class="text-uppercase">${card.titulo}</b>
                    <p class="mb-0">${card.texto}</p>
                </div>
            </div>
        </div>
    `;
}

document.addEventListener("DOMContentLoaded", function (event) {
    AOS.init();
    exibirCardInfo();
});