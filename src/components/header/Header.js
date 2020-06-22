import React, { Component } from 'react';
import { formatNumber } from '../../helpers/FormatHelpers';
import css from './header.module.css';

export default class Header extends Component {
  handleInputChange = (event) => {
    const newText = event.target.value;
    this.props.onChangeFilter(newText);
  };
  render() {
    const { filter, countryCount, totalPopulation, totalArea } = this.props;
    return (
      <div className={css.flexRow}>
        <input type="text" value={filter} onChange={this.handleInputChange} /> |{' '}
        <span className={css.countries}>
          Paises: <strong> {countryCount}</strong>{' '}
        </span>{' '}
        |{' '}
        <span className={css.info}>
          População: <strong>{formatNumber(totalPopulation)}</strong>
        </span>{' '}
        |{' '}
        <span className={css.info}>
          {' '}
          Area: <strong>{formatNumber(totalArea)}</strong>
        </span>
      </div>
    );
  }
}
