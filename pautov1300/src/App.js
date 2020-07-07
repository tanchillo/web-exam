import React, { Component } from 'react';
import './styles/Main.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from './components/Hight/Layout';
import Main from './components/Hight/Main';

export default class App extends Component {
  render() {
    return (
      <div className='App'>
        <Layout>
          <Main />
        </Layout>
      </div>
    )
  }
}
