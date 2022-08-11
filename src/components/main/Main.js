import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchData, getDetails } from '../../redux/actions';
import './main.css';
import circleIcon from '../../assets/Circle-Icon.png';

class Main extends Component {
  componentDidMount() {
    this.props.fetchData(this.props.fromCart);
  }

  render() {
    return (
      <div className="container">
        <h1>{this.props.data ? this.props.data.categories[this.props.page].name : ''}</h1>
        <div className="articles-wrapper">
          {this.props.data ? this.props.data.categories[this.props.page].products.map((
            element,
          ) => (
            <div key={element.id} className={element.addedToCart ? 'main-item-ordered' : 'main-item'}>
              <div
                key={element.id}
                className={element.inStock ? '' : ' out-of-stock'}
              >
                <Link to="/description" className="main-img-link">
                  <div className="main-img-wrapper">
                    <img
                      src={element.gallery['0']}
                      alt={element.id}
                      className="main-img"
                      onClick={() => this.props.getDetails({
                        id: element.id,
                        attributes: element.attributes,
                        name: element.name,
                        brand: element.brand,
                        description: element.description,
                        inStock: element.inStock,
                        gallery: element.gallery,
                        prices: element.prices,
                        category: element.category,
                      })}
                    />
                    <p className={element.inStock ? 'available-item' : 'unavailable-item'}>OUT OF STOCK</p>
                  </div>
                  <img src={circleIcon} alt="circleIcon" className={element.addedToCart ? 'circle-icon' : 'hide'} />
                </Link>
                <p className={element.inStock ? 'item-name' : ''}>{element.name}</p>
                <div className="price-area" style={{ fontFamily: 'Raleway', fontWeight: '500' }}>
                  <p>{element.prices[this.props.currencyIndex.level].currency.symbol}</p>
                  <p>{element.prices[this.props.currencyIndex.level].amount}</p>
                </div>
              </div>
            </div>
          )) : ''}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.dataReducer.data.data,
  currencyIndex: state.currencyReducer,
  fromCart: state.cartReducer,
});

const mapDispatchToProps = (dispatch) => ({
  fetchData: (cartData) => dispatch(fetchData(cartData)),
  getDetails: (details) => dispatch(getDetails(details)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
