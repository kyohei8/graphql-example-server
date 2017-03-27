import React, { Component, PropTypes } from 'react';

const propTypes = {};
const defaultProps = {};

/**
 * App
 */
class App extends Component{
  constructor(props){
    super(props);
  }

  render(){
    return (
      <div>App</div>
    );
  }
}

App.propTypes = propTypes;
App.defaultProps = defaultProps;

export default App;
