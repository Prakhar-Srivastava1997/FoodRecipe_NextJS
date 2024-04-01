'use client'
import ImagePicker from '@/components/meals/image-picker';
import classes from './page.module.css';
import { shareMeal } from '@/lib/actions';
import MealFormSubmit from '@/components/meals/meal-form-submit';
import { useFormState } from 'react-dom'

export default function ShareMealPage() {
  //below hook is used to manage form states that uses server action for form submission
  //It takes 2 args. First, is the server action that is to be triggered for form submission. Second,
  //initial value that shoud be returned by this hook before server action is triggered.
  const [state, formAction] = useFormState(shareMeal, {message : null})

  return (
    <>
      <header className={classes.header}>
        <h1>
          Share your <span className={classes.highlight}>favorite meal</span>
        </h1>
        <p>Or any other meal you feel needs sharing!</p>
      </header>
      <main className={classes.main}>
        {/* In general browser's built-in form handling perspective, action prop of the form takes in the path to which the request has to be sent but in case of NextJs we can assign server action function to the action prop */}
        <form className={classes.form} action={formAction}>
          <div className={classes.row}>
            <p>
              <label htmlFor="name">Your name</label>
              <input type="text" id="name" name="name" required />
            </p>
            <p>
              <label htmlFor="email">Your email</label>
              <input type="email" id="email" name="email" required />
            </p>
          </div>
          <p>
            <label htmlFor="title">Title</label>
            <input type="text" id="title" name="title" required />
          </p>
          <p>
            <label htmlFor="summary">Short Summary</label>
            <input type="text" id="summary" name="summary" required />
          </p>
          <p>
            <label htmlFor="instructions">Instructions</label>
            <textarea
              id="instructions"
              name="instructions"
              rows="10"
              required
            ></textarea>
          </p>
          <ImagePicker label="Your image" name="image"/>
          {state.message && <p className='text-red-900'>{state.message}</p>}
          <p className={classes.actions}>
            <MealFormSubmit/>
          </p>
        </form>
      </main>
    </>
  );
}