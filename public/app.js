// function newsFeed(username, title, image, body){
//     this.username = createRandomUsername(moderatelyInsultingUsernames, modifiers);
//     this.title = 'some stupid shit from ';  //+ db collection title
//     this.image = pickRandom(imageLinks);
//     this.body = 'here is a fake body'; //db collection body
// }


$(document).ready(function () {

//     $.get("/api/rants", function (rants) {
//         for (var rant of rants) {
//             displayRant(rant);
//         }
//     });
// //display rants
//     // function displayRant(rant) {
//     //     var rantHtml = `<div class="chat"><span class = "channel">${rants.channel}:</span>${rants.content}<div class="timestamp">${chat.date}</div></div>`;
//     //     $("#chat-thread").append(rantHtml);
//     // }

    $("#submitRant").click(function () {
        

        //get contents of rant
        var rantContent = $(".newRant").val();
        var rantChannel = $('#dropdown').val();

        //send rant to server
        $.post("/api/newRant/", { 
            rant: rantContent,
            channel: rantChannel, 
            date: Date.now()

         }, function (rant) {
            alert('you just posted ' + rant);
        });
    });
});