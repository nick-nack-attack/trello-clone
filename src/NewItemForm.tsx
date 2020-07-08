// new item form
import React, { useState } from "react";
// utils
import { useFocus } from "./utils/useFocus";
// styling
import { NewItemFormContainer, NewItemButton, NewItemInput } from "./styles";

//

interface NewItemFormProps {
    // callback passed through
    onAdd(text: string): void
};

export const NewItemForm = ({ onAdd }: NewItemFormProps) => {

    const [ text, setText ] = useState("");
    const inputRef = useFocus();
  
    return (
      <NewItemFormContainer>
        <NewItemInput
            // pass reference we get from useFocus hook to input element
            ref={ inputRef }
            value={ text }
            onChange={ e => setText(e.target.value) }
        />
        <NewItemButton 
            onClick={ () => onAdd(text) }
        >
            Create
        </NewItemButton>
      </NewItemFormContainer>
    )
  }
