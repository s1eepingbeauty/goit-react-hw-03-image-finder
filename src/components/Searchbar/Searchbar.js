import { Component } from 'react';
import PropTypes from 'prop-types';
import { error, defaults } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/Material.css';
import 'material-design-icons/iconfont/material-icons.css';
import './Searchbar.scss';

defaults.styling = 'material';
defaults.icons = 'material';

class Searchbar extends Component {
  state = {
    initialValue: '',
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { initialValue } = this.state;
    const { onSubmit } = this.props;
    if (initialValue === '') {
      error({
        text: 'Please enter your query',
        hide: true,
        delay: 2000,
      });
    }
    onSubmit(initialValue);
    this.setState({ initialValue: '' });
  };

  handleInputChange = (event) => {
    const value = event.target.value;
    this.setState({ initialValue: value.toLowerCase() });
  };

  render() {
    const { initialValue } = this.state;

    return (
      <header className="Searchbar">
        <form className="SearchForm" onSubmit={this.handleSubmit}>
          <button type="submit" className="SearchForm-button">
            <span className="SearchForm-button-label">Search</span>
          </button>
          <input
            className="SearchForm-input"
            onChange={this.handleInputChange}
            value={initialValue}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
