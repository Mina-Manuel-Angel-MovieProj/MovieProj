'use strict'

//LOADING PAGE
// loading.toggle()
// HTML + CSS

// HTML form

//1 LOADING
//2 GET ()  movie list .  each movie list will have delete button ( link to 21 ) / edit button,
//3 refresh page function -



//ADDING
// creat button  html
//grab btn jquery click ()  eventregister : fetch ( ).post :  form





//DELETING
//  creat button html
//grab btn  click ()   : fetch ()  .delete

// EDITING : form
// when it click edit button, it will creat a form for editing   and inside the adding form (?)  we will have submit button that will actually go to server - edit post.
$.post('https://mma-movies.glitch.me/movies',{
        method : 'POST',
        body : JSON.stringify({
            "title": "Encanto",
            "rating": "5",
            "poster": "https://movies.disney.com/encanto",
            "year": "2021",
            "genre": "Adventure, Animation,Fantasy",
            "director": "Byron Howard, Jared Bush, Charise Castro Smith",
            "plot": "Walt Disney Animation Studios’ “Encanto” tells the tale of an extraordinary family, the Madrigals, who live hidden in the mountains of Colombia, in a magical house, in a vibrant town, in a wondrous, charmed place called an Encanto. The magic of the Encanto has blessed every child in the family with a unique gift from super strength to the power to heal—every child except one, Mirabel (voice of Stephanie Beatriz). But when she discovers that the magic surrounding the Encanto is in danger, Mirabel decides that she, the only ordinary Madrigal, might just be her exceptional family’s last hope.",
            "actors": "Stephanie Beatriz, María Cecilia Botero, Wilmer Valderrama, Adassa, Diane Guerrero, Mauro Castillo, Angie Cepeda, Jessica Darrow, Rhenzy Feliz, Carolina Gaitán, Ravi Cabot-Conyers, John Leguizamo",
            "id": 6
        })
    }
)


