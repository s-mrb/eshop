const deleteProductReducer = (state = {}, action) => {
  switch (action.type) {
    case 'DELETE_PRODUCT_REQUEST':
      return { loaidng: true }
    case 'DELETE_PRODUCT_SUCCESS':
      return { loading: false, success: true }
    case 'DELETE_PRODUCT_FAIL':
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export default deleteProductReducer
