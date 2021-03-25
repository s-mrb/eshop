const updateProductReducer = (state = {}, action) => {
  switch (action.type) {
    case 'UPDATE_PRODUCT_REQUEST':
      return { loading: true }

    //   on product update succes call to product detail action
    case 'UPDATE_PRODUCT_SUCCESS':
      return { loading: false, success: true }
    case 'UPDATE_PRODUCT_FAIL':
      return { loading: false, error: action.payload }

    //   reset when edit screen is left, so that on going back to that again won't cause succes:true
    case 'UPDATE_PRODUCT_RESET':
      return {}
    default:
      return state
  }
}

export default updateProductReducer
