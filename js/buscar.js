document.addEventListener('DOMContentLoaded', function () {
  var searchInput  = document.getElementById('buscar-search');
  var lista        = document.getElementById('lista-walkers');
  var servicoAtivo = 'todos';
  var textoAtivo   = '';

  /* ---- filtro combinado ---- */
  function aplicarFiltros() {
    lista.querySelectorAll('li').forEach(function (item) {
      var nome     = item.querySelector('.walker-name').textContent.toLowerCase();
      var servicos = (item.dataset.servicos || '').split(',');

      var passaNome    = textoAtivo === '' || nome.includes(textoAtivo);
      var passaServico = servicoAtivo === 'todos' || servicos.includes(servicoAtivo);

      item.hidden = !(passaNome && passaServico);
    });
  }

  /* ---- chips de serviço ---- */
  var chips = document.querySelectorAll('.chips .chip');
  chips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      chips.forEach(function (c) {
        c.classList.remove('active');
        c.setAttribute('aria-pressed', 'false');
      });
      chip.classList.add('active');
      chip.setAttribute('aria-pressed', 'true');
      servicoAtivo = chip.dataset.servico;
      aplicarFiltros();
    });
  });

  /* ---- busca por texto ---- */
  if (searchInput) {
    searchInput.addEventListener('input', function () {
      textoAtivo = this.value.toLowerCase().trim();
      aplicarFiltros();
    });
  }

  /* ---- ordenação ---- */
  document.querySelectorAll('[data-sort]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      document.querySelectorAll('[data-sort]').forEach(function (b) {
        b.classList.remove('active');
      });
      btn.classList.add('active');
      ordenar(btn.dataset.sort);
    });
  });

  function ordenar(criterio) {
    var itens = Array.from(lista.querySelectorAll('li'));
    itens.sort(function (a, b) {
      var va = parseFloat(a.dataset[criterio]);
      var vb = parseFloat(b.dataset[criterio]);
      return criterio === 'preco' ? va - vb : vb - va;
    });
    itens.forEach(function (item) { lista.appendChild(item); });
  }
});
