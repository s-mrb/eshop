const saveShippingAddress = (address) => async (dispatch) => {
  dispatch({ type: 'SAVE_SHIPPING_ADDRESS', payload: address })

  localStorage.setItem('shippingAddress', JSON.stringify(address))
}

export default saveShippingAddress
