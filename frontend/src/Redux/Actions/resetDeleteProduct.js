import resetUpdateProduct from './resetUpdateProduct'

const resetDeleteProduct = () => async (dispatch) => {
  dispatch({ type: 'PRODUCT_LIST_RESET' })
}

export default resetDeleteProduct
