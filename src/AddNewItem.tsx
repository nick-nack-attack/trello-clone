// add new item component
import React, { useState } from "react";
// components
import { NewItemForm } from './NewItemForm';
// import styling
import { AddItemButton } from "./styles";

//

interface AddNewItemProps {
    // callback func when Create Item button clicked
    onAdd(text: string): void;
    // the text when component is a button
    toggleButtonText: string;
    // flag passed to the styled component
    dark?: boolean;
};

export const AddNewItem = (props: AddNewItemProps) => {

    const [ showForm, setShowForm ] = useState(false);
    const { onAdd, toggleButtonText, dark } = props;

    // if showForm is true then return the form to create a new item
    if (showForm) {
        return (
            <NewItemForm
                onAdd={ text => {
                    onAdd(text)
                    setShowForm(false)
                } }
            />
        );
    };

    // otherwise return a button with some CTA text
    return (
        <AddItemButton 
            dark={ dark } 
            // show the input form on click
            onClick={() => setShowForm(true)}
        >
            { toggleButtonText }
        </AddItemButton>
    );

};