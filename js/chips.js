document.addEventListener('DOMContentLoaded', function () {
  var chips       = document.querySelectorAll('.chips .chip');
  var lista       = document.getElementById('walker-list');
  var sectionLabel = document.getElementById('section-label');

  var titulos = {
    'passeio':    'Sugeridos para você',
    'hospedagem': 'Hospedagem disponível',
    'banho':      'Banho & Tosa',
    'vet':        'Veterinários disponíveis'
  };

  function filtrar(servico) {
    if (!lista) return;
    lista.querySelectorAll('li').forEach(function (item) {
      var servicos = (item.dataset.servicos || '').split(',');
      item.hidden = !servicos.includes(servico);
    });
    if (sectionLabel && titulos[servico]) {
      sectionLabel.textContent = titulos[servico];
    }
  }

  chips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      chips.forEach(function (c) {
        c.classList.remove('active');
        c.setAttribute('aria-pressed', 'false');
      });
      chip.classList.add('active');
      chip.setAttribute('aria-pressed', 'true');
      filtrar(chip.dataset.servico);
    });
  });

  /* aplica filtro inicial (chip ativo ao carregar) */
  var ativo = document.querySelector('.chips .chip.active');
  if (ativo) filtrar(ativo.dataset.servico);
});
