import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'

class App extends Component {
  render () {
    return (
      <div className='App'>
        <header className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a className='App-link' href='https://reactjs.org' target='_blank' rel='noopener noreferrer'>
            Learn React
          </a>
          <p>environment: {process.env.REACT_APP_ENVIRONMENT}</p>
          <p>endpoint: {process.env.REACT_APP_ENDPOINT}</p>
          <p>user pool client id: {process.env.REACT_APP_USER_POOL_CLIENT_ID}</p>
          <p>user pool id: {process.env.REACT_APP_USER_POOL_ID}</p>
          <p>identity pool id: {process.env.REACT_APP_IDENTITY_POOL_ID}</p>
          <p>pictures bucket: {process.env.REACT_APP_PICTURES_BUCKET}</p>
          <p>front end bucket: {process.env.REACT_APP_FRONT_END_BUCKET}</p>
        </header>
      </div>
    )
  }
}

export default App
