
function inicializarMenuMobile() {
  const btnMenu   = document.getElementById('btnMenu');
  const menuLista = document.querySelector('.menu-lista');

  if (!btnMenu || !menuLista) return;

  btnMenu.addEventListener('click', function () {
    const estaAberto = menuLista.classList.toggle('aberto');
    btnMenu.classList.toggle('aberto', estaAberto);
    btnMenu.setAttribute('aria-expanded', estaAberto);
  });

  // Fecha o menu ao clicar em qualquer link
  menuLista.querySelectorAll('.menu-link').forEach(function (link) {
    link.addEventListener('click', function () {
      menuLista.classList.remove('aberto');
      btnMenu.classList.remove('aberto');
      btnMenu.setAttribute('aria-expanded', 'false');
    });
  });

  // Fecha o menu ao clicar fora dele
  document.addEventListener('click', function (evento) {
    const clicouFora = !btnMenu.contains(evento.target) && !menuLista.contains(evento.target);
    if (clicouFora) {
      menuLista.classList.remove('aberto');
      btnMenu.classList.remove('aberto');
      btnMenu.setAttribute('aria-expanded', 'false');
    }
  });
}

// Executa quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', function () {
  inicializarMenuMobile();
});
