import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class Login extends Component {
  state = {username: '', password: '', errorMsg: '', showError: false}

  onUsername = event => {
    this.setState({username: event.target.value})
  }

  onPassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmit = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const response = await fetch('https://apis.ccbp.in/login', {
      method: 'POST',
      body: JSON.stringify({username, password}),
    })
    const data = await response.json()
    if (response.ok) {
      Cookies.set('jwt_token', data.jwt_token, {expires: 30})
      const {history} = this.props
      history.replace('/')
    } else {
      this.setState({showError: true, errorMsg: data.error_msg})
    }
  }

  render() {
    const {username, password, showError, errorMsg} = this.state
    const token = Cookies.get('jwt_token')
    if (token !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <h1>Login</h1>
          <label htmlFor="username">USERNAME</label>
          <input
            id="username"
            value={username}
            onChange={this.onUsername}
            type="text"
          />
          <label htmlFor="password">PASSWORD</label>
          <input
            id="password"
            value={password}
            onChange={this.onPassword}
            type="password"
          />
          <button type="submit">Login</button>
          {showError && <p>*{errorMsg}</p>}
        </form>
      </div>
    )
  }
}

export default Login
