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
  //const [id, setId] = useState(0);
  //const [roiValue, setRoiValue] = useState(0);

  //funçoes para o Banco de Dados, mostrar, lista, adicionar, editar, deletar e calcular Roi
  const showList = () => {
    Axios.get("http://localhost:3001/list").then((response) => { setAllList(response.data); })
  };

  const addProj = () => {
    Axios.post("http://localhost:3001/create", { formNome: formNome, formDataInicio: formDataInicio, formDataFim: formDataFim, formValor: formValor, formRisco: formRisco, formMembros: formMembros, }).then(() => { setAllList([...allList, { formNome: formNome, formDataInicio: formDataInicio, formDataFim: formDataFim, formValor: formValor, formRisco: formRisco, formMembros: formMembros, }]); alert("Inserido no banco de Dados. Aperte F5.") })
  };
  const editProj = () => {
    Axios.put("http://localhost:3001/editar", { formNome: newFormNome, formDataInicio: newFormDataInicio, formDataFim: newFormDataFim, formValor: newFormValor, formRisco: newFormRisco, formMembros: newFormMembros, }).then(() => { setAllList([...allList, { id: id, formNome: newFormNome, formDataInicio: newFormDataInicio, formDataFim: newFormDataFim, formValor: newFormValor, formRisco: newFormRisco, formMembros: newFormMembros, }]); alert("Banco de Dados Atualizado. Aperte F5.") })
  };

  // const delProj = (idProj) => {
  // //var del = window.confirm("Deseja realmente deletar o Projeto na Base de Dados?");
  // // if (del === true) {
  // Axios.delete(`http://localhost:3001/delete/${idProj}`); //.then((response) => { setAllList(allList.filter((val) => { return val.idProj === idProj })) });
  // //  } else { console.log("fail"); };
  // };

  // const calcProj = (idProj) => {
  // Axios.get("http://localhost:3001/calc", { id: id, roiValue: roiValue, }).then((response) => { setAllList(response.data); })
  // function CalcRoiProj() {
  // var valorDB = Axios.get("http://localhost:3001/roi", { id: id, formValor: formValor }).then((response) => { setAllList(response.data); console.log(valorDB) });
  // var riscoDB = Axios.get("http://localhost:3001/list", { id: id, formRisco: formRisco }).then((response) => { setAllList(response.data){ val.riscoProj }; });
  // var formValor = document.querySelector('#idSelected');
  // var novoValor = formValor;
  // if (formValor > valorDB) {
  //   switch (riscoDB) {
  //     case 0:
  //       novoValor += (novoValor * 5) / 100;
  //       novoValor.toFixed(3);
  //       console.log("O investimento de " + formValor + " reais tem retorno de " + novoValor + " reais.");
  //       break;
  //     case 1:
  //       novoValor += (novoValor * 10) / 100;
  //       novoValor.toFixed(2);
  //       console.log("O investimento de " + formValor + " reais tem retorno de " + novoValor + " reais.");
  //       break;
  //     case 2:
  //       novoValor += (novoValor * 20) / 100;
  //       novoValor.toFixed(2);
  //       console.log("O investimento de " + formValor + " reais tem retorno de " + novoValor + " reais.");
  //       break;
  //     default:
  //       document.write("Desculpe, entrada desconhecida");
  //   }
  // } else {
  //   alert("Investimento mencionado menor que o valor do Projeto");
  // };
  // };


  //CalcRoiProj();
  //select (valor, risco),
  //if FormValor>valorProjDB ? SWITCH risco case1(risco=0 return 5%); 
  //alert (o valor digitado 'e menor do que valor do proj) break;
  // };

  //gerenciar os elementos de visualizaçao
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
          <button onClick={addProj} id='simularBtn1'>Simular</button>
          {/* <button onClick={delProj(val.idProj)} id='excluirBtn'>Excluir</button> */}
        </div></div>
    })}</div>

    {/* <div className='mainDiv'><div className='hideit2'><label> - Simular Retorno de Investimento - </label>
      <label>Digite ID do Projeto</label><input id="idSelected" type="number" onChange={(event) => { setId(event.target.value); }} required></input>
      <label>Valor do Investimento</label><input name="formInvest" type="number" step=".01" onChange={(event) => { setRoiValue(event.target.value); }} required></input>
      <div className='divBtn'><button onClick={calcProj} id='simularBtn1'>Simular</button>
      </div></div></div> */}

    <div className='mainDiv'>
      <div className='hideit3'><label> - Informações do Projeto - </label>
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

    <div className='mainDiv'>
      <div className='hideit4'><label> - Editar Projeto - </label>
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



  </div>);
}

export default App;
