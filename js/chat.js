var chatList = document.getElementById('chat-list');
var chatInput = document.querySelector('.chat-input input');
var sendBtn = document.querySelector('.chat-input button');
var chatTitle = document.getElementById('chat-title');
var chatHeader = document.getElementById('chat-header');

var conversations = {
  Carla: {
    header: 'Passeio agendado — Hoje 14:00',
    messages: [
      { speaker: 'Carla', text: 'Oi Juliana! Vi que você agendou um passeio com a Mel para hoje às 14h. Pode me contar um pouco sobre ela?' },
      { speaker: 'Você', text: 'Oi Carla! A Mel adora correr, mas precisa de guia porque ainda puxa bastante na coleira.' },
      { speaker: 'Carla', text: 'Perfeito, vou levar água e escolher um roteiro mais tranquilo. Você prefere que eu passe antes em algum local específico?' },
      { speaker: 'Você', text: 'Sim, se puder parar no parque perto da praça, ela fica mais calma depois. Obrigada!' }
    ]
  },
  Bremmuda: {
    header: 'Conversa aberta — Ontem',
    messages: [
      { speaker: 'Bremmuda', text: 'Oi Juliana! Recebi sua mensagem sobre o passeio. Posso levar a Mel na terça de manhã, se você quiser.' },
      { speaker: 'Você', text: 'Oi! Terça funciona sim. Ela costuma gostar de passeios mais tranquilos e com água por perto.' },
      { speaker: 'Bremmuda', text: 'Perfeito, vou escolher um caminho com sombra e levar a garrafa de água. Te aviso se houver qualquer mudança.' }
    ]
  },
  Sabrina: {
    header: 'Fotos do passeio — Antes',
    messages: [
      { speaker: 'Sabrina', text: 'Oi Juliana! Tudo certo para o passeio? Posso enviar fotos depois do horário combinado.' },
      { speaker: 'Você', text: 'Oi Sabrina! Sim, por favor. A Mel adora correr, então fotos dela feliz seriam ótimas.' },
      { speaker: 'Sabrina', text: 'Ótimo! Vou mandar fotos e comentários assim que terminar o passeio.' }
    ]
  }
};

function escaparHtml(texto) {
  return texto
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function criarMensagem(mensagem) {
  var msg = document.createElement('div');
  msg.className = 'walker-card' + (mensagem.speaker === 'Você' ? ' msg-user' : '');
  msg.innerHTML = '<div><strong>' + mensagem.speaker + ':</strong> ' + escaparHtml(mensagem.text) + '</div>';
  return msg;
}

function carregarConversacao() {
  var params = new URLSearchParams(window.location.search);
  var nome = params.get('name') || 'Carla';
  if (!conversations[nome]) nome = 'Carla';

  var dados = conversations[nome];
  if (chatTitle) chatTitle.textContent = nome;
  if (chatHeader) chatHeader.textContent = dados.header;

  if (chatList) {
    chatList.innerHTML = '';
    dados.messages.forEach(function(mensagem) {
      chatList.appendChild(criarMensagem(mensagem));
    });
    chatList.scrollTop = chatList.scrollHeight;
  }
}

function enviarMensagem() {
  var texto = chatInput.value.trim();
  if (!texto) return;

  var msg = criarMensagem({ speaker: 'Você', text: texto });
  chatList.appendChild(msg);

  chatInput.value = '';
  chatInput.focus();
  chatList.scrollTop = chatList.scrollHeight;
}

sendBtn.addEventListener('click', enviarMensagem);
chatInput.addEventListener('keydown', function(e) {
  if (e.key === 'Enter') enviarMensagem();
});

carregarConversacao();
