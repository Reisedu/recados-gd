// alert ("teste 2")

let formcad = document.querySelector("#formcad");

let inputSalvar = document.querySelector("#salvar");
let emaillogin = document.querySelector("#emaillogin");
let labelemaillogin = document.querySelector("#labelemaillogin");
let validEmail = false;

let senhalogin = document.querySelector("#senhalogin");
let labelsenhalogin = document.querySelector("#labelsenhalogin");
let validPassword = false;

let confirmasenha = document.querySelector("#confirmasenha");
let labelconfirmasenha = document.querySelector("#labelconfirmasenha");
let validconfirmasenha = false;

let msgError = document.querySelector("#msgError");
let msgSuccess = document.querySelector("#msgSuccess");

formcad.addEventListener("submit", cadastrado);

emaillogin.addEventListener("keyup", () => {
  if (emaillogin.value.length <= 5) {
    labelemaillogin.setAttribute("style", "color: red");
    labelemaillogin.innerHTML = "Email mínino 6 caracteres ";
    emaillogin.setAttribute("style", "outline-color: red");
    validEmail = false;
  } else {
    emaillogin.setAttribute("style", "outline-color: green");
    labelemaillogin.setAttribute("style", "color: green");
    labelemaillogin.innerHTML = "Email";
    validEmail = true;
  }
});

senhalogin.addEventListener("keyup", () => {
  if (senhalogin.value.length <= 5) {
    senhalogin.setAttribute("style", "outline-color: red");
    labelsenhalogin.setAttribute("style", "color: red");
    labelsenhalogin.innerHTML = "Mínimo 6 caracteres";
    validPassword = false;
  } else {
    senhalogin.setAttribute("style", "outline-color: green");
    labelsenhalogin.setAttribute("style", "color: green");
    labelsenhalogin.innerHTML = "Senha";
    validPassword = true;
  }
});

confirmasenha.addEventListener("keyup", () => {
  if (senhalogin.value != confirmasenha.value) {
    confirmasenha.setAttribute("style", "outline-color: red");
    labelconfirmasenha.setAttribute("style", "color: red");
    labelconfirmasenha.innerHTML = "As senhas não conferem";
    validconfirmasenha = false;
  } else {
    confirmasenha.setAttribute("style", "outline-color: green");
    labelconfirmasenha.setAttribute("style", "color: green");
    labelconfirmasenha.innerHTML = "Confirmar senha";

    validconfirmasenha = true;
  }
});

function cadastrado(e) {
  e.preventDefault();
  let listaUser = JSON.parse(localStorage.getItem("listaUser") || "[]");
  const userExistente = listaUser.some(
    (user) => emaillogin.value === user.emailCad
  );

  if (userExistente) {
    labelemaillogin.setAttribute("style", "color: red");
    labelemaillogin.innerHTML = "Email já cadastrado";
    emaillogin.setAttribute("style", "outline-color: red");
    validEmail = false;
    return;
  }

  if (validEmail && validPassword && validconfirmasenha) {
    let listaUser = JSON.parse(localStorage.getItem("listaUser") || "[]");

    listaUser.push({
      emailCad: emaillogin.value,
      passwordCad: senhalogin.value,
    });

    localStorage.setItem("listaUser", JSON.stringify(listaUser));

    msgSuccess.setAttribute("style", "display: block");
    msgSuccess.innerHTML = "<strong>Cadastrando usuário...</strong>";
    msgError.innerHTML = "";
    msgError.setAttribute("style", "display: none");

    setTimeout(() => {
      document.location.href = "./index.html";
    }, 3000);
  } else {
    msgError.setAttribute("style", "display: block");
    msgError.innerHTML =
      "<strong>Preencha todos os campos corretamente</strong>";
    msgSuccess.innerHTML = "";
    msgSuccess.setAttribute("style", "display: none");
  }
}