import React, { Component } from 'react';
import { connect } from 'react-redux';
import Attributes from '../attributes/Attributes';
import plusSquare from '../../assets/plus-square.png';
import minusSquare from '../../assets/minus-square.png';
import { incrementItem, changeCartImage } from '../../redux/reducers/cartReducer';
import './bag.css';

export class Bag extends Component {
  render() {
    const bag = this.props.data;
    let total = 0;
    let Quantity = 0;
    let currency = '$';
    bag.forEach((item) => {
      const unitPrice = item.numberOfItems * item.prices[this.props.currencyIndex.level].amount;
      Quantity += item.numberOfItems;
      total += unitPrice;
      currency = item.prices[this.props.currencyIndex.level].currency.symbol;
    });
    const tax = (total * 21) / 100;
    return (
      <div className="bag-container">
        <h1 style={{ fontWeight: '700' }}>Cart</h1>
        <div className="bag-items-container">
          {
            bag.map((item) => (
              <div key={item.id} style={{ display: 'flex' }} className="bag-item-container">
                <div>
                  <p style={{ fontFamily: 'Raleway', fontWeight: '500' }}>{item.name}</p>
                  <p style={{ fontFamily: 'Raleway', fontWeight: '300' }}>{item.brand}</p>
                  <p style={{ fontFamily: 'Raleway', fontWeight: 600 }}>
                    {item.prices[this.props.currencyIndex.level].currency.symbol}
                    {item.prices[this.props.currencyIndex.level].amount}
                  </p>
                  <Attributes
                    data={item}
                    choosenColor={item.colorSelected}
                    choosenCapacity={item.capacitySelected}
                    choosenPort={item.portSelected}
                    choosenTouch={item.touchSelected}
                    choosenSize={item.sizeSelected}
                  />
                </div>
                <div style={{ display: 'flex', height: '100%' }}>
                  <div style={{
                    display: 'flex',
                    height: '90%',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    padding: '3%',

                  }}
                  >
                    <img src={plusSquare} onClick={() => this.props.incrementItem(item, '+')} alt="plus button" />
                    <p>{item.numberOfItems}</p>
                    <img src={minusSquare} onClick={() => this.props.incrementItem(item, '-')} alt="minus button" />
                  </div>
                  <div className="cart-image-wrapper">
                    <img
                      className="cart-image"
                      src={item.gallery[item.shownImg]}
                      style={{ width: '100%' }}
                      alt="item description"
                    />
                    <div className="cart-image-changer">
                      <button type="button" className="image-changer-btn" onClick={() => this.props.changeCartImage(item, '-')}>
                        {'<'}
                        {' '}
                      </button>
                      <button type="button" className="image-changer-btn" onClick={() => this.props.changeCartImage(item, '+')}>{'>'}</button>
                    </div>
                  </div>
                </div>

              </div>
            ))

          }
        </div>
        <div>
          <ul>
            <li>
              Tax 21%:
              <span style={{ fontWeight: '600' }}>
                {currency}
                {tax.toFixed(2)}
              </span>
            </li>
            <li>
              Quantity:
              <span style={{ fontWeight: '600' }}>{Quantity}</span>
            </li>
            <li>
              Total:
              <span style={{ fontWeight: '600' }}>
                {currency}
                { total.toFixed(2)}
              </span>
            </li>
          </ul>
          <button type="button" className="btn-order">ORDER</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.cartReducer,
  currencyIndex: state.currencyReducer,
});

const mapDispatchToProps = (dispatch) => ({
  incrementItem: (item, btn) => dispatch(incrementItem(item, btn)),
  changeCartImage: (item, btn) => dispatch(changeCartImage(item, btn)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Bag);
