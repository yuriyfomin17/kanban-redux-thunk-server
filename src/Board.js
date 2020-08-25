import React, {useState} from 'react';
import Task from "./Task";
import {Droppable} from "react-beautiful-dnd";
import {v4 as uuidv4} from 'uuid';
import './App.css';
import './AddCard.css'
import {connect} from "react-redux";


const addIcon = (<svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-plus-square" fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" d="M8 3.5a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5H4a.5.5 0 0 1 0-1h3.5V4a.5.5 0 0 1 .5-.5z"/>
    <path fillRule="evenodd" d="M7.5 8a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0V8z"/>
    <path fillRule="evenodd"
          d="M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
</svg>)
const saveBut = (<svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-file-check" fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg" textalign="right">
    <path fillRule="evenodd"
          d="M10.854 6.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 8.793l2.646-2.647a.5.5 0 0 1 .708 0z"/>
    <path fillRule="evenodd"
          d="M4 1h8a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2zm0 1a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H4z"/>
</svg>)


function Board(props) {
    const [addCardBut, setBut] = useState(false)
    const [inputValue, setInputValue] = useState('')
    const [sortMenuBar, setMenuBar] = useState(false)
    const toggleMenu = () => {
        setMenuBar(!sortMenuBar)
    }
    const changeAddCard = () => {
        if (addCardBut === false) {
            setBut(!addCardBut)
        }


    }
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
                                props.columns[props.indexOfColumn].map((el, index) => <Task
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
                        onClick={() => props.sortAlphabet(props.indexOfColumn)}>Alphabet
                </button>

            </div>

        </div>

    );
}

const mapStateToProps = (state) => ({
    columns: state
});
const mapDispatchToProps = (dispatch) => ({

    sortAlphabet: (column) => dispatch({type: 'SORT_ALPHABETICALLY', payload: {column: column}})

});
export default connect(mapStateToProps, mapDispatchToProps)(Board);




