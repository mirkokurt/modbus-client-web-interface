$(function() {
  $('#right-column').hide();

  $('li.hero-name a').click(function() {
  
    var name = $(this).text();
    
    $('#right-column h2').text(name);
  
    $('#facts li').remove();
    
    $.getJSON('/hero/' + name, function(data) {
      for (var i = 0; i < data.length; i++) {
        $('<li>').appendTo('#facts').text(data[i]);
      }
    });
    
    $('#right-column').show();
    
    return false;
  });
  
  $('#add-new-fact').click(function() {
    
    var time = $('#select-time').val();
  
    $.ajax({
      type: "POST",
      url: "/hero/write_register",
      data: JSON.stringify({ time: time }),
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: function(data) {
        $('<li>').appendTo('#feedback').text("ok");
      },
      error: function(err) {
        var msg = 'Status: ' + err.status + ': ' + err.responseText;
        alert(msg);
      }
    });
    return false;
  });
});

jQuery(document).ready(function() {
  var ora = jQuery('#ora');
  var value = jQuery('#value');

  function updateTime() {
      var now = new Date();
      ora.val(now.toString());        
  }

  function updateModbus() {
    $.get("/modbus/values", function(data){
      value.val(data.values);
    });  
  }

  updateTime();
  updateModbus();
  setInterval(updateTime, 5000); // 5 * 1000 miliseconds
  setInterval(updateModbus, 1000); // 1000 miliseconds
});
