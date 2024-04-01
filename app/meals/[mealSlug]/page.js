import React from 'react'
import classes from './page.module.css'
import Image from 'next/image'
import { getMeal } from '@/lib/meals'
import { notFound } from 'next/navigation'

//Defining dynamic metadata for meal slug
//here also NextJs provides special params prop
export async function generateMetaData({ params }){
  const meal = getMeal(params.mealSlug)
  if(!meal){
    //notFound() is a special function provided by Nextjs which shows the closest not found or error page.
    notFound()
  }
  return {
    title : mealSlug.title,
    description : mealSlug.summary
  }
}

//component stored inside page.js file has access to special props called params in NextJs
//params is itself an object in which slug name i.e. mealSlug is key and dynamic URL segment is value.
const MealDetailsPage = ({params}) => {

  const meal = getMeal(params.mealSlug)

  if(!meal){
    //notFound() is a special function provided by Nextjs which shows the closest not found or error page.
    notFound()
  }
  //below we are replacing all line breaks with <br/>
  meal.instructions = meal.instructions.replace(/\n/g, '<br />')
  return (
    <>
      <header className={classes.header}>
        <div className={classes.image}>
          <Image src={meal.image} fill/>
        </div>
        <div className={classes.headerText}>
          <h1>{meal.title}</h1>
          <p className={classes.creator}>
            {/* below anchor tag will allow users to actually send email to the creator person */}
            by <a href={`mailto:${meal.creator_email}`}>{meal.creator}</a>
          </p>
          <p className={classes.summary}>{meal.summary}</p>
        </div>
      </header>
      <main>
        <p 
        className={classes.instructions}
        // below property is used to render instructions stored for every meal in database as HTML code
        dangerouslySetInnerHTML={{
          __html : meal.instructions
        }}></p>
      </main>
    </>
  )
}

export default MealDetailsPage