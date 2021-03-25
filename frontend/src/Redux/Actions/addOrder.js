import axios from 'axios'

const addOrder = (order) => async (dispatch, getState) => {
  const { token } = getState().loggedUser.user

  dispatch({ type: 'ADD_ORDER_REQUEST' })
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }

    const response = await axios.post(
      'http://localhost:55555/orders/addOrder',
      order,
      config
    )
    const { data } = response
    dispatch({ type: 'ADD_ORDER_SUCCESS', payload: data })
  } catch (error) {
    dispatch({
      type: 'ADD_ORDER_FAIL',
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export default addOrder
