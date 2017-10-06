$( document ).ready(function() {

	var topics = ['big lebowski', 'marmot', 'lion king', 'harry potter', 'cat flop', 'snapping turtle', 'beer'];

	// make for loop to populate #buttonBox with buttons
	function buttinz(arrayToUse, classToAdd, area){
		$(area).empty();

		for (var i = 0; i < arrayToUse.length; i++) {
			var button = $('<button>');
			button.addClass(classToAdd);
			button.attr('id', 'topicBtn')
			button.attr('type', 'button')
			button.attr('data-type', arrayToUse[i])
			button.text(arrayToUse[i]);
			$(area).append(button);
		}

	}

	$(document).on('click', '#topicBtn', function(){
		$(gifBox).empty();
		$("#topicBtn").removeClass('active');
		$(this).addClass('active');

		var type = $(this).attr('data-type');
		var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=VdT8VlTYFMvl3pI2fwvNiADR81Bju0ot&limit=10&rating=g&rating=pg&rating!=pg-13";

		$.ajax({
			url: queryURL,
			method: 'GET'
		}) .done(function(buttz) {
			var gifs = buttz.data;

			for (var i = 0; i < gifs.length; i++) {
				var itemBox = $('<div>');
				itemBox.attr('class', 'panel panel-default');

				var rating = gifs[i].rating;

				var p = $('<div>').text('Rating: ' + rating);
				p.attr('class', 'panel-heading');

				var animate = gifs[i].images.fixed_height.url;
				var still = gifs[i].images.fixed_height_still.url;

				var topicGif = $('<img>');
				topicGif.attr('src', still);
				topicGif.attr('data-still', still);
				topicGif.attr('data-animate', animate);
				topicGif.attr('data-state', 'still');
				topicGif.attr('class', 'topic-gif');

				itemBox.append(p);
				itemBox.append(topicGif);

				$('#gifBox').append(itemBox);
			}
		});
	});

	$(document).on('click', '.topic-gif', function(){

		var state = $(this).attr('data-state');

		if (state === 'still') {
			$(this).attr('src', $(this).attr('data-animate'));
			$(this).attr('data-state', 'animate');
		} else {
			$(this).attr('src', $(this).attr('data-still'));
			$(this).attr('data-state', 'still');
		}
	});

	$('#go').on('click', function(event){
		event.preventDefault();
		var newTopic = $('input').eq(0).val();

		if (newTopic.length > 2){
			topics.push(newTopic);
		}

		buttinz(topics, 'btn btn-default', '#buttonBox');

	});

buttinz(topics, 'btn btn-default', '#buttonBox');

});


// Official instructions from gitlabs:

// Before you can make any part of our site work, 
// you need to create an array of strings, 
// each one related to a topic that interests you. 
// Save it to a variable called topics.

// Your app should take the topics in this array and 
// create buttons in your HTML.

// Try using a loop that appends a button 
// for each string in the array.

// When the user clicks on a button, the page should grab 
// 10 static, non-animated gif images from the GIPHY API 
// and place them on the page.
// When the user clicks one of the still GIPHY images, 
// the gif should animate. If the user clicks the gif 
// again, it should stop playing.

// Under every gif, display its rating (PG, G, so on).
// This data is provided by the GIPHY API.
// Only once you get images displaying with button presses 
// should you move on to the next step.
// Add a form to your page takes the value from a user 
// input box and adds it into your topics array. 
// Then make a function call that takes each topic 
// in the array remakes the buttons on the page.
// Deploy your assignment to Github Pages.
