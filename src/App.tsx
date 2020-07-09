// main app
import React from "react";
//components
import { AddNewItem } from './AddNewItem';
import { Column } from "./Column";
import { CustomDragLayer } from "./CustomDragLayer";
// state
import { useAppState } from "./AppStateContext";
// styling
import { AppContainer } from "./styles";
import './App.css';

//

const App = () => {

  // state const is Appstate
  // derived automatically bc already provided it
  // when we called createContext
  const { state, dispatch } = useAppState();

  return (
    <AppContainer>
      <CustomDragLayer/>

      { state.lists.map((list, i) => ( 
        <Column 
          id={ list.id } 
          text={ list.text } 
          key={ list.id } 
          index={ i }
        />
      ))}

      <AddNewItem
        toggleButtonText="+ Add another list"
        onAdd={ text => dispatch({ 
          type: "ADD_LIST",
          payload: text 
        })}
      />

    </AppContainer>
  );
}

export default App;
