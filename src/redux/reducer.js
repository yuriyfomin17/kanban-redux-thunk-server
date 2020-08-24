import {v4 as uuidv4} from "uuid";

const initialState = {
    0: [

    ],
    1: [


    ],
    2: [


    ],
    3: [


    ],
    statuses: ['todo', 'progress', 'review', 'done']
};

const todo = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_LIST_FROM_SERVER':

            for (let column = 0; column < 4; ++column) {
                let columnArr = action.payload.filter(el => el.column === column)

                columnArr.sort(function (a, b) {
                    if (a.index > b.indent) {
                        return 1
                    } else {
                        return -1
                    }
                })
                state[column] = columnArr

            }
            console.log("Final State",state)
            return {
                ...state,
                0: [...state["0"]],
                1: [...state["1"]],
                2: [...state["2"]],
                3: [...state["3"]],
                statuses: [...state.statuses]
            }

        case 'TODO_ADD':
            console.log(action.payload)
            state[action.payload.column].push({
                id: uuidv4(),
                title: action.payload.title,
                done: false,
                editButton: true
            })
            return {
                ...state,
                0: [...state["0"]],
                1: [...state["1"]],
                2: [...state["2"]],
                3: [...state["3"]],
                statuses: [...state.statuses]
            }
        case 'DELETE_TODO':
            const indexToDelete = state[action.payload.column].findIndex(el => el.id === action.payload.id)
            state[action.payload.column].splice(indexToDelete, 1)

            return {
                ...state,
                0: [...state["0"]],
                1: [...state["1"]],
                2: [...state["2"]],
                3: [...state["3"]],
                statuses: [...state.statuses]
            }
        case 'EDIT_TODO':
            const indexToEdit = state[action.payload.column].findIndex(el => el.id === action.payload.id)
            state[action.payload.column][indexToEdit].title = action.payload.newTitle

            return {
                ...state,
                0: [...state["0"]],
                1: [...state["1"]],
                2: [...state["2"]],
                3: [...state["3"]],
                statuses: [...state.statuses]
            }
        case 'DRAG_END_SAME_COLUMN':
            console.log("Before Change", state[action.payload.column])
            console.log("Index to remove", action.indexToRemove)
            console.log("Index to insert", action.indexToInsert)
            const [removed] = state[action.payload.column].splice(action.payload.indexToRemove, 1)
            state[action.payload.column].splice(action.payload.indexToInsert, 0, removed)
            console.log("After change", state[action.payload.column])

            return {
                ...state,
                0: [...state["0"]],
                1: [...state["1"]],
                2: [...state["2"]],
                3: [...state["3"]],
                statuses: [...state.statuses]
            }
        case 'DRAG_END_DIFFERENT_COLUMN':

            const [removedSource] = state[action.payload.sourceColumn].splice(action.payload.sourceIndex, 1)
            state[action.payload.destColumn].splice(action.payload.destIndex, 0, removedSource)
            console.log("After change", state[action.payload.column])

            return {
                ...state,
                0: [...state["0"]],
                1: [...state["1"]],
                2: [...state["2"]],
                3: [...state["3"]],
                statuses: [...state.statuses]
            }

        case 'SORT_ALPHABETICALLY':
            // eslint-disable-next-line array-callback-return
            state[action.payload.column].sort(function (a, b) {
                if (a.title > b.title) {
                    return 1
                }
                if (a.title < b.title) {
                    return -1
                }

            })
            return {
                ...state,
                0: [...state["0"]],
                1: [...state["1"]],
                2: [...state["2"]],
                3: [...state["3"]],
                statuses: [...state.statuses]
            }

        default:
            return state

    }

}
export default todo