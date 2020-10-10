function mapInit (mapid, poemLines) {

  var minZoom = 6;
  var maxZoom = 7;
  var currLine = null;

  var img = [
    32768, // original width of image
    1680  // original height of image
  ];

  // create the map
  var map = L.map(mapid, {
    minZoom: minZoom,
    maxZoom: maxZoom
  });

  map.fitWorld();

  // assign map and image dimensions
  var rc = new L.RasterCoords(map, img)
  window.rc = rc;

  // set the view on a marker ...
  map.setView(rc.unproject([1090, 0]), minZoom)

  // the tile layer containing the image generated with gdal2tiles --leaflet ...
  L.tileLayer('./tilespng/{z}/{x}/{y}.png', {
    worldCopyJump: true,
    noWrap: false,
    attribution: 'End.Less (c) 2020'
  }).addTo(map)


  var zoomLevel = function () {
    return Math.ceil(
      Math.log(
        Math.max(img[0], img[1]) /
        256
      ) / Math.log(2)
    )
  };

  var zl = zoomLevel();

  //set max Bounds
  var southWest = map.unproject([0, img[1]], zl);
  var northEast = map.unproject([img[0], 0], zl);
  southWest.lng = -Infinity; //ensure we can still warp horizontally
  northEast.lng = Infinity;
  map.setMaxBounds(new L.LatLngBounds(southWest, northEast));
  window.map = map;

  //map move events
  var currentCenter;
  map.on('moveend', function() {
    changeSubtitle();
  });

  //convert to range
  function convertToRange(value, srcRange, dstRange){
    // value is outside source range return
    if (value < srcRange[0] || value > srcRange[1]){
      return NaN;
    }

    var srcMax = srcRange[1] - srcRange[0],
        dstMax = dstRange[1] - dstRange[0],
        adjValue = value - srcRange[0];

    return (adjValue * dstMax / srcMax) + dstRange[0];

  }

  //change subtitle based on position
  var changeSubtitle = function() {
    var currentCenter = map.wrapLatLng(map.getCenter());
    var line = "ooops, something went wrong :(";
    var lineNum = Math.round(convertToRange(currentCenter.lng, [-175,175], [0,15]));
    if(lineNum !== currLine) {
      currLine = lineNum;
      $('#subtitle').fadeTo(500, 0.1, function() {
        $('#subtitle').text(poemLines[lineNum]).css({"font-family": "'Neucha', cursive"}).fadeTo(500, 1); //TODO FIXME what a dirty hack
      });
    }
  };

  //create sound

  var sound = new Howl({
    src: [
      './audio/endlessloop2.webm',
      './audio/endlessloop2.mp3'
    ],
    loop: true,
    volume: 0.5,
    preload: true
  });

  //trigger play/stop
  function musicPlay(command) {
    if(command == 'play') {
      sound.fade(0, 0.5, 1000);
    }
    if(command == 'stop') {
      sound.fade(0.5, 0, 1000);
    }
  }

  //create leaflet interface to trigger play/stop with L.easybutton
  var soundToggleButton = L.easyButton({
      states: [{
              stateName: 'playing',        // name the state
              icon:      'fa-pause',               // and define its properties
              title:     'stop music',      // like its title
              onClick: function(btn, map) {       // and its callback
                musicPlay('stop');
                btn.state('stopped');    // change state on click!
              }
          }, {
              stateName: 'stopped',
              icon:      'fa-play',
              title:     'start music',
              onClick: function(btn, map) {
                musicPlay('play');
                btn.state('playing');
              }
      }]
  });
  soundToggleButton.addTo(map);

  //create leaflet interface button to go back to main page
  L.easyButton('fa-info', function(btn, map){
    window.location.href = window.location.href.split(/[?#]/)[0] + '../';
  }).addTo(map);

  //init everything (and expose to global for debugging)
  window.mymap = map;
  window.mysound = sound;
  sound.once('load', function() {
    sound.play();
  });
  changeSubtitle();

};
