import {useContext} from 'react'
import CartContext from '../../context/CartContext'
import './index.css'

const DishItem = props => {
  const {dishDetails} = props
  const {
    dish_id: dishId,
    dish_name: dishName,
    dish_price: dishPrice,
    dish_currency: dishCurrency,
    dish_image: dishImage,
    dish_calories: dishCalories,
    dish_description: dishDescription,
    dish_Availability: dishAvailability,
    addonCat,
  } = dishDetails

  const {cartList, addToCart, removeFromCart} = useContext(CartContext)
  const cartItem = cartList.find(each => each.dish_id === dishId)
  const quantity = cartItem ? cartItem.quantity : 0

  const onAdd = () => {
    addToCart(dishDetails)
  }

  const onRemove = () => {
    removeFromCart(dishDetails)
  }

  return (
    <li className="dish-item">
      <div className="dish-details">
        <h1 className="dish-name">{dishName}</h1>
        <p className="dish-currency-price">
          {dishCurrency} {dishPrice}
        </p>
        <p className="dish-description">{dishDescription}</p>
        {dishAvailability ? (
          <div className="quantity-container">
            <button type="button" className="minus-btn" onClick={onRemove}>
              -
            </button>
            <p className="quantity">{quantity}</p>
            <button type="button" className="plus-btn" onClick={onAdd}>
              +
            </button>
          </div>
        ) : (
          <p className="not-available">Not available</p>
        )}
        {addonCat.length !== 0 && (
          <p className="customization">Customizations available</p>
        )}
      </div>
      <p className="calories">{dishCalories} calories</p>
      <img src={dishImage} alt={dishName} className="dish-image" />
    </li>
  )
}

export default DishItem
