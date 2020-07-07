// main app
import React from "react";

//componnts
import { AppContainer } from "./styles";
import { Card } from "./Card";
import { Column } from "./Column";

// styling
import './App.css';

const App = () => {
  return (
    <AppContainer>
      <Column text="To Do">
        <Card text="Generate app scaffold"/>
      </Column >
      <Column text="In Progress">
        <Card text="Learn Typescript"/>
      </Column>
      <Column text="Done">
        <Card text="Begin to use static typing"/>
      </Column>
    </AppContainer>
  );
}

export default App;
