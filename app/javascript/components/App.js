import React, { Component } from 'react';
import './App.css';
import TodoList from './TodoList'
import Header from './Header'
import styled from 'styled-components'

const AppContainer = styled.div`
  width: 50%;
  height: 800px;
  position: relative;
  margin: 0 auto;
  border-radius: 5px;
`

const App = () => {
  return (
    <AppContainer>
      <Header />
      <TodoList />
    </AppContainer>
  );
}


export default App;