import React, { Component } from 'react';
import './attributes.css';

class Attributes extends Component {
  render() {
    return (
      <div className="cart-side-inner">
        {this.props.data.attributes ? this.props.data.attributes.map((attribute) => {
          if (attribute.name === 'Color') {
            return (
              <div key={attribute.name} className="color-box">
                <p className="attr-name">COLOR:</p>
                <div className="color-box-inner">
                  {attribute.items.map((item, key) => (
                    <div
                      key={Math.random()}
                      onClick={() => this.props.ChooseColor(key)}
                      className={this.props.choosenColor === key ? 'color-box-inner-item chosen-color' : 'color-box-inner-item'}
                      style={{ backgroundColor: item.value }}
                    />
                  ))}
                </div>
              </div>
            );
          } if (attribute.name === 'Size') {
            return (
              <div key={attribute.name} className="size-box">
                <p className="attr-name">SIZE:</p>
                <div className="size-box-inner">
                  {attribute.items.map((item, key) => (
                    <div
                      key={Math.random()}
                      onClick={() => this.props.ChooseSize(key)}
                      className={this.props.choosenSize === key ? 'size-box-inner-item chosen-item' : 'size-box-inner-item'}
                    >
                      {item.value}
                    </div>
                  ))}
                </div>
              </div>
            );
          } if (attribute.name === 'Capacity') {
            return (
              <div key={attribute.name} className="capacity-box">
                <p className="attr-name">CAPACITY:</p>
                <div className="capacity-box-inner">
                  {attribute.items.map((item, key) => (
                    <div
                      key={Math.random()}
                      onClick={() => this.props.ChooseCapacity(key)}
                      className={this.props.choosenCapacity === key ? 'capacity-box-inner-item chosen-item' : 'capacity-box-inner-item'}
                    >
                      {item.value}
                    </div>
                  ))}
                </div>
              </div>
            );
          } if (attribute.name === 'With USB 3 ports') {
            return (
              <div key={attribute.name} className="port-box">
                <p className="attr-name">WITH USB 3 PORTS:</p>
                <div className="port-box-inner">
                  {attribute.items.map((item, key) => (
                    <div
                      key={Math.random()}
                      onClick={() => this.props.ChoosePort(key)}
                      className={this.props.choosenPort === key ? 'port-box-inner-item chosen-item' : 'port-box-inner-item'}
                    >
                      {item.value}
                    </div>
                  ))}
                </div>
              </div>
            );
          } if (attribute.name === 'Touch ID in keyboard') {
            return (
              <div key={attribute.name}>
                <p className="attr-name">TOUCH ID IN KEYBOARD:</p>
                <div className="touch-box-inner">
                  {attribute.items.map((item, key) => (
                    <div
                      key={Math.random()}
                      onClick={() => this.props.ChooseTouch(key)}
                      className={this.props.choosenTouch === key ? 'touch-box-inner-item chosen-item' : 'touch-box-inner-item'}
                    >
                      {item.value}
                    </div>
                  ))}
                </div>
              </div>
            );
          }
        }) : ''}
      </div>
    );
  }
}

export default Attributes;
