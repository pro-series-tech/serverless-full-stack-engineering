import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'

/*testing modules */
import Authentication from "./lib/authentication";
const auth = new Authentication();

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
          <br></br>
          <button onClick={async (evt) => {
            let attributes = [
              {
                Name: 'email',
                Value: 'some.email@mail.com'
              },
              {
                Name: 'phone_number',
                Value: '+11543344333'
              }
            ];

            let result = await auth.signUp("some.email@mail.com", "SomePassword123..", attributes);
            console.log("Results from sign up is:", result);
          
          }}> signUpUser</button>
          <button onClick={async (evt) => {
            let result = await auth.signIn("some.email@mail.com", "SomePassword123..");
            console.log("Sign in results:", result);
          }}> login</button>

          <button onClick={async (evt) => {
            let result = await auth.resendConfirmation("some.email@mail.com");
            console.log("Resend confirmation results:", result);

          }}> resendConfirmation</button>
          <button onClick={async (evt) => {
            let result = await auth.confirmRegistration("some.email@mail.com", "091660");
            console.log("Confirmation results:", result);
          }}> Validate</button>

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
