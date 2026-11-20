import Header from '../Header'
import CartItem from '../CartItem'
import CartContext from '../../context/CartContext'
import './index.css'

const Cart = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList, removeAllCartItems} = value
      if (cartList.length === 0) {
        return (
          <>
            <Header />
            <div>
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-empty-cart-img.png"
                alt="empty cart"
              />
              <p>Your cart is empty</p>
            </div>
          </>
        )
      }
      return (
        <>
          <Header />
          <button type="button" onClick={removeAllCartItems}>
            Remove All
          </button>
          <ul>
            {cartList.map(each => (
              <CartItem key={each.dish_id} item={each} />
            ))}
          </ul>
        </>
      )
    }}
  </CartContext.Consumer>
)

export default Cart
