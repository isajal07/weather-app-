import { EventEmitter } from 'events';
import React from 'react';

export default class Store extends React.Component {
  constructor(props) {
    super(props);

    this.eventEmitter = new EventEmitter();

    //Main App state
    this.state= {
      appName: "Weather Up"
    };
  }

  render(){
    return React.Children.map(this.props.children, child => {
      return React.cloneElement(child, {
        ...this.state,
        eventEmitter: this.eventEmitter
      });
    });
  }
}
