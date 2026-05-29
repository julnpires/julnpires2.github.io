/* ---- DETALHES-WALKER: seleção de horário ---- */
var timeBtns = document.querySelectorAll('.time-list .time-chip:not(.unavailable)');

if (timeBtns.length) {
  timeBtns.forEach(function(btn) {
    btn.addEventListener('click', function() {
      timeBtns.forEach(function(b) { b.classList.remove('selected'); });
      btn.classList.add('selected');
      sessionStorage.setItem('horario_selecionado', btn.textContent.trim());
    });
  });

  var btnAgendar = document.getElementById('btn-agendar');
  if (btnAgendar) {
    btnAgendar.addEventListener('click', function(e) {
      if (!sessionStorage.getItem('horario_selecionado')) {
        e.preventDefault();
        alert('Selecione um horário antes de continuar.');
      }
    });
  }
}

/* ---- HORARIOS: seleção de pet e serviço ---- */
var petLista = document.getElementById('pet-lista');
var servicoLista = document.getElementById('servico-lista');

if (petLista) {
  var horarioSalvo = sessionStorage.getItem('horario_selecionado');
  var horarioDisplay = document.getElementById('horario-display');
  if (horarioSalvo && horarioDisplay) {
    var hoje = new Date().toLocaleDateString('pt-BR', {
      weekday: 'long',
      day: '2-digit',
      month: '2-digit'
    });
    horarioDisplay.textContent = horarioSalvo + ' — ' + hoje;
  }

  petLista.querySelectorAll('.walker-card').forEach(function(card) {
    card.style.cursor = 'pointer';
    card.addEventListener('click', function() {
      petLista.querySelectorAll('.walker-card').forEach(function(c) {
        c.classList.remove('selected');
      });
      card.classList.add('selected');
      sessionStorage.setItem('pet_selecionado', card.querySelector('.walker-name').textContent.trim());
      atualizarCheckout();
    });
  });

  servicoLista.querySelectorAll('.walker-card').forEach(function(card) {
    card.style.cursor = 'pointer';
    card.addEventListener('click', function() {
      servicoLista.querySelectorAll('.walker-card').forEach(function(c) {
        c.classList.remove('selected');
      });
      card.classList.add('selected');
      sessionStorage.setItem('servico_selecionado', card.dataset.servico);
      atualizarCheckout();
    });
  });

  function atualizarCheckout() {
    var btn = document.getElementById('btn-checkout');
    if (!btn) return;
    var pronto = sessionStorage.getItem('pet_selecionado') && sessionStorage.getItem('servico_selecionado');
    btn.classList.toggle('btn-disabled', !pronto);
  }

  var btnCheckout = document.getElementById('btn-checkout');
  if (btnCheckout) {
    atualizarCheckout();
    btnCheckout.addEventListener('click', function(e) {
      if (!sessionStorage.getItem('pet_selecionado') || !sessionStorage.getItem('servico_selecionado')) {
        e.preventDefault();
        alert('Selecione um pet e um tipo de serviço para continuar.');
      }
    });
  }
}
