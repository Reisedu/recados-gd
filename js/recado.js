const logado = JSON(localStorage.getItem("logado") ||
"[]");

let mudar = false;
let edicao = 0;
const form = document.querySelector("#formrec");
const corpoRecados = document.querySelector("#tbody")
const recuperarLocalStorage = () => {
    const recados = JSON.parse(localStorage.getItem(logado.user) || "[]");
    return recados;
};

const salvarrecado = (event) => {
    event.preventDefault();
    const oque = form.oque.value;
    const como = form.como.value;
    const recados = recuperarLocalStorage();
    if (mudar === true){
        alert("editando");
        recados[edicao].oque = oque;
        recados[edicao].como = como;
        mudar = false;
    }else{
        recados.push({
            id: definirID(),
            oque,
            como,
        });

        alert("adicionado")
    }
    localStorage.setItem(logado.user, JSON.stringify(recados));
    form.oque.value = "";
    form.como.value = "";
    completatabela();
};

const completatabela = () =>{
    const recados = recuperarLocalStorage();
    corpoRecados.innerHTML = "";
    for (const recado of recados){
        corpoRecados.innerHTML += `

<tr>

<td> ${recado.id}</td>
<td> ${recado.oque}</td>
<td> ${recado.como}</td>
<td>
<img src="./lixo.svg" alt="lixeira" class="imgs" onclick="apagarRecado(${recado.id})" />
<img src="./muda.svg" alt="lixeira" class="imgs" onclick="editarRecado(${recado.id})"/>
</td>
</tr>
`;
}
};

const apagar = (id) +>{
    const recados = recuperarLocalStorage();

    const indice = recados.findIndex((rec) =>{
        return recuperarLocalStorage.id === id;
    });

    recados.splice(indice,1);
    localStorage.setItem(logado.user, JSON.stringify(recados));
    completatabela();
};

const editarRecado = (id) =>{
    const recados = recuperarLocalStorage();
    const indice = recados.findIndex((rec) => rec.id === id);
    const recado = recados[indice];
    form.oque.value = recado.oque;
    form.como.value = recado.como;
    mudar= true;
    edicao = indice;
};

const definirID = () =>{
    let max = 0;
    const recados = recuperarLocalStorage();
    recados.forEach((recado) =>{
        if (recado.id > max) max = recado.id;
    });
    return max + 1;    
    });

    if (localStorage.getItem("logado") == null) {
        alert("faça o login");
        document.location.href = "./login.html";
    }

    form.addEventListener("submit", salvarrecado );
document.addEventListener("DOMContentLoaded", completatabela);