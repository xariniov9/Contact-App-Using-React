import React, { Component } from 'react';
import './App.css';

import ContactList from './ContactList/ContactList'
class App extends Component {
  render() {
    return (
      <div className="App">
          <div class="navbar-fixed">
              <nav>
                  <div class="nav-wrapper">
                      <a href="http://localhost:3000/" class="brand-logo center" >Contacts</a>
                  </div>
              </nav>
          </div>
        <ContactList/>
          <footer class="page-footer">
          <div class="footer-copyright">
              <div class="container">
                  Made By: Himanshu Tiwari | +91-8377885724
                  <a class="grey-text text-lighten-4 right" href="https://www.linkedin.com/in/xariniov9/">About Me</a>
              </div>
          </div>
      </footer>
      </div>
  );
  }
}

export default App;
