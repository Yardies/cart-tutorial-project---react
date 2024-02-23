import {
  REMOVE_ITEM,
  CLEAR_ITEMS,
  DECREASE,
  INCREASE,
  LOADING,
  PRICE,
} from './actions'
const reducer = (state, action) => {
  if (action.type === REMOVE_ITEM) {
    const newCart = new Map(state.cart)
    newCart.delete(`${action.payload.id}`)
    return { ...state, cart: newCart }
  }
  if (action.type === CLEAR_ITEMS) {
    return { ...state, cart: new Map() }
  }
  if (action.type === INCREASE) {
    const newCart = new Map(state.cart)
    const itemId = action.payload.id
    const item = newCart.get(itemId)
    const newItem = { ...item, amount: item.amount + 1 }
    newCart.set(itemId, newItem)

    return { ...state, cart: newCart }
  }
  if (action.type === DECREASE) {
    const newCart = new Map(state.cart)
    const itemId = action.payload.id
    const item = newCart.get(itemId)
    if (item.amount === 1) {
      newCart.delete(itemId)
      return { ...state, cart: newCart }
    }
    const newItem = { ...item, amount: item.amount - 1 }
    newCart.set(itemId, newItem)
    return { ...state, cart: newCart }
  }
  if (action.type === LOADING) {
    return state
  }

  throw new Error(`there is no action : ${action.type}`)
}

export default reducer
