import { useState,useEffect } from 'react';
import axios from 'axios';
import './Home.css';
import './Login'
import { Container, Row, Col, Button } from 'react-bootstrap';
import QRCode from 'react-qr-code';

function App() {
  const [itensSelecionados, setItensSelecionados] = useState({});
  const [data,setData] = useState([]);
  const [name,setName] = useState("");
  const [cpf,setCpf] = useState("");

  const [errorMsg, setErrorMsg] = useState('');


  const [password,setPassword] = useState("");
  const [totalCompra, setTotalCompra] = useState('');

  const Nomes = data.map((Nomes)=> Nomes.username)
  const Senhas = data.map((Senhas)=>Senhas.password)

  const itemCount = Object.keys(itensSelecionados).length;
  document.documentElement.style.setProperty('--item-count', itemCount);

  async function getData(){
    const response = await axios.get("http://127.0.0.1:8000/alunos/");
    console.log(setData(response.data));
  }



  async function postData(){
    const response = await axios.post("http://127.0.0.1:8000/alunos/",{
      username : name,
      password : password,
      cpf : cpf,
      id: data.length + 1
    })
    console.log(response)
    window.location.assign('http://localhost:5173/Login');
  }



  useEffect(()=> {
    console.log(data)
  },[data]);

  useEffect(() => {
    getData();
  }, []);


    const [tempoRestante, setTempoRestante] = useState(5); // Tempo inicial em segundos: 30 minutos
  
    useEffect(() => {
      const interval = setInterval(() => {
        setTempoRestante((prevTempo) => prevTempo - 1);
      }, 1000);
  
      // Limpa o intervalo quando o componente é desmontado
      return () => clearInterval(interval);
    }, []);
  
    const formatarTempo = (segundos) => {
      const minutos = Math.floor(segundos / 60);
      const segundosRestantes = segundos % 60;
  
      return `${minutos.toString().padStart(2, '0')}:${segundosRestantes.toString().padStart(2, '0')}`;
    };
  

  
    useEffect(() => {
      if (tempoRestante === 0) {
        IrHome();
      }
    }, [tempoRestante]);
  
  

  const adicionarItem = (item) => {
    setItensSelecionados((prevItensSelecionados) => {
      const novoItensSelecionados = { ...prevItensSelecionados };
      if (novoItensSelecionados[item]) {
        novoItensSelecionados[item] += 1;
      } else {
        novoItensSelecionados[item] = 1;
      }
      return novoItensSelecionados;
    });
  };

  
  function IrHome(){
    window.location.assign('http://localhost:5173/Home');

  }

  function FinalizarCompra(){
    window.location.assign('http://localhost:5173/FinalizarCompra');
  }
  
  function Empresas(){
    window.location.assign('http://localhost:5173/Empresas');
  } 

  function IrLogin(){
    window.location.assign('http://localhost:5173/Login');
  } 

  function IrCadastro(){
    window.location.assign('http://localhost:5173/');
  }

  function Verificar(){
    if (Senhas.includes(password) && Nomes.includes(name)){
      window.location.assign('http://localhost:5173/Home');
    }
    else{
      setErrorMsg("Credenciais Inválidas");
    }
    if (name == "adm" && password=="adm")
      window.location.assign('http://localhost:5173/CadastroItens')
  }

  const precos = {
    Banana: 5.58,
    Alface: 39.87,
    Brocules: 64.53,
    'Molho de Tomate': 19.78,
    'Salgadinho de Milho e Arroz': 4.98,
    'Vinagre': 9.98,
    'Tomate': 11.98,
    'Farelo De Aveia' :7.98,
    'Café Torrado e Moído':22.98,
    'Geleia Orgânica de Morango':19.58,
    'Açucar Cristal':15.58,
    'Leite em Pó':24.38,


  };
  
  const calcularValorTotal = () => {
    let total = 0;
    for (const [item, quantidade] of Object.entries(itensSelecionados)) {
      total += quantidade * precos[item];
    }
    return total.toFixed(2); // Arredonde o total para 2 casas decimais
  };
  
  useEffect(() => {
    // Recupera o valor armazenado no localStorage ao inicializar o componente
    const storedTotalCompra = localStorage.getItem('totalCompra');
    if (storedTotalCompra) {
      setTotalCompra(storedTotalCompra);
    }
  }, []);

  useEffect(() => {
    // Armazena o valor no localStorage sempre que houver uma mudança
    localStorage.setItem('totalCompra', totalCompra);
  }, [totalCompra]);



//PÁGINA DE COMPRA  
if (window.location.href === 'http://localhost:5173/FinalizarCompra') {

return (
  <div className="finalizar-compra-page">
    <Container>
      <Row className="justify-content-center">
        <Col md={6} className="text-center">
          <h1 className="titulo">Efetuar Pagamento</h1>
        </Col>
      </Row>
      <div className='QrCode-Container'>
      <Row className="justify-content-center">
        <Col md={6} className="text-center">
          <img src="QrCode (1).png" width={300}></img>
        </Col>
      </Row>
      
      <Row className="justify-content-center">
        <Col md={6} className="text-center">
          <p>Tempo Restante Para Efetuar O Pagamento:</p>
          <p className="temporizador">{formatarTempo(tempoRestante)}</p>
          
        </Col>
        
      </Row>
      </div>
      <Row className="justify-content-center">
        <Col md={6} className="text-center">
          <br></br>
          <Button variant="primary" onClick={IrHome} className="finalizar-compra-button">Voltar</Button>
        </Col>
      </Row>
      
    </Container>
    
  </div>
);
}





//PÁGINA LOGIN
if (window.location.href === 'http://localhost:5173/Login') {
  return (
    <div className="cadastro-container">
      <div className="imagem-container-Login">
      </div>
      <div className="formulario-container">
        <h2 className="title-cadastro">Página de Login</h2>
  
        <div className="login-container-cadastro-L">
          <form>
            <input className="input-cadastro" placeholder="Nome " value={name} onChange={(e) => setName(e.target.value)} />
            <br></br>
            <br></br>
            <input  className="input-cadastro" placeholder="Senha " value={password} onChange={(e) => setPassword(e.target.value)} />
            <br></br>
            <br></br>
            <button className="button-cadastro" type="button" onClick={Verificar}>Entrar</button>
          </form>
        </div>

        {errorMsg && <p style={{color:"red"}} className="error-msg">{errorMsg}</p>}

      </div>
    </div>
  );
  }






//PÁGINA CADASTRO
if (window.location.href === 'http://localhost:5173/') {
  return (
    <div className="cadastro-container">
      <div className="imagem-container">
      </div>
      <div className="formulario-container">
        <h2 className="title-cadastro">Página de Cadastro</h2>
  
        <div className="login-container-cadastro">
          <form>
            <input className="input-cadastro" placeholder="Nome (Máx 30 Caracteres)" value={name} onChange={(e) => setName(e.target.value)} />
            <br></br>
            <br></br>
            <input className="input-cadastro" placeholder="Senha (Máx 10 Caracteres)" value={password} onChange={(e) => setPassword(e.target.value)} />
            <br></br>
            <br></br>
            <input className="input-cadastro" placeholder="CPF (Máx 11 Caracteres)" value={cpf} onChange={(e) => setCpf(e.target.value)} />
            <br></br>
            <br></br>
            <button className="button-cadastro" type="button" onClick={postData}>Registrar</button>

          </form>
        </div>
        <span onClick={IrLogin}>Já tenho cadastro</span>

      </div>
    </div>
  );
  }



  if (window.location.href === 'http://localhost:5173/Empresas') {
  return (
    <div className="container-empresas">

<nav className="navbar-empresas">
        <div className="logo" onClick={IrHome}>
          <img className="logo"  src="logo-removebg-preview.png" alt="Logo" />
        </div>
        <ul className="nav-links">
          <li>
            <a href="#conhecer-empresas" onClick={Empresas}>Conhecer Empresas</a>
            
          </li>
          <li>
            <a href="#entrar-em-contato" onClick={IrCadastro}>Cadastrar</a>
          </li>
          <li>
            <a href="#comprar" onClick={IrLogin}>Logar</a>
          </li>
        </ul>
      </nav>
      <div className="content">
        <h1>Conheça nossas afiliadas</h1>

        <div className='afiliadas-container'>
        <div className="afiliadas-section">
          <div className="afiliadas">
            <img src="traderJoes.jfif"/>
            <h4>Trader Joe's</h4>
            <h5>
              <p>Trader Joe's é uma rede americana de supermercados com sede em</p>
              <p>Monrovia, Califórnia. A rede tem 560 lojas nos Estados Unidos.</p>
              <p>A primeira loja Trader Joe's foi inaugurada em 1967 pelo fun-</p>
              <p>dador Joe Coulombe em Pasadena, Califórnia.</p>
              </h5>
            <a href="https://www.traderjoes.com/home">
            <button>Conheça Mais</button>
            </a>
          </div>
        </div>
        </div>

       
        <div className='afiliadas-container'>
        <div className="afiliadas-section">
          <div className="afiliadas">
            <img src="annies.png"/>
            <h4>Annie's Homegrown</h4>
            <h5>
              <p>Annie's Homegrown é uma empresa americana de alimentos orgânicos</p>
              <p>de propriedade da General Mills. A empresa foi fundada em Hampton</p>
              <p> Connecticut, por Annie Withey e Andrew Martin, que já havia funda-</p>
              <p>do a pipoca Smartfood junto com Ken Meyers.</p>
              </h5>
            <a href="https://www.annies.com/">
            <button>Conheça Mais</button>
            </a>
          </div>
        </div>
        </div>



        <div className='afiliadas-container'>
        <div className="afiliadas-section">
          <div className="afiliadas">
            <img src="amys.png"/>
            <h4>Amy's Kitchen</h4>
            <h5>
              <p>A Amy's Kitchen é uma empresa americana de propriedade familiar</p>
              <p>e privada com sede em Petaluma, Califórnia, que fabrica alimen-</p>
              <p>tos congelados e alimentos congelados orgânicos e não transgênicos.</p>
              <p>Fundada em 1987 por Andy e Rachel Berliner, e incorporada desde 1988</p>
              <p>a empresa recebeu o nome de sua filha, Amy.</p>
              </h5>
            <a href="https://www.amys.com/">
            <button>Conheça Mais</button>
            </a>
          </div>
        </div>
        </div>
      


        <div className='afiliadas-container'>
        <div className="afiliadas-section">
          <div className="afiliadas">
            <img src="organicValley.jfif"/>
            <h4>Organic Valley</h4>
            <h5>
              <p>Organic Valley é uma marca de alimentos orgânicos e cooperativa</p>
              <p>independente de agricultores orgânicos com sede em La Farge, Wis-</p>
              <p>consin, Estados Unidos. Fundada em 1988, a Organic Valley é a maior</p>
              <p>cooperativa orgânica de propriedade de agricultores do país e uma</p>
              <p>das maiores mascas de consumo orgânico do mundo.</p>
              </h5>
            <a href="https://www.organicvalley.coop/">
            <button>Conheça Mais</button>
            </a>
          </div>
        </div>
        </div>
      


        <div className='afiliadas-container'>
        <div className="afiliadas-section">
          <div className="afiliadas">
            <img src="sprout.png"/>
            <h4>Sprout Farmers Market</h4>
            <h5>
              <p>Sprouts Farmers Market, Inc., é uma rede de supermercados com</p>
              <p>sede em Phoenix, Arizona, EUA. A mercearia oferece uma ampla</p>
              <p>seleção de alimentos naturais e orgânicos, incluindo produtos</p>
              <p>frescos.</p>
              </h5>
            <a href="https://www.sprouts.com/">
            <button>Conheça Mais</button>
            </a>
          </div>
        </div>
        </div>


      </div></div>
    );
  }





  if (window.location.href === 'http://localhost:5173/Home') {
  return (
    
    

    <div className="container">

      <nav className="navbar">
        <div className="logo" onClick={IrHome}>
          <img className="logo"  src="logo-removebg-preview.png" alt="Logo" />
        </div>
        <ul className="nav-links">
          <li>
            <a href="#conhecer-empresas" onClick={Empresas}>Conhecer Empresas</a>
            
          </li>
          <li>
            <a href="#entrar-em-contato" onClick={IrCadastro}>Cadastrar</a>
          </li>
          <li>
            <a href="#comprar" onClick={IrLogin}>Logar</a>
          </li>
        </ul>
      </nav>
      <div className="content">
        <h1>Bem-vindo à nossa loja</h1>
        <p>Confira os produtos disponíveis:</p>
        <div className="product-section">
          <div className="product">
            <img src="banana.png" alt="Banana da terra" />
            <h3>Banana</h3>
            <p>R$5,58/Unidade</p>
            <button onClick={() => adicionarItem('Banana')}>Comprar</button>
          </div>
          <div className="product">
            <img src="alface.png" alt="Alface" />
            <h3>Alface</h3>
            <p>R$39,87/Kg</p>
            <button onClick={() => adicionarItem('Alface')}>Comprar</button>
          </div>
          <div className="product">
            <img src="brocules.png" alt="Brocules" />
            <h3>Brocules</h3>
            <p>R$5,98/Unidade</p>
            <button onClick={() => adicionarItem('Brocules')}>Comprar</button>
          </div>
          <div className="product">
            <img src="molhoDeTomate.png" alt="Molho de Tomate" />
            <h3>Molho de Tomate</h3>
            <p>R$19,78/Unidade</p>
            <button onClick={() => adicionarItem('Molho de Tomate')}>Comprar</button>
          </div>
          <div className="product">
            <img src="salgadinho.png" alt="Salgadinho de Milho e Arroz" />
            <h3>Salgadinho de Milho e Arroz</h3>
            <p>R$4,98/Unidade</p>
            <button onClick={() => adicionarItem('Salgadinho de Milho e Arroz')}>Comprar</button>
          </div>
          <div className="product">
            <img src="tomate.png" alt="Tomate" />
            <h3>Tomate Saladate 500g</h3>
            <p>R$11, 98/Unidade</p>
            <button onClick={() => adicionarItem('Tomate')}>Comprar</button>
          </div>
          <div className="product">
            <img src="vinagre.png" alt="Vinagre" />
            <h3>Vinagre de Maça</h3>
            <p>R$9,98/Unidade</p>
            <button onClick={() => adicionarItem('Vinagre')}>Comprar</button>
          </div>
          <div className="product">
            <img src="fareloDeAveia.png" alt="Farelo De Aveia" />
            <h3>Farelo De Aveia 170g</h3>
            <p>R$7,98/Unidade</p>
            <button onClick={() => adicionarItem('Farelo De Aveia')}>Comprar</button>
          </div>
          <div className="product">
            <img src="cafe.png" alt="Café Torrado e Moído" />
            <h3>Café Torrado e Moído 250g</h3>
            <p>R$22,98/Unidade</p>
            <button onClick={() => adicionarItem('Café Torrado e Moído')}>Comprar</button>
          </div>
          <div className="product">
            <img src="geleiaMorango.png" alt="Geleia Orgânica de Morango" />
            <h3>Geleia Orgânica de Morango 220g</h3>
            <p>R$19,58/Unidade</p>
            <button onClick={() => adicionarItem('Geleia Orgânica de Morango')}>Comprar</button>
          </div>
          <div className="product">
            <img src="acucarCristal.png" alt="Açucar Cristal" />
            <h3>Açucar Cristal</h3>
            <p>R$15,58/Unidade</p>
            <button onClick={() => adicionarItem('Açucar Cristal')}>Comprar</button>
          </div>
          <div className="product">
            <img src="leitePo.png" alt="Leite em Pó" />
            <h3>Leite em pó 350g</h3>
            <p>R$24,38/Unidade</p>
            <button onClick={() => adicionarItem('Leite em Pó')}>Comprar</button>
          </div>
        </div>
      </div>
      <div className="cart-container">
  <h3>Itens Selecionados:</h3>
  <ul>
    {Object.entries(itensSelecionados).map(([item, quantidade]) => (
      <li key={item}>
        {item} (x{quantidade})
      </li>
          ))}
         </ul>
        <p>Total: R${calcularValorTotal()}</p> 
        <button onClick={FinalizarCompra} className="finalizar-compra-button">
          Finalizar compra
        </button>      
        </div>

    </div>
  );
}}

export default App;