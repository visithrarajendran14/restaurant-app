/* eslint-disable camelcase */
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import DishItem from '../DishItem'
import './index.css'

class Home extends Component {
  state = {isLoading: true, restaurantData: {}, activeTab: 0}

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    const res = await fetch(
      'https://apis2.ccbp.in/restaurant-app/restaurant-menu',
    )
    const data = await res.json()
    this.setState({restaurantData: data[0], isLoading: false})
  }

  render() {
    const {isLoading, restaurantData, activeTab} = this.state
    if (isLoading) {
      return (
        <div data-testid="loader">
          <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
        </div>
      )
    }
    const {restaurant_name, table_menu_list} = restaurantData
    return (
      <>
        <Header />
        <h1>{restaurant_name}</h1>
        <ul>
          {table_menu_list.map((each, index) => (
            <li key={each.menu_category_id}>
              <button
                type="button"
                onClick={() => this.setState({activeTab: index})}
              >
                {each.menu_category}
              </button>
            </li>
          ))}
        </ul>
        <ul>
          {table_menu_list[activeTab].category_dishes.map(each => (
            <DishItem key={each.dish_id} dish={each} />
          ))}
        </ul>
      </>
    )
  }
}
export default Home
