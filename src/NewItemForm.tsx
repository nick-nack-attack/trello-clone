// new item form
import React, { useState } from "react";

// utils
import { useFocus } from "./utils/useFocus";

// styling
import { NewItemFormContainer, NewItemButton, NewItemInput } from "./styles";

interface NewItemFormProps {
    onAdd(text: string): void
}

export const NewItemForm = ({ onAdd }: NewItemFormProps) => {
    const [text, setText] = useState("");
    const inputRef = useFocus();

    const handleAddText = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            onAdd(text);
        }
    };

    return (
      <NewItemFormContainer>
        <NewItemInput
          ref={inputRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyPress={handleAddText}
        />
        <NewItemButton onClick={() => onAdd(text)}>
            Create
        </NewItemButton>
      </NewItemFormContainer>
    )
  }
