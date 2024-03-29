// add new item component
import React, { useState } from "react";

// components
import { NewItemForm } from './NewItemForm';

// import styling
import { AddItemButton } from "./styles";

// set prop type
interface AddNewItemProps {
    onAdd(text: string): void;
    toggleButtonText: string;
    dark?: boolean;
}

export const AddNewItem = (props: AddNewItemProps) => {
    const [ showForm, setShowForm ] = useState(false);
    const { onAdd, toggleButtonText, dark } = props;

    if (showForm) {
        return (
            <NewItemForm
                onAdd={(text) => {
                    onAdd(text)
                    setShowForm(false)
                } }
            />
        );
    }

    return (
        <AddItemButton dark={dark} onClick={() => setShowForm(true)}>
            {toggleButtonText}
        </AddItemButton>
    );

};
