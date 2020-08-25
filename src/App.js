import React, {useState, useEffect} from 'react';
import Board from "./Board";
import {v4 as uuidv4} from 'uuid';
import {DragDropContext} from "react-beautiful-dnd";
import ModalWindow from "./ModalWindow";
import {connect} from 'react-redux';
import {getList} from "./redux/actionCreator";


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


        } else {

        }
    }
    useEffect(() => {
        props.getFullList()

    }, []);
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

    getFullList: () => dispatch(getList())

});
export default connect(mapStateToProps, mapDispatchToProps)(App);

