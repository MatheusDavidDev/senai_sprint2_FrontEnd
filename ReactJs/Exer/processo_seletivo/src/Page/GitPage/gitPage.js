import axios from 'axios';
import { Component } from 'react';

class Git extends Component{
    constructor(props){
        super(props);
        this.state = {
            listaGit : [],
            usuario : ''
        }
    }

    atualizaBuscar = async (event) => {
        await this.setState({ usuario : event.target.value})
        console.log(this.state.usuario)
        
    };

    buscar = () => {
        console.log('agora vms consumir a api')

        axios.get(`https://api.github.com/users/${this.state.usuario}/repos?per_page=10&short=created:%20asc`)

        .then(resposta => resposta.json())

        .then(data => this.setState({ listaGit : data}))

        .catch( (erro) => console.log(erro) )
    }


    componentDidMount(){
        this.buscar();
        this.atualizaBuscar();
    }

    render(){
        return(
            <div>
                <main>
                    <section>
                        <h2>Buscar usuario</h2>

                        <form>
                            <div>
                                <input 
                                    type="text"
                                    value={this.state.usuario}
                                    onChange={this.atualizaBuscar}
                                    placeholder="Buscar usuario"
                                />
                                <button onClick={this.atualizaBuscar}>Buscar</button>
                            </div>
                        </form>
                    </section>

                    <section>
                        <h2>Git Buscado</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Nome</th>
                                    <th>Descricao</th>
                                    <th>Data de criacao</th>
                                    <th>Tamanho do repositorio</th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    this.state.listaGit.map( (gitHub) => {
                                        return (
                                            <tr key={gitHub.id}>
                                                <td>{gitHub.id}</td>
                                                <td>{gitHub.name}</td>
                                                <td>{gitHub.description}</td>
                                                <td>{gitHub.created_at}</td>
                                                <td>{gitHub.size}</td>

                                            </tr>
                                        )
                                    } )
                                }
                            </tbody>
                        </table>
                    </section>
                </main>
            </div>
        );
    }
}

export default Git;