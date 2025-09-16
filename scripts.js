const API_URL = "https://crudcrud.com/api/SUA_API_KEY/clientes";

const clienteForm = document.getElementById("clienteForm");
const listaClientes = document.getElementById("listaClientes");

// Cadastrar Cliente
clienteForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const nome = document.getElementById("nome").value;
  const email = document.getElementById("email").value;

  const novoCliente = { nome, email };

  try {
    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(novoCliente)
    });
    clienteForm.reset();
    carregarClientes();
  } catch (error) {
    console.error("Erro ao cadastrar cliente:", error);
  }
});

// Listar Clientes
async function carregarClientes() {
  listaClientes.innerHTML = "";
  try {
    const response = await fetch(API_URL);
    const clientes = await response.json();

    clientes.forEach(cliente => {
      const li = document.createElement("li");
      li.innerHTML = `
        <span><strong>${cliente.nome}</strong> - ${cliente.email}</span>
        <button onclick="excluirCliente('${cliente._id}')">Excluir</button>
      `;
      listaClientes.appendChild(li);
    });

  } catch (error) {
    console.error("Erro ao carregar clientes:", error);
  }
}

// Excluir Cliente
async function excluirCliente(id) {
  try {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    carregarClientes();
  } catch (error) {
    console.error("Erro ao excluir cliente:", error);
  }
}

// Carrega os clientes ao iniciar
carregarClientes();