$(document).ready(() => {
  $(".slow-fade").hide();

// Materialize init
  $('.collapsible').collapsible();
  $('.modal').modal();
  $('.tabs').tabs();


// Submit message
  $(".comment-form").on("submit", function () {
    let data = {};
    let id = $(this).data("id");
    data.message = $(this).find("input[name=message]").val();

    $.ajax({
      url: "/article/" + id,
      method: "POST",
      data: data
    }).then(function () {
      location.reload();

    });
  });

// Delete message
  $(".del").on("click", function (e) {
    console.log(this);
  
    let id = $(this).data("id");
  
    console.log(id);
  
    $.ajax({
      url: "/comment/" + id,
      method: "DELETE"
    }).then(() => {
      console.log(id + "deleted");
    });
  
    $(this).closest(".comment-container").fadeOut();
  });

// Hero section animation
  $("#fade-1").delay(1000).fadeIn("slow");
  $("#fade-2").delay(4000).fadeIn("slow");
  $("#fade-3").delay(6000).fadeIn("slow");
  $("#fade-4").delay(8000).fadeIn("slow")
  $("#fade-1 #fade-2 #fade-3").delay(9000).fadeOut()


});