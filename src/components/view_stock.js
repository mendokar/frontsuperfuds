import React from 'react';
import axios from "axios";

class View_stock extends React.Component {
    constructor() {
        super();
        this.state = {
            stock: []
        };
        this.end_point = "http://127.0.0.1:8000/api/";
    }

    componentDidMount() {
        axios.get(this.end_point + 'stock_fuds').then((response) => {           
            this.setState({ stock: response.data.stocks_fuds });
        }).catch(error => {
            console.log(error);
        });
    }





    render() {
        return (<div>
            <table className="table">
                <thead>
                    <tr>
                        <th style={{ height: '10px' }}>ID_S</th>
                        <th style={{ height: '50px' }}>Producto</th>
                        <th style={{ height: '50px' }}>Cantidad</th>
                        <th style={{ height: '50px' }}>Lote</th>
                        <th style={{ height: '50px' }}>Precio</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.stock.map(obj => {
                        return (
                            <tr>
                                <td>{obj.stock_id}</td>
                                <td>{obj.pro_name}</td>
                                <td>{obj.cant_pro}</td>
                                <td>{obj.num_lote}</td>
                                <td>$ {obj.price}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <button type="submit" className="btn btn-success block">Ver Stocks</button>
        </div>
        );
    }

    /* render() {
         return (
             <div className="card">
                 <table class="table table-hover">
                     <thead>
                         <tr>                            
                             <th scope="col">Nombre</th>
                             <th scope="col">Cantidad</th>
                             <th scope="col">Lote</th>
                             <th scope="col">Precio</th>
                             <th scope="col">Fecha Exp</th>
                         </tr>
                     </thead>
                     <tbody>
                         <tr>
                                 lorem
                         </tr>
                         <tr>
                             <th scope="row">2</th>
                             <td>Jacob</td>
                             <td>Thornton</td>
                             <td>@fat</td>
                         </tr>
                         <tr>
                             <th scope="row">3</th>
                             <td colspan="2">Larry the Bird</td>
                             <td>@twitter</td>
                         </tr>
                     </tbody>
                 </table>
             </div>
         )
     }*/

}

export default View_stock;
