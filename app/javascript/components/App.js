import React, { Component } from "react";
import TodoTable from "./TodoTable";
import Header from "./Header";
import styled from "styled-components";
import Form from "./Form";
import { Divider, Paper } from "@material-ui/core";

const AppContainer = styled.div`
  width: 80%;
  height: 800px;
  position: relative;
  margin: 0 auto;
  border-radius: 5px;
`;


const App = () => {
  return (
    <div>
      <Header />
      <TodoTable />
    </div>
  );
};

export default App;
