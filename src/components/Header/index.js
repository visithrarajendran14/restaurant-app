import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import CartContext from '../../context/CartContext'
import './index.css'

const Header = props => {
  const onLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <CartContext.Consumer>
      {value => {
        const {cartList} = value
        let count = 0
        cartList.forEach(each => {
          count += each.quantity
        })
        return (
          <nav className="header-container">
            <Link to="/" className="logo-link">
              <h1 className="logo">UNI Resto Cafe</h1>
            </Link>
            <div className="header-right">
              <p className="my-orders">My Orders</p>
              <Link to="/cart">
                <button type="button" data-testid="cart" className="cart-btn">
                  Cart
                </button>
              </Link>
              <p className="cart-count">{count}</p>
              <button type="button" onClick={onLogout} className="logout-btn">
                Logout
              </button>
            </div>
          </nav>
        )
      }}
    </CartContext.Consumer>
  )
}

export default withRouter(Header)
