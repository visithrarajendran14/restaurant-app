import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import DishItem from '../DishItem'
import CartContext from '../../context/CartContext'
import './index.css'

class Home extends Component {
  state = {isLoading: true, restaurantData: {}, activeCategory: ''}

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    const response = await fetch(
      'https://apis.ccbp.in/restaurants-app/restaurants-menu/',
    )
    const data = await response.json()
    const restaurant = Array.isArray(data) ? data[0] : data
    this.setState({
      restaurantData: restaurant,
      isLoading: false,
      activeCategory: restaurant.table_menu_list[0].menu_category,
    })
  }

  onChangeCategory = category => {
    this.setState({activeCategory: category})
  }

  render() {
    const {isLoading, restaurantData, activeCategory} = this.state
    if (isLoading) {
      return (
        <div data-testid="loader">
          <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
        </div>
      )
    }
    const activeMenu = restaurantData.table_menu_list.find(
      each => each.menu_category === activeCategory,
    )
    return (
      <CartContext.Consumer>
        {value => {
          const {cartList} = value
          let count = 0
          cartList.forEach(each => {
            count += each.quantity
          })
          return (
            <>
              <Header />
              <h1>{restaurantData.restaurant_name}</h1>
              <p>{restaurantData.restaurant_image}</p>
              <ul>
                {restaurantData.table_menu_list.map(each => (
                  <li key={each.menu_category}>
                    <button
                      type="button"
                      onClick={() => this.onChangeCategory(each.menu_category)}
                    >
                      {each.menu_category}
                    </button>
                  </li>
                ))}
              </ul>
              <ul>
                {activeMenu.category_dishes.map(dish => (
                  <DishItem key={dish.dish_id} dish={dish} />
                ))}
              </ul>
            </>
          )
        }}
      </CartContext.Consumer>
    )
  }
}

export default Home
