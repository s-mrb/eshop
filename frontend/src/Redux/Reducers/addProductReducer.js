const addProductReducer = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_PRODUCT_REQUEST':
      return { loading: true }
    case 'ADD_PRODUCT_SUCCESS':
      return { loading: false, id: action.payload }
    case 'ADD_PRODUCT_RESET':
      return {}
    default:
      return state
  }
}

export default addProductReducer
