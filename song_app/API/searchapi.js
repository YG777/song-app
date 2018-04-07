var http = require("http");

//www.songsterr.com/a/ra/songs.json?pattern=Marley&&artist.name=Marley&&chordsPresent=true

function searchApi(searchTerm, callback) {
  searchTerm = encodeURIComponent(searchTerm);
  var options = {
    host: "songsterr.com",
    port: 80,
    path:
      "a/ra/songs.json?pattern=(" +
      searchTerm +
      ")&&artist.name=(" +
      searchTerm +
      ")",
    method: "GET"
  };

  http.request(options, function(res) {
    // retrieve data chunks and create a string representation of them
    var body = "";
    res.on("data", function(chunk) {
      body += chunk;
    });

    res.on("end", function() {
      //convert data to json object
      var jsonResponse = JSON.parse(body);
      var songs = [];
      if (jsonResponse.songs !== undefined) {
        //loop through the songs in the response and convert them into our view model
        for (var i = 0; i < jsonResponse.songs.length; i++) {
          songs.push(convertObj(jsonResponse.songs[i]));
        }
      }
      //return the converted view models
      callback(songs);
    });
  })
    .end();
}

function convertObj(jsonApiSong) {
  var song = {};
  song.Artist = jsonApiSong.artist.name;
  song.Id = jsonApiSong.id;
  song.Title = jsonApiSong.title;
  song.Chords = jsonApiSong.chordsPresent;
 
  if (jsonApiSong.chordsPresent === true) {
    song.Chords = 'Yes';
  } else {
    song.Chords = 'No';
  }
}

module.exports = {
  searchApi
};