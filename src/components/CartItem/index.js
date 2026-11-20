/* eslint-disable */
import CartContext from '../../context/CartContext'
import './index.css'

const CartItem = props => {
  const {dish} = props

  return (
    <CartContext.Consumer>
      {value => {
        const {
          incrementCartItemQuantity,
          decrementCartItemQuantity,
          removeCartItem,
        } = value

        return (
          <li>
            <img src={dish.dish_image} alt={dish.dish_name} />
            <h1>{dish.dish_name}</h1>
            <p>
              {dish.dish_currency} {dish.dish_price}
            </p>
            <div>
              <button
                type="button"
                onClick={() => decrementCartItemQuantity(dish.dish_id)}
              >
                -
              </button>
              <p>{dish.quantity}</p>
              <button
                type="button"
                onClick={() => incrementCartItemQuantity(dish.dish_id)}
              >
                +
              </button>
            </div>
            <button type="button" onClick={() => removeCartItem(dish.dish_id)}>
              Remove
            </button>
          </li>
        )
      }}
    </CartContext.Consumer>
  )
}

export default CartItem
