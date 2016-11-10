function deletenote (id){
  var url = '/notes/' + id
  $.ajax({
    url: url,
    type: 'DELETE',
    success: function(result) {
      console.log('delete success')
        // Do something with the result
    }
  });
}

function savenote(id) {
  var url = '/notes/' + id
  var data = $('#form'+id).serialize();
  console.log(data);
  $.ajax({
    url: url,
    type: 'PUT',
    data: data,
    success: function(result) {
      console.log('edit success')
      window.location = '/user-home'
    }
  });
}

function newnote(id) {
  var url = '/'
  // var data = $('#form'+id).serialize();
  console.log(data);
  $.ajax({
    url: url,
    type: 'PUT',
    // data: data,
    success: function(result) {
      console.log('go to new note success')
      window.location = '/'
    }
  });
}

$(document).ready(function() {
  $('.delete').click(function(e) {
    var selectedId = this.id
    deletenote(selectedId)
  })
  $('.save').click(function(e) {
    var selectedId = this.id
    savenote(selectedId)
  })
  $('.new').click(function(e) {
    // var selectedId = this.id
    newnote()
  })
})
