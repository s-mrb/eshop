const ShippingReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SAVE_SHIPPING_ADDRESS':
      return action.payload

    default:
      return state
  }
}

export default ShippingReducer
