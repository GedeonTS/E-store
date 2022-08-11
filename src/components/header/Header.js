import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/group.png';
import cart from '../../assets/EmptyCart.png';
import Select from './Select';
import CartOverlay from '../cartOverlay/CartOverlay';
import './header.css';

class Header extends Component {
  state = { cartBtnPath: '' }

  changeCartBtnPath = (path) => {
    this.setState({ cartBtnPath: path });
  }

  render() {
    const activeClassName = 'active-nav';
    const initialClassName = 'initial-nav';
    let numberOfItems = 0;
    this.props.data.map((item) => numberOfItems += item.numberOfItems);

    return (
      <header className="header">
        <nav style={{
          display: 'flex', width: '85vw', justifyContent: 'space-between', marginLeft: '5%',
        }}
        >
          <ul className="nav-menu">
            <li>
              <NavLink
                to="/"
                onClick={() => this.changeCartBtnPath('')}
                className={({ isActive }) => (isActive ? activeClassName : initialClassName)}
              >
                ALL
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/clothes"
                onClick={() => this.changeCartBtnPath('clothes')}
                className={({ isActive }) => (isActive ? activeClassName : initialClassName)}
              >
                CLOTHES
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/tech"
                onClick={() => this.changeCartBtnPath('tech')}
                className={({ isActive }) => (isActive ? activeClassName : initialClassName)}
              >
                TECH
              </NavLink>
            </li>
          </ul>
          <img className="logo" src={logo} alt="bag" />
          <div style={{ display: 'flex' }}>
            <Select />
            <div style={{ position: 'relative' }}>
              <div className={numberOfItems > 0 ? 'item-number' : 'hide'} style={{ position: 'absolute' }}>{numberOfItems}</div>
              <img
                src={cart}
                alt="bag"
                className="my-bag-img"
                onClick={
                (e) => {
                  if (this.state.cartBtnPath !== 'bag') { this.props.change(); } else {
                    e.preventDefault();
                  }
                }
}
              />
            </div>
          </div>

        </nav>
        <CartOverlay
          path={this.state.cartBtnPath}
          changeCartBtnPath={this.changeCartBtnPath}
          change={this.props.change}
          stateCart={this.props.stateCart}
        />
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.cartReducer,
});

const mapDispatchToProps = () => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
