var mildlyInsultingUsernames = [
    "dork",
    "dweeb",
    "mouth breather",
    "jerk",
    "jerkoff",
    "nerd",
    "nert",
    "geek",
    "dingus",
    "knuckledragger"
];

var moderatelyInsultingUsernames = [
    "asshole",
    "craperson",
    "crapbucket"
]

var highlyInsultingUsernames = [

]


function pickRandomFromArray(array) {
    //selects a random whole number between 0 and one less than the length of the array (for 0 indexed array)
    var randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
}




console.log(pickRandomFromArray(mildlyInsultingUsernames));