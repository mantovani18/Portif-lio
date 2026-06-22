
function inicializarTypewriter() {
  const elementoNome = document.getElementById('nomeAnimado');
  if (!elementoNome) return;

  const textos = ['Pedro Mantovani'];
  let indiceTexto    = 0;
  let indiceLetra    = 0;
  let estáApagando   = false;
  let tempoEspera    = 120;

  function digitar() {
    const textoAtual = textos[indiceTexto];

    if (estáApagando) {
      // Remove uma letra
      elementoNome.textContent = textoAtual.substring(0, indiceLetra - 1);
      indiceLetra--;
      tempoEspera = 60;
    } else {
      // Adiciona uma letra
      elementoNome.textContent = textoAtual.substring(0, indiceLetra + 1);
      indiceLetra++;
      tempoEspera = 120;
    }

    // Texto completo 
    if (!estáApagando && indiceLetra === textoAtual.length) {
      tempoEspera = 1800;
      estáApagando = true;
    }

    // Texto apagado 
    if (estáApagando && indiceLetra === 0) {
      estáApagando = false;
      indiceTexto = (indiceTexto + 1) % textos.length;
      tempoEspera = 400;
    }

    setTimeout(digitar, tempoEspera);
  }

  // delay da pg para iniciar
  setTimeout(digitar, 600);
}


function inicializarContadores() {
  const elementos = document.querySelectorAll('.numero-valor[data-alvo]');
  if (!elementos.length) return;

  function animarContador(elemento, alvo, duracao) {
    const inicio     = performance.now();
    const valorInicial = 0;

    function passo(agora) {
      const progresso = Math.min((agora - inicio) / duracao, 1);
      // Easing: desacelera no final
      const fator    = 1 - Math.pow(1 - progresso, 3);
      const valorAtual = Math.round(valorInicial + fator * (alvo - valorInicial));
      elemento.textContent = valorAtual;

      if (progresso < 1) {
        requestAnimationFrame(passo);
      }
    }

    requestAnimationFrame(passo);
  }

  
  const observador = new IntersectionObserver(function (entradas) {
    entradas.forEach(function (entrada) {
      if (entrada.isIntersecting) {
        const elemento = entrada.target;
        const alvo     = parseInt(elemento.dataset.alvo, 10);
        animarContador(elemento, alvo, 1400);
        observador.unobserve(elemento); 
      }
    });
  }, { threshold: 0.4 });

  elementos.forEach(function (el) {
    observador.observe(el);
  });
}

// barras de progresso de habilidades
function inicializarBarrasHabilidade() {
  const barras = document.querySelectorAll('.barra-preenchimento[data-progresso]');
  if (!barras.length) return;

  const observador = new IntersectionObserver(function (entradas) {
    entradas.forEach(function (entrada) {
      if (entrada.isIntersecting) {
        const barra    = entrada.target;
        const progresso = barra.dataset.progresso;
        barra.style.width = progresso + '%';
        observador.unobserve(barra);
      }
    });
  }, { threshold: 0.3 });

  barras.forEach(function (barra) {
    observador.observe(barra);
  });
}

/* ── Inicializa tudo quando o DOM estiver pronto ── */
document.addEventListener('DOMContentLoaded', function () {
  inicializarTypewriter();
  inicializarContadores();
  inicializarBarrasHabilidade();
});
