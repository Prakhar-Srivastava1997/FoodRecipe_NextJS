'use client'
import React from 'react'

const ErrorPage = () => {
  return (
    <main className='error'>
        <h1>An error occured!</h1>
        <p>Failed to share meal due to invalid input</p>
    </main>
  )
}

export default ErrorPage

//Note- Next JS provided with error prop to get more information about the error occured
// Component provided inside error.js file is made client component becoz NextJs ensures that we can
// capture errors that occured in client side as well 