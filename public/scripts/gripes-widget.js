
    /*TODO List
        1) Hook up with DB to display number
        2)

    */

    // function getGripesFromRant(rant) {
    //         var gripes = [];
    //         Object.keys(rant.listOfGripes).map(function (key) {
    //             var gripe = {};
    //             gripe[key] = rant.listOfGripes[key];
    //             gripes.push(gripe);
    //         });
    //         return gripes;
    //     }

        $.get("/api/rants", function (data) {
            var rant = data[0];

            //console.log("Gripes", getGripesFromRant(rant));

            //TODO: get reaction types and images from DB
            var imageFolderPath = "../images/reactionsImages/";
            //make sure class name and display name are different (not just case) or one will overwrite the other class
            var reactions = [
                {
        className: "-angry",
                    displayName: "Angry",
                    imagePath: imageFolderPath + "angry.gif",
                    color:"red"
                },
                {
        className: "-annoyed",
                    displayName: "Annoyed",
                    imagePath: imageFolderPath + "annoyed.gif",
                    color: "pink"
                },
                {
        className: "-self-righteous-prick",
                    displayName: "Self Righteous Prick",
                    imagePath: imageFolderPath + "self-righteous.jpg",
                    color: "blue"
                },
                {
        className: "-depressed",
                    displayName: "Depressed",
                    imagePath: imageFolderPath + "depressed.gif",
                    color: "green"
                }
            ]


            function createBaseHtml() {
                //start with a div with the class gripe-reaction and generate html in that
                var baseHtml = `
                                <!-- container div for reaction system -->
                                <span class="gripe-btn">
        <!-- Default gripe button -->
                                    <span class="gripe-btn-emo gripe-btn-default"></span> <!-- Default gripe button emotion-->
                                    <span class="gripe-btn-text">Gripe</span> <!-- Default gripe button text,(gripe, wow, sad..) default:gripe  -->
                                    <ul class="reactions-box">
            <!-- Reactions html is dynamically created in js and appended in here -->
                                    </ul>
    </span>
    `;
                $(".gripe-reaction").append(baseHtml);
            }

            function createReactionsListHtml(reactions) {
                //dynamically creates the html for the different types of reactions
                var reactionsHtml = "";

                //loop through each reaction and create a tag for it
                for (reaction of reactions) {
        createReactionsCss(reaction)
                    var reactionHtml = `<li class="reaction reaction-${reaction.className}" data-emotion="${reaction.className}" data-reaction="${reaction.displayName}"></li>`
                    reactionsHtml += reactionHtml;
                }
                $(".reactions-box").append(reactionsHtml);
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
                            border: 2px red solid;
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


            $(document).ready(function () {

        createBaseHtml();
    createReactionsListHtml(reactions);


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
            });
        });