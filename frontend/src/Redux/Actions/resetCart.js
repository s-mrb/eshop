const resetCart = () => async (dispatch) => {
  dispatch({ type: 'RESET_CART' })

  localStorage.removeItem('cartItems')
}

export default resetCart
