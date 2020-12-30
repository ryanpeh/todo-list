import React, { Component } from 'react';
import TodoTable from './TodoTable'
import Header from './Header'
import styled from 'styled-components'

const AppContainer = styled.div`
  width: 100%;
  height: 800px;
  position: relative;
  margin: 0 auto;
  border-radius: 5px;
`

const App = () => {
  return (
    <AppContainer>
      <Header />
      <TodoTable />
    </AppContainer>
  );
}


export default App;