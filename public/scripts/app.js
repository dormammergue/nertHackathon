//submit new rant

$(document).ready(function () {

    $("#submitRant").click(function () {
        //get contents of rant
        var rantContent = 
        
        $(".newRant").val();
        var rantChannel = 
         $('#dropdown').val();

        //send rant to server
        $.post("/api/newRant/", { 
            rant: rantContent,
            channel: rantChannel, 
            dateOfRant: Date.now()

         }, function (rant) {
            alert('you just posted!');
        });
    });

    
});


   
