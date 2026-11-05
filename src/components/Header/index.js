import {useContext} from 'react'
import CartContext from '../../context/CartContext'
import './index.css'

const Header = props => {
  const {restaurantName} = props
  const {cartList} = useContext(CartContext)
  const count = cartList.reduce((a, b) => a + b.quantity, 0)

  return (
    <nav className="nav-header">
      <h1 className="restaurant-name">{restaurantName}</h1>
      <div className="cart-container">
        <p className="my-orders">My Orders</p>
        <div className="cart-count-container">
          <p className="cart-count">{count}</p>
        </div>
      </div>
    </nav>
  )
}

export default Header
