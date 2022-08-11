import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeCurrency } from '../../redux/actions';
import './header.css';

const options = [
  { Symbol: '$ ', label: '  USD', value: 0 },
  { Symbol: '£ ', label: 'GBP', value: 1 },
  { Symbol: 'A$ ', label: 'AUD', value: 2 },
  { Symbol: '¥ ', label: 'JPY', value: 3 },
  { Symbol: '₽ ', label: 'RUB', value: 4 }];

export class Select extends Component {
  state = { display: 'hide', Symbol: options[0].Symbol }

  changeOption = (value) => {
    this.setState({ display: 'hide', Symbol: options[value].Symbol });
  }

  shwOptions = () => {
    if (this.state.display === 'hide') {
      this.setState({ display: 'currency-options show' });
    } else {
      this.setState({ display: 'hide' });
    }
  }

  render() {
    return (
      <div
        onMouseLeave={() => this.setState({ display: 'hide' })}
        style={{ fontFamily: 'Raleway', zIndex: '1500', background: '#fff' }}
        className="custom-select"
      >
        <div
          style={{ width: '50px', display: 'flex', alignItems: 'center' }}
          onClick={this.shwOptions}
          className="selected"
        >
          <input
            value={this.state.Symbol}
            className="select"
          />
          <img
            style={{ width: '15px', height: '15px', marginLeft: '15px' }}
            alt=""
            onClick={this.shwOptions}
            src={this.state.display === 'hide' ? 'https://img.icons8.com/external-those-icons-fill-those-icons/24/000000/external-down-arrows-those-icons-fill-those-icons-1.png'
              : 'https://img.icons8.com/external-those-icons-fill-those-icons/24/000000/external-up-arrows-those-icons-fill-those-icons.png'}
          />
        </div>
        <div
          className={this.state.display}
        >
          {options.map((option) => (
            <div
              key={option.value}
              onClick={() => {
                this.changeOption(option.value);
                this.props.changeCurrency(option.value);
              }}
              className="option"
            >
              {option.Symbol}
              {option.label}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.currencyReducer,
});

const mapDispatchToProps = (dispatch) => ({
  changeCurrency: (value) => dispatch(changeCurrency(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Select);
