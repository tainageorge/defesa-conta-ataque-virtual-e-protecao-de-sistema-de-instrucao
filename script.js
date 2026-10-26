// === ELEMENTOS DA TELA ===
const telas = {
    capa: document.getElementById('tela-capa'),
    jogo: document.getElementById('tela-jogo'),
    go: document.getElementById('tela-gameover'),
    v1: document.getElementById('tela-v1'),
    v2: document.getElementById('tela-v2'),
    v3: document.getElementById('tela-v3')
};

const el = {
    cardsPers: document.querySelectorAll('.card-personagem'),
    persEscolhido: document.getElementById('pers-escolhido'),
    btnIniciar: document.getElementById('btn-iniciar'),
    meuPers: document.getElementById('meu-pers'),
    cenaEmoji: document.getElementById('cena-emoji'),
    cenaTitulo: document.getElementById('cena-titulo'),
    cenaTexto: document.getElementById('cena-texto'),
    caixaBotoes: document.getElementById('caixa-botoes'),
    btnVoltar: document.getElementById('btn-voltar'),
    btnReiniciar: document.getElementById('btn-reiniciar'),
    btnNovamente1: document.getElementById('btn-novamente1'),
    btnNovamente2: document.getElementById('btn-novamente2'),
    btnNovamente3: document.getElementById('btn-novamente3'),
    vida: document.getElementById('vida')
};

// === VARIÁVEIS GLOBAIS ===
let personagem = null;
let cenaAtual = 'inicio';
let historico = [];

// === BASE DE CENAS ===
const cenas = {
    inicio: {
        emoji: '📱🌐🏠',
        titulo: '🚨 ALERTA NO SISTEMA!',
        texto: 'Você é o Guardião Digital. O hacker ❌CORRUPT❌ está atacando agora! Cada escolha muda tudo. Boa sorte!',
        escolhas: [
            { texto: '🛡️ Ativar Firewall imediatamente', prox: 'firewall' },
            { texto: '🔍 Analisar de onde vem o ataque', prox: 'analisar' },
            { texto: '📢 Avisar todos os usuários primeiro', prox: 'avisar' }
        ]
    },

    // Caminho Firewall
    firewall: {
        emoji: '🔥🛡️',
        titulo: 'Firewall Ativado!',
        texto: 'Portas externas bloqueadas! Mas chega um e-mail urgente: "Sistema em risco! Clique aqui para corrigir agora."',
        escolhas: [
            { texto: '🚫 PROÍBE — pode ser phishing!', prox: 'seguro1' },
            { texto: '🤔 Deixa clicarem, parece oficial', prox: 'go_phishing' },
            { texto: '🔍 Você verifica o link primeiro', prox: 'verifica_link' }
        ]
    },
    seguro1: {
        emoji: '✅🛡️💪',
        titulo: 'Boa decisão!',
        texto: 'Era um e-mail falso! Você salvou a rede. Agora aparece um programa desconhecido consumindo muita memória.',
        escolhas: [
            { texto: '🔄 Encerra o programa suspeito', prox: 'vitoria1' },
            { texto: '👀 Observa sem tocar ainda', prox: 'vitoria3' }
        ]
    },
    verifica_link: {
        emoji: '🔗🔍✅',
        titulo: 'Link verificado!',
        texto: 'Era um site falso com endereço quase igual! Você bloqueou o domínio.',
        escolhas: [
            { texto: '🔑 Troca todas as senhas + ativa 2FA', prox: 'vitoria2' },
            { texto: '📧 Avisa todos os usuários', prox: 'vitoria2' }
        ]
    },

    // Caminho Analisar
    analisar: {
        emoji: '🔎📡',
        titulo: 'Analisando o ataque...',
        texto: 'Descobriu! É um ataque DDoS — milhares de requisições sobrecarregando o servidor. Precisa agir RÁPIDO!',
        escolhas: [
            { texto: '⚡ Ativa proteção DDoS', prox: 'protegido' },
            { texto: '🚫 Bloqueia IP por IP manualmente', prox: 'go_lento' },
            { texto: '🔄 Reinicia os servidores', prox: 'reinicia' }
        ]
    },
    protegido: {
        emoji: '🌊🛑✨',
        titulo: 'Proteção ativada!',
        texto: 'O ataque foi filtrado! Agora o hacker tenta adivinhar senhas. O que fazer?',
        escolhas: [
            { texto: '🔒 Bloqueia tentativas de login', prox: 'vitoria1' },
            { texto: '📧 Avisa todos para trocarem senha', prox: 'vitoria2' }
        ]
    },
    reinicia: {
        emoji: '🔄🖥️',
        titulo: 'Servidores reiniciados',
        texto: 'O ataque foi interrompido, mas alguns serviços ficaram indisponíveis. Você precisa escolher o próximo passo.',
        escolhas: [
            { texto: '🧰 Restaurar os serviços com segurança', prox: 'vitoria1' },
            { texto: '🔍 Investigar o ataque antes de restaurar', prox: 'vitoria2' }
        ]
    },
    avisar: {
        emoji: '📢🛡️',
        titulo: 'Usuários avisados!',
        texto: 'Todos receberam orientações para não clicar em links suspeitos. Agora é hora de proteger o sistema.',
        escolhas: [
            { texto: '🔒 Ativar autenticação em dois fatores', prox: 'vitoria2' },
            { texto: '🧱 Reforçar o firewall', prox: 'vitoria1' }
        ]
    },
    go_phishing: {
        emoji: '🎣⚠️',
        titulo: 'Era phishing!',
        texto: 'O link instalou um programa malicioso e o sistema foi comprometido.',
        escolhas: [
            { texto: '🔄 Tentar novamente', prox: 'inicio' }
        ],
        gameover: true
    },
    go_lento: {
        emoji: '🐌💥',
        titulo: 'Ataque não contido',
        texto: 'O ataque cresceu mais rápido do que você conseguiu bloquear os IPs manualmente.',
        escolhas: [
            { texto: '🔄 Tentar novamente', prox: 'inicio' }
        ],
        gameover: true
    },
    vitoria1: {
        emoji: '🏆🛡️',
        titulo: 'Vitória!',
        texto: 'Você protegeu o sistema e impediu o ataque. Excelente trabalho, Guardião Digital!',
        escolhas: []
    },
    vitoria2: {
        emoji: '🏆🔐',
        titulo: 'Vitória com segurança!',
        texto: 'As contas foram protegidas e o ataque não conseguiu avançar. A segurança venceu!',
        escolhas: []
    },
    vitoria3: {
        emoji: '⚠️🕵️',
        titulo: 'Ameaça identificada!',
        texto: 'Você observou o programa e descobriu que ele era malicioso antes que causasse danos.',
        escolhas: [
            { texto: '🧹 Remover o programa', prox: 'vitoria1' },
            { texto: '🔄 Tentar novamente', prox: 'inicio' }
        ]
    }
};

