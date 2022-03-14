//* Juan Gallardo 14-03-2022
import React, { useState, useEffect } from 'react';

const initialFormValues = {
    title: '',
    description: ''
}

const TodoForm = ({ todoAdd, todoEdit, todoUpdate, setTodoEdit }) => {

    const [formValues, setFormValues] = useState(initialFormValues);
    const { title, description } = formValues;
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    useEffect(() => {
        
        if(todoEdit){
            setFormValues(todoEdit);
        }else{
            setFormValues(initialFormValues);
        }
    },[todoEdit])

    const handleInputChange = (e) => {

        const changedFormValues = {
            ...formValues,
            [e.target.name] : e.target.value
        }
        setFormValues(changedFormValues)
    }

    const handleSubmit = (e) => {
        //? Con esto evitamos que se recargue de manera automatica la pagina, ya que este es un comportamiento por defecto del submit de un formulario
        e.preventDefault();

        //? Validacion
        if(title.trim()===''){
            setError('Debes indicar un titulo');
            return;
        }
        if(description.trim()===''){
            setError('Debes indicar una descripcion');
            return;
        }

        if(todoEdit){
            //? Actualizar Tarea
            todoUpdate(formValues);
            setSuccessMessage('Editado con exito');
        }else{
            //? Agregar Tarea
            todoAdd(formValues);
            setSuccessMessage('Agregado con exito');
            setFormValues(initialFormValues);
        }
        //? Al pasar el tiempo asignado (2000 milisegundos [2 segundos]), ejecuta la funcion asignada
        setTimeout(() => {
            setSuccessMessage(null);
        },2000);
        setError(null);
    }

    return (
        <div>
            <h2 className='text-center display-5'>{ todoEdit ? 'Editar Tarea' : 'Nueva Tarea'}</h2>
            
            {
                todoEdit &&
                    <button
                        className='btn btn-sm btn-warning mb-2'
                        onClick={() => setTodoEdit(null)}
                    >
                        Cancelar Edicion
                    </button>
            }

            <form onSubmit={handleSubmit}>
                <input 
                type="text" 
                placeholder='Titulo' 
                className='form-control'
                value={title}
                name="title"
                onChange={handleInputChange}
                />

                <textarea 
                placeholder='Descripcion' 
                className='form-control mt-2'
                value={description}
                name="description"
                onChange={handleInputChange}
                />

                <button 
                className='btn btn-primary btn-block mt-2'
                >
                    {todoEdit ? 'Actualizar Tarea' : 'Agregar Tarea'}
                </button>

            </form>
            {
                //? Valida si error tiene un valor (que sea distinto de nulo o falso)
                error && 
                (
                    <div className='alert alert-danger mt-2'>
                        { error }
                    </div>
                )
            }
            {
                successMessage && 
                (
                    <div className='alert alert-success mt-2'>
                        { successMessage }
                    </div>
                )
            }

            
        </div>
    );
}

export default TodoForm;