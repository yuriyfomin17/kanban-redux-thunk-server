import React, {useState} from 'react';
import Board from "./Board";
import {v4 as uuidv4} from 'uuid';
import {DragDropContext} from "react-beautiful-dnd";
import ModalWindow from "./ModalWindow";
import {connect} from 'react-redux';


function App(props) {
    console.log("My todo store", props.store.statuses)
    // const deleteTask = async (column, ID) => {
    //     // const copiedTasks = tasks.slice()
    //     // const arrColumnTasks = copiedTasks[column][column]
    //     // const indexToDelete = arrColumnTasks.findIndex(el => el._id === ID)
    //     // arrColumnTasks.splice(indexToDelete, 1)
    //
    // }
    // const editTask = async (column, ID, title) => {
    //     // const copiedTasks = tasks.slice()
    //     // const arrColumnTasks = copiedTasks[column][column]
    //     // const indexToEdit = arrColumnTasks.findIndex(el => el._id === ID)
    //     // arrColumnTasks[indexToEdit].title = title
    //     // setTasks(copiedTasks)
    //
    //
    // }
    // const addTask = async (column, title) => {
    //     // const copiedTasks = tasks.slice()
    //     // const arrColumnTasks = copiedTasks[column][column]
    //     // arrColumnTasks.push({_id: uuidv4(), title: title, priority: arrColumnTasks.length + 1, time: new Date()})
    //     // setTasks(copiedTasks)
    //     // console.log(copiedTasks)
    //
    // }
    // const sortDataAlphabetically = async (column, typeSort) => {
    //     // const copiedTasks = tasks.slice()
    //     // const arrColumnTasks = copiedTasks[column][column]
    //     // if (typeSort === "Alphabet") {
    //     //
    //     //     // eslint-disable-next-line array-callback-return
    //     //     arrColumnTasks.sort(function (a, b) {
    //     //         if (a.title > b.title) {
    //     //             return 1
    //     //         }
    //     //         if (a.title < b.title) {
    //     //             return -1
    //     //         }
    //     //
    //     //     })
    //     //
    //     // }
    //     // if (typeSort === "TimeNew") {
    //     //     console.log(arrColumnTasks)
    //     //     // eslint-disable-next-line array-callback-return
    //     //     arrColumnTasks.sort(function (a, b) {
    //     //         if (a.time > b.time) {
    //     //             return -1
    //     //         }
    //     //         if (a.time < b.time) {
    //     //             return 1
    //     //         }
    //     //
    //     //     })
    //     //
    //     // }
    //     // if (typeSort === "TimeOLD") {
    //     //     console.log(arrColumnTasks)
    //     //     // eslint-disable-next-line array-callback-return
    //     //     arrColumnTasks.sort(function (a, b) {
    //     //         if (a.time > b.time) {
    //     //             return 1
    //     //         }
    //     //         if (a.time < b.time) {
    //     //             return -1
    //     //         }
    //     //
    //     //     })
    //     // }
    //     //
    //     //
    //     // setTasks(copiedTasks)
    //
    //
    // }
    const onDragEnd = (result) => {
        const {source, destination} = result;
        // dropped outside the list
        if (!destination) {
            return;
        }
        if (destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }
        if (destination.droppableId === source.droppableId) {
            // const copiedTasks = tasks.slice()
            // const tasksArr = copiedTasks[destination.droppableId][destination.droppableId]
            // const [removed] = tasksArr.splice(result.source.index, 1)
            // tasksArr.splice(result.destination.index, 0, removed)
            // console.log(copiedTasks)
            // // eslint-disable-next-line array-callback-return
            // copiedTasks[destination.droppableId][destination.droppableId].map((el, index) => {
            //     el.index = index
            // })
            //
            // console.log("copiedTasks", copiedTasks[destination.droppableId][destination.droppableId])
            console.log("Index to remove", result.source.index)
            console.log("Index to insert", result.destination.index)
            props.dragSameColumn(destination.droppableId, result.source.index, result.destination.index)

        } else {
            //     const copiedTasks = tasks.slice()
            //     const tasksArr = copiedTasks[source.droppableId][source.droppableId]
            //     // eslint-disable-next-line array-callback-return
            //     console.log("removed Index", result.source.index)
            //     console.log("des index", result.destination.index)
            //     const [removed] = tasksArr.splice(result.source.index, 1)
            //     copiedTasks[destination.droppableId][destination.droppableId].splice(result.destination.index, 0, removed)
            //     console.log("Copied Tasks", copiedTasks)
            //     setTasks(copiedTasks)
            // }
            props.dragDiffColumn(source.droppableId,destination.droppableId,result.destination.index,result.source.index)
        }
    }
    return (
        <div>
            <div style={{display: 'flex', justifyContent: 'center', height: '100%'}}>
                <DragDropContext onDragEnd={onDragEnd}>
                    <div
                        style={{
                            display: 'flex', flexDirection: "row", alignItems: "top"
                        }}

                    >
                        {
                            props.store.statuses.map((el, index) =>
                                <Board key={uuidv4()}
                                    columnName={el}
                                    indexOfColumn={index}
                                />
                            )
                        }
                    </div>


                </DragDropContext>

            </div>
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <ModalWindow statuses={props.store.statuses}/>
            </div>
        </div>

    )
        ;
}


const mapStateToProps = (state) => ({
    store: state
});
const mapDispatchToProps = (dispatch) => ({
    dragSameColumn: (column, indexToRemove, indexToInsert) => dispatch({
        type: 'DRAG_END_SAME_COLUMN',
        payload: {column: column, indexToRemove: indexToRemove, indexToInsert: indexToInsert}
    }),
    dragDiffColumn: (sourceColumn, destColumn, destIndex, sourceIndex) => dispatch({
        type: 'DRAG_END_DIFFERENT_COLUMN',
        payload: {sourceColumn: sourceColumn, destColumn: destColumn, destIndex: destIndex, sourceIndex: sourceIndex}
    })

});
export default connect(mapStateToProps, mapDispatchToProps)(App);

