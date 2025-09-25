// Validação simples do cliente (função pura)
export function validarCliente(nome, email) {
  return nome.trim() !== "" && email.includes("@");
}

// Cria elementos de forma reutilizável
export function criarElemento(tag, attrs = {}, ...children) {
  const el = document.createElement(tag);
  Object.entries(attrs).forEach(([key, value]) => el.setAttribute(key, value));
  children.forEach(child => {
    if (typeof child === "string") {
      el.appendChild(document.createTextNode(child));
    } else {
      el.appendChild(child);
    }
  });
  return el;
}
