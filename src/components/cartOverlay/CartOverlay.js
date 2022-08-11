import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Attributes from '../attributes/Attributes';
import plusSquare from '../../assets/plus-square.png';
import minusSquare from '../../assets/minus-square.png';
import { incrementItem } from '../../redux/reducers/cartReducer';
import './smallCart.css';

export class CartOverlay extends Component {
  render() {
    const myBag = this.props.data;
    let total = 0;
    let currency = '$';
    let ItemNumber = 0;
    myBag.forEach((item) => {
      const unitPrice = item.numberOfItems * item.prices[this.props.currencyIndex.level].amount;
      total += unitPrice;
      currency = item.prices[this.props.currencyIndex.level].currency.symbol;
      ItemNumber += item.numberOfItems;
    });

    return (
      <div
        style={{
          height: '90vh',
          width: '100vw',
          overflowY: 'scroll',
        }}
        className={this.props.stateCart.overlay ? 'overlay-wrapper' : 'hide'}
      >
        <div style={{ height: '100%', width: '69%', position: 'absolute' }} onMouseOver={() => this.props.change()} />
        <div className="small-cart">
          <div className="my-bag-container">
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {' '}
              <h4>My Bag.</h4>
              <p>
                {ItemNumber}
                {' '}
                items
              </p>
            </div>
            <div className="my-bag-items-container">
              {
                myBag.map((item) => (
                  <div key={item.id} style={{ display: 'flex' }} className="cart-elem">
                    <div>
                      <p style={{
                        fontFamily: 'Raleway', fontWeight: 300, fontSize: '16px', lineHeight: '10px',
                      }}
                      >
                        {item.name}
                      </p>
                      <p style={{
                        fontFamily: 'Raleway', fontWeight: 300, fontSize: '16px', lineHeight: '10px',
                      }}
                      >
                        {item.brand}
                      </p>
                      <p style={{ fontFamily: 'Raleway', fontWeight: 600 }}>
                        {item.prices[this.props.currencyIndex.level].currency.symbol}
                        {item.prices[this.props.currencyIndex.level].amount}
                      </p>
                      <Attributes
                        data={item}
                        price={item.price}
                        index={this.props.currencyIndex}
                        choosenColor={item.colorSelected}
                        choosenCapacity={item.capacitySelected}
                        choosenPort={item.portSelected}
                        choosenTouch={item.touchSelected}
                        choosenSize={item.sizeSelected}
                      />
                    </div>
                    <div className="img-btn-quantity-container">
                      <div style={{
                        display: 'flex',
                        height: '150px',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        padding: '6px',
                      }}
                      >
                        <img style={{ width: '20px', height: '20px' }} src={plusSquare} onClick={() => this.props.incrementItem(item, '+')} alt="plus button" />
                        <p>{item.numberOfItems}</p>
                        <img style={{ width: '20px', height: '20px' }} src={minusSquare} onClick={() => this.props.incrementItem(item, '-')} alt="minus button" />
                      </div>
                      <div
                        className="my-cart-image-wrapper"
                        style={{
                          height: '150px',
                          width: '100px',
                        }}
                      >
                        <img
                          className="my-cart-image"
                          src={item.gallery[0]}
                          style={{ width: '100%', height: 'auto' }}
                          alt="item's"
                        />
                      </div>
                    </div>
                  </div>
                ))
              }
            </div>

          </div>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '5%' }}>
              <p style={{

                fontFamily: 'Roboto',
                fontWeight: '500',
                fontSize: '16px',
              }}
              >
                Total:
              </p>
              <div style={{ display: 'flex' }}>
                <p style={{ fontFamily: 'Raleway', fontWeight: '500' }}>{currency}</p>
                <p style={{ fontFamily: 'Raleway', fontWeight: '500' }}>{total.toFixed(2)}</p>
              </div>
            </div>
            <div className="my-bag-total" style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Link
                className="btn "
                onClick={() => {
                  this.props.changeCartBtnPath('bag');
                  this.props.change();
                }}
                style={{ textDecoration: 'none' }}
                to="/bag"
              >
                <button type="button" className="view-bag">
                  VIEW BAG
                </button>
              </Link>
              <button type="button" className="btn checkout">CHECK OUT</button>
            </div>
          </div>

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
});

export default connect(mapStateToProps, mapDispatchToProps)(CartOverlay);
