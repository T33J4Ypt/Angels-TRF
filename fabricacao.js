const receitas = [
  {
    nome: "Sushi",
    producao: 2,
    ingredientes: {
      "Arroz": 2,
      "Peixe": 2,
      "Alga Nori": 2,
    }
  },
  {
    nome: "Ramen",
    producao: 2,
    ingredientes: {
      "Carne Crua": 2,
      "Massa Instantânea": 2,
      "Levedura Industrial": 2,
    }
  },
  {
    nome: "Noodles do Mar",
    producao: 2,
    ingredientes: {
      "Peixe": 2,
      "Massa Instantânea": 2,
      "Cebola": 2,
    }
  },
  {
    nome: "Caixa Soul Sushi",
    producao: 3,
    ingredientes: {
      "Saquê": 3,
      "Sushi": 3,
    }
  },
  {
    nome: "Caixa Soul Sushi 2",
    producao: 3,
    ingredientes: {
      "Limonada": 3,
      "Ramen": 3,
      }
  },
  {
    nome: "Caixa Soul Sushi 3",
    producao: 3,
    ingredientes: {
      "Noodles do Mar": 3,
      "Chá Verde": 3,
      }
  },
  {
    nome: "Saquê",
    producao: 2,
    ingredientes: {
      "Arroz": 2,
      "Levedura Industrial": 2,
      "Álcool": 2
      }
  },
  {
    nome: "Limonada",
    producao: 2,
    ingredientes: {
      "Torrões de Açucar": 2,
      "Garrafa de Água": 2,
      "Lima": 2,
      }
  },
  {
    nome: "Chá Verde",
    producao: 2,
    ingredientes: {
      "Lima": 1,
      "Torrões de Açucar": 2,
      "Garrafa de Água": 3,
      }
  },
  {
    nome: "Soul Speed",
    producao: 2,
    ingredientes: {
      "Manga": 2,
      "Torrões de Açucar": 2,
      "Lima": 2,
    }
  }
];

const tabela = document.getElementById("tabela-fabricacao");

receitas.forEach((r, i) => {
  const tr = document.createElement("tr");

  const tdNome = document.createElement("td");
  tdNome.textContent = r.nome;

  const tdInput = document.createElement("td");
  const input = document.createElement("input");
  input.type = "number";
  input.min = 0;
  input.value = 0;
  input.dataset.index = i;
  tdInput.appendChild(input);

  const tdResultado = document.createElement("td");
  tdResultado.id = "res-" + i;
  tdResultado.innerHTML = "-";

  tr.appendChild(tdNome);
  tr.appendChild(tdInput);
  tr.appendChild(tdResultado);
  tabela.appendChild(tr);

  input.addEventListener("input", () => atualizarResultados(i, input.value));
});

function atualizarResultados(index, qtdDesejada) {
  const receita = receitas[index];
  const resultado = {};

const multiplicador = Math.ceil(qtdDesejada / receita.producao);

  for (const ingrediente in receita.ingredientes) {
    resultado[ingrediente] = Math.ceil(
      receita.ingredientes[ingrediente] * multiplicador
    );
  }

  document.getElementById("res-" + index).innerHTML =
    Object.entries(resultado)
      .map(([ing, qtd]) => `${qtd} ${ing}`)
      .join("<br>");

  atualizarTotais();
}
function atualizarTotais() {

  const totais = {};

  document.querySelectorAll("input").forEach((input, index) => {

    const quantidade = Number(input.value);

    if (quantidade <= 0) return;

    const receita = receitas[index];

const multiplicador = Math.ceil(quantidade / receita.producao);

    for (const ingrediente in receita.ingredientes) {

      const qtd = Math.ceil(
        receita.ingredientes[ingrediente] * multiplicador
      );

      totais[ingrediente] = (totais[ingrediente] || 0) + qtd;
    }

  });

  const tabela = document.getElementById("tabela-totais");

  tabela.innerHTML = "";

  Object.entries(totais)
    .sort((a, b) => a[0].localeCompare(b[0]))
    .forEach(([ingrediente, qtd]) => {

      const tr = document.createElement("tr");

      tr.innerHTML = `
        <td>${ingrediente}</td>
        <td><strong>${qtd}</strong></td>
      `;

      tabela.appendChild(tr);

    });

}
