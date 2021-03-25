import React from 'react'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import Loader from 'react-loader-spinner'

const Loading = ({ type, height, width, timeout }) => {
  return (
    <Loader
      type={type}
      color='#55595c'
      height={height}
      width={width}
      timeout={timeout}
    />
  )
}

Loading.defaultProps = {
  type: 'Puff',
  height: '100',
  width: '100',
  timeout: 0,
}

export default Loading
