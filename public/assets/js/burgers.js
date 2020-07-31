$(function () {
    //create new burger
    $(".create-form").on("submit", function(event) {
        event.preventDefault();
        let newBurger = {
            burger_name: $('#createBurger').val().trim()
        };

        $.ajax('/api/burgers', {
            type: 'POST',
            data: newBurger
        }).then(function() {
            console.log('created new burger!');
            location.reload();
        });
    });
    //change state of burger 
    $('.devour-burger').on("click", function(event) {
        let id = $(this).data("id");
        let newDevour = $(this).data("newdevour");

        let newBurgerState = {
            devoured: true
        }
        $.ajax("/api/burgers/" + id, {
            type:"PUT",
            data: newBurgerState
        }).then (function() {
            console.log("changed burger to " + newDevour);
            location.reload();
        })
    })

   $('.delete-burger').on('click', function(event) {
       let id = $(this).data('id');
       $.ajax('/api/burgers/' + id, {
           type: 'DELETE'
       }).then(function() {
               console.log('deleted burger', id);
               location.reload();
           }
       )
   })
})