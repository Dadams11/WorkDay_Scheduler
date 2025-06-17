$(function () {
  const businessHours = [9,10,11,12,13,14,15,16,17]; // 9AM–5PM
  const container = $('#timeBlocks');
  const currentHour = dayjs().hour();
  const today = dayjs().format('dddd, MMMM D');
  $('#currentDay').text(today);

  businessHours.forEach(hour => {
    const hourLabel = dayjs().hour(hour).format('h A');
    const savedText = localStorage.getItem(`hour-${hour}`) || '';

    const row = $(`
      <div class="time-block" id="hour-${hour}">
        <div class="hour">${hourLabel}</div>
        <textarea class="description"></textarea>
        <button class="saveBtn"><i class="fas fa-save"></i></button>
      </div>
    `);

    // Set the value of the textarea safely
    row.find('textarea').val(savedText);

    // Apply time class
    if (hour < currentHour) {
      row.addClass('past');
    } else if (hour === currentHour) {
      row.addClass('present');
    } else {
      row.addClass('future'); 
    }

    container.append(row);
  });

  // Save to localStorage on click
  container.on('click', '.saveBtn', function () {
    const parent = $(this).closest('.time-block');
    const hourId = parent.attr('id'); // e.g., hour-9
    const userInput = parent.find('textarea').val();

    console.log(`Saving: ${hourId} => ${userInput}`);
    localStorage.setItem(hourId, userInput);

    // Confirm save
    const confirm = localStorage.getItem(hourId);
    console.log(`Confirmed saved: ${confirm}`);
  });
});