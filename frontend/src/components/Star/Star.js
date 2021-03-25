import React from 'react'
import styles from './Star.module.css'
const Star = ({ rating, index }) => {
  return (
    <p className={styles.stars}>
      {rating - index >= 0.5 && rating - index < 1 ? (
        <i className={['fas fa-star-half-alt', styles.icon].join(' ')}></i>
      ) : rating - index >= 1 ? (
        <i className={['fas fa-star', styles.icon].join(' ')}></i>
      ) : (
        <i className={['far fa-star', styles.icon].join(' ')}></i>
      )}
    </p>
  )
}

export default Star
