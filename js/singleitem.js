/*
 * custom scripts that are only loaded for single items (projects and experience posts)
 */

$(document).ready(function(){

  //make sure all outgoing links are target _blank
  $('a').each(function() {
    if (this.hostname == window.location.hostname) return;
    $(this).attr('target', '_blank');
  });

});
