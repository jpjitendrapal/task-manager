import { createContext } from "react";

const AppContext = createContext();
const TaskContext = createContext();

/* [
    {
        id: 1,
        name: "todo",
        cards: [{
            title: "aksjdh",
            description: ""
        }]
    },
    {
        id: 2,
        name: "todo2",
        cards: []
    },
    {
        id: 3,
        name: "todo3",
        cards: []
    }
]

*/


export {AppContext, TaskContext};