import React, { useState, useRef } from "react";
import Card from '../UI/Card';
import classes from './AddUser.module.css'
import Button from "../UI/Button";
import ErrorModal from "../UI/ErrorModal";
import Wrapper from "../Helper/Wrapper";

const AddUser = (props) => {

    const [enetredUsername] = useState('');
    const [enteredAge] = useState('');
    const [error, setError] = useState('');
    const nameInputRef = useRef();
    const ageInputRef = useRef();

    const addUserHandler = (event) => {
        event.preventDefault();
        const enteredName = nameInputRef.current.value; // Now we don't need to get values from state, we can get it directly when submit button is pressed using the Ref;
        const enteredUserAge = ageInputRef.current.value; 
        if(enetredUsername.trim().length === 0 || enteredAge.trim().length === 0){
            setError({
                title: 'Invalid input',
                message: 'Please enter a valid name and age.'
            });
        };
        if(+enteredUserAge < 1){
            setError({
                title: 'Invalid input',
                message: 'Please enter a valid age.'
            });
            return;
        };
        props.onAddUser(enteredName, enteredUserAge);
        nameInputRef.current.value ='';
        ageInputRef.current.value ='';
    };

    const errorHandler = () => {
        setError(null);
    };

    return (
        <Wrapper>
        {error && <ErrorModal title={error.title} message={error.message} onConfirm={errorHandler}/>}
        <Card className={classes.input}> {/* The "className" prop is here is same i.e. being used Card.js file as ${props.className} */}
            <form onSubmit={addUserHandler}>
                <label htmlFor="username">Username</label>
                <input
                    id="username"
                    type="text"
                    
                    ref = {nameInputRef}
                />

                <label htmlFor="age">Age (Years)</label>
                <input
                    id="age"
                    type="number"
                    
                    ref = {ageInputRef}
                />
                <Button type="submit">Add User</Button>
            </form>
        </Card>
    </Wrapper>
    );
};

export default AddUser;