//* Juan Gallardo 14-03-2022
import React from 'react';
import Todo from './Todo';

const TodoList = ({todos, todoDelete, todoToogleCompleted, setTodoEdit}) => {

    return (
        <div>
            <h2 className='text-right display-4'>Soy TodoList</h2>

            {
                todos.length === 0 ? (
                    <div className='alert alert-primary'>
                        No hay tareas
                    </div>
                ) : (
                    //?El key es necesario para que React pueda diferenciarlos
                    //* todos.map(todo => <Todo todo={todo} key={todo.id}/>)
                    todos.map(todo =>(
                        <Todo
                            todo={todo}
                            key={todo.id}
                            todoDelete={todoDelete}
                            todoToogleCompleted = {todoToogleCompleted}
                            setTodoEdit = {setTodoEdit}
                        />
                    ))
                )
            }
            {/* <Todo 
                todo={todo1}
            />
            <Todo 
                todo={todo2}
            /> */}
        </div>
    );
}

export default TodoList;