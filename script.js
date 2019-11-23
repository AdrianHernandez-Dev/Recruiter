'use strict';
const searchURL = "https://api.github.com/users/";

function displayResults(responseJson) {
  console.log(responseJson);
  $('#results-list').empty();

  if (responseJson.length === 0) {
    $('#results-list').append(`<h2>No results match this user</h2>`)
  }
  else {
    for (let i = 0; i < responseJson.length; i++) {
      console.log(i)
      $('#results-list').append(
        `<h3>${responseJson[i].name}</a></h3>
      <p><a href="${responseJson[i].url}">${responseJson[i].url}</p>`
      )
    };
    $('#results').removeClass('hidden');
  }
};

function getUser(searchTerm) {
  fetch(`https://api.github.com/users/${searchTerm}/repos`)
    .then(response => {
      if (response.ok) {
        return response.json()
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
    console.log(searchTerm);
    getUser(searchTerm);
  });
}

$(watchForm);
