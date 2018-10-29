$('#submit').on('click', function (a, b) {
  var jobNum = $('#job_no').val();
  var jobStatus = $('#job_status').val();
  var jobSpan = `<span>${jobNum} / ${jobStatus}</span></br>`;
  $('#recents').append(jobSpan);

  console.log(jobNum, jobStatus);
  $.get(`https://www.easterncarservice.com/api/v2/passenger/status.php?job=${jobNum}&status=${jobStatus}`, function (data) {
    console.log(data);
  });
});
