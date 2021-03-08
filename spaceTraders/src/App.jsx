import './App.scss';
import React, { useState, useEffect } from "react";
import axios from "axios";
import SignIn from './components/SignIn';
import Header from './components/Header';
import SignUp from './components/SignUp';
import Home from './components/Home';
import { BrowserRouter, Switch, Route } from "react-router-dom";

const App = () => {
  const [profile, setProfile] = useState({});
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const [input, setInput] = useState({
    username: '',
    token: ''
  });

  const loginUrl = `https://api.spacetraders.io/users/${input[`username`]}`;
  const config = { headers: { Authorization: `Bearer ${input[`token`]}` } }

  useEffect(() => {
    loginStatus();
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(loginUrl, config)
        setProfile(JSON.parse(JSON.stringify(result.data['user'])))
          .then(res => console.log(res))
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [isLoggedIn])

  const handleChange = (e) => {
    const { name, value } = e.target
    setInput(prevState => ({
      ...prevState, [name]: value
    }))
  }

  const login = (e) => {
    e.preventDefault();
    if (isLoggedIn === false){
      setisLoggedIn(true) 
    } else {
      setInput({
        username: '',
        token: ''
      })
      setProfile('')
      setisLoggedIn(false)
    }
  }

  const handleLogout = (data) =>{
    console.log(data);
    setisLoggedIn(false);
    setProfile({})
  }

  const handleLogin = (data) => {
    console.log(data);
    setisLoggedIn(true);
    setProfile(data.user.profile);
  }

  const loginStatus = () => {
    axios.get('http://localhost:3001/logged_in', { withCredentials: true })
    .then(response => {
      if (response.data.logged_in){
        handleLogin(response)
      } else {
        handleLogout(response)
      }
    })
    .catch(error => console.log('api error:', error))
  }

  return (
    <div className="App">
      <Header
        profile={profile}
        isLoggedIn={login}
        signin={isLoggedIn} />
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/login' component={SignIn} />
          <Route exact path='/signup' component={SignUp} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
