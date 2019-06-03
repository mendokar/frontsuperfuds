import React from 'react';
import axios from 'axios';

import SweetAlert from 'sweetalert-react';
class Buy_products extends React.Component {
    constructor() {
        super();
        this.state = {
            teams: [],
            states: [{
                customer_name: '',
                pro_name: '',
                cant: '',
                total: ''
            }],
            cants: [],
        }
        this.functionHandleInput = this.functionHandleInput.bind(this);
        this.functionSubmit = this.functionSubmit.bind(this);


        //this.end_point = "https://agile-peak-68497.herokuapp.com/api/";
        this.end_point = "http://127.0.0.1:8000/api/";
        this.show = false;
       

    }

    componentDidMount() {
        axios.get(this.end_point + 'stock_fuds').then((response) => {
            this.setState({ teams: response.data.stocks_fuds });
        }).catch(error => {
            console.log(error);
        });
    }
    /*
    *funcion de visualizacion de diseño de la forma de productos nuevos.
    */
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
                            <h6>Selecciona la cantidad</h6>
                            <select className="form-control" name="cant" onChange={this.functionHandleInput}>
                                <option></option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                                <option value="10">10</option>

                                {this.state.cants.map((team) => <option key={team.cant} value={team.cant}>{team.cant}</option>)}
                            </select>
                        </div>
                        <div className="form-group">
                            <h6>Ingresa tu nombre</h6>
                            <input type="text" onChange={this.functionHandleInput} name="customer_name" className="form-control" placeholder="Nombre" required></input>
                        </div>
                        <h6>Ingresa tu telefono</h6>
                        <div className="form-group">
                            <input type="text" onChange={this.functionHandleInput} name="customer_phone" className="form-control" placeholder="Telefono" required></input>
                        </div>


                        <button type="submit" className="btn btn-success block">Comprar Producto</button>
                    </form>
                    <SweetAlert
                        show={this.show}
                        title="Demo"
                        text="SweetAlert in React"
                        onConfirm={() => this.setState({ show: false })}
                    />
                </div>
            </div>)
    }

    /**
     * Funcion que permite validar y enviar los datos para ser guardados en la base de datos.
     */
    functionSubmit(e) {
        e.preventDefault();
        //alert("Enviando...");
        //alert(JSON.stringify(this.state));
        this.sendDataServer();
        this.sendDataCustomers();
        this.updateCantStock();
    }
    /**
     * Funcion que permite validar los datos que se ingresan para guardarlos en el state
     * del arreglo y enviarlos al guardar.
     */
    functionHandleInput(e) {
        //console.log("Writing...."+e.target.value, e.target.name);
        let value = e.target.value;
        let name = e.target.name;
        let price = e.target.key;

        for (let i = 0; i < this.state.teams.length; i++) {
            if (this.state.teams[i].pro_name === value) {
                this.state.states[0]['price'] = this.state.teams[i].price;
                this.state.states[0]['cant_pro'] = this.state.teams[i].cant_pro;
            }
        }

        for (let y = 1; y < this.state.states[0]['cant_pro']; y++) {
            this.state.cants.push({
                cant: y
            });

        }

        this.state.states[0][name] = value
        console.log(this.state.states);
    }

    sendDataServer() {
        this.state.states[0]['total'] =  this.state.states[0]['cant'] *  this.state.states[0]['price'];
        axios.post(this.end_point + 'buys_fuds', this.state.states[0])
            .then((response) => {
                if (response.data.response === 'OK') {
                    alert(response.data.message);                    
                } else {
                    alert("Error" + response.data.message);
                }
            })
            .catch((error) => {
                console.log(error);
            });

    }

    sendDataCustomers(){
        axios.post(this.end_point + 'customer_fuds', this.state.states[0])
            .then((response) => {
                if (response.data.response === 'OK') {
                    alert(response.data.message);

                } else {
                    alert("Error" + response.data.message);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    updateCantStock(){
        this.state.states[0]['cant_minus'] = this.state.states[0]['cant'];
        axios.put(this.end_point + 'stock_fuds', this.state.states[0]).then((response) => {
            if (response.data.response === 'OK') {
                alert(response.data.message);

            } else {
                alert("Error" + response.data.message);
            }
        }).catch(error => {
            console.log(error);
        });
    }
}

export default Buy_products;
