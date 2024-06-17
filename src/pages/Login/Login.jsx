import './Login.css'

const Login = () => {
  return (
    <div className='login-container'>
      <div>
        <div className='title-login-container'>
          <h3>Welcome Back</h3>
        </div>
        <div className='main-input-container'>
          <span className='input-container'>
            <label className='input-label' htmlFor=''>
              Username
            </label>
            <input className='input' type='text' placeholder='Username' />
          </span>
          <span className='input-container'>
            <label className='input-label' htmlFor=''>
              Password
            </label>
            <input className='input' type='password' placeholder='Password' />
          </span>
        </div>
        <div className='button-login-container'>
          <button className='post-form-button'>Log in</button>
        </div>
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
