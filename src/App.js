import React, { Component } from 'react';
import Countries from './components/countries/Countries';
import Header from './components/header/Header';

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      allCountries: [],
      filteredCountries: [],
      filter: '',
    };
  }

  async componentDidMount() {
    const res = await fetch('https://restcountries.eu/rest/v2/all');
    const json = await res.json();

    const allCountries = json.map(
      ({ name, numericCode, flag, population, area }) => {
        return {
          id: numericCode,
          name,
          flag,
          population,
          area,
        };
      }
    );

    this.setState({
      allCountries: allCountries,
      filteredCountries: allCountries,
    });
  }

  handleChangeFilter = (newText) => {
    this.setState({
      filter: newText,
    });
  };

  render() {
    const { allCountries, filter } = this.state;

    return (
      <div className="container">
        <h5>
          Desafio realizado no Modulo de React do BootCamp FullStack do IGTI
        </h5>
        <h6>
          -- Criação de um app para listar países a partir da API
          https://restcountries.eu/rest/v2/all
        </h6>
        <h6>-- Input para filtrar os paises</h6>
        <h1>React Countries </h1>
        <Header filter={filter} onChangeFilter={this.handleChangeFilter} />
        <Countries countries={allCountries} />
      </div>
    );
  }
}
