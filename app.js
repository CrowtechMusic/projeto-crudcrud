import { Cliente } from "./classes.js";
import { validarCliente, criarElemento } from "./utils.js";

// Substitua pela sua URL do CrudCrud
const API_URL = "https://crudcrud.com/api/SUA_API_KEY/clientes";

const clienteForm = document.getElementById("clienteForm");
const listaClientes = document.getElementById("listaClientes");

// Evento de cadastro
clienteForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const nome = document.getElementById("nome").value;
  const email = document.getElementById("email").value;

  if (!validarCliente(nome, email)) {
    alert("Preencha os campos corretamente!");
    return;
  }

  const novoCliente = new Cliente(nome, email);

  try {
    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(novoCliente),
    });
    clienteForm.reset();
    carregarClientes();
  } catch (error) {
    console.error("Erro ao cadastrar cliente:", error);
  }
});

// Carregar Clientes
async function carregarClientes() {
  listaClientes.innerHTML = "";
  try {
    const response = await fetch(API_URL);
    const clientes = await response.json();

    clientes.map((cliente) => {
      const li = criarElemento(
        "li",
        {},
        `${cliente.nome} - ${cliente.email}`,
        criarElemento("button", { class: "excluir", "data-id": cliente._id }, "Excluir")
      );

      listaClientes.appendChild(li);
    });

    // Delegando evento de exclusão
    listaClientes.querySelectorAll(".excluir").forEach((btn) => {
      btn.addEventListener("click", async () => {
        const id = btn.getAttribute("data-id");
        await excluirCliente(id);
        carregarClientes();
      });
    });

  } catch (error) {
    console.error("Erro ao carregar clientes:", error);
  }
}

// Excluir Cliente
async function excluirCliente(id) {
  try {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  } catch (error) {
    console.error("Erro ao excluir cliente:", error);
  }
}

// Carregar ao iniciar
document.addEventListener("DOMContentLoaded", carregarClientes);
