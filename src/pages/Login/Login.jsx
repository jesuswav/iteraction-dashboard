import { useState } from 'react'
import './Login.css'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const loginrequest = async (formData) => {
    try {
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      }

      const url = 'http://localhost:3000/api/login'

      sendData(url, requestOptions)
    } catch (e) {
      console.error(e)
    }
    console.log(formData)
  }

  const sendData = async (url, requestOptions) => {
    const response = await fetch(url, requestOptions)

    if (!response.ok) {
      console.log('Error request')
    }

    const responseData = await response.json()
    console.log(responseData.token)

    if (responseData.token) {
      console.log('Token definido')
      localStorage.setItem('loginToken', responseData.token)
    }

    console.log('Response data', responseData)

    window.location.reload()
  }

  const onChangeUsername = (e) => {
    setUsername(e.target.value)
  }

  const onChangePassword = (e) => {
    setPassword(e.target.value)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    console.log('Username: ', username)
    console.log('Password: ', password)
    loginrequest({ username: username, password: password })
  }

  return (
    <div className='login-container'>
      <div>
        <div className='title-login-container'>
          <h3>Welcome Back</h3>
        </div>
        <form onSubmit={onSubmit}>
          <div className='main-input-container'>
            <span className='input-container'>
              <label className='input-label' htmlFor=''>
                Username
              </label>
              <input
                className='input'
                type='text'
                name='username'
                value={username}
                onChange={onChangeUsername}
                placeholder='Username'
                required
              />
            </span>
            <span className='input-container'>
              <label className='input-label' htmlFor=''>
                Password
              </label>
              <input
                className='input'
                type='password'
                name='password'
                value={password}
                onChange={onChangePassword}
                placeholder='Password'
                required
              />
            </span>
          </div>
          <div className='button-login-container'>
            <button className='post-form-button'>Log in</button>
          </div>
        </form>
      </div>
      <span className='login-footer'>
        <p className='footer-text'>Don't have an account?</p>
        <a href='./register'>
          <p className='sing-in'>Sing in.</p>
        </a>
      </span>
    </div>
  )
}

export default Login
