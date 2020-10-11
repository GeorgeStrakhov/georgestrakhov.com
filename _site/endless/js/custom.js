$(document).ready(function() {

// Gets the video src from the data-src on each button

var $videoSrc;
$('.video-btn').click(function() {
    $videoSrc = $(this).data( "src" );
});


// when the modal is opened autoplay it
$('#myModal').on('shown.bs.modal', function (e) {

// set the video src to autoplay and not to show related video. Youtube related video is like a box of chocolates... you never know what you're gonna get
$("#video").attr('src',$videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0" );
})



// stop playing the youtube video when I close the modal
$('#myModal').on('hide.bs.modal', function (e) {
    // a poor man's stop video
    $("#video").attr('src',$videoSrc);
})

//custom click behaviors for the card images
$('#videothumb').on('click', function(e) {
  $('#defaultVideoBtn').click();
});

$('#mapthumb').on('click', function(e) {
    window.location.href = window.location.href.split(/[?#]/)[0] + 'world/';
});

$('#bookthumb').on('click', function(e) {
  window.open('https://forms.gle/FqtesXt4Je8ABFiR9', '_blank');
});


// document ready
});
