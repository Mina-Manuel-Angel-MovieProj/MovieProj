'use strict'

let input_Title= document.getElementById("input_Title")
let input_Rating= document.getElementById("input_Rating")
let input_Year= document.getElementById("input_Year")
let input_Director= document.getElementById("input_Director")
let input_Plot= document.getElementById("input_Plot")
let input_Genre= document.getElementById("input_Genre")
let input_Actors= document.getElementById("input_Actors")
let moviesArray = [];

//initial load
$(window).on("load",()=>{
    setTimeout(()=>$("#loading_Screen").fadeOut("slow"),2000)
})

//1 LOADING
// edit will be our website specifically, will add locale to the end to remember changes
let url = 'https://mma-movies.glitch.me/movies'
//2 GET ()  movie list .  each movie list will have delete button ( link to 21 ) / edit button,
let html = document.getElementById("movie__cards")
function getMovie() {
    html.innerHTML= ""
    $.ajax('https://mma-movies.glitch.me/movies')
        .done((data) => {
            console.log(data)
            data.map(movie => {
                //fetch(movieapi?=movie).then()

                //console.log(moviesArray);
                html.innerHTML +=

                    "<div class='card col-3 border border-primary'>" +
                    "<img class='card-img-top img-thumbnail' src='" + movie.poster + "' alt='" + movie.title +
                    "'<div class='card-body'><h5 class='card-title'>" + movie.title + "</h5><p class='card-text'>" +
                    movie.plot + "</p>" +
                    "<ul class='list-group list-group-flush'><li class='list-group-item'>" + movie.director +
                    ", year:" + movie.year + "</li><li class='list-group-item'>" + movie.actors +
                    "</li><li class='list-group-item'>" + movie.genre + ", rating: " + movie.rating +
                    "</li></ul><div class='card-body'><a href='#' class='card-link'><button data-id='" + movie.id +
                    "' class='edit float-left' onclick='edit($(this).attr(\"data-id\"))'>edit</button> <button data-id='" + movie.id +
                    "' class='delete float-right' onclick='del($(this).attr(\"data-id\"))'>delete</button></a></div></div></div>"

            })
        })
}
getMovie()
//3 refresh page function -



//ADDING
// creat button  html
//grab btn jquery click ()  eventregister : fetch ( ).post :  form

function add (){
    let addMovie = {
            title: input_Title.value,
            rating: input_Rating.value,
            year: input_Year.value,
            director: input_Director.value,
            plot: input_Plot.value,
            genre: input_Genre.value,
            actors: input_Actors.value

    }
    $.post(url, addMovie)
}

document.getElementById("add_btn").addEventListener("click", add); // submit button add function

document.getElementById("open_form").addEventListener("click",()=>{
$("#Add_form").toggleClass("none active")
})

//DELETING
//  create button html
//grab btn  click ()   : fetch ()  .delete
function del(id) {


    let delMovie = {
        method: 'DELETE',
    }
     fetch(url+`/${id}`, delMovie).then(getMovie)
}
// --- delete function reaches the delete button grabs its specific btn id, adds it to the fetch url for deletion


// let del_btn=document.getElementsByClassName(".delete")
    // del_btn.addEventListener("click",del)  // attaching click event delete to delete button
// console.log(del_btn)
// EDITING : form
// when it click edit button, it will creat a form for editing   and inside the adding form (?)  we will have submit button that will actually go to server - edit post.
// $(document).on('click', function)   Timing issue?. s
function edit(id){
    $("#edit_form").toggleClass("none active")


 let edit_btn=$("#Edit_btn");
    edit_btn.on('click',()=> {
        let edit_title =    $("#Edit_Title");
        let edit_year =     $("#Edit_Year");
        let edit_rate =     $("#Edit_Rating");
        let edit_director = $("#Edit_Director");
        let edit_plot =     $("#Edit_Plot");
        let edit_genre =    $("#Edit_Genre");
        let edit_actors =   $("#Edit_Actors");

        fetch(url+`/${id}`,{
            method: "PUT",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: id,
                title:    edit_title.val(),
                rating:   edit_rate.val(),
                year:     edit_year.val(),
                director: edit_director.val(),
                plot:     edit_plot.val(),
                genre:    edit_genre.val(),
                actors:   edit_actors.val(),
                poster:     "none"
            }),
        }).then((response)=>console.log(response.json()))
            .then(getMovie);
    })
}



