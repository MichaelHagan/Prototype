import React from 'react'

const Login = () => {

  const [state, setState] = React.useState({
    email: "",
    password: ""
  });
  const handleChange = evt => {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value
    });
  };

  const handleOnSubmit = evt => {
    evt.preventDefault();

    const { email, password } = state;
    alert(`You are login with email: ${email} and password: ${password}`);

    for (const key in state) {
      setState({
        ...state,
        [key]: ""
      });
    }
  };

  return (
    <div className="form-container sign-in-container">
      <form onSubmit={handleOnSubmit} className='form-v1'>
        <h1 style={{marginBottom:'3rem'}}>Sign in</h1>
        <input
          type="text"
          placeholder="Username"
          name="username"
          value={state.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={state.password}
          onChange={handleChange}
        />
        <a style={{color:"#333", fontSize:"1rem",textDecoration:"none", margin: "15px"}} href="#">Forgot your password?</a>
        <button>Sign In</button>
      </form>
    </div>
  )
}

export default Login
