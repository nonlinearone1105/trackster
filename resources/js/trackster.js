var Trackster = {};


$(document).ready(function() {
  $("#search").click(function() {
    $("h1").addClass("white");
    Trackster.searchTracksByTitle($("input").val());
    $("input").val("");
  });

  $(document).keypress(function(e) {
    if(e.which === 13) {
      $("h1").addClass("white");
      Trackster.searchTracksByTitle($("input").val());
      $("input").val("");
    }
  });
});
/*
  Given an array of track data, create the HTML for a Bootstrap row for each.
  Append each "row" to the container in the body to display all tracks.
*/
Trackster.renderTracks = function(tracks) {
  $("#song-list").empty();

  for(var i = 0; i < tracks.length; i++) {
    var $track =
      '<div class="row song vertical-align">' +
        '<div class="col-xs-1 col-xs-offset-1">' +
          '<a href="' + tracks[i].preview_url + '" target = "_blank">' +
            '<i class="fa fa-play-circle-o fa-2x"></i>' +
          '</a>' +
        '</div>' +
        '<div class="col-xs-3">' + tracks[i].name + '</div>' +
        '<div class="col-xs-2">' + tracks[i].artists[0].name + '</div>' +
        '<div class="col-xs-2">' + tracks[i].album.name + '</div>' +
        '<div class="col-xs-1">' + tracks[i].track_number + '</div>' +
        '<div class="col-xs-2">' + tracks[i].popularity + '</div>' +
      '</div>'

    $("#song-list").append($track);
  }

  window.setTimeout(function() {
    $("h1").removeClass("white");
  }, 500);
};

/*
  Given a search term as a string, query the Spotify API.
  Render the tracks given in the API query response.
*/
Trackster.searchTracksByTitle = function(title) {
  $.ajax({
    url: "https://api.spotify.com/v1/search?type=track&q=" + title,
    success: function(data) {
      Trackster.renderTracks(data.tracks.items);
    }
  });
};
