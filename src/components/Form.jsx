import React, {useState} from 'react';

const Form = (props) => {
    const [newTodo, setNewTodo] = useState("");
    const [checklist, setChecklist] = useState([]);

    const handleNewTodoSubmit = (e) => {
        e.preventDefault();
        
        //this will prevent adding an empty space
        if (newTodo.length == 0) {
            return;
        }

        const todoItem = {
            text: newTodo,
            complete: false
        }

        // this will pass in the new array of tasks containing the current 'todos' plus more
        setChecklist([...checklist, todoItem]);
        // this will have the input box cleared whenever something is inputted
        setNewTodo("");
    }
    
    const handleChecklistDelete = (e) => {
        const filteredTodo = checklist.filter((todo, index) => {
            return index !== e;
        });
        setChecklist(filteredTodo);
    }

    const handleUpdateChecklist = (e) => {
        const updatedTodo = checklist.map((todo, index) => {
            if (index === e){
                //use this statement when you want to avoid mutating the checklist. Better to learn for the real world lmao
                const updatedTodo = {...todo, complete: !todo.complete};
                return updatedTodo;
            }
            return todo;
        });
        setChecklist(updatedTodo);
    }

    return (
        <div style={{textAlign: 'center'}}>
            <form onSubmit={(e) => {handleNewTodoSubmit(e);}}>
                <input type="text" onChange={(e) =>{setChecklist(e.target.value);}}></input>
                <div>
                    <button type="submit">Add</button>
                </div>
            </form>
                {checklist.map((checklist, index) => {
                    return(
                        <div key={index}>
                            <input type="checkbox" checked={checklist.complete} onChange={(e) => {handleUpdateChecklist(index, checklist);}}/>
                            <span>{checklist.text}</span>
                            <button style={{marginLeft: '10px'}}  onClick={(e) => {handleChecklistDelete(e);}}>Delete</button>
                        </div>
                    )
                })}
        </div>
    )
}
export default Form;
