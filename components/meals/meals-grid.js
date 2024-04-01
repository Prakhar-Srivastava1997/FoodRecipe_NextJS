import React from 'react'
import classes from './meals-grid.module.css'
import MealItem from './meal-item'

const MealsGrid = ({ meals }) => {
  return (
    <ul className={classes.meals}>
        {meals.map(meal=><li key={meal.id}>
            {/* Spreading meal object into key-value pairs and passing it as prop */}
            <MealItem {...meal}/>
        </li>)}
    </ul>
  )
}

export default MealsGrid