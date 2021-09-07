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
  const [idSelector, setIdSelector] = useState("");
  const [roiValue, setRoiValue] = useState(0);

  const addProj = () => {
    Axios.post("http://localhost:3001/create", { formNome: formNome, formDataInicio: formDataInicio, formDataFim: formDataFim, formValor: formValor, formRisco: formRisco, formMembros: formMembros, }).then(() => { console.log("success") })
  };
  const editProj = () => {
    //UPDATE
  };
  const delProj = () => {
    //GET numId
    //select ROW*
    //confirm ? del : home
  };
  const calcProj = () => {
    //GET numId,
    //select (valor, risco),
    //if FormValor>valorProjDB ? SWITCH risco case1(risco=0 return 5%); 
    //alert (o valor digitado 'e menor do que valor do proj) break;
  };

  const displayHidden2 = () => {
    console.log("ok");
  };

  return (<div className="App">
    <div className='mainDiv'><header><p id='logo'>Loren Ipsum Inc.</p></header></div>
    <div className='mainDiv'><p>Mostrar tabela aqui</p></div>

    <div className='mainDiv'>
      <div className='divBtn'>
        <button onClick={displayHidden2} id='cadastrar1'>Cadastrar</button>
        <button onClick={displayHidden2} id='editar1'>Editar</button>
        <button id='excluir1'>Excluir</button>
        <button id='simular1'>Simular</button> </div>
    </div>



    <div className='mainDiv'><div className='hideit1'><label>Digite ID do Projeto</label><input id="idSelected" type="number" min="1" max="document.write(numProjDB)" onChange={(event) => { setIdSelector(event.target.value); }} required></input>
      <button className='divBtn' id='excluir2'>Excluir</button>
      <button className='divBtn' id='simular2'>Simular</button></div></div>

    <div className='mainDiv'>
      <div className='hideit2'><label> - Informações do Projeto - </label>
        <p><i>*Todos os campos são obrigatórios</i></p>
        <label>Nome do Projeto</label> <input id="formNome" type="text" onChange={(event) => { setFormNome(event.target.value); }} required></input>
        <label>Data de Início</label> <input id="formDataInicio" type="date" placeholder="dd-mm-aaaa" value=""
          min="2008-08-08" max="2035-12-31" onChange={(event) => { setFormDataInicio(event.target.value); }} required></input>
        <label>Data de Término</label> <input id="formDataFim" type="date" placeholder="dd-mm-aaaa" value=""
          min="2008-08-08" max="2035-12-31" onChange={(event) => { setFormDataFim(event.target.value); }} required></input>
        <label>Valor do Projeto</label> <input name="formValor" type="number" step=".01" onChange={(event) => { setFormValor(event.target.value); }} required></input>
        <label>Nível de Risco</label> <input name="formRisco" type="number" min="0" max="2" onChange={(event) => { setFormRisco(event.target.value); }} required></input>
        <label>Membros do Projeto</label> <input name="formMembros" type="text" onChange={(event) => { setFormMembros(event.target.value); }} required></input>
        <button onClick={addProj} className="divBtn" id='cadastrar2'>Cadastrar</button>
        <button onClick={editProj} className="divBtn" id='editar2'>Editar</button>
      </div>
    </div>

    <div className='mainDiv'><div className='hideit3'><label> - Simular Retorno de Investimento - </label>
      <label>Valor do Investimento</label><input name="formInvest" type="number" step=".01" onChange={(event) => { setRoiValue(event.target.value); }} required></input>
      <button onClick={calcProj} className='divBtn' type="submit" form="roiProj" id='simular3'>Simular</button>
    </div></div>

  </div>);
}

export default App;
