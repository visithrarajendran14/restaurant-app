import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class Login extends Component {
  state = {username: '', password: '', showError: false, errorMsg: ''}

  onSubmit = async e => {
    e.preventDefault()
    const {username, password} = this.state
    const res = await fetch('https://apis.ccbp.in/login', {
      method: 'POST',
      body: JSON.stringify({username, password}),
    })
    const data = await res.json()
    if (res.ok) {
      Cookies.set('jwt_token', data.jwt_token, {expires: 30})
      const {history} = this.props
      history.replace('/')
    } else {
      this.setState({showError: true, errorMsg: data.error_msg})
    }
  }

  render() {
    const {username, password, showError, errorMsg} = this.state
    if (Cookies.get('jwt_token')) return <Redirect to="/" />
    return (
      <div>
        <h1>UNI Resto Cafe</h1>
        <form onSubmit={this.onSubmit}>
          <label htmlFor="username">USERNAME</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={e => this.setState({username: e.target.value})}
          />
          <label htmlFor="password">PASSWORD</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={e => this.setState({password: e.target.value})}
          />
          <button type="submit">Login</button>
          {showError && <p>*{errorMsg}</p>}
        </form>
      </div>
    )
  }
}
export default Login
