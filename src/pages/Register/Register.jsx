import './Register.css'

const Register = () => {
  return (
    <div className='login-container'>
      <div>
        <div className='title-register-container'>
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
              First name
            </label>
            <input className='input' type='text' placeholder='Firts name' />
          </span>
          <span className='input-container'>
            <label className='input-label' htmlFor=''>
              Last name
            </label>
            <input className='input' type='text' placeholder='Last name' />
          </span>
          <span className='input-container'>
            <label className='input-label' htmlFor=''>
              Password
            </label>
            <input className='input' type='password' placeholder='Password' />
          </span>
        </div>
        <div className='button-login-container'>
          <button className='post-form-button'>Register</button>
        </div>
      </div>
      <span className='login-footer'>
        <p className='footer-text'>Do you already have an account?</p>
        <a href='./'>
          <p className='sing-in'>Log in.</p>
        </a>
      </span>
    </div>
  )
}

export default Register
