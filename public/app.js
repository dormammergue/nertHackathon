function newsFeed(username, title, image, body){
    this.username = createRandomUsername(moderatelyInsultingUsernames, modifiers);
    this.title = 'some stupid shit from ';  //+ db collection title
    this.image = pickRandom(imageLinks);
    this.body = 'here is a fake body'; //db collection body
}

//   $('#user').append( 'user: <i>' + createRandomUsername(moderatelyInsultingUsernames, modifiers) + '</i>');
//         $('#title').append('Some stupid shit from facebook!');
//         $('#imagio').append('<img src="' + pickRandom(imageLinks)+ '" style=float:right;width:100px;height:100px;margin: 0 0 10px 10px>')
//         $('#mainNewsBody').append('Kris and I often comment on the trite, cliche things people say about marriage/their spouse and how dishonoring and disrespectful they can be. When we were in New Orleans last week we overheard a conversation between a young girl and an older couple who had been married for 38 years. The girl asked the couple the common question, Whats the secret? The man responded, Go hard of hearing early. Really? Thats the best advice you have to give? You cant do any better after 38 years than some vapid quip? Call me crazy but I think how you talk about 