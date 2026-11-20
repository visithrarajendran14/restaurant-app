import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'
import {Component} from 'react'
import Login from './components/Login'
import Home from './components/Home'
import Cart from './components/Cart'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

class App extends Component {
  state = {cartList: []}

  removeAllCartItems = () => this.setState({cartList: []})

  removeCartItem = id => {
    this.setState(prev => ({
      cartList: prev.cartList.filter(each => each.dish_id !== id),
    }))
  }

  addCartItem = dish => {
    const {cartList} = this.state
    const isThere = cartList.find(each => each.dish_id === dish.dish_id)
    if (isThere) {
      this.setState(prev => ({
        cartList: prev.cartList.map(each =>
          each.dish_id === dish.dish_id
            ? {...each, quantity: each.quantity + dish.quantity}
            : each,
        ),
      }))
    } else {
      this.setState(prev => ({cartList: [...prev.cartList, dish]}))
    }
  }

  incrementCartItemQuantity = id => {
    this.setState(prev => ({
      cartList: prev.cartList.map(each =>
        each.dish_id === id ? {...each, quantity: each.quantity + 1} : each,
      ),
    }))
  }

  decrementCartItemQuantity = id => {
    const {cartList} = this.state
    const item = cartList.find(each => each.dish_id === id)
    if (item.quantity === 1) {
      this.removeCartItem(id)
    } else {
      this.setState(prev => ({
        cartList: prev.cartList.map(each =>
          each.dish_id === id ? {...each, quantity: each.quantity - 1} : each,
        ),
      }))
    }
  }

  render() {
    const {cartList} = this.state
    return (
      <BrowserRouter>
        <CartContext.Provider
          value={{
            cartList,
            addCartItem: this.addCartItem,
            removeCartItem: this.removeCartItem,
            removeAllCartItems: this.removeAllCartItems,
            incrementCartItemQuantity: this.incrementCartItemQuantity,
            decrementCartItemQuantity: this.decrementCartItemQuantity,
          }}
        >
          <Switch>
            <Route exact path="/login" component={Login} />
            <ProtectedRoute exact path="/" component={Home} />
            <ProtectedRoute exact path="/cart" component={Cart} />
            <Redirect to="/" />
          </Switch>
        </CartContext.Provider>
      </BrowserRouter>
    )
  }
}
export default App
