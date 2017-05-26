
/*TODO List
    1) Hook up with DB to display number
    2)

    //goal get total of all gripes to display

    //have accepted gripe types, then check db against those gripe types

*/


//function makeGripeObject(gripe) {
//    return {
//        className: gripeData.
//    }
//}
//function getGripeKey(gripe) {
//    return Object.keys(gripe)[0];
//}


// making gripes unique
    //assign an I st


function getGripesFromRant(rant) {
    var gripes = [];

    //get gripe, value pairs from db and format into different objects on front end
    Object.keys(rant.listOfGripes).map(function (key) {
        var gripe = {
            type: key,
            count: rant.listOfGripes[key]
        };
        gripes.push(gripe);
    });
    return gripes;
}

function macthGripesWithReactions(reactions, gripes) {
    //loop through each reaction and see if it matches a gripe
    //if reaction display name == gripe name then it's a match'


    for (gripe of gripes) {
        for (reaction of reactions) {
            
            if (gripe.type.toLowerCase() === reaction.className.toLowerCase()) {
                console.log("MATCH");
                //if we have a match we don't need to check others
                reaction.count = gripe.count;
                break;
            }
        }
    }
}

function getAndDisplayTotalGripes(gripes,rantId) {
    var totalGripesCount = 0;
    for (gripe of gripes) {
        totalGripesCount += gripe.count;
    }
    $(`#${rantId}`).find(".overall-gripe-count").text(totalGripesCount);
    return totalGripesCount;
}



function createReactionsListHtml(reactions,rantId) {
    //dynamically creates the html for the different types of reactions
    var reactionsHtml = "";

    //loop through each reaction and create a tag for it
    for (reaction of reactions) {
        createReactionsCss(reaction)
        var reactionHtml = `<li class="reaction reaction-${reaction.className}" data-emotion="${reaction.className}" data-reaction="${reaction.displayName}">${reaction.count}</li>`
        reactionsHtml += reactionHtml;
    }
    $(`#${rantId}`).find(".reactions-box").append(reactionsHtml);
}

function createBaseHtml(rantId) {

    //start with a div with the class gripe-reaction and generate html in that
    var baseHtml = `
        <span class="gripe-btn">
            <!-- Default gripe button -->
            <span class="gripe-btn-emo gripe-btn-default"></span> <!-- Default gripe button emotion-->
            <span class="overall-gripe-count">0</span><span class="gripe-btn-text">Gripe</span> <!-- Default gripe button text,(gripe, wow, sad..) default:gripe  -->
            <ul class="reactions-box">
                <!-- Reactions html is dynamically created in js and appended in here -->
            </ul>
        </span>
    `;
    $(`#${rantId}`).find(".gripe-reaction").append(baseHtml);
}

function createReactionsCss(reaction) {

    $("<style>")
        .prop("type", "text/css")
        .html(`
                        .reaction-${reaction.className} {
                            left: 300px;
                            transition-delay: .25s;
                            background-image: url('${reaction.imagePath}');
                            background-color: ${reaction.color};
                            border: 5px red solid;
                            color: white;
                            font-size: 1.5em;
                            text-align: right;
                            -webkit-text-stroke: 2px black;
                            font-family: arial;
                            font-weight:bold;


    
                        }
                        .reaction-${reaction.className}::before {
                            content: '${reaction.displayName}'
                        }
                        .gripe-btn:hover .reaction-${reaction.className} {
                            animation-delay: .2s
                        }

                        .gripe-btn-${reaction.className} {
                            background-image: url('${reaction.imagePath}');
                            background-repeat: no-repeat;
                            background-size: auto;
                            background-color:red;
                            border: 5px red solid;
                        }

                        .gripe-btn-text-${reaction.className} {
                            color: rgb(247, 113, 75);
                        }
                `).appendTo("head");
}



function buildGripe(rant) {
    $(document).ready(function () {
        //console.log("GOT YOUR RANT", rant)
        //console.log("Gripes", getGripesFromRant(rant));

        var rantId = rant._id;
        //PARSING DATA
        var gripes = getGripesFromRant(rant)

        var imageFolderPath = "../images/reactionsImages/";
        //make sure class name and display name are different (not just case) or one will overwrite the other class
        var reactions = [
            {
                className: "angry",
                displayName: "Angry",
                imagePath: imageFolderPath + "angry.gif",
                color: "red",
                count: 0
            },
            {
                className: "annoyed",
                displayName: "Annoyed",
                imagePath: imageFolderPath + "annoyed.gif",
                color: "pink",
                count: 0
            },
            {
                className: "self-righteous-prick",
                displayName: "Self Righteous Prick",
                imagePath: imageFolderPath + "self-righteous.jpg",
                color: "blue",
                count: 0
            },
            {
                className: "depressed",
                displayName: "Depressed",
                imagePath: imageFolderPath + "depressed.gif",
                color: "green",
                count: 0
            }
        ]

        macthGripesWithReactions(reactions, gripes);

        //CREATING HTML
        createBaseHtml(rantId);
        createReactionsListHtml(reactions,rantId);
        getAndDisplayTotalGripes(gripes,rantId);

        $(".reaction").on("click", function () {   // gripe click
            var data_reaction = $(this).attr("data-reaction");
            var data_emotion = $(this).attr("data-emotion");
            //$(".gripe-details").html("You, Arkaprava Majumder and 1k others");
            $(".gripe-btn-emo").removeClass().addClass('gripe-btn-emo').addClass('gripe-btn-' + data_emotion.toLowerCase());
            $(".gripe-btn-text").text(data_reaction).removeClass().addClass('gripe-btn-text').addClass('gripe-btn-text-' + data_reaction.toLowerCase()).addClass("active");;

            if (data_reaction == "gripe")
                $(".gripe-emo").html('<span class="gripe-btn-gripe"></span>');
            else
                $(".gripe-emo").html('<span class="gripe-btn-gripe"></span><span class="gripe-btn-' + data_reaction.toLowerCase() + '"></span>');
        });

        $(".gripe-btn-text").on("click", function () { // undo gripe click
            if ($(this).hasClass("active")) {
                $(".gripe-btn-text").text("Gripe").removeClass().addClass('gripe-btn-text');
                $(".gripe-btn-emo").removeClass().addClass('gripe-btn-emo').addClass("gripe-btn-default");
                $(".gripe-emo").html('<span class="gripe-btn-gripe"></span>');
                $(".gripe-details").html("Arkaprava Majumder and 1k others");
            }
        })
    })

 
}