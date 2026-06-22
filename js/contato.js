

// add meu numero de whatsapp para contato
const NUMERO_WHATSAPP = '5543996212570';

/** 
 
 * @param {HTMLElement} campo    - Input ou textarea inválido
 * @param {HTMLElement} spanErro - exibe a mensagem
 * @param {string}      mensagem - Texto do erro a exibir
 */
function mostrarErro(campo, spanErro, mensagem) {
  campo.classList.add('invalido');
  spanErro.textContent = mensagem;
}

/**
 * @param {HTMLElement} campo    - Input ou textarea
 * @param {HTMLElement} spanErro - Elemento de erro
 */
function limparErro(campo, spanErro) {
  campo.classList.remove('invalido');
  spanErro.textContent = '';
}

/**
 *
 * @returns {boolean}
 */
function validarFormulario() {
  const campoNome     = document.getElementById('campoNome');
  const campoEmail    = document.getElementById('campoEmail');
  const campoMensagem = document.getElementById('campoMensagem');
  const erroNome      = document.getElementById('erroNome');
  const erroEmail     = document.getElementById('erroEmail');
  const erroMensagem  = document.getElementById('erroMensagem');

  let formularioValido = true;

  // Limpa erros anteriores
  limparErro(campoNome,     erroNome);
  limparErro(campoEmail,    erroEmail);
  limparErro(campoMensagem, erroMensagem);

  // Valida nome
  if (!campoNome.value.trim()) {
    mostrarErro(campoNome, erroNome, 'Por favor, informe seu nome.');
    formularioValido = false;
  } else if (campoNome.value.trim().length < 2) {
    mostrarErro(campoNome, erroNome, 'Nome muito curto.');
    formularioValido = false;
  }

  // Valida e-mail com expressão regular
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!campoEmail.value.trim()) {
    mostrarErro(campoEmail, erroEmail, 'Por favor, informe seu e-mail.');
    formularioValido = false;
  } else if (!regexEmail.test(campoEmail.value.trim())) {
    mostrarErro(campoEmail, erroEmail, 'E-mail inválido. Ex: nome@dominio.com');
    formularioValido = false;
  }

  // Valida mensagem
  if (!campoMensagem.value.trim()) {
    mostrarErro(campoMensagem, erroMensagem, 'Por favor, escreva sua mensagem.');
    formularioValido = false;
  } else if (campoMensagem.value.trim().length < 10) {
    mostrarErro(campoMensagem, erroMensagem, 'Mensagem muito curta (mínimo 10 caracteres).');
    formularioValido = false;
  }

  return formularioValido;
}

/**
 *
 * @param {string} nome     - Nome de quem está entrando em contato
 * @param {string} email    - E-mail de quem está entrando em contato
 * @param {string} assunto  - Assunto da mensagem (opcional)
 * @param {string} mensagem - Corpo da mensagem
 */
function enviarParaWhatsApp(nome, email, assunto, mensagem) {
  const linhas = [
    'Nova mensagem do portfólio',
    '',
    `Nome: ${nome}`,
    `E-mail: ${email}`
  ];

  if (assunto) {
    linhas.push(`Assunto: ${assunto}`);
  }

  linhas.push('', 'Mensagem:', mensagem);

  const textoFormatado  = linhas.join('\n');
  const textoCodificado = encodeURIComponent(textoFormatado);

  const urlWhatsApp = `https://wa.me/${NUMERO_WHATSAPP}?text=${textoCodificado}`;

  window.open(urlWhatsApp, '_blank', 'noopener');
}


function inicializarFormulario() {
  const formulario        = document.getElementById('formularioContato');
  const btnEnviar          = document.getElementById('btnEnviar');
  const feedback           = document.getElementById('formularioFeedback');
  const textoBtnOriginal   = btnEnviar ? btnEnviar.innerHTML : '';

  if (!formulario) return;


  const campos = formulario.querySelectorAll('.campo-entrada');
  campos.forEach(function (campo) {
    campo.addEventListener('blur', function () {
      if (campo.required && !campo.value.trim()) {
        campo.classList.add('invalido');
      } else {
        campo.classList.remove('invalido');
      }
    });

    campo.addEventListener('input', function () {
      if (campo.classList.contains('invalido') && campo.value.trim()) {
        campo.classList.remove('invalido');
        const idErro   = campo.id.replace('campo', 'erro');
        const spanErro = document.getElementById(idErro);
        if (spanErro) spanErro.textContent = '';
      }
    });
  });

  // Submissão do formulário
  formulario.addEventListener('submit', function (evento) {
    evento.preventDefault(); 

    if (!validarFormulario()) return;

    const nome     = document.getElementById('campoNome').value.trim();
    const email    = document.getElementById('campoEmail').value.trim();
    const assunto  = document.getElementById('campoAssunto').value.trim();
    const mensagem = document.getElementById('campoMensagem').value.trim();

    // Feedback visual de carregamento
    btnEnviar.disabled    = true;
    btnEnviar.textContent = 'Abrindo WhatsApp...';

    setTimeout(function () {
      enviarParaWhatsApp(nome, email, assunto, mensagem);

      // Exibe mensagem de sucesso no DOM
      feedback.hidden      = false;
      feedback.className   = 'formulario-feedback sucesso';
      feedback.textContent = 'Pronto! O WhatsApp foi aberto com sua mensagem preenchida — só confirmar o envio.';

      // Reseta o formulário
      formulario.reset();
      btnEnviar.disabled  = false;
      btnEnviar.innerHTML = textoBtnOriginal;

      // Oculta o feedback após um tempo
      setTimeout(function () {
        feedback.hidden = true;
      }, 6000);

    }, 600);
  });
}


function inicializarBotaoFlutuante() {
  const botaoFlutuante = document.getElementById('btnWhatsappFlutuante');
  if (!botaoFlutuante) return;

  botaoFlutuante.addEventListener('click', function () {
    const mensagemPadrao = encodeURIComponent('Olá! Vi seu portfólio e gostaria de conversar.');
    window.open(`https://wa.me/${NUMERO_WHATSAPP}?text=${mensagemPadrao}`, '_blank', 'noopener');
  });
}

/**
 * Contador de caracteres
 */
function inicializarContadorMensagem() {
  const campoMensagem = document.getElementById('campoMensagem');
  const contador      = document.getElementById('contadorMensagem');
  if (!campoMensagem || !contador) return;

  const limiteMaximo = 500;

  campoMensagem.addEventListener('input', function () {
    const totalDigitado = campoMensagem.value.length;
    contador.textContent = `${totalDigitado}/${limiteMaximo}`;

    if (totalDigitado > limiteMaximo) {
      contador.style.color = 'var(--cor-erro)';
    } else {
      contador.style.color = 'var(--cor-texto-suave)';
    }
  });
}


document.addEventListener('DOMContentLoaded', function () {
  inicializarFormulario();
  inicializarBotaoFlutuante();
  inicializarContadorMensagem();
});
