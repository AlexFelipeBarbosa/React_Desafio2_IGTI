import React, { Component } from 'react';
import Countries from './components/countries/Countries';
import Header from './components/header/Header';

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      allCountries: [],
      filteredCountries: [],
      filteredPopulation: 0,
      filteredArea: 0,
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
          filterName: name.toLowerCase(),
          flag,
          population,
          area,
        };
      }
    );

    const filteredPopulation = this.calculateTotalPopulationFrom(allCountries);
    const filteredArea = this.calculateTotalAreaFrom(allCountries);

    this.setState({
      allCountries: allCountries,
      filteredCountries: Object.assign([], allCountries),
      filteredPopulation,
      filteredArea,
    });
  }

  calculateTotalPopulationFrom = (countries) => {
    const totalPopulation = countries.reduce((accumalator, current) => {
      return accumalator + current.population;
    }, 0);
    return totalPopulation;
  };

  calculateTotalAreaFrom = (countries) => {
    const totalArea = countries.reduce((accumalator, current) => {
      return accumalator + current.area;
    }, 0);
    return totalArea;
  };

  handleChangeFilter = (newText) => {
    this.setState({
      filter: newText,
    });

    const filterLowerCase = newText.toLowerCase();

    const filteredCountries = this.state.allCountries.filter((country) => {
      return country.filterName.includes(filterLowerCase);
    });

    const filteredPopulation = this.calculateTotalPopulationFrom(
      filteredCountries
    );

    const filteredArea = this.calculateTotalAreaFrom(filteredCountries);

    this.setState({
      filteredCountries,
      filteredPopulation,
      filteredArea,
    });
  };

  render() {
    const {
      filteredCountries,
      filter,
      filteredArea,
      filteredPopulation,
    } = this.state;

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
        <h1 style={styles.centeredTitle}>React Countries </h1>
        <Header
          filter={filter}
          countryCount={filteredCountries.length}
          totalPopulation={filteredPopulation}
          totalArea={filteredArea}
          onChangeFilter={this.handleChangeFilter}
        />
        <Countries countries={filteredCountries} />
      </div>
    );
  }
}

const styles = {
  centeredTitle: {
    textAlign: 'center',
  },
};
