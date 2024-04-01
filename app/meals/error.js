'use client'
import React from 'react'

const ErrorPage = () => {
  return (
    <main className='error'>
        <h1>An error occured!</h1>
        <p>Could not fetch the meals at the moment. Please try again later!</p>
    </main>
  )
}

export default ErrorPage

//Note- Next JS provided with error prop to get more information about the error occured
// Component provided inside error.js file is made client component becoz NextJs ensures that we can
// capture errors that occured in client side as well 