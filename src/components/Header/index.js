import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {AiOutlineShoppingCart} from 'react-icons/ai'
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
        const count = cartList.reduce((a, b) => a + b.quantity, 0)
        return (
          <nav>
            <Link to="/">
              <h1>UNI Resto Cafe</h1>
            </Link>
            <div>
              <p>My Orders</p>
              <Link to="/cart">
                <button type="button" data-testid="cart">
                  <AiOutlineShoppingCart size={25} />
                  {count}
                </button>
              </Link>
              <button type="button" onClick={onLogout}>
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
