import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import { parseJwt, usuariAutenti } from '../src/sevices/auth';

import './index.css';

import App from './Pages/home/App';
import Consultas from './Pages/consultas/consultas';
import ConsultaAdm from './Pages/Adm/consultaAdm';
import Login from './Pages/login/login'

import reportWebVitals from './reportWebVitals';

const PermissaoAdm = ({ component : Component }) => (
  <Route
    render = { props =>
      usuariAutenti() && parseJwt().Role === "1" ?
      <Component {...props} /> :
      <Redirect to = 'login' />
    }
  />
)

const routing = (
  <Router>
    <div>
      <Switch>
        <Route path="/Home" component={App}/>
        <PermissaoAdm path="/Consultas" component={Consultas}/>
        <Route path="/login" component={Login}/>
        <PermissaoAdm path="/ConsultasAdm" component={ConsultaAdm}/>
        
        <Redirect to="/Home"/>
      </Switch>
    </div>
  </Router>
)

ReactDOM.render(routing, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
