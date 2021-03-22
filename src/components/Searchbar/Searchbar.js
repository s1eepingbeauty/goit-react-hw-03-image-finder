import { Component } from 'react';
import './Searchbar.scss';

class Searchbar extends Component {
  state = {
    initialValue: '',
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { initialValue } = this.state;
    const { onSubmit } = this.props;
    if (initialValue === '') {
      alert('Please enter your query');
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
          <input
            className="SearchForm-input"
            onChange={this.handleInputChange}
            value={initialValue}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
          <button type="submit" className="SearchForm-button">
            <span className="SearchForm-button-label">Search</span>
          </button>
        </form>
      </header>
    );
  }
}

export default Searchbar;
