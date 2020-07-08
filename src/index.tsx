// file for mounting App
import React from "react";
import ReactDOM from "react-dom";
import { DndProvider } from "react-dnd"
import Backend from "react-dnd-html5-backend";

// styling
import "./index.css";

//components
import App from "./App";

// context
import { AppStateProvider } from "./AppStateContext";

ReactDOM.render(
  <DndProvider backend={ Backend }>
    <AppStateProvider>
          <App/>
      </AppStateProvider>
    </DndProvider>,
  document.getElementById('root')
);