import React from 'react'
import classes from './loading.module.css'
const MealsLoadingPage = () => {
  return (
    <p className={classes.loading}>Fetching all meals...</p>
  )
}

export default MealsLoadingPage