function checkLogged() {
  if (!logged) {
    window.location.href "./recado.html"
    return;
  }

  const dataUser = localStorage.getItem(logged);
  if (dataUser) {
    user = JSON.parse(dataUser);
  }
}

function MostrarMensagem() {
  let HTMLmessages = "";
  const messages = user.recados;
  if (messages.length) {
    messages.forEach((message, index) => {
      HTMLmessages += `
        <tr class="line">
          <td class="descreve">${message.descreve}</td>
          <td class="detalhe">${message.detalhe}</td>
          <td class="acao">

        //     <button class="edit" onClick="editMessage(${index})">
        //     editar
        //     </button>
            
        //     <button class="apaga" onClick="deleteMessage(${index})">
        //     apagar
        //     </button>
        //   </td>
        </tr>
      `;
    });
  }
  document.getElementById("tbody").innerHTML = HTMLmessages;
}

function recadosalvo() {
  const formMessage = document.getElementById("form");
  const description = formMessage.message.value;
  const details = formMessage.details.value;

  if (!details || !description) {
    alert("campo vazio");
    return;
  }

  const message = {
    description,
    details,
  };

  if (isEdit) {
    user.recados[IdEdit] = message;
    isEdit = false;
    IdEdit = null;
  } else {
    user.recados.push(message);
  }

  localStorage.setItem(user.username, JSON.stringify(user));
  MostrarMensagem();
  formMessage.reset();
}

function deleteMessage(index) {
  user.recados.splice(index, 1);
  localStorage.setItem(user.username, JSON.stringify(user));
  MostrarMensagem();
}

function editMessage(index) {
  const formMessage = document.getElementById("form");
  formMessage.message.value = user.recados[index].description;
  formMessage.details.value = user.recados[index].details;
  isEdit = true;
  IdEdit = index;
}

checkLogged();
MostrarMensagem();