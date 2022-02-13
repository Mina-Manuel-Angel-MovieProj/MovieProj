'use strict'

let input_Title = document.getElementById("input_Title")
let input_Rating = document.getElementById("input_Rating")
let input_Year = document.getElementById("input_Year")
let input_Director = document.getElementById("input_Director")
let input_Plot = document.getElementById("input_Plot")
let input_Genre = document.getElementById("input_Genre")
let input_Actors = document.getElementById("input_Actors")

//initial load better idea to load until main is done, loader will be inside main fetch
// $(window).on("load",()=>{setTimeout(()=>$("#loading_Screen").fadeOut("slow"),1000)})
//calls to load and unload our screen -- tried to make screen variable, but fadein/out doesnt like that.
let loading = () => $("#loading_Screen").fadeIn("fast")
let finished = () => $("#loading_Screen").fadeOut("slow")

let url = 'https://mma-movies.glitch.me/movies'
let html = document.getElementById("movie__cards")

function rating(id, number){
let stars = $("#stars"+id).children(".star")    // finds correct stars.
    stars.map((star,ind)=>{
      if (ind <= number){
          star[ind].addClass("gold");       //something here is missing..
          star[ind].removeClass("black");
      }
    })
} //runs through the ratings and returns the avg in stars.

function getMovie() {
    loading();
    html.innerHTML = ""
    $.ajax('https://mma-movies.glitch.me/movies')
        .done((data) => {
            console.log(data)
            data.map(movie => {
                //fetch(movieapi?=movie).then()

                //console.log(moviesArray);
                html.innerHTML +=
// language = html
                    `<div class='card col-4 m-5'>
                    <img class='card-img-top img-thumbnail' src='${movie.poster}' alt='${movie.title}'>
                        <div class='card-body'>
                        <h5 class='card-title text-center'>${movie.title}(${movie.year})</h5>
                        <p class='card-text'>${movie.plot}</p>
                        <ul class='list-group list-group-flush text-center'>
                            <li class='list-group-item'>Director:<br> ${movie.director}</li>
                            <li class='list-group-item'>Actors:<br> ${movie.actors}</li>
                            <li class='list-group-item'>Genre(s): ${movie.genre}</li>
                            <li class='list-group-item'>Rating:<br> <div>
    <p id="stars${movie.id}">
        <i class="star black"></i>
        <i class="star black"></i>
        <i class="star black"></i>
        <i class="star black"></i>
        <i class="star black"></i>
    </p>
</div>${movie.rating}</li>
                        </ul>
                            <div class='change d-flex justify-content-between p-0'>
                                <img src='assets/button2.png' alt='Edit' data-id='${movie.id}' class='edit align-self-center' onclick='edit($(this).attr(\"data-id\"))' height='50px' width='80px'>
                                <img src='assets/filmshoot.png' alt='prop' height='80px' width='80px'>
                                <img src='assets/button.png' alt='Delete' data-id='${movie.id}' class='delete align-self-center' onclick='del($(this).attr(\"data-id\"))' height='50px' width='80px'>
                            </div>
                        </div>
                    </div>`;
                rating(movie.id, movie.rating);
            })
            setTimeout(() => finished(), 1000);
        })
}

getMovie()


//ADDING
// creat button  html
//grab btn jquery click ()  eventregister : fetch ( ).post :  form

function add() {
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

document.getElementById("open_form_add").addEventListener("click", () => {
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
    fetch(url + ` /${id}`, delMovie).then(getMovie)
}

// EDITING : form
// when it click edit button, it will creat a form for editing   and inside the adding form (?)  we will have submit button that will actually go to server - edit post.
// turns out for editing Headers are important. at leaast in our case
function edit(id) {
    let edit = $("#Edit_btn")
    $("#form").toggleClass("none active");
    edit.toggleClass("none active");

    edit.on('click', () => {

        fetch(url + ` /${id}`, {
            method: "PUT",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                title: input_Title.value,
                rating: input_Rating.value,
                year: input_Year.value,
                director: input_Director.value,
                plot: input_Plot.value,
                genre: input_Genre.value,
                actors: input_Actors.value,
                poster: "none",
                id: id
            }),
        }).then((response) => console.log(response.json()))
            .then(() => {
                getMovie();
            });
    })
}

function removeOptions(input) {
    if (input.hasClass("active")) {
        input.toggleClass("none active")
    }
}

$("#close").click(() => {
    removeOptions($("#add_btn"));
    removeOptions($("#Edit_btn"));
    $("#form").toggleClass("none active")
}) //makes sure close button resets all other important button statuses

