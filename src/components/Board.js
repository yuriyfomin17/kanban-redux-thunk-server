import React, {useState} from 'react';
import Task from "./Task";
import {Droppable} from "react-beautiful-dnd";
import {v4 as uuidv4} from 'uuid';
import './App.css';
import './AddCard.css'
import {connect} from "react-redux";

function Board(props) {
    const [addCardBut, setBut] = useState(false)
    const [inputValue, setInputValue] = useState('')


    const setInput = (e) => {
        setInputValue(e.target.value)

    }


    return (
        <div style={{
            display: 'flex', flexDirection: "column", alignItems: "center"
        }}>

            <div style={{margin: 8}}>
                <h2
                    style={{
                        background: 'lightgrey',
                        padding: 4,
                        width: 250,
                        minHeight: 1,
                        borderRadius: 10,
                        textAlign: "center"


                    }}
                >Board {props.columnName}</h2>


                <Droppable key={uuidv4()} droppableId={String(props.indexOfColumn)}>
                    {(provided, snapshot) => (

                        <div className='cardsContainer'
                             ref={provided.innerRef}
                             {...provided.droppableProps}
                             style={{
                                 background: snapshot.isDraggingOver ? 'lightgrey' : 'lightblue',
                                 padding: 4,
                                 width: 250,
                                 minHeight: 500,


                             }}
                        >


                            {
                                props.store[props.indexOfColumn].map((el, index) => <Task
                                    key={el._id}
                                    el={el}
                                    indexOfColumn={props.indexOfColumn}
                                    index={index}
                                    deleteTask={props.deleteTask}
                                    editTask={props.editTask}
                                    indexStatus={props.indexStatus}

                                />)
                            }

                            {provided.placeholder}

                        </div>
                    )}


                </Droppable>


                {addCardBut ? <input type="text" className="form-control" aria-label="Small"
                                     aria-describedby="inputGroup-sizing-sm" value={inputValue}
                                     onChange={setInput}/> : ''}


                <button type="button" className="btn btn-outline-primary btn-sm"
                        onClick={() => props.sortAlphabet(props.indexOfColumn)}>Sort by Alphabet
                </button>

            </div>

        </div>

    );
}

const mapStateToProps = (state) => ({
    store: state
});
const mapDispatchToProps = (dispatch) => ({

    sortAlphabet: (column) => dispatch({type: 'SORT_ALPHABETICALLY', payload: {column: column}})

});
export default connect(mapStateToProps, mapDispatchToProps)(Board);




