const http = require('http');

function searchApi(searchTerm, callback) {
  searchTerm = encodeURIComponent(searchTerm);
  const url = 'http://www.songsterr.com/a/ra/songs/byartists.json?artists="' + searchTerm + '"';
  console.log(url);
  http
    .get(url, function(res) {
      var body = '';
      res.on('data', function(chunk) {
        body += chunk;
      });

      res.on('end', function() {
        var jsonResponse = JSON.parse(body);
        var songs = [];
        for (var i = 0; i < jsonResponse.length; i++) {
          const song = convertObj(jsonResponse[i]);
          console.log(song);
          songs.push(song);
        }
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

  return song;
}

module.exports = {
  searchApi
};
