// IIFE - Immediately Invoked Function Expression
(function(){
    
    function Start()
    {
        console.log("App started...");
    }
    
    window.addEventListener("load", Start); //when the window finishes loading it will call the Start function

})();