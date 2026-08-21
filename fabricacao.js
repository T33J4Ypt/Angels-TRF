const receitas = [
  { nome: "Sushi", producao: 2, ingredientes: { "Arroz": 2, "Peixe": 2, "Alga Nori": 2 } },
  { nome: "Ramen", producao: 2, ingredientes: { "Carne Crua": 2, "Massa Instantânea": 2, "Levedura Industrial": 2 } },
  { nome: "Noodles do Mar", producao: 2, ingredientes: { "Peixe": 2, "Massa Instantânea": 2, "Cebola": 2 } },
  { nome: "Caixa Soul Sushi", producao: 3, ingredientes: { "Saquê": 3, "Sushi": 3 } },
  { nome: "Caixa Soul Sushi 2", producao: 3, ingredientes: { "Limonada": 3, "Ramen": 3 } },
  { nome: "Caixa Soul Sushi 3", producao: 3, ingredientes: { "Noodles do Mar": 3, "Chá Verde": 3 } },
  { nome: "Saquê", producao: 2, ingredientes: { "Arroz": 2, "Levedura Industrial": 2, "Álcool": 2 } },
  { nome: "Limonada", producao: 2, ingredientes: { "Torrões de Açucar": 2, "Garrafa de Água": 2, "Lima": 2 } },
  { nome: "Chá Verde", producao: 2, ingredientes: { "Lima": 1, "Torrões de Açucar": 2, "Garrafa de Água": 3 } },
  { nome: "Soul Speed", producao: 2, ingredientes: { "Manga": 2, "Torrões de Açucar": 2, "Lima": 2 } }
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
      <td><strong style="color:#ffcc00; font-size: 1.1rem;">${qtd}</strong></td>
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
