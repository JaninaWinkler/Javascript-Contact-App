$(function(){

  var $contacts = $('#contacts');
  var $name = $('#new-name');
  var $email = $('#new-email');
  var $phone = $('#new-phone');

  var contactToString = function(contact) {
    return 'Name: '+ contact.name +', Email: '+ contact.email +', Phone: '+ contact.phone_number;
  }

  function addContactToDOM(contact) {
    var $newContact = $('<li>')
      .text( contactToString(contact) );
    var $deleteButton = $('<button>')
      .addClass('delete-contact')
      .text('Delete!')
      .data('contact-id', contact.id);
    $newContact.append($deleteButton);
    $contacts.append($newContact);
  }

  $.ajax({
    type: 'GET',
    url: '/contacts',
    success: function showContacts(contacts) {
      $.each(contacts, function(i, contact) {
        addContactToDOM(contact);
      });
    },  
    error: function() {
      alert('error loading page contacts');
    }
  });

  $('#create-contact').on('click', function() {

    $.ajax({
      type: 'POST',
      url: '/contacts',
      dataType: 'json',
      data: {
        "contact": {
        "name": $name.val(),
        "email": $email.val(),
        "phone_number": $phone.val(),
        }
      },
      success: function(newContact){
        addContactToDOM(newContact);
      },
      error: function() {
        alert('error saving contact');
      }
    });
  });


  $('#contacts').on('click', '.delete-contact', function() {
    var contactToDelete = $(this).data('contact-id');
    $liToDelete = $(this).parent();
    $.ajax({
      type: 'DELETE',
      url: '/contacts',
      data: {
        id: contactToDelete },
      success: function(contactToDelete){
        $liToDelete.remove();
      },
      error: function() {
        alert('error deleting contact');
      }
    });
  });

// TO DO: Update - store list item in a variable, replace with new list item (input from form).
// AJAX request ... '/contacts' + contact.id


});


