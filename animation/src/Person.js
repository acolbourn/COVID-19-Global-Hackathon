import React, { Component } from 'react';
import './Person.css';

export default class Person extends Component {
  render() {
    return (
      <div
        className={`Person ${this.props.groupPosition} ${
          this.props.testStatus
        } ${this.props.hide && 'hide'} ${this.props.hideBorders &&
          'hideBorders'}`}
      >
        <div
          className={`Person-test ${this.props.testStatus} ${this.props
            .hideBorders && 'hideBorders'}`}
        >
          <div className='Person-space'>
            <div
              className={`Person-person ${this.props.infected} ${this.props.testStatus}`}
            ></div>
          </div>
        </div>
      </div>
    );
  }
}
