import CartContext from '../../context/CartContext'
import Header from '../Header'
import CartItem from '../CartItem'

const Cart = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList, removeAllCartItems} = value
      if (cartList.length === 0) {
        return (
          <>
            <Header />
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-empty-cart-img.png"
              alt="cart empty"
            />
            <p>Your cart is empty</p>
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
              <CartItem key={each.dish_id} dish={each} />
            ))}
          </ul>
        </>
      )
    }}
  </CartContext.Consumer>
)
export default Cart
