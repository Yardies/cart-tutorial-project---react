import { useContext, useReducer, createContext, useEffect } from 'react'
import cartItems from './data.jsx'
import reducer from './reducer'
import {
  REMOVE_ITEM,
  CLEAR_ITEMS,
  DECREASE,
  INCREASE,
  LOADING,
  PRICE,
} from './actions.js'

const AppContext = createContext()

const defaultValue = {
  loading: false,
  cart: new Map(
    cartItems.map((item) => {
      return [item.id, item]
    })
  ),
}

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, defaultValue)

  const removeItem = (id) => {
    dispatch({ type: REMOVE_ITEM, payload: { id } })
  }
  const clearCart = () => {
    dispatch({ type: CLEAR_ITEMS })
  }
  const increaseAmount = (id) => {
    dispatch({ type: INCREASE, payload: { id } })
  }
  const decreaseAmount = (id) => {
    dispatch({ type: DECREASE, payload: { id } })
  }

  // calculating the total amount and total price
  let totalAmount = 0
  let totalPrice = 0

  for (let [key, { amount, price }] of state.cart) {
    totalAmount += amount

    totalPrice += amount * price
  }
  console.log(totalAmount)
  console.log(totalPrice)

  // the return
  return (
    <AppContext.Provider
      value={{
        removeItem,
        clearCart,
        increaseAmount,
        decreaseAmount,
        ...state,
        totalAmount,
        totalPrice,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useGlobalContext = () => {
  return useContext(AppContext)
}
