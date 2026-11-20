/* eslint-disable camelcase */
import CartContext from '../../context/CartContext'

const CartItem = props => {
  const {dish} = props
  const {dish_id, dish_name, dish_image, dish_price, dish_currency, quantity} =
    dish
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
            <img src={dish_image} alt={dish_name} />
            <h1>{dish_name}</h1>
            <p>
              {dish_currency} {dish_price}
            </p>
            <div>
              <button
                type="button"
                onClick={() => decrementCartItemQuantity(dish_id)}
              >
                -
              </button>
              <p>{quantity}</p>
              <button
                type="button"
                onClick={() => incrementCartItemQuantity(dish_id)}
              >
                +
              </button>
            </div>
            <button type="button" onClick={() => removeCartItem(dish_id)}>
              Remove
            </button>
          </li>
        )
      }}
    </CartContext.Consumer>
  )
}
export default CartItem
