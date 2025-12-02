
var recursos = [];
var API_URL = "http://159.65.228.63/tarefas";


function adicionarRecurso() {
    const input = document.getElementById("recursoInput");
    const lista = document.getElementById("recursosList");

    if (input.value.trim() === "") return;

    recursos.push(input.value.trim());

    const li = document.createElement("li");
    li.textContent = input.value;
    lista.appendChild(li);

    input.value = "";
}


function getDadosTarefa() {
    return {
        prioridade: document.getElementById("prioridade").value,
        descricao: document.getElementById("descricao").value,
        local: document.getElementById("local").value,
        recursosNecessarios: recursos,
        dataLimite: document.getElementById("dataLimite").value,
        matricula: document.getElementById("matricula").value
    };
}


function validarCampos(tarefa) {
    if (
        tarefa.prioridade === "" ||
        tarefa.descricao.trim() === "" ||
        tarefa.local.trim() === "" ||
        tarefa.dataLimite === "" ||
        tarefa.matricula.trim() === ""
    ) {
        alert("Preencha todos os campos obrigatórios!");
        return false;
    }
    return true;
}


async function cadastrarTarefa(event) {
    event.preventDefault();

    const dados = getDadosTarefa();

    if (!validarCampos(dados)) return;

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dados)
        });

        if (!response.ok) {
            alert("Erro ao cadastrar tarefa!");
            return;
        }

        alert("Tarefa cadastrada com sucesso!");
        window.location.href = "index.html";

    } catch (erro) {
        console.error("Erro:", erro);
        alert("Erro ao conectar na API.");
    }
}


async function buscarTarefas() {
    try {
        const response = await fetch(API_URL);
        return await response.json();
    } catch (erro) {
        console.log("Erro ao buscar tarefas:", erro);
        return [];
    }
}


async function criarTabelaTarefas() {

    const tbody = document.querySelector("#tabela-tarefas tbody");
    const tabela = document.getElementById("tabela-tarefas");
    const mensagem = document.getElementById("mensagem-vazia");

    if (!tbody) return; 

    const tarefas = await buscarTarefas();

    if (tarefas.length === 0) {
        mensagem.style.display = "block";
        tabela.style.display = "none";
        return;
    }

    mensagem.style.display = "none";
    tabela.style.display = "table";

    tarefas.forEach(t => {
        const tr = document.createElement("tr");

        if (t.prioridade.toLowerCase() === "urgente") {
            tr.style.color = "red";
        }

        tr.innerHTML = `
            <td>${t.prioridade}</td>
            <td>${t.descricao}</td>
            <td>${t.local}</td>
            <td>${(t.recursosNecessarios || []).join(", ")}</td>
            <td>${t.dataLimite}</td>
            <td>${t.matricula}</td>
        `;

        tbody.appendChild(tr);
    });
}


document.addEventListener("DOMContentLoaded", () => {


    const btnAddRecurso = document.getElementById("adicionarRecurso");
    const formCadastro = document.getElementById("loginForm");

    if (btnAddRecurso) {
        btnAddRecurso.onclick = adicionarRecurso;
    }

    if (formCadastro) {
        formCadastro.onsubmit = cadastrarTarefa;
    }

   
    criarTabelaTarefas();
});
