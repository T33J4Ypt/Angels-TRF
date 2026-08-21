function calcular() {
  const parceria = document.getElementById('parceria').value;
  const linhas = document.querySelectorAll('#tabela tr');
  let total = 0;

  linhas.forEach(linha => {
    const input = linha.querySelector('input');
    const quantidade = parseInt(input.value) || 0;
    const preco = parceria === 'min'
      ? parseInt(input.dataset.min)
      : parseInt(input.dataset.max);
    total += quantidade * preco;
  });

  document.getElementById('total').innerText = `Total: €${total}`;
}
