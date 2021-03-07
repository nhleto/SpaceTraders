import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import React, { useState, useEffect } from "react";

export const SignIn = (props) => {

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div>
        <div className="center">
          <Avatar>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
            </Typography>
        </div>
        <form className noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="username"
            label="Username"
            name="username"
            onChange={props.handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="token"
            label="Token"
            type="token"
            id="token"
            onChange={props.handleChange}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={props.login}
          >
            Sign In
            </Button>
        </form>
      </div>
    </Container>
  )
}

export default SignIn
