/*!
* Start Bootstrap - Shop Homepage v5.0.6 (https://startbootstrap.com/template/shop-homepage)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-shop-homepage/blob/master/LICENSE)
*/
// This file is intentionally blank
// Use this file to add JavaScript to your project

document.addEventListener('DOMContentLoaded', (event) => {
    // Recupera o contador de favoritos e a lista de favoritos do armazenamento da sessão
    let favoritosCount = sessionStorage.getItem('favoritosCount') ? parseInt(sessionStorage.getItem('favoritosCount')) : 0;
    let favoritosList = sessionStorage.getItem('favoritos') ? JSON.parse(sessionStorage.getItem('favoritos')) : [];

    // Atualiza o contador de favoritos na interface do usuário
    const favoritosBadge = document.querySelector('.badge');
    favoritosBadge.textContent = favoritosCount;

    // Seleciona todos os botões 'Adotar'
    const adotarBtns = document.querySelectorAll('.btn-outline-dark');

    // Adiciona um ouvinte de eventos 'click' a cada botão 'Adotar'
    adotarBtns.forEach((btn) => {
        btn.addEventListener('click', (event) => {
            event.preventDefault();

            // Incrementa o contador de favoritos
            favoritosCount++;

            // Adiciona o pet aos favoritos
            const card = event.target.closest('.card');
            const petName = card.querySelector('h5').textContent;
            const petImage = card.querySelector('.card-img-top').src;
            const petRace = card.querySelector('h6').textContent.split('(')[0].trim();
            if (favoritosList) {
                favoritosList.push({ name: petName, image: petImage, race: petRace });
            } else {
                favoritosList = [{ name: petName, image: petImage, race: petRace }];
            }
            

            // Atualiza o contador de favoritos na interface do usuário e no armazenamento da sessão
            favoritosBadge.textContent = favoritosCount;
            sessionStorage.setItem('favoritosCount', favoritosCount.toString());

            alert('Obrigado por adotar um pet! Seu total de favoritos agora é ' + favoritosCount);
        });
    });

    // Seleciona o botão 'Favoritos'
    const favoritosBtn = document.querySelector('.btn-outline-dark');

    // Adiciona um ouvinte de eventos 'click' ao botão 'Favoritos'
    favoritosBtn.addEventListener('click', (event) => {
        event.preventDefault();

        // Armazena a lista de favoritos no armazenamento da sessão
        sessionStorage.setItem('favoritos', JSON.stringify(favoritosList));

        // Redireciona o usuário para a página 'favorites.html'
        window.location.href = 'favorites.html';
    });

    // Recupera a lista de favoritos do armazenamento da sessão
    favoritosList = JSON.parse(sessionStorage.getItem('favoritos'));

    // Seleciona o contêiner onde os animais favoritos serão exibidos
    const favoritosContainer = document.querySelector('#favoritosContainer');

    // Cria e exibe um cartão para cada animal favorito
    favoritosList.forEach((pet, index) => {
        const petCard = document.createElement('div');
        petCard.classList.add('col', 'mb-5');
        petCard.innerHTML = `
<div class="card h-100">
<!-- Imagem do Pet -->
<img class="card-img-top" src="${pet.image}" alt="foto-do-pet" />
<!-- Detalhes do Pet -->
<div class="card-body p-4">
<div class="text-center">
<!-- Nome do Pet -->
<h5 class="fw-bolder">${pet.name}</h5>
<!-- Raça do Pet -->
${pet.race}
</div>
</div>
<!-- Ações -->
<div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
<div class="text-center"><a class="btn btn-outline-dark mt-auto" href="#">Remover dos Favoritos</a></div>
</div>
</div>
`;
        favoritosContainer.appendChild(petCard);

        // Adiciona um ouvinte de eventos 'click' ao botão 'Remover dos Favoritos'
        petCard.querySelector('.btn-outline-dark').addEventListener('click', (event) => {
            event.preventDefault();

            // Remove o pet dos favoritos
            favoritosList.splice(index, 1);
            sessionStorage.setItem('favoritos', JSON.stringify(favoritosList));

            // Decrementa o contador de favoritos
            favoritosCount--;
            favoritosBadge.textContent = favoritosCount;
            sessionStorage.setItem('favoritosCount', favoritosCount.toString());

            // Remove o cartão do pet do DOM
            favoritosContainer.removeChild(petCard);
        });
    });
});
