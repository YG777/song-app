const Api = require('../API/searchapi');
function searchArtist(req, res) {
  var searchTerm = req.query.searchTerm;
}

function callback(searchResults) {
  res.render('search/results', {
    songs: searchResults
  });
}

Api.searchApi(searchTerm, callback);

function searchForm(req, res){
  res.render('search/form');
}

module.exports = {
  searchForm,
  search: searchArtist
};