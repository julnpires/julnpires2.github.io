document.addEventListener('DOMContentLoaded', function () {
  var CHAVE = 'petwalk_pets';

  var padrao = [
    { nome: 'Simba',   especie: 'Gato',     raca: 'Laranja',          porte: 'Pequeno', idade: '3 anos', cor: 'Laranja',  comportamento: 'Amigável' },
    { nome: 'Arrice',  especie: 'Cachorro',  raca: 'Golden Retriever', porte: 'Grande',  idade: '2 anos', cor: 'Dourado',  comportamento: 'Amigável' },
    { nome: 'Rooki',   especie: 'Cachorro',  raca: 'Poodle',           porte: 'Pequeno', idade: '1 ano',  cor: 'Branco',   comportamento: 'Tímido'   },
    { nome: 'Nutella', especie: 'Cachorro',  raca: 'Labrador',         porte: 'Grande',  idade: '5 anos', cor: 'Caramelo', comportamento: 'Amigável' }
  ];

  if (!localStorage.getItem(CHAVE)) {
    localStorage.setItem(CHAVE, JSON.stringify(padrao));
  }

  var lista = document.getElementById('lista-pets');
  if (!lista) return;

  var avatares = ['img/avatar1.svg', 'img/avatar2.svg', 'img/avatar3.svg'];

  function esc(s) {
    return String(s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function renderizar() {
    var pets = JSON.parse(localStorage.getItem(CHAVE) || '[]');
    lista.innerHTML = '';

    if (pets.length === 0) {
      lista.innerHTML = '<li style="padding:1rem 0;color:var(--texto-leve);text-align:center;font-size:0.9rem;">Nenhum pet cadastrado ainda.</li>';
      return;
    }

    pets.forEach(function (pet, i) {
      var meta   = [pet.especie, pet.raca].filter(Boolean).join(' · ');
      var avatar = avatares[i % avatares.length];
      var li     = document.createElement('li');

      li.innerHTML =
        '<div class="walker-card">' +
          '<div class="walker-left">' +
            '<div class="avatar-wrap">' +
              '<img class="avatar" src="' + avatar + '" alt="' + esc(pet.nome) + '">' +
            '</div>' +
            '<div class="walker-info">' +
              '<div class="walker-name">' + esc(pet.nome) + '</div>' +
              '<div class="walker-meta">' + esc(meta) + '</div>' +
            '</div>' +
          '</div>' +
          '<button class="btn-del-pet" data-i="' + i + '" aria-label="Remover ' + esc(pet.nome) + '">×</button>' +
        '</div>';

      lista.appendChild(li);
    });

    lista.querySelectorAll('.btn-del-pet').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var pets = JSON.parse(localStorage.getItem(CHAVE) || '[]');
        var idx  = parseInt(btn.dataset.i, 10);
        var nome = pets[idx] ? pets[idx].nome : 'pet';
        if (window.confirm('Remover ' + nome + '?')) {
          pets.splice(idx, 1);
          localStorage.setItem(CHAVE, JSON.stringify(pets));
          renderizar();
        }
      });
    });
  }

  renderizar();
});
