var chatList = document.getElementById('chat-list');
var chatInput = document.querySelector('.chat-input input');
var sendBtn = document.querySelector('.chat-input button');

function escaparHtml(texto) {
  return texto
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function enviarMensagem() {
  var texto = chatInput.value.trim();
  if (!texto) return;

  var msg = document.createElement('div');
  msg.className = 'walker-card msg-user';
  msg.innerHTML = '<div><strong>Você:</strong> ' + escaparHtml(texto) + '</div>';
  chatList.appendChild(msg);

  chatInput.value = '';
  chatInput.focus();
  chatList.scrollTop = chatList.scrollHeight;
}

sendBtn.addEventListener('click', enviarMensagem);
chatInput.addEventListener('keydown', function(e) {
  if (e.key === 'Enter') enviarMensagem();
});
