document.addEventListener('DOMContentLoaded', function () {

  /* ---- preview ao vivo ---- */
  function atualizar() {
    var nome  = (document.getElementById('pet-nome')  || {value:''}).value.trim() || 'Sem nome';
    var raca  = (document.getElementById('pet-raca')  || {value:''}).value.trim();
    var idade = (document.getElementById('pet-idade') || {value:''}).value.trim();
    var porte = (document.getElementById('pet-porte') || {value:''}).value;
    var cor   = (document.getElementById('pet-cor')   || {value:''}).value.trim();

    var pNome = document.getElementById('prev-nome');
    var pInfo = document.getElementById('prev-info');
    var pSub  = document.getElementById('prev-sub');

    if (pNome) pNome.textContent = nome;
    if (pInfo) pInfo.textContent = [idade, porte].filter(Boolean).join(' · ');
    if (pSub)  pSub.textContent  = [raca, cor].filter(Boolean).join(' · ') || '—';
  }

  ['pet-nome','pet-raca','pet-idade','pet-cor'].forEach(function (id) {
    var el = document.getElementById(id);
    if (el) el.addEventListener('input', atualizar);
  });
  ['pet-porte','pet-comportamento'].forEach(function (id) {
    var el = document.getElementById(id);
    if (el) el.addEventListener('change', atualizar);
  });

  /* ---- salvar pet ---- */
  var btnSalvar = document.getElementById('btn-salvar');
  if (!btnSalvar) return;

  btnSalvar.addEventListener('click', function (e) {
    e.preventDefault();

    var nomeEl = document.getElementById('pet-nome');
    var nome   = nomeEl ? nomeEl.value.trim() : '';

    if (!nome) {
      if (nomeEl) {
        nomeEl.focus();
        nomeEl.classList.add('input-erro');
        setTimeout(function () { nomeEl.classList.remove('input-erro'); }, 2000);
      }
      return;
    }

    var get = function (id) {
      var el = document.getElementById(id);
      return el ? el.value.trim() : '';
    };

    var pet = {
      nome:          nome,
      especie:       get('pet-especie') || 'Cachorro',
      raca:          get('pet-raca'),
      porte:         get('pet-porte'),
      idade:         get('pet-idade'),
      cor:           get('pet-cor'),
      comportamento: get('pet-comportamento')
    };

    try {
      var lista = JSON.parse(localStorage.getItem('petwalk_pets') || '[]');
      lista.push(pet);
      localStorage.setItem('petwalk_pets', JSON.stringify(lista));
    } catch (err) {}

    window.location.href = 'perfil-pets.html';
  });
});
