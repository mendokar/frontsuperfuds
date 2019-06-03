import React from 'react';
import axios from "axios";
class View_informes extends React.Component {
    constructor() {
        super();
        this.state = {
            stock: []
        };
        this.end_point = "http://127.0.0.1:8000/api/";
    }

    componentDidMount() {
        axios.get(this.end_point + 'buys_fuds').then((response) => {           
            this.setState({ stock: response.data.buys_fuds });
        }).catch(error => {
            console.log(error);
        });
    }

    render() {
        return (<div>
        <div className="row">
            <div className="col-sm">
            <button type="submit" className="btn btn-success block">Por Productos</button>
            </div>
            <div className="col-sm">
            <button type="submit" className="btn btn-success block">Por Cliente</button>
            </div>
            <div className="col-sm">
            <button type="submit" className="btn btn-success block">Por Proveedor</button>
            </div>
        </div>
        <br></br>
            <table className="table">
                <thead>
                    <tr>
                        <th style={{ height: '10px' }}>ID_S</th>
                        <th style={{ height: '50px' }}>Cliente</th>
                        <th style={{ height: '50px' }}>Producto</th>
                        <th style={{ height: '50px' }}>Cantidad Venta</th>
                        <th style={{ height: '50px' }}>Precio Total</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.stock.map(obj => {
                        return (
                            <tr>
                                <td>{obj.buy_id}</td>
                                <td>{obj.customer_name}</td>
                                <td>{obj.pro_name}</td>
                                <td>{obj.cant}</td>
                                <td>$ {obj.total}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
           
        </div>
        );
    }
}

export default View_informes;
