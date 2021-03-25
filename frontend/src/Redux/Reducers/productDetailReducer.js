const productDetailReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case 'PRODUCT_DETAIL_REQUEST':
      return { loading: true, product: {} }
    case 'PRODUCT_DETAIL_SUCCESS':
      return { loading: false, product: action.payload }
    case 'PRODUCT_DETAIL_FAIL':
      return { loading: false, error: action.payload }
    case 'PRODUCT_DETAIL_RESET':
      return { product: {} }
    default:
      return state
  }
}

export default productDetailReducer
