const topProductsReducer = (state = {}, action) => {
  switch (action.type) {
    case 'TOP_PRODUCTS_REQUEST':
      return { loading: true, success: false }
    case 'TOP_PRODUCTS_SUCCESS':
      return { loading: false, success: true, topProducts: action.payload }
    case 'TOP_PRODUCTS_FAIL':
      return { loading: false, error: action.payload, success: false }
    case 'TOP_PRODUCTS_RESET':
      return {}
    default:
      return state
  }
}

export default topProductsReducer
