const setPaymentMethod = (paymentMethod) => async (dispatch) => {
  dispatch({ type: 'SET_PAYMENT_METHOD', payload: paymentMethod })
  localStorage.setItem('paymentMethod', JSON.stringify(paymentMethod))
}

export default setPaymentMethod