function mostrarTela(tela) {
    Object.values(telas).forEach(item => item && item.classList.remove('ativa'));
    if (tela) tela.classList.add('ativa');
}

function renderizarCena() {
    const cena = cenas[cenaAtual];
    if (!cena) return;

    el.cenaEmoji.textContent = cena.emoji;
    el.cenaTitulo.textContent = cena.titulo;
    el.cenaTexto.textContent = cena.texto;
    el.caixaBotoes.innerHTML = '';

    cena.escolhas.forEach(escolha => {
        const botao = document.createElement('button');
        botao.type = 'button';
        botao.textContent = escolha.texto;
        botao.addEventListener('click', () => {
            historico.push(cenaAtual);
            cenaAtual = escolha.prox;
            renderizarCena();
        });
        el.caixaBotoes.appendChild(botao);
    });
}

function iniciarJogo() {
    personagem = el.persEscolhido.value || el.persEscolhido.dataset.personagem || null;
    cenaAtual = 'inicio';
    historico = [];
    mostrarTela(telas.jogo);
    renderizarCena();
}

el.cardsPers.forEach(card => {
    card.addEventListener('click', () => {
        el.cardsPers.forEach(item => item.classList.remove('selecionado'));
        card.classList.add('selecionado');
        const valor = card.dataset.personagem || card.dataset.pers || card.id;
        if (el.persEscolhido) el.persEscolhido.value = valor;
        if (el.btnIniciar) el.btnIniciar.disabled = false;
    });
});

if (el.btnIniciar) el.btnIniciar.addEventListener('click', iniciarJogo);
if (el.btnVoltar) el.btnVoltar.addEventListener('click', () => mostrarTela(telas.capa));
if (el.btnReiniciar) el.btnReiniciar.addEventListener('click', iniciarJogo);
if (el.btnNovamente1) el.btnNovamente1.addEventListener('click', iniciarJogo);
if (el.btnNovamente2) el.btnNovamente2.addEventListener('click', iniciarJogo);
if (el.btnNovamente3) el.btnNovamente3.addEventListener('click', iniciarJogo);

