import React, { Component } from 'react'
import SignIn from "components/signIn";
import logo from './logo.svg'
import './App.css'

/*testing modules */
class App extends Component {
  render () {
    return (
      <div className='App'>
        <SignIn/>
      </div>
    )
  }
}

export default App
