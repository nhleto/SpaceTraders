import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import React, { useState, useEffect } from "react";
import {Link, Redirect} from 'react-router-dom';
import axios from 'axios';

export const SignUp = (props) => {

  const [input, setInput] = useState({
    username: '',
    token: '',
    errors: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setInput(prevState => ({
      ...prevState, [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, token } = input
    let user = { username: username, password: token }
    axios.post('http://localhost:3001/users', { user }, {withCredentials: true})
    .then(response => {
      if (response.data.status === 'created'){
        props.handleLogin(response.data);
        <Redirect to='/'/>
      } else {
        setInput({errors: response.data.errors})
      }
    }).catch(error => console.log('api errors:',  error))
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div>
        <div className="center">
          <Avatar>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
        </div>
        <form noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="username"
            label="Username"
            name="username"
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="token"
            label="Token"
            type="token"
            id="token"
            onChange={handleChange}
          />
          <div className="signin">
            Already have an Account?
            <div style={{marginBottom:'15px'}}><Link to='/login'>Sign In</Link></div>
          </div>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleSubmit}
          >
            Sign Up
            </Button>
        </form>
      </div>
    </Container>
  )
}

export default SignUp
