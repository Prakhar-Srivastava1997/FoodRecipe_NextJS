//below directive is used to craete server actions
//this directive ensures that shareMeal() and all other functions defined here will be executed only on server
'use server'

import { redirect } from "next/navigation"
import { saveMeal } from "./meals"
import { revalidatePath } from "next/cache"

//NextJs will automatically pass form data as an object that has been filled in the form
export const shareMeal = async(prevState, formData)=>{

  const isInvalidText = (text)=>{
    return !text || text.trim()===''
  }
    
    const meal = {
      title : formData.get('title'),
      summary : formData.get('summary'),
      instructions : formData.get('instructions'),
      image : formData.get('image'),
      creator : formData.get('name'),
      creator_email : formData.get('email')
    }

    if(isInvalidText(meal.title) ||
      isInvalidText(meal.summary) ||
      isInvalidText(meal.instructions) ||
      isInvalidText(meal.creator) ||
      isInvalidText(meal.creator_email)||
      !meal.creator_email.includes('@') ||
      !meal.image || meal.image.size === 0){
        //throw new Error('Invalid input provided')
        return {
          message : 'Invalid input!!' 
        }
      }

    await saveMeal(meal)
    //revalidatePath() accepts 2 parameter - 1)path whose chache has to be dropped 
    //2) If that path has some nested dependencies then we add 'layout' parameter to drop cache of all related nested pages
    revalidatePath('/meals')
    redirect('/meals')
  }


  //Note - We can not use 'use server' and 'use client' directives in the same file