import React from 'react';

import { getProducts, updateItem } from '../services/api';


export default class CartPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: []
        }
    }

    componentWillMount() {
        this.getData();
    }


    getData = async () => {
        let values = await getProducts(); //ne stavlja state dok nije dobio niz od get products, onda ide dalje
        if (values) {
            this.setState({ data: values })
        }
    }

    addOneItem = item => {
        var newItem = item;
        newItem.quantity = newItem.quantity + 1;
        updateItem(newItem);
        this.getData();
    }

    removeItem = item => {
        var newItem = item;
        newItem.quantity = newItem.quantity - 1;
        updateItem(newItem);
        this.getData();
    }

    removeAll = item => {
        var newItem = item;
        newItem.quantity = 0;
        updateItem(newItem);
        this.getData();
    }


    render() {  //nakon bilo koje promjene se poziva render
        return <table>
            <thread>
                <tr>
                    <th>Proizvod</th> 	&nbsp;	&nbsp;
                   <th>Kolicina</th>	&nbsp;	&nbsp;
            <th>+/-</th>
                    <th></th>
                    <th></th>
                </tr>
            </thread>
            <tbody>
                {
                    this.state.data.filter(item => item.quantity > 0 === true).map(item => <tr>
                        <td>{item.name}</td>
                        <td>{item.quantity}</td>
                        <td><button onClick={(e) => this.addOneItem(item)}>+</button>

                            <button onClick={(e) => this.removeItem(item)}>-</button>
                        </td>
                        <td>
                            <button onClick={(e) => this.removeAll(item)}>
                                Izbrisi sve iz kosarice
                    </button>
                        </td>
                    </tr>)
                }
            </tbody>
        </table>

    }
}
