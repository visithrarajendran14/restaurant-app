import {Component} from 'react'
import './App.css'

const apiUrl =
  'https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details'

class App extends Component {
  state = {
    restaurantName: '',
    tableMenuList: [],
    activeCategory: '',
    dishQuantities: {},
  }

  componentDidMount() {
    this.getMenuData()
  }

  getMenuData = async () => {
    const response = await fetch(apiUrl)
    const data = await response.json()
    const restaurantName = data[0].restaurant_name
    const tableMenuList = data[0].table_menu_list
    const activeCategory = tableMenuList[0].menu_category
    this.setState({restaurantName, tableMenuList, activeCategory})
  }

  onClickCategory = menuCategory => {
    this.setState({activeCategory: menuCategory})
  }

  incrementQuantity = dishId => {
    this.setState(prevState => {
      const prevQty = prevState.dishQuantities[dishId] || 0
      return {
        dishQuantities: {...prevState.dishQuantities, [dishId]: prevQty + 1},
      }
    })
  }

  decrementQuantity = dishId => {
    this.setState(prevState => {
      const prevQty = prevState.dishQuantities[dishId] || 0
      if (prevQty === 0) {
        return null
      }
      return {
        dishQuantities: {...prevState.dishQuantities, [dishId]: prevQty - 1},
      }
    })
  }

  renderHeader = () => {
    const {restaurantName, dishQuantities} = this.state
    const cartCount = Object.values(dishQuantities).reduce(
      (total, qty) => total + qty,
      0,
    )
    return (
      <div className="header">
        <h1>{restaurantName}</h1>
        <div className="cart-container">
          <p>My Orders</p>
          <p>Cart</p>
          <p className="cart-count">{cartCount}</p>
        </div>
      </div>
    )
  }

  renderCategoryTabs = () => {
    const {tableMenuList, activeCategory} = this.state
    return (
      <ul className="tabs-container">
        {tableMenuList.map(each => (
          <li key={each.menu_category_id}>
            <button
              type="button"
              className={
                activeCategory === each.menu_category
                  ? 'tab-btn active-tab'
                  : 'tab-btn'
              }
              onClick={() => this.onClickCategory(each.menu_category)}
            >
              {each.menu_category}
            </button>
          </li>
        ))}
      </ul>
    )
  }

  renderDishes = () => {
    const {tableMenuList, activeCategory, dishQuantities} = this.state
    const activeMenu = tableMenuList.find(
      each => each.menu_category === activeCategory,
    )
    if (!activeMenu) {
      return null
    }
    return (
      <ul className="dishes-list">
        {activeMenu.category_dishes.map(dish => {
          const quantity = dishQuantities[dish.dish_id] || 0
          return (
            <li key={dish.dish_id} className="dish-item">
              <div className="dish-details">
                <div className="dish-type">
                  <span className={dish.dish_Type === 2 ? 'non-veg' : 'veg'}>
                    ●
                  </span>
                </div>
                <div>
                  <h1 className="dish-name">{dish.dish_name}</h1>
                  <p className="dish-price">
                    {dish.dish_currency} {dish.dish_price}
                  </p>
                  <p className="dish-desc">{dish.dish_description}</p>
                  {dish.dish_Availability ? (
                    <div className="quantity-container">
                      <div className="counter">
                        <button
                          type="button"
                          onClick={() => this.decrementQuantity(dish.dish_id)}
                        >
                          -
                        </button>
                        <p>{quantity}</p>
                        <button
                          type="button"
                          onClick={() => this.incrementQuantity(dish.dish_id)}
                        >
                          +
                        </button>
                      </div>
                      {quantity === 0 && (
                        <button
                          type="button"
                          className="add-btn"
                          onClick={() => this.incrementQuantity(dish.dish_id)}
                        >
                          ADD TO CART
                        </button>
                      )}
                    </div>
                  ) : (
                    <p className="not-available">Not available</p>
                  )}
                  {dish.addonCat.length > 0 && (
                    <p className="custom-text">Customizations available</p>
                  )}
                </div>
              </div>
              <div className="dish-right">
                <p className="calories">{dish.dish_calories} calories</p>
                <img
                  src={dish.dish_image}
                  alt={dish.dish_name}
                  className="dish-img"
                />
              </div>
            </li>
          )
        })}
      </ul>
    )
  }

  render() {
    return (
      <div className="app-container">
        {this.renderHeader()}
        {this.renderCategoryTabs()}
        {this.renderDishes()}
      </div>
    )
  }
}

export default App
