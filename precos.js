// Configuração dos produtos e preços baseados na imagem
const produtos = [
  { nome: "Pops", sub: "ポップス", semParceria: 20000, comParceria: 15000 },
  { nome: "Menus de Carne", sub: "肉メニュー", semParceria: 50000, comParceria: 40000 },
  { nome: "Menus de Peixe", sub: "魚メニュー", semParceria: 35000, comParceria: 30000 },
  { nome: "Soul Speed", sub: "ソウルスピード", semParceria: 25000, comParceria: 20000 },
  { nome: "Caixa Soul Sushi", sub: "ソウルボックス", semParceria: 100000, comParceria: 85000 }
];

const tabelaPrecos = document.getElementById("tabela-precos");

// Formatar moeda em Euros
function formatarMoeda(valor) {
  return "€" + valor.toLocaleString("pt-PT");
}

// Renderizar linhas
produtos.forEach((prod, i) => {
  const tr = document.createElement("tr");

  tr.innerHTML = `
    <td>
      <strong>${prod.nome}</strong>
      <div class="jp-subtext">${prod.sub}</div>
    </td>
    <td>
      <input type="number" min="0" value="0" data-index="${i}" class="input-qtd-preco">
    </td>
    <td class="price-normal">${formatarMoeda(prod.semParceria)}</td>
    <td class="price-discount">${formatarMoeda(prod.comParceria)}</td>
    <td id="sub-sem-${i}">€0</td>
    <td id="sub-com-${i}" class="highlight-text">€0</td>
  `;

  tabelaPrecos.appendChild(tr);
});

// Listener para cálculo em tempo real
tabelaPrecos.addEventListener("input", (e) => {
  if (e.target.classList.contains("input-qtd-preco")) {
    calcularTotais();
  }
});

function calcularTotais() {
  let totalSem = 0;
  let totalCom = 0;

  const inputs = document.querySelectorAll(".input-qtd-preco");

  inputs.forEach((input) => {
    const qtd = parseInt(input.value) || 0;
    const index = input.dataset.index;
    const prod = produtos[index];

    const subSem = qtd * prod.semParceria;
    const subCom = qtd * prod.comParceria;

    document.getElementById(`sub-sem-${index}`).textContent = formatarMoeda(subSem);
    document.getElementById(`sub-com-${index}`).textContent = formatarMoeda(subCom);

    totalSem += subSem;
    totalCom += subCom;
  });

  document.getElementById("total-sem-parceria").textContent = formatarMoeda(totalSem);
  document.getElementById("total-com-parceria").textContent = formatarMoeda(totalCom);
  document.getElementById("total-economia").textContent = formatarMoeda(totalSem - totalCom);
}

// Botão Limpar
document.getElementById("btn-limpar-precos").addEventListener("click", () => {
  document.querySelectorAll(".input-qtd-preco").forEach(input => input.value = 0);
  calcularTotais();
});
