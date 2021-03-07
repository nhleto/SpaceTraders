import './App.scss';
import React, { useState, useEffect } from "react";
import axios from "axios";
import SignIn from './components/SignIn'
import Header from './components/Header';

const App = () => {
  const [profile, setProfile] = useState('');
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const [input, setInput] = useState({
    username: '',
    token: ''
  });

  const loginUrl = `https://api.spacetraders.io/users/${input[`username`]}`;
  const config = { headers: { Authorization: `Bearer ${input[`token`]}` } }

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

  return (
    <div className="App">
      <Header
        profile={profile}
        isLoggedIn={login}
        signin={isLoggedIn} />

      { isLoggedIn === false ?
        <SignIn
          handleChange={handleChange}
          login={login} /> : null}
    </div>

  );
}

export default App;
