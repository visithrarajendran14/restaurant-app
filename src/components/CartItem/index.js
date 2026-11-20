import CartContext from '../../context/CartContext'
import './index.css'

const CartItem = props => (
  <CartContext.Consumer>
    {value => {
      const {item} = props
      const {
        incrementCartItemQuantity,
        decrementCartItemQuantity,
        removeCartItem,
      } = value
      const onInc = () => incrementCartItemQuantity(item.dish_id)
      const onDec = () => {
        if (item.quantity === 1) {
          removeCartItem(item.dish_id)
        } else {
          decrementCartItemQuantity(item.dish_id)
        }
      }
      return (
        <li>
          <img src={item.dish_image} alt={item.dish_name} />
          <div>
            <h1>{item.dish_name}</h1>
            <p>
              {item.dish_currency} {item.dish_price}
            </p>
            <div>
              <button type="button" onClick={onDec}>
                -
              </button>
              <p>{item.quantity}</p>
              <button type="button" onClick={onInc}>
                +
              </button>
            </div>
            <button type="button" onClick={() => removeCartItem(item.dish_id)}>
              Remove
            </button>
          </div>
        </li>
      )
    }}
  </CartContext.Consumer>
)

export default CartItem
