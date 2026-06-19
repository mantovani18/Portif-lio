
/**
 * Inicializa o sistema de filtros da grade de projetos.
 */
function inicializarFiltros() {
  const botoesFiltro   = document.querySelectorAll('.filtro-btn');
  const cards          = document.querySelectorAll('.projeto-card');
  const semResultados  = document.getElementById('semResultados');

  if (!botoesFiltro.length || !cards.length) return;

  botoesFiltro.forEach(function (botao) {
    botao.addEventListener('click', function () {
      const filtroSelecionado = botao.dataset.filtro;

      // Atualiza o botão ativo
      botoesFiltro.forEach(function (btn) {
        btn.classList.remove('ativo');
      });
      botao.classList.add('ativo');

      // Filtra os cards
      let visiveis = 0;

      cards.forEach(function (card) {
        const categoriaCard = card.dataset.categoria;
        const deveExibir    = filtroSelecionado === 'todos' || categoriaCard === filtroSelecionado;

        if (deveExibir) {
          card.style.display = '';
          visiveis++;
        } else {
          card.style.display = 'none';
        }
      });

      // Exibe mensagem se não houver resultados
      if (semResultados) {
        semResultados.hidden = visiveis > 0;
      }
    });
  });
}

/* ── Inicializa quando o DOM estiver pronto ── */
document.addEventListener('DOMContentLoaded', function () {
  inicializarFiltros();
});
