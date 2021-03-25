import axios from 'axios'

const getMyOrders = () => async (dispatch, getState) => {
  try {
    const { token } = getState().loggedUser.user

    dispatch({ type: 'GET_MYORDERS_REQUEST' })

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    const response = await axios.get(
      `http://localhost:55555/orders/myorders`,
      config
    )
    const orders = response.data

    dispatch({ type: 'GET_MYORDERS_SUCCESS', payload: orders })
  } catch (error) {
    dispatch({
      type: 'GET_MYORDERS_FAIL',
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export default getMyOrders
