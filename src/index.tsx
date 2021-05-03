import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { App } from "./App";
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'
import { AppStateProvider } from "./state/AppStateContext";

ReactDOM.render(
    <React.StrictMode>
        <DndProvider backend={HTML5Backend}>
            <AppStateProvider>
                <App/>
            </AppStateProvider>
        </DndProvider>
    </React.StrictMode>,
    document.getElementById("root")
);
