import React from 'react'
import { updateItem } from '../../services/api';

export default function ProductListItem(props) {
  return <div className='product-list-item'>
    <h3>{props.product.name}</h3>
    <img
      height={100}
      title={props.product.name}
      src={`/images/${props.product.image}`}
    />
    <div>{props.product.description}</div>
    <div>{props.product.price} kn</div>
    <div>

      <button onClick={function () {
        props.product.quantity = props.product.quantity + 1;
        updateItem(props.product);
        alert(props.product.name + " dodan u košaricu!\n Komada u košarici: " + props.product.quantity);
      }


      }>Dodaj u košaricu</button>

    </div>
  </div>
}