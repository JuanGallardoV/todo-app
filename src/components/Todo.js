//* Juan Gallardo 14-03-2022
import React from 'react';

const Todo = ({ todo, todoDelete, todoToogleCompleted, setTodoEdit }) => {

    //? const { todo } = props;

    return(
        <div className='card mt-2'>
                <div className='card-body text-right'>
                    <h3 className='card-title text-right'>
                        {todo.title}
                        <button 
                        onClick={() => todoToogleCompleted(todo.id)}
                        className={`btn btn-sm ${todo.completed ? 'btn-outline-success' : 'btn-success'} ml-2`}
                        >
                            {todo.completed ? 'Terminado' : 'Terminar'}
                        </button>
                    </h3>
                    <p className='card-text'>
                        {todo.description}
                    </p>
                    <hr/>
                    <div className='d-flex justify-content-end'>
                    <button 
                    className='btn btn-sm btn-outline-primary mr-2'
                    onClick={() => setTodoEdit(todo)}
                    >
                        Editar
                    </button>
                    <button
                    //! Debido a que las funciones con argumentos se ejecutan siempre una vez, se crea como una funcion flecha 
                    onClick={() => todoDelete(todo.id)}
                    className='btn btn-sm btn-outline-danger'
                    >
                        Eliminar
                    </button>
                    </div>
                </div>
            </div>
    );
}

export default Todo;