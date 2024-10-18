const URL_API = 'http://localhost:3000/funcionarios'
const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')
const sNome = document.querySelector('#m-nome')
const sFuncao = document.querySelector('#m-funcao')
const sSalario = document.querySelector('#m-salario')
const btnSalvar = document.querySelector('#btnSalvar')
let id;
let edit;

async function listarFuncionario() {
  const URL = await fetch (URL_API) //buscando a lista de funcionarios na API
  itens = await URL.json()
  itens.forEach(itens => { //para exibir todos os itens
    insertItem(itens)
    
  })
}

window.onload = () => {
  listarFuncionario()
}

function insertItem(dados) {

  tbody.innerHTML += `
  <tr>
    <td>${dados.nome}</td>
    <td>${dados.funcao}</td>
    <td>R$ ${dados.salario}</td>
    <td class="acao">
      <button onclick="editItem('${dados.id}')"><i class='bx bx-edit'></i></button>
    </td>
    <td class="acao">
      <button onclick="deleteItem('${dados.id}')"><i class='bx bx-edit'></i></button> 
    </tr> 
  `
}

window.editItem = async (funcID) => {
  edit = true;
  const funcionario = await funcionarioID(funcID);
  if (funcionario){
    sNome.value = funcionario.nome;
    sFuncao.value = funcionario.funcao;
    sSalario.value = funcionario.salario;
    id = funcionario.id
  }
  openModal(true, funcionario);
  
}

window.deleteItem = (id) => {
  deletarItem(id)
}
    
async function deletarItem(id) {
  await fetch(`${URL_API}/${id}`, {
      method: 'DELETE'
  });
}

async function funcionarioID(id) {
  try{
    const funcionario = await fetch(`${URL_API}/${id}`)
    return await funcionario.json()
  } catch(error){
    alert('erro')
  }
} 

async function editarFuncionario(id, funcionario) {
  await fetch(`${URL_API}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(funcionario),
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

function openModal() { ///usar
  modal.classList.add('active')  
    modal.onclick = e => {
      if (e.target.className.indexOf('modal-container') !== -1) {
        modal.classList.remove('active')
        limparForm()  
      }
  }       
}
  
btnSalvar.onclick = async e => { //oque os olhor não veem... o coração não sente...
  if (sNome.value == '' || sFuncao.value == '' || sSalario.value == '') {
      return
    }
    let novoFuncionario = {
      nome: sNome.value,
      funcao: sFuncao.value,
      salario: sSalario.value
    };

    if (id !== undefined){
      await editarFuncionario(id, novoFuncionario);
    } else {
      await enviarBD(novoFuncionario)
    }
    listarFuncionario();
    modal.classList.remove('active')
    edit = false
  } 

async function enviarBD(funcionario) {
  try {
    return await fetch(URL_API, {
        method: 'POST',
        body: JSON.stringify(funcionario),
        headers: {
          'Content-Type': 'application/json'
        }
      })
    } catch (erro) {
      
    }
  }

function limparForm() {
    sNome.value =''
    sFuncao.value =''
    sSalario.value = ''
    id = undefined
}
      

