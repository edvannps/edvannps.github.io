//O principal objetivo deste desafio é fortalecer suas habilidades em lógica de programação. Aqui você deverá desenvolver a lógica para resolver o problema.

// Array para armazenar os nomes dos participantes
const participantes = [];

// Função para adicionar um nome ao array de participantes
function adicionarAmigo() {
  const input = document.getElementById("amigo");
  const nome = input.value.trim();

  if (!nome) {
    alert("Por favor, digite um nome válido!");
    return;
  }

  participantes.push(nome);
  atualizarListaAmigos();
  input.value = "";
  input.focus();
}

// Função para atualizar a lista de amigos na interface
function atualizarListaAmigos() {
  const lista = document.getElementById("listaAmigos");
  lista.innerHTML = "";

  participantes.forEach((nome, index) => {
    const li = document.createElement("li");
    li.textContent = nome;
    lista.appendChild(li);
  });
}

// Função para sortear o amigo secreto
function sortearAmigo() {
  if (participantes.length < 2) {
    alert("É necessário pelo menos 2 participantes para sortear.");
    return;
  }

  const sorteado =
    participantes[Math.floor(Math.random() * participantes.length)];

  const resultado = document.getElementById("resultado");
  resultado.innerHTML = "";

  const li = document.createElement("li");
  li.textContent = `A pessoa sorteada foi: ${sorteado}`;
  resultado.appendChild(li);
}

// Função para reiniciar o jogo
function reiniciarJogo() {
  participantes.length = 0; // Limpa o array de participantes
  document.getElementById("listaAmigos").innerHTML = ""; // Limpa a lista de amigos na interface
  document.getElementById("resultado").innerHTML = ""; // Limpa o resultado do sorteio
  document.getElementById("amigo").value = ""; // Limpa o input de nome
  document.getElementById("amigo").focus(); // Foca no input de nome
}
