const paymentMethod = (state = {}, action) => {
  switch (action.type) {
    case 'SET_PAYMENT_METHOD':
      return { paymentMethod: action.payload }

    default:
      return state
  }
}

export default paymentMethod
