const productListReducer = (state = { products: [], reset: true }, action) => {
  switch (action.type) {
    case 'PRODUCT_LIST_REQUEST':
      return { loading: true, products: [], reset: false }
    case 'PRODUCT_LIST_SUCCESS':
      return { loading: false, products: action.payload }
    case 'PRODUCT_LIST_FAIL':
      return { loading: false, error: action.payload }
    case 'PRODUCT_LIST_RESET':
      return { products: [], reset: true }
    default:
      return state
  }
}

export default productListReducer
