
//This is your top level React component, you may change everything

// import React from 'react'
import React, { Component } from 'react';
import logo from '../assets/spotim-logo.jpg'
import {Container, Image} from 'semantic-ui-react'
import styled from 'styled-components';
import Chatroom from './chatroom.js';

const Logo = styled.div`
      img{
        margin-left: auto;
        margin-right: auto;
        margin-top: 15px;      
      }
      
`;


  // return 

class App extends Component {
  render() {
    return(
      <Container className={'spotim-header'}>
        <div className={'spotim-title'}>
          Welcome to the Spot.IM Chat app
        </div>
        <div>
          <Logo>
            <Image size={'tiny'} src={logo}/>
          </Logo>

        </div>
      <Chatroom />
      </Container>
      
      
    )
  }
}

export default App;