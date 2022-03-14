//* Juan Gallardo 14-03-2022
import React, {useEffect, useState} from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';

const initialTodos = [
    {
        id: 1,
        title: 'Todo #1',
        description: 'Desc del Todo #1',
        completed: false
    },
    {
        id: 2,
        title: 'Todo #2',
        description: 'Desc del Todo #2',
        completed: true
    }
];

const localTodos = JSON.parse(localStorage.getItem('todos'));

//? Se puede retornar solo un elemento HTML
const App = () => {

    //? Retorna un arreglo con 2 elementos, el estado como tal, y una funcion para actualizar este estado
    //* const state = useState(initialTodos);
    //* const todos = state[0];
    //* const setTodos = state[1];
    const [todos, setTodos] = useState(localTodos || initialTodos);
    const [todoEdit, setTodoEdit] = useState(null);

    useEffect(() => {
        localStorage.setItem('todos',JSON.stringify(todos));
    },[todos]);

    //? Eliminar
    const todoDelete = (todoId) => {

        //?Se valida que no se este editando
        if(todoEdit && todoId === todoEdit.id){
            setTodoEdit(null);
        }

        const changedTodos = todos.filter(todo => todo.id !== todoId);
        setTodos(changedTodos);
    }

    //? Completar
    const todoToogleCompleted = (todoId) => {

        //? Forma 1
        // const changedTodos = todos.map(todo => {

        //     const todoEdit = {
        //         ...todo,
        //         completed: !todo.completed
        //     }

        //     if(todo.id === todoId){
        //         return todoEdit;
        //     }else{
        //         return todo
        //     }
        // })

        //? Forma 2
        /*const changedTodos = todos.map(todo => (
            todo.id === todoId
            ? {...todo, completed: !todo.completed}
            : todo 
        ));*/
        
        //? Forma 3
        const changedTodos = todos.map(todo => todo.id === todoId ? {...todo, completed: !todo.completed} : todo )

        setTodos(changedTodos);
    }

    //? Agregar
    const todoAdd = (todo) => {

        const newTodo = {
            id: Date.now(),
            ...todo,
            completed: false
        }
        const changedTodos = [
            newTodo,
            ...todos
        ]
        setTodos(changedTodos);
    }

    //? Editar
    const todoUpdate = (todoEdit) => {

        const changedTodos = todos.map(todo => (
            todo.id === todoEdit.id ? todoEdit : todo
        ))
        setTodos(changedTodos);
    }

  return (
      <div className='container mt-4'>
          <div className='row'>
            <div className='col-8'>
                <TodoList
                    todos = {todos}
                    todoDelete = {todoDelete}
                    todoToogleCompleted = {todoToogleCompleted}
                    setTodoEdit = {setTodoEdit}
                />
            </div>
            <div className='col-4'>
                <TodoForm
                    todoEdit = {todoEdit}
                    todoAdd = {todoAdd}
                    todoUpdate = {todoUpdate}
                    setTodoEdit = {setTodoEdit}
                />
            </div>
          </div>
      </div>
  )
}

export default App;