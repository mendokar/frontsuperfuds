import React from 'react';
import axios from 'axios';

class AddStock extends React.Component {
    constructor() {
        super();
        this.state = {
            teams: [],
            states: [{
                pro_name: '',
                cant_pro: '',
                num_lote: '',
                price: '',
                date_exp: ''
            }]
        }

        this.functionHandleInput = this.functionHandleInput.bind(this);
        this.functionSubmit = this.functionSubmit.bind(this);
        this.end_point = "http://127.0.0.1:8000/api/";
    }



    componentDidMount() {
        axios.get(this.end_point + 'products_fuds').then((response) => {            
            this.setState({ teams: response.data.products_fuds });
        }).catch(error => {
            console.log(error);
        });
    }

    render() {
        return (
            <div className="App">
                <div className="card">
                    <form className="card-body" onSubmit={this.functionSubmit}>

                        <div className="form-group">
                            <h6>Selecciona un producto</h6>
                            <select className="form-control" name="pro_name" onChange={this.functionHandleInput}>
                                <option></option>
                                {this.state.teams.map((team) => <option key={team.pro_name} value={team.pro_name}>{team.pro_name}</option>)}
                            </select>
                        </div>
                        <div className="form-group">
                            <h6>Ingresa la cantidad</h6>
                            <input type="text" onChange={this.functionHandleInput} name="cant_pro" className="form-control" placeholder="Cantidad" required></input>
                        </div>
                        <h6>Ingresa el número de lote</h6>
                        <div className="form-group">
                            <input type="text" onChange={this.functionHandleInput} name="num_lote" className="form-control" placeholder="Número Lote" required></input>
                        </div>
                        <h6>Ingresa el precio</h6>
                        <div className="form-group">
                            <input type="text" onChange={this.functionHandleInput} name="price" className="form-control" placeholder="Precio" required></input>
                        </div>
                        <h6>Ingresa la fecha de vencimiento</h6>
                        <div className="form-group">
                            <input type="date" onChange={this.functionHandleInput} name="date_exp" className="form-control" placeholder="Fecha Vencimiento" required></input>
                        </div>

                        <button type="submit" className="btn btn-success block">Guardar Producto</button>
                    </form>
                </div>
            </div>)
    }

    functionSubmit(e) {
        e.preventDefault();
        //alert("Enviando...");
        this.sendDataServer();
    }

    functionHandleInput(e) {
        console.log("Writing...." + e.target.value, e.target.name);
        let value = e.target.value;
        let name = e.target.name;
        this.state.states[0][name] = value
        console.log(this.state.states);
    }

    sendDataServer() {
        axios.post(this.end_point+'stock_fuds', this.state.states[0])
          .then((response) => {             
           if(response.data.response === 'OK'){
            alert(response.data.message);
            this.state.states = [{
                pro_name: '',
                cant_pro: '',
                num_lote: '',
                price: '',
                date_exp: ''
            }]
           }else{
            alert("Error"+response.data.message);
           }
          })
          .catch( (error) => {
            console.log(error);
          });
         
    }
}

export default AddStock;
