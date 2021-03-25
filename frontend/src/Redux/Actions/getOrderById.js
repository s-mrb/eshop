import axios from 'axios'

const getOrderById = (orderId) => async (dispatch, getState) => {
  try {
    const { token } = getState().loggedUser.user

    dispatch({ type: 'ORDER_BY_ID_RQUEST' })

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }

    const response = await axios.get(
      `http://localhost:55555/orders/${orderId}`,
      config
    )
    const order = response.data

    dispatch({ type: 'ORDER_BY_ID_SUCCESS', payload: order })
  } catch (error) {
    dispatch({
      type: 'ORDER_BY_ID_FAIL',
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export default getOrderById
