
import React, { Component } from 'react'
import axios from 'axios'
import update from 'immutability-helper'
import styled from 'styled-components'
import { TextField, Button, Checkbox, Paper, Grid, IconButton } from '@material-ui/core'
import { DeleteForever } from '@material-ui/icons'

const InputPaper = styled(Paper)``
const InputField = styled(TextField)`
  width: 235px;
  font-size: 13px;
`
const TaskCheckBox = styled(Checkbox)`
  
`
const InputContainer = styled.div`
  padding: 15px;
`
const ListWrapper = styled.div`
  position: relative;
`



class TodoList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      todos: [],
      inputValue: ''
    }
  }

  getTodos() {
    axios.get('/api/v1/todos')
    .then(response => {
      this.setState({todos: response.data})
    })
    .catch(error => console.log(error))
  }

  componentDidMount() {
    this.getTodos()
  }

  createTodo = (e) => {
    if (e.key === 'Enter') {
      axios.post('/api/v1/todos', {todo: {title: e.target.value}})
      .then(response => {
        const todos = update(this.state.todos, {
          $splice: [[0, 0, response.data]]
        })
        this.setState({
          todos: todos,
          inputValue: ''
        })
      })
      .catch(error => console.log(error))      
    }    
  }

  addTodo = (e) => {
    
      axios.post('/api/v1/todos', {todo: {title: e.target.value}})
      .then(response => {
        const todos = update(this.state.todos, {
          $splice: [[0, 0, response.data]]
        })
        this.setState({
          todos: todos,
          inputValue: ''
        })
      })
      .catch(error => console.log(error))      
     
  }

  deleteTodo = (id) => {
    axios.delete(`/api/v1/todos/${id}`)
    .then(response => {
      const todoIndex = this.state.todos.findIndex(x => x.id === id)
      const todos = update(this.state.todos, {
        $splice: [[todoIndex, 1]]
      })
      this.setState({
        todos: todos
      })
    })
    .catch(error => console.log(error))
  }

  handleChange = (e) => {
    this.setState({inputValue: e.target.value});
  }

  updateTodo = (e, id) => {
    axios.put(`/api/v1/todos/${id}`, {todo: {done: e.target.checked}})
    .then(response => {
      const todoIndex = this.state.todos.findIndex(x => x.id === response.data.id)
      const todos = update(this.state.todos, {
        [todoIndex]: {$set: response.data}
      })
      this.setState({
        todos: todos
      })
    })
    .catch(error => console.log(error))      
  }

  render() {
    return (
      <div>
        <Paper style={{ margin: 20, padding: 20}}>
          <Grid container>
            <Grid xs={10} md={11} item style={{ paddingRight: 16 }}>
              <TextField
                placeholder="Add Todo here"
                onKeyPress={this.createTodo} value={this.state.inputValue} onChange={this.handleChange}
                fullWidth
              />
            </Grid>
            <Grid xs={2} md={1} item style={{ paddingRight: 20}}>
              <Button
                fullWidth
                color="secondary"
                variant="outlined"
                onClick={this.addTodo}
              >
                Add
              </Button>
            </Grid>
          </Grid>
        </Paper>
        <ListWrapper>
          <ul className="taskList">
            {this.state.todos.map((todo) => {
              return(
                <li className="task" todo={todo} key={todo.id}>
                  <input className="taskCheckbox" type="checkbox" 
                    checked={todo.done}
                    onChange={(e) => this.updateTodo(e, todo.id)}/>              
                  <label className="taskLabel">{todo.title}</label>
                  <span className="editTaskBtn"
                    onClick={(e) => this.updateTodo(todo.id)}>
                    Edit
                  </span>
                  <IconButton className="deleteTaskBtn"
                    onClick={(e) => this.deleteTodo(todo.id)}>
                    <DeleteForever/>
                  </IconButton>
                </li>
              )       
            })} 	    
          </ul>
        </ListWrapper>
     </div>
    )
  }
}

export default TodoList