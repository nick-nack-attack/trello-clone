// file for mounting App
import React from 'react';
import ReactDOM from 'react-dom';
// drag and drop
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
// components
import App from './App';
// context
import { AppStateProvider } from './AppStateContext';
// styling
import './index.css';

//

ReactDOM.render(
  <DndProvider backend={ HTML5Backend }>
    <AppStateProvider>
          <App/>
      </AppStateProvider>
    </DndProvider>,
  document.getElementById('root')
);