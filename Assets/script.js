$(document).ready(function() {
  // Get current date and display it
  var currentDate = moment().format("dddd, MMMM Do YYYY");
  $("#currentDay").text(currentDate);

  // Check the timeblocks and color-code them based on the current time
  function checkTimeblocks() {
    var currentHour = moment().hour();

    $(".time-block").each(function() {
      var blockHour = parseInt($(this).find("span").attr("id"));

      if (blockHour < currentHour) {
        $(this).removeClass("present future").addClass("past");
      } else if (blockHour === currentHour) {
        $(this).removeClass("past future").addClass("present");
      } else {
        $(this).removeClass("past present").addClass("future");
      }
    });
  }

  // Load saved events from local storage
  function loadEvents() {
    $(".time-block").each(function() {
      var eventId = $(this).find("button").attr("data-time");
      var savedEvent = localStorage.getItem(eventId);

      if (savedEvent) {
        $(this).find("textarea").val(savedEvent);
      }
    });
  }

  // Save event to local storage
  $(".saveBtn").on("click", function() {
    var eventId = $(this).attr("data-time");
    var eventText = $(this).siblings("textarea").val();

    if (eventText !== "") {
      localStorage.setItem(eventId, eventText);
      alert("Event saved successfully!");
    } else {
      alert("Please enter an event.");
    }
  });

  // Check timeblocks and load saved events on page load
  checkTimeblocks();
  loadEvents();
});
