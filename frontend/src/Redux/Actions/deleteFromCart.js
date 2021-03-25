const deleteFromCart = (id) => async (dispatch, getState) => {
  await dispatch({
    type: 'DELETE_FROM_CART',
    payload: {
      product: id,
    },
  })

  //   remove from local storage
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export default deleteFromCart
