import React, { Component, PropTypes } from 'react';
import GraphiQL from 'graphiql';
import fetch from 'isomorphic-fetch';
import { graphql } from 'graphql';
import Schema from './schema.js';

const propTypes = {};
const defaultProps = {};

/**
 * App
 */
class App extends Component{
  // クライアント側だけでgraphqlを動かす
  fetchData({query, variables}) {
    let queryVariables = {};
    try {
      queryVariables = JSON.parse(variables);
    } catch(ex) {}
    return graphql(Schema, query, null, queryVariables);
  }

  render(){
    return (
      <GraphiQL fetcher={this.fetchData} />
    );
  }
}

App.propTypes = propTypes;
App.defaultProps = defaultProps;

export default App;
