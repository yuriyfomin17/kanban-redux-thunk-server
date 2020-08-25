import React, {useState} from 'react';
import {Modal, ModalHeader, Input, Label, ModalBody, ModalFooter, Button} from "reactstrap"
import {connect} from "react-redux";
import axios from 'axios';
import {getList} from "../redux/actionCreator";


function ModalWindow(props) {
    const [isModalOpen, setModalOpen] = useState(false)
    const [newTitle, setNewTitle] = useState('')
    const [boardOption, setBoard] = useState(0)
    console.log(boardOption)
    const addNewTask = () => {
        axios({
            url: 'http://localhost:5000/todo',
            method: 'POST',
            data: {name: newTitle, column: boardOption, index:props.store[boardOption].length, done:false},
        })
            .then(res => {
                props.getFullList()
            })
            .catch(error => {
                console.log(error)
            })
        setModalOpen(!isModalOpen)
        setNewTitle("")
    }
    return (
        <>
            <Button onClick={() => setModalOpen(!isModalOpen)}> Add new task</Button>
            <Modal isOpen={isModalOpen}>
                <ModalHeader>New task form</ModalHeader>
                <ModalBody>
                    <Label>New Title</Label>
                    <Input type="text" value={newTitle} onChange={(e) => setNewTitle(e.target.value)}
                           placeholder="Enter Task Title..."/>
                    <Input type="text" value={newTitle} onChange={(e) => setNewTitle(e.target.value)}
                           placeholder="Enter Task Description..."/>
                </ModalBody>
                <select id="priority" className="form-control" value={boardOption}
                        onChange={(e) => setBoard(e.target.value)} placeholder="">
                    {
                        props.statuses.map((el, index) => {
                            return <option key={el} value={index}>{el}</option>;
                        })
                    }
                </select>
                <ModalFooter>
                    <Button className="btn btn-light m-3" onClick={addNewTask}>Add new Task</Button>{' '}
                    <Button onClick={() => setModalOpen(!isModalOpen)}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </>
    );
}

const mapStateToProps = (state) => ({
    store: state
});
const mapDispatchToProps = (dispatch) => ({
    getFullList: () => dispatch(getList())
});
export default connect(mapStateToProps, mapDispatchToProps)(ModalWindow);

