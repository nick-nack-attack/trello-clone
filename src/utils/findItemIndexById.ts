// find item by id util

interface Item {
    id: string
};

export const findItemIndexById = 
    // use generic type T that extends Item
    // contains our generic to have the fields that are defined
    // on the Item interface
    // in this case, the id field
    <T extends Item>
        (
            items: T[], 
            id: string
        ) => {
    return items.findIndex((item: T) => item.id === id)
    };