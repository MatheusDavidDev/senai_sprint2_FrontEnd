import React from 'react';
import './App.css';

// Define um funcao DataFormatada que retorna o subtitulo com o valor da data/hora formatada
function DataFormatada(props) {
  return <h2>Horario atual: {props.date.toLocaleTimeString()}</h2>
}

// Define a class Clock que sera chamada na renderizacao dentro do app
class Clock extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      // Define o estado date pegando a data atual
      date : new Date()
    };
  }

  //Ciclo de vida que ocorre quando Clock e inserida na DOM
  componentDidMount(){
    this.timerID = setInterval( () => {
      this.thick()
    }, 1000 );

    // Exibe no console o ID de cada relogio
    console.log("Eu sou o relogio" + this.timerID)
  }

  // Ciclo de vida que ocorre quando o componente e removido da DOM
  componentWillUnmount(){
    clearInterval(this.timerID);
  }

  // Define no state date a data atual a cada vez que e chamada
  thick(){
    this.setState({
      date : new Date()
    });
  }

  // Renderizamos na tela o titulo e a funcao DataFormatada, com o valor do state
  render(){
    return(
      <div>
        <h1>Relogio</h1>
        <DataFormatada date={this.state.date} />
      </div>
    )
  }
}

// Funcao principal invocada no index.js
function App() {
  return (
    <div className="App">
      <header className="App-header">
         {/* Faz a chamada de dois relogios para mostrar a independencia destes */}
        <Clock />
        <Clock />
      </header>
    </div>
  );
}

// Declara que a funcao App pode ser usada fora do escopo dela mesma
export default App;
