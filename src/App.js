import './App.css';
import { useState } from 'react';
import Axios from 'axios';


function App() {

  const [formNome, setFormNome] = useState("");
  const [formDataInicio, setFormDataInicio] = useState("");
  const [formDataFim, setFormDataFim] = useState("");
  const [formValor, setFormValor] = useState(0);
  const [formRisco, setFormRisco] = useState(0);
  const [formMembros, setFormMembros] = useState("");

  const [newFormNome, setNewFormNome] = useState("");
  const [newFormDataInicio, setNewFormDataInicio] = useState("");
  const [newFormDataFim, setNewFormDataFim] = useState("");
  const [newFormValor, setNewFormValor] = useState(0);
  const [newFormRisco, setNewFormRisco] = useState(0);
  const [newFormMembros, setNewFormMembros] = useState("");

  const [allList, setAllList] = useState([]);
  const [id, setId] = useState(0);
  //  const [roiValue, setRoiValue] = useState(0);


  //FUNCOES PARA O BANCO DE DADOS, GET, POST,UPDATE, DELETE
  const showList = () => {
    Axios.get("http://localhost:3001/list").then((response) => { setAllList(response.data); })
  };

  const addProj = () => {
    Axios.post("http://localhost:3001/create", { formNome: formNome, formDataInicio: formDataInicio, formDataFim: formDataFim, formValor: formValor, formRisco: formRisco, formMembros: formMembros, }).then(() => { setAllList([...allList, { formNome: formNome, formDataInicio: formDataInicio, formDataFim: formDataFim, formValor: formValor, formRisco: formRisco, formMembros: formMembros, }]); alert("Inserido no banco de Dados. Aperte F5.") })
  };
  const editProj = () => {
    Axios.put("http://localhost:3001/editar", { id: id, formNome: newFormNome, formDataInicio: newFormDataInicio, formDataFim: newFormDataFim, formValor: newFormValor, formRisco: newFormRisco, formMembros: newFormMembros, }).then(() => { setAllList([...allList, { id: id, formNome: newFormNome, formDataInicio: newFormDataInicio, formDataFim: newFormDataFim, formValor: newFormValor, formRisco: newFormRisco, formMembros: newFormMembros, }]); alert("Banco de Dados Atualizado. Aperte F5.") })
  };

  const delProj = (idProj) => {
    Axios.delete(`http://localhost:3001/delete/${idProj}`).then((response) => { setAllList(allList.filter((val) => { return val.idProj !== idProj; })); });
    alert("Projeto deletado. Aperte F5 para Atualizar.");
  };

  const calcProj = () => {
    const valorProjDB = () => { Axios.get("http://localhost:3001/roi/valor", { id: id }).then((response) => { setAllList(response.data); }); };
    const riscoProjDB = () => { Axios.get("http://localhost:3001/roi/risco", { id: id }).then((response) => { setAllList(response.data); }); };
    var roiValue = () => { return document.querySelector('#roiValue'); };

    console.log(valorProjDB);
    console.log(riscoProjDB);
    console.log(roiValue);
    var novoValor = roiValue;
    if (parseInt(roiValue) > parseInt(valorProjDB)) {
      switch (parseInt(riscoProjDB)) {
        case 0:
          novoValor += (novoValor * 5) / 100;
          novoValor.toFixed(3);
          alert("O investimento de " + roiValue + " reais tem retorno de " + novoValor + " reais.");
          break;
        case 1:
          novoValor += (novoValor * 10) / 100;
          novoValor.toFixed(3);
          alert("O investimento de " + roiValue + " reais tem retorno de " + novoValor + " reais.");
          break;
        case 2:
          novoValor += (novoValor * 20) / 100;
          novoValor.toFixed(3);
          alert("O investimento de " + roiValue + " reais tem retorno de " + novoValor + " reais.");
          break;
        default:
          alert("Desculpe, entrada desconhecida");
      }
    } else {
      alert("Investimento mencionado menor que Valor do Projeto");
    };
  };

  //GERENCIAR ELEMENTOS VIZUAIS
  // const displayHidden2 = () => {
  //   console.log("ok");
  // };



  //COMEÇO DO APLICATIVO
  return (<div className="App">
    <div className='mainDiv'><header><p id='logo'>Loren Ipsum Inc.</p></header></div>

    <div className='mainDiv'><div className="divBtn"><button onClick={showList} id='showListBtn'>Ver Lista</button></div>
    </div>

    <div className='mainDiv'>{allList.map((val, key) => {
      return <div className='listaProj'>

        <h3>ID: {val.idProj}</h3>
        <h3>Nome: {val.nomeProj}</h3>
        <h3>Data começo: {val.dataInicioProj}</h3>
        <h3>Data final: {val.dataFimProj}</h3>
        <h3>Valor do Projeto: {val.valorProj}</h3>
        <h3>Indice de risco: {val.riscoProj}</h3>
        <h3>Participantes: {val.membrosProj}</h3>
        <div>
          {" "}
          {/* <button onClick={addProj} id='simularBtn1'>Simular</button> */}
          <button className="divBtn" onClick={() => { window.confirm("Deseja realmente deletar o Projeto na Base de Dados?") ? delProj(val.idProj) : console.log("canceled") }} id='excluirBtn'>Excluir</button></div>
      </div>
    })}</div>



    <div className='mainDiv'><div className='hideit1'><label> - Simular Retorno de Investimento - </label>
      <label>Digite ID do Projeto</label><input type="number" onChange={(event) => { setId(event.target.value); }} required></input>
      <label>Valor do Investimento</label><input id="roiValue" type="number" step=".01" required></input>
      <div className='divBtn'><button onClick={() => { calcProj() }} id='simularBtn1'>Simular</button>      </div>
    </div></div>


    {/* PARTE NAO APROVEITADA DO PROJETO 
    <div className='mainDiv'>
      <div className='hideit2'><label> - Excluir Projeto - </label>
        <label>ID do Projeto</label> <input type="number" onChange={(event) => { setId(event.target.value); }}></input>
        <button className="divBtn" onClick={() => { window.confirm("Deseja realmente deletar o Projeto na Base de Dados?") ? delProj(id) : console.log("canceled") }} id='excluirBtn'>Excluir</button>
      </div>
    </div> */}

    <div className='mainDiv'>
      <div className='hideit3'><label> - Editar Projeto - </label>
        <p><i>Todos os campos são obrigatórios*</i></p>
        <label>ID do Projeto*</label> <input id="formID" type="number" onChange={(event) => { setId(event.target.value); }}></input>
        <label>Nome do Projeto*</label> <input id="newFormNome" type="text" onChange={(event) => { setNewFormNome(event.target.value); }} required></input>
        <label>Data de Início*</label> <input id="newFormDataInicio" type="date" onChange={(event) => { setNewFormDataInicio(event.target.value); }} required></input>
        <label>Data de Término*</label> <input id="newFormDataFim" type="date" onChange={(event) => { setNewFormDataFim(event.target.value); }} required></input>
        <label>Valor do Projeto*</label> <input name="newFormValor" type="number" step=".01" onChange={(event) => { setNewFormValor(event.target.value); }} required></input>
        <label>Nível de Risco* (0=baixo; 1=médio; 2=alto) </label> <input name="newFormRisco" type="number" min="0" max="2" onChange={(event) => { setNewFormRisco(event.target.value); }} required></input>
        <label>Membros do Projeto*</label> <input name="newFormMembros" type="text" onChange={(event) => { setNewFormMembros(event.target.value); }} required></input>
        <div className="divBtn">
          <button onClick={editProj} id='editarBtn'>Editar</button>
        </div>
      </div>
    </div>

    <div className='mainDiv'>
      <div className='hideit4'><label> - Informações do Projeto - </label>
        <p><i>Todos os campos são obrigatórios*</i></p>
        <label>Nome do Projeto*</label> <input id="formNome" type="text" onChange={(event) => { setFormNome(event.target.value); }} required></input>
        <label>Data de Início*</label> <input id="formDataInicio" type="date" onChange={(event) => { setFormDataInicio(event.target.value); }} required></input>
        <label>Data de Término*</label> <input id="formDataFim" type="date" onChange={(event) => { setFormDataFim(event.target.value); }} required></input>
        <label>Valor do Projeto*</label> <input name="formValor" type="number" step=".01" onChange={(event) => { setFormValor(event.target.value); }} required></input>
        <label>Nível de Risco* (0=baixo; 1=médio; 2=alto) </label> <input name="formRisco" type="number" min="0" max="2" onChange={(event) => { setFormRisco(event.target.value); }} required></input>
        <label>Membros do Projeto*</label> <input name="formMembros" type="text" onChange={(event) => { setFormMembros(event.target.value); }} required></input>
        <div className="divBtn">
          <button onClick={addProj} id='cadastrarBtn'>Cadastrar</button>
        </div>
      </div>
    </div>


  </div>);
}

export default App;