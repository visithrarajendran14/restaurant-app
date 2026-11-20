/* eslint-disable camelcase */
import {Component} from 'react'
import CartContext from '../../context/CartContext'
import './index.css'

class DishItem extends Component {
  state = {quantity: 0}

  onIncrease = () => {
    const {dish} = this.props
    this.setState(
      prev => ({quantity: prev.quantity + 1}),
      () => {
        const {quantity} = this.state
        if (quantity === 1) {
          const {addCartItem} = this.context
          addCartItem({...dish, quantity: 1})
        }
      },
    )
  }

  onDecrease = () => {
    const {dish} = this.props
    this.setState(
      prev => ({quantity: prev.quantity - 1}),
      () => {
        const {quantity} = this.state
        const {removeCartItem, decrementCartItemQuantity} = this.context
        if (quantity === 0) {
          removeCartItem(dish.dish_id)
        } else {
          decrementCartItemQuantity(dish.dish_id)
        }
      },
    )
  }

  render() {
    const {quantity} = this.state
    const {dish} = this.props
    const {
      dish_name,
      dish_price,
      dish_image,
      dish_currency,
      dish_calories,
      dish_description,
      dish_Availability,
      dish_Type,
      addonCat,
    } = dish

    return (
      <li>
        <div>
          <h1>{dish_name}</h1>
          <p>
            {dish_currency} {dish_price}
          </p>
          <p>{dish_description}</p>
          <p>{dish_calories} calories</p>
          {dish_Type === 1 ? <p>Veg</p> : <p>Non-Veg</p>}
          {dish_Availability ? (
            <div>
              {quantity === 0 ? (
                <button type="button" onClick={this.onIncrease}>
                  ADD TO CART
                </button>
              ) : (
                <div>
                  <button type="button" onClick={this.onDecrease}>
                    -
                  </button>
                  <p>{quantity}</p>
                  <button type="button" onClick={this.onIncrease}>
                    +
                  </button>
                </div>
              )}
              {addonCat.length !== 0 && <p>Customizations available</p>}
            </div>
          ) : (
            <p>Not available</p>
          )}
        </div>
        <img src={dish_image} alt={dish_name} />
      </li>
    )
  }
}

DishItem.contextType = CartContext
export default DishItem
