import React from 'react';
import axios from 'axios';

import SweetAlert from 'sweetalert-react';


class New_product extends React.Component {
    constructor() {
        super();
        this.state={
            pro_name:'',
            pro_desc:''
        }
        this.functionHandleInput = this.functionHandleInput.bind(this);
        this.functionSubmit = this.functionSubmit.bind(this);        


        //this.end_point = "https://agile-peak-68497.herokuapp.com/api/";
        this.end_point = "http://127.0.0.1:8000/api/";
        this.show = false;

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
                            <h6>Ingresa el nombre del producto</h6>
                            <input type="text" onChange={this.functionHandleInput} name="pro_name" className="form-control" placeholder="Nombre" required></input>
                        </div>
                        <h6>Ingresa una descripcion</h6>
                        <div className="form-group">
                            <input type="text" onChange={this.functionHandleInput} name="pro_desc" className="form-control" placeholder="Descripcion" required></input>
                        </div>
                        

                        <button type="submit" className="btn btn-success block">Guardar Producto</button>
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
    }
    /**
     * Funcion que permite validar los datos que se ingresan para guardarlos en el state
     * del arreglo y enviarlos al guardar.
     */
    functionHandleInput(e){
        //console.log("Writing...."+e.target.value, e.target.name);
        let value = e.target.value;
        let name = e.target.name;
        this.setState({
            [name]:value
        });
        //console.log(this.state);
    }

    sendDataServer() {
        axios.post(this.end_point+'products_fuds', this.state)
          .then((response) => {             
           if(response.data.response === 'OK'){
            alert(response.data.message);
           }else{
            alert("Error"+response.data.message);
           }
          })
          .catch( (error) => {
            console.log(error);
          });
         
    }

    get initialState() {
        return {
            pro_name:'',
            pro_desc:''
        };
      }
    
      resetBuilder() {
        this.setState(this.initialState);
      }
}

export default New_product;
