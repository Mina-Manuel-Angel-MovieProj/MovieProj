'use strict'

let input_Title= document.getElementById("input_Title")
let input_Rating= document.getElementById("input_Rating")
let input_Year= document.getElementById("input_Year")
let input_Director= document.getElementById("input_Director")
let input_Plot= document.getElementById("input_Plot")
let input_Genre= document.getElementById("input_Genre")
let input_Actors= document.getElementById("input_Actors")

//initial load
$(window).on("load",()=>{setTimeout(()=>$("#loading_Screen").fadeOut("slow"),1000)})

let url = 'https://mma-movies.glitch.me/movies'
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
            actors: input_Actors.value,
            poster: "none"
    }
    $.post(url, addMovie).done(getMovie)
    $("#form").toggleClass("none active")
}

document.getElementById("add_btn").addEventListener("click", add); // submit button add function

document.getElementById("open_form_add").addEventListener("click",()=>{
//these will make sure its opened on click. not just toggled
$("#form").toggleClass("none active");
$("#add_btn").toggleClass("none active");
})

//DELETING
//grab btn  click ()   : fetch ()  .delete
function del(id) {


    let delMovie = {
        method: 'DELETE',
    }
     fetch(url+`/${id}`, delMovie).then(getMovie)
}

// EDITING : form
// when it click edit button, it will creat a form for editing   and inside the adding form (?)  we will have submit button that will actually go to server - edit post.
// turns out for editing Headers are important. at leaast in our case
function edit(id){
let edit =$("#Edit_btn")
    $("#form").toggleClass("none active");
    edit.toggleClass("none active");

        edit.on('click',()=> {

            fetch(url+`/${id}`,{
            method: "PUT",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title: input_Title.value,
                rating: input_Rating.value,
                year: input_Year.value,
                director: input_Director.value,
                plot: input_Plot.value,
                genre: input_Genre.value,
                actors: input_Actors.value,
                poster: "none",
                id:id
            }),
        }).then((response)=>console.log(response.json()))
            .then(()=>{getMovie();});
    })
}

$("#close").click(()=>{
    function removeOptions(input){
        if(input.hasClass("active")){
            input.toggleClass("none active")
        }
    }
    removeOptions($("#add_btn"));
    removeOptions($("#Edit_btn"));
    $("#form").toggleClass("none active");
}) //makes sure close button resets all other important button statuses

