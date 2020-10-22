// IIFE - Immediately Invoked Function Expression
(function(){
    
    function Start()
    {
        console.log("App started...");

        //Deletion safeguard
        let delButtons = document.querySelectorAll('.btn-danger'); //find all of the delete buttons by their btn class
        for(button of delButtons) //foreach
        {
            button.addEventListener('click', (event) => { //on click, do the confirm event
                if (!confirm("Are you sure?")) //if they say no to are you sure
                {
                    event.preventDefault();
                    window.location.assign('/book-list'); //reload
                }

            }); 
        }
    }
    
    window.addEventListener("load", Start); //when the window finishes loading it will call the Start function

})();