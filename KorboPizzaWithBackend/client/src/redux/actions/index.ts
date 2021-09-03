import * as React from "react";

export interface Pizza {
    id: number,
    name: string,
    img: string,
    price: number,
    onClickAddPizza: (obj: {
        id: number,
        name: string,
        img: string,
        price: number,
        size: number,
        type: string
    }) => void;
    addedCount: number;
}

export interface SortPopup {
    type: string;
    name: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined;
    order: string;
}