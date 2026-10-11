const receitas = [
  { nome: "Motas", producao: 1, ingredientes: { "Kit Ferramentas": 1, "Ferro": 50, "Parafusos": 50, "Rodas de Mota": 2, "Sucata":25 } },
  { nome: "Pólvora", producao: 10, ingredientes: { "Frasco": 10, "Carvão": 17, "Enxofre": 17 } },
  { nome: "Assault Shotgun", producao: 1, ingredientes: { "Projecto SMG": 1, "Corpo Shotgun": 1, "Peças": 14 } },
];

const tabelaFabricacao = document.getElementById("tabela-fabricacao");
const tabelaTotais = document.getElementById("tabela-totais");
const btnLimpar = document.getElementById("btn-limpar");

// Renderizar Tabela Inicial (Sem o indicador (xN))
receitas.forEach((r, i) => {
  const tr = document.createElement("tr");

  tr.innerHTML = `
    <td><strong>${r.nome}</strong></td>
    <td>
      <input type="number" min="0" value="0" data-index="${i}" class="input-qtd">
    </td>
    <td id="res-${i}">-</td>
  `;

  tabelaFabricacao.appendChild(tr);
});

// Event Listener Centralizado para Inputs
tabelaFabricacao.addEventListener("input", (e) => {
  if (e.target.classList.contains("input-qtd")) {
    const index = e.target.dataset.index;
    const qtd = parseInt(e.target.value) || 0;
    atualizarLinhaReceita(index, qtd);
    atualizarTotais();
  }
});

function atualizarLinhaReceita(index, qtdDesejada) {
  const tdResultado = document.getElementById(`res-${index}`);
  
  if (qtdDesejada <= 0) {
    tdResultado.innerHTML = "-";
    return;
  }

  const receita = receitas[index];
  const lotes = Math.ceil(qtdDesejada / receita.producao);
  
  const badgesHTML = Object.entries(receita.ingredientes)
    .map(([ing, qtdBase]) => `<span class="ingredient-badge">${lotes * qtdBase}x ${ing}</span>`)
    .join(" ");

  tdResultado.innerHTML = badgesHTML;
}

function atualizarTotais() {
  const totais = {};
  const inputs = document.querySelectorAll(".input-qtd");

  inputs.forEach((input) => {
    const quantidade = parseInt(input.value) || 0;
    if (quantidade <= 0) return;

    const receita = receitas[input.dataset.index];
    const lotes = Math.ceil(quantidade / receita.producao);

    for (const [ingrediente, qtdBase] of Object.entries(receita.ingredientes)) {
      totais[ingrediente] = (totais[ingrediente] || 0) + (lotes * qtdBase);
    }
  });

  tabelaTotais.innerHTML = "";
  const listaTotais = Object.entries(totais).sort((a, b) => a[0].localeCompare(b[0]));

  if (listaTotais.length === 0) {
    tabelaTotais.innerHTML = '<tr><td colspan="2" class="empty-msg">Nenhum item selecionado</td></tr>';
    return;
  }

  listaTotais.forEach(([ingrediente, qtd]) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${ingrediente}</td>
      <td><strong style="color:#ff3333; font-size: 1.1rem;">${qtd}</strong></td>
    `;
    tabelaTotais.appendChild(tr);
  });
}

// Botão Limpar
btnLimpar.addEventListener("click", () => {
  document.querySelectorAll(".input-qtd").forEach(input => input.value = 0);
  receitas.forEach((_, i) => document.getElementById(`res-${i}`).innerHTML = "-");
  atualizarTotais();
});
