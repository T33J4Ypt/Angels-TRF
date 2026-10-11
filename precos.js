// Produtos Gerais / Armas e Munições
const produtosGerais = [
  { nome: "Motas", semParceria: 800000, comParceria: 600000 },
  { nome: "Coletes", semParceria: 25000, comParceria: 20000 },
  { nome: "Munição 9mm", semParceria: 7000, comParceria: 5500 },
  { nome: "Munição 5.56mm", semParceria: 7500, comParceria: 6000 },
  { nome: "Munição 7.62mm", semParceria: 8500, comParceria: 7000 },
  { nome: "Cartucho", semParceria: 8000, comParceria: 6500 },
  { nome: "Granadas de Fumo", semParceria: 30000, comParceria: 20000 },
  { nome: "Assault Shotgun", semParceria: 250000, comParceria: 215000 },
  { nome: "Heavy Shotgun", semParceria: 280000, comParceria: 240000 }
];

// Itens de Assalto (do Berbequim para baixo)
const produtosAssalto = [
  { nome: "Berbequim", semParceria: 11000, comParceria: 9000 },
  { nome: "C4", semParceria: 8500, comParceria: 7000 },
  { nome: "DigiScanner", semParceria: 5000, comParceria: 3000 },
  { nome: "Weld Machine", semParceria: 5500, comParceria: 4000 },
  { nome: "SafeCracker", semParceria: 7500, comParceria: 6000 },
  { nome: "GlassCutter", semParceria: 8500, comParceria: 7000 },
  { nome: "Laptop", semParceria: 6000, comParceria: 4500 },
  { nome: "Thermite Bomb", semParceria: 5000, comParceria: 3500 }
];

const tbodyGeral = document.getElementById("tabela-geral");
const tbodyAssalto = document.getElementById("tabela-assalto");

// Formatar moeda em Euros
function formatarMoeda(valor) {
  return "€" + valor.toLocaleString("pt-PT");
}

// Renderizar Tabela Geral
produtosGerais.forEach((prod, i) => {
  const tr = document.createElement("tr");
  tr.innerHTML = `
    <td><strong>${prod.nome}</strong></td>
    <td>
      <input type="number" min="0" value="0" data-tipo="geral" data-index="${i}" class="input-qtd-preco">
    </td>
    <td id="sub-geral-sem-${i}" class="price-normal">€0</td>
    <td id="sub-geral-com-${i}" class="price-discount">€0</td>
  `;
  tbodyGeral.appendChild(tr);
});

// Renderizar Tabela de Assalto
produtosAssalto.forEach((prod, i) => {
  const tr = document.createElement("tr");
  tr.innerHTML = `
    <td><strong>${prod.nome}</strong></td>
    <td>
      <input type="number" min="0" value="0" data-tipo="assalto" data-index="${i}" class="input-qtd-preco">
    </td>
    <td id="sub-assalto-sem-${i}" class="price-normal">€0</td>
    <td id="sub-assalto-com-${i}" class="price-discount">€0</td>
  `;
  tbodyAssalto.appendChild(tr);
});

// Listener unificado para cálculo em tempo real
document.addEventListener("input", (e) => {
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
    const tipo = input.dataset.tipo;
    const index = input.dataset.index;

    let prod;
    if (tipo === "geral") {
      prod = produtosGerais[index];
      const subSem = qtd * prod.semParceria;
      const subCom = qtd * prod.comParceria;
      document.getElementById(`sub-geral-sem-${index}`).textContent = formatarMoeda(subSem);
      document.getElementById(`sub-geral-com-${index}`).textContent = formatarMoeda(subCom);
      totalSem += subSem;
      totalCom += subCom;
    } else {
      prod = produtosAssalto[index];
      const subSem = qtd * prod.semParceria;
      const subCom = qtd * prod.comParceria;
      document.getElementById(`sub-assalto-sem-${index}`).textContent = formatarMoeda(subSem);
      document.getElementById(`sub-assalto-com-${index}`).textContent = formatarMoeda(subCom);
      totalSem += subSem;
      totalCom += subCom;
    }
  });

  document.getElementById("total-sem-parceria").textContent = formatarMoeda(totalSem);
  document.getElementById("total-com-parceria").textContent = formatarMoeda(totalCom);
}

// Botão Limpar Tudo
document.getElementById("btn-limpar-precos").addEventListener("click", () => {
  document.querySelectorAll(".input-qtd-preco").forEach(input => input.value = 0);
  calcularTotais();
});
