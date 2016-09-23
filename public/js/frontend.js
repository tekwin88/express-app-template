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

function editnote(id) {
  var url = '/notes/' + id
  var data = $('#form'+id).serialize();
  console.log(data);
  $.ajax({
    url: url,
    type: 'PUT',
    data: data,
    success: function(result) {
      console.log('edit success')
        // Do something with the result
    }
  });
}

$(document).ready(function() {
  $('.delete').click(function() {
    var selectedId = this.id
    deletenote(selectedId)
  })
  $('.edit').click(function(e) {
    var selectedId = this.id
    editnote(selectedId)
  })
})
