import React, {useEffect} from 'react';
import Board from "./Board";
import {v4 as uuidv4} from 'uuid';
import {DragDropContext} from "react-beautiful-dnd";
import ModalWindow from "./ModalWindow";
import {connect} from 'react-redux';
import {getList} from "../redux/actionCreator";



function App(props) {
    console.log("My todo store", props.store.statuses)
    console.log("Hello")

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
            console.log("Index to remove", result.source.index)
            console.log("Index to insert", result.destination.index)

            props.dragSameColumn(destination.droppableId, result.source.index, result.destination.index)

        } else {
            props.dragDiffColumn(source.droppableId, destination.droppableId, result.destination.index, result.source.index)

        }
    }
    useEffect(() => {
        props.getFullList()

    }, []);
    return (
        <div className="text-center mt-5">
            <div  style={{display: 'flex', justifyContent: 'center', height: '100%'}}>
                <DragDropContext onDragEnd={onDragEnd}>
                    <div
                        style={{
                            display: 'flex', flexDirection: "row", alignItems: "top"
                        }}

                    >
                        {
                            props.store.statuses.map((el, index) =>
                                <div  key={uuidv4()}>
                                    <Board key={uuidv4()}
                                           columnName={el}
                                           indexOfColumn={index}
                                    />
                                </div>
                            )
                        }
                    </div>


                </DragDropContext>

            </div>
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <ModalWindow statuses={props.store.statuses} store={props.store}/>
            </div>

        </div>

    )
        ;
}


const mapStateToProps = (state) => ({
    store: state
});
const mapDispatchToProps = (dispatch) => ({
    getFullList: () => dispatch(getList()),
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

