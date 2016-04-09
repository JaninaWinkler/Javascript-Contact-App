$(function(){

  var $contacts = $('#contacts');
  var $name = $('#new-name');
  var $email = $('#new-email');
  var $phone = $('#new-phone');

  var contactToString = function(contact) {
    return'<form class="edit" data-id="' + contact.id + '">' + 
      'Name:  ' + 
      '<input class="input-text" type="text" name="name" value="' + contact.name + '">' +
      ' Email:  '+ 
      '<input class="input-text" type="text" name="email" value="' + contact.email + '">' +
      ' Phone:  '+ 
      '<input class="input-text" type="text" name="phone_number" value="' + contact.phone_number + '">' +
      '    ' +
      '<button class="save-contact">Save!</button>'
      '</form>';

  }

  function addContactToDOM(contact) {
    var $newContact = $('<li>')
      .html( contactToString(contact) );
    var $deleteButton = $('<button>')
      .addClass('delete-contact')
      .text('x')
      .data('contact-id', contact.id);
    $newContact.prepend($deleteButton);
    $contacts.prepend($newContact);
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

   $('.create-contact').on('click', function() {
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
      url: '/contacts/' + contactToDelete,
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

  $('body').on('submit', 'form.edit', function(e) {
    e.preventDefault();
    var form = $(this);
    console.log(form);
    console.log(form.data());
    console.log(form.serialize());
    $.ajax({ 
      type: 'PUT',
      url: '/contacts/' + form.data('id'),
      data: form.serialize(),
      success: function(contactToDelete){
        // $liToDelete.remove();
      },
      error: function() {
        alert('error saving contact');
      }
    });
  });

});
