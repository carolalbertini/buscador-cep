
import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import api from './services/api';
import './style.css';

function App() {

  const [input, setInput] = useState('');
  const [cep, setCep] = useState("");


  async function handleSearch(){
    
    if(input === ''){
      alert("Preencha algum cep")
      return;
    }

    try{
      const response = await api.get(`${input}/json`);
      setCep(response.data)
      setInput("")

    }catch{
      alert("opa, erro")
      setInput("") //volta para vazio, depois de dar alerta de erro
    }
  }

  return (
    <div className="container">
      <h1 className="title">Buscador cep</h1>

      <div className="containerInput">
        <input
        type="text"
        placeholder="Digite seu cep..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        />

        <button className="buttonSearch" onClick={handleSearch}> 
          <FiSearch size={25} color='#FFF'/>
        </button>
      </div>


      {Object.keys(cep).length > 0 && ( //verificando se tem algo dentro do objeto, se tiver alguma coisa mostro o que está abaixo
      
        <main className='main'>
          <h2>CEP: {cep.cep}</h2>

          <span>{cep.logradouro}</span>
          <span>Complemento: {cep.complemento}</span>
          <span>{cep.bairro}</span>
          <span>{cep.localidade}</span>
        </main>
      )}

    </div>
  );
}

export default App;
