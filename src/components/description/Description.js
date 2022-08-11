import React, { Component } from 'react';
import { connect } from 'react-redux';
import './description.css';
import Attributes from '../attributes/Attributes';
import { getCartItem } from '../../redux/reducers/cartReducer';

export class Description extends Component {
  state = {
    mainImg: 0,
    sizeSelected: 0,
    colorSelected: 0,
    capacitySelected: 0,
    portSelected: 0,
    touchSelected: 0,
  }

  addToBag = (data) => {
    this.props.getCartItem({
      ...data,
      colorSelected: this.state.colorSelected,
      sizeSelected: this.state.sizeSelected,
      capacitySelected: this.state.capacitySelected,
      portSelected: this.state.portSelected,
      touchSelected: this.state.touchSelected,
    });
  }

  changeColor = (color) => {
    this.setState({ colorSelected: color });
  }

  changeSize = (size) => {
    this.setState({ sizeSelected: size });
  }

  changeCapacity = (capacity) => {
    this.setState({ capacitySelected: capacity });
  }

  changePort = (port) => {
    this.setState({ portSelected: port });
  }

  changeTouch = (touch) => {
    this.setState({ touchSelected: touch });
  }

  render() {
    let description;
    if (this.props.data.gallery) {
      localStorage.setItem('data', JSON.stringify(this.props.data));
      description = this.props.data;
    } else {
      description = JSON.parse(localStorage.getItem('data'));
    }
    return (
      <div>
        <div className="cart-wrap">
          <div className="cart-side-wrap">
            {description.gallery
              ? description.gallery.map((image, key) => (
                <div key={image} className="left-section-image">
                  <img src={image} alt={image} onClick={() => this.setState({ mainImg: key })} className="cart-side-img" />
                  {' '}
                </div>
              )) : 'No Image'}
          </div>
          <div className="cart-img-container">
            <img src={description.gallery[this.state.mainImg]} alt="cart-img" className="cart-img" />
          </div>
          <div className="cart-right-section">

            <h3>{description.name}</h3>
            <p>{description.brand}</p>
            <div className="attributes">
              <Attributes
                data={description}
                price={description.price}
                index={this.props.currencyIndex}
                ChooseColor={this.changeColor}
                ChooseSize={this.changeSize}
                ChooseCapacity={this.changeCapacity}
                ChoosePort={this.changePort}
                ChooseTouch={this.changeTouch}
                choosenColor={this.state.colorSelected}
                choosenCapacity={this.state.capacitySelected}
                choosenPort={this.state.portSelected}
                choosenTouch={this.state.touchSelected}
                choosenSize={this.state.sizeSelected}

              />
            </div>
            <div className="cart-price">
              <h5>PRICE:</h5>
              <div className="cart-price-inner">
                {description.prices ? description.prices[this.props.currencyIndex.level].currency.symbol : ''}
                {description.prices ? description.prices[this.props.currencyIndex.level].amount : ''}
              </div>
            </div>
            <button
              type="button"
              className="cart-button"
              onClick={() => {
                if (description.inStock) {
                  this.addToBag(description);
                }
              }}
            >
              ADD TO CART
            </button>
            <p className={description.inStock ? 'hide' : 'show'} style={{ color: 'orange' }}>OUT OF STOCK</p>
            <div
              className="cart-description"
              dangerouslySetInnerHTML={{ __html: description.description }}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.detailsReducer,
  cartdata: state.cartReducer,
  currencyIndex: state.currencyReducer,

});

const mapDispatchToProps = (dispatch) => ({
  getCartItem: (cartItem) => dispatch(getCartItem(cartItem)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Description);
