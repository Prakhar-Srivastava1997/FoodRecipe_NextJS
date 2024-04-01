import sql from 'better-sqlite3';
import slugify from 'slugify';
import xss from 'xss';
//below library allows us to work with file system
import fs from 'node:fs'

//establishing database connection
const db = sql('meals.db')

export async function getMeals(){
    await new Promise((resolve)=>setTimeout(resolve, 5000))

    //throw new Error('Fetching meals failed...')
    //below all() is used to fetch all rows
    //get() used to fetch single row
    //run() used to insert data
    return db.prepare('SELECT * FROM meals').all()
}

//In below function we are passing slug as parameter to indentify which meal is to be fetched from DB.
export function getMeal(slug){
    //below way is insecure as we are open to SQL injection attacks
    //return db.prepare('SELECT * FROM meals WHERE slug = '+slug)

    //below is the secure and preferred way
    return db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug)
}

export async function saveMeal(meal){
    //below lower : true forces all the characters of slug to be lowercase
    meal.slug = slugify(meal.title, { lower : true})
    
    //below we are removing any harmfull content in our instructions using xss()
    meal.instructions = xss(meal.instructions)

    const extension = meal.image.name.split('.').pop()
    const fileName = `${meal.slug}.${extension}`

    //below method creates a stream that allows us to write data into a file by accepting path of the file as parameter. It returns a stream object that helps in writing data to a file.
    const stream = fs.createWriteStream(`public/images/${fileName}`)

    const bufferedImage = await meal.image.arrayBuffer()

    stream.write(Buffer.from(bufferedImage), (error)=>{
        if(error){
            throw new Error('Saving image failed...')
        }
    })

    //We will be storing path of image in DB and also we don't need public in the path as it will be refrenced auatomatically
    meal.image = `/images/${fileName}`

    db.prepare(`
        INSERT INTO meals
            (title, summary, instructions, creator, creator_email, image, slug)
        VALUES(
            @title,
            @summary,
            @instructions,
            @creator,
            @creator_email,
            @image,
            @slug    
        )
    `).run(meal)
}


//Note - xss package helps in protecting against cross-site scripting attack as we are rendering instructions as HTML code which is vulnerable to this attack
//We are creating slug using slugify package