'use strict';

// put your own value below!

const searchURL = 'https://www.googleapis.com/books/v1/volumes';


function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}

function displayResults(responseJson) {
  // if there are previous results, remove them
  console.log(responseJson);
  $('#results-list').empty();
  // iterate through the items array
  for (let i = 0; i < responseJson.items.length; i++){
    // for each video object in the items 
    //array, add a list item to the results 
    //list with the video title, description,
    //and thumbnail
    $('#results-list').append(
      `
      <li><h3 class="title">${responseJson.items[i].volumeInfo.title} by ${responseJson.items[i].volumeInfo.authors}</h3>
      <img class="sizeMe" src="${ responseJson.items[i].volumeInfo.imageLinks.thumbnail}">
      <button type="button" class="collapsible" title="We know your curious. click here!">What's this book about?</button>
      <div class="content">
     <p>${responseJson.items[i].volumeInfo.description}</p>
      <p>Publish Date ${responseJson.items[i].volumeInfo.publishedDate}</p>
      </div>
      <a href="${responseJson.items[i].saleInfo.buyLink}" target="_blank">Buy?</a>
      <a href="${responseJson.items[i].volumeInfo.infoLink}" target="_blank">More info</a>
      `


    )


    }

    var coll = document.getElementsByClassName("collapsible");
  
    
    for (let i = 0; i < coll.length; i++) {
      coll[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        if (content.style.display === "block") {
          content.style.display = "none";
        } else {
          content.style.display = "block";
        }
      });


  //display the results section  
  $('#results').removeClass('hidden');
};
}
function getYouTubeVideos(query) {
  const params = {
    q: query, 
    maxResults: 20,

  };
  const queryString = formatQueryParams(params)
  const url = searchURL + '?' + queryString;

  console.log(url);

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const searchTerm = $('#js-search-term').val();
    const maxResults = $('#js-max-results').val();
    getYouTubeVideos(searchTerm, maxResults);
  });
}

$(watchForm);