import React, { Component } from 'react';

export default class Header extends Component {
  handleInputChange = (event) => {
    const newText = event.target.value;
    this.props.onChangeFilter(newText);
  };
  render() {
    const { filter, countryCount, totalPopulation, totalArea } = this.props;
    return (
      <div>
        <input type="text" value={filter} onChange={this.handleInputChange} /> |{' '}
        <span>Paises: {countryCount} </span> |{' '}
        <span>População: {totalPopulation}</span> |{' '}
        <span> Area: {totalArea}</span>
      </div>
    );
  }
}
