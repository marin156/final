import React from 'react';

import ProductListing from '../features/product-listing/product-listing'

import { getProducts } from '../services/api';


export default class HomePage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      filtered: [],
      selectedCategory: ''
    }
  }

  componentWillMount() {
    this.getData();
  }

  handleSearchChange = event => {
    // Variable to hold the original version of the list
    let currentList = [];
    // Variable to hold the filtered list before putting into state
    let newList = [];

    // If the search bar isn't empty
    if (event.target.value !== "") {
      // Assign the original list to currentList
      currentList = this.state.data;
      // Use .filter() to determine which items should be displayed
      // based on the search terms
      newList = currentList.filter(item => {
        // change current item name to lowercase
        const lc = item.name.toLowerCase();
        // change search term to lowercase
        const filter = event.target.value.toLowerCase();
        // check to see if the current list item includes the search term
        // If it does, it will be added to newList. Using lowercase eliminates
        // issues with capitalization in search terms and search content
        return lc.includes(filter);
      });
    } else {
      // If the search bar is empty, set newList to original task list
      newList = this.state.data;
    }
    this.setState({
      filtered: newList
    });
  };

  getData = async () => {
    let products = await getProducts();
    if (products) {
      this.setState({ data: products, filtered: products })
    }
  }

  categoryFilter(array) {
    if (this.state.selectedCategory != '') {
      return array.filter(product => product.category == this.state.selectedCategory);
    } else {
      return array;
    }
  }

  onDropDownChange(event) {
    let selected = event.target.value;
    this.setState({ selectedCategory: selected });

  }

  render() {
    return <div>
      <h2>Pocetna</h2>
      <div>
        <input
          placeholder='pretraga...'
          onChange={this.handleSearchChange}
        ></input>
        <select
          onChange={this.onDropDownChange.bind(this)}>
          <option key={0} value=''>Sve</option>
          {this.state.data //data - nefiltrirani
            .map(dataItem => dataItem.category)
            .filter((category, index, array) => array.indexOf(category) === index) //izbacuje duplikate iz liste db.json
            .map((data, index) => {
              return <option key={index + 1} value={data}>{data}</option>; //dodavanje optiona
            })}                                 
        </select>
      </div>
      <ProductListing products={this.categoryFilter(this.state.filtered)}></ProductListing>
    </div>
  }
}
