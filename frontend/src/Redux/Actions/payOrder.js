import axios from 'axios'

const payOrder = (orderId, paymentResult) => async (dispatch, getState) => {
  try {
    const { token } = getState().loggedUser.user

    dispatch({ type: 'ORDER_PAY_REQUEST' })

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }

    await axios.put(
      `http://localhost:55555/orders/${orderId}/pay`,
      paymentResult,
      config
    )

    dispatch({ type: 'ORDER_PAY_SUCCESS' })
  } catch (error) {
    dispatch({
      type: 'ORDER_PAY_FAIL',
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export default payOrder
