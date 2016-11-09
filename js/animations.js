$(document).ready(function() {

	//Variable declarations
	var HT_REG			="2.5em";
	var HT_LRG 			= "5em"; 	//size for expanded text boxes
	var MAX_CHAR_COUNT 	= 140;	//Maximum number of chars in a tweet
	var WARN_CHAR_COUNT = 10;	//the char count at which warning text kicks in
	var USER_IMG		= 'img/alagoon.jpg';	//Src of user's profile pic
	var USER_FULL_NAME	= "Bruce Wayne";
	var USER_NAME 		= "@thebat";


	var $char_count = $("#char-count");

	//STEP 2: When the user clicks on the textarea, the textarea should double in size and the character count and Tweet buttons should be revealed.
	//Expanding and Contracting the tweet text area
	$(".tweet-compose:first").focus(function() {
		$("#tweet-controls").slideDown();
		$(this).animate({height: HT_LRG})
	}); 
	
	// $(".tweet-compose:first").blur(function() {
	// 	$("#tweet-controls").fadeOut('slow');
	// 	$(this).animate({height: HT_REG})
	// }); 


	//STEP 3: As the user types the character count should decrease. Once it hits 10 character or less the count should turn red
	//Counter update
	$(".tweet-compose").on("input",function() {
		var content = $(this).val()
		var counter = MAX_CHAR_COUNT - content.length;
		$char_count.html(counter);

		//Change color of counter as warning
		if(counter <= WARN_CHAR_COUNT) {
			$char_count.css('color','red');
		} else {
			$char_count.css('color','black');
		}

		/*STEP 4: If the user puts in more than 140 characters, 
		the tweet button should be disabled (and re-enabled when there are <= 140 chars)*/
		if(counter < 0) {
			$("#tweet-submit").prop('disabled',true);
		} else {
			$("#tweet-submit").prop('disabled',false);
		}
	});


	/*STEP 5: When the user successfully inputs characters and clicks 
	the “Tweet” button, a new tweet should be created and added to the 
	tweet stream in the main column, using the user’s fake profile image 
	in the top left and username/fullname.*/

	//Submitting a tweet
	$('#tweet-submit').click(function() {
		//Collect content and build tweet
		var tweetContent = $(".tweet-compose").val();
		if (!!tweetContent) {
			var tweetStructure = $(".tweet:first").clone();
			tweetStructure.find(".tweet-text").html(tweetContent);
			tweetStructure.find(".avatar").attr('src',USER_IMG);
			tweetStructure.find(".fullname").html(USER_FULL_NAME);
			tweetStructure.find(".username").html(USER_NAME);
			tweetStructure.find(".tweet-compose").attr('placeholder', "Reply to " + USER_NAME);

			//Prepend tweet
			$('#stream').prepend(tweetStructure);
		} 
		//Clenup/Reset
		$(".tweet-compose").val('');
		$char_count.html(MAX_CHAR_COUNT);
		$("#tweet-controls").slideUp();
		$(".tweet-compose:first").animate({height: HT_REG});
	});

	/*STEP 6: The tweet actions below should only show up when 
	you hover over the tweet. Otherwise, they should be hidden.*/
	$("#stream").on({
	//$(".tweet").on({
		mouseenter:function() {
			$(this).find(".tweet-actions").slideDown();
		},
		mouseleave:function() {
			$(this).find(".tweet-actions").hide();
		}
	}, ".tweet");

	/*STEP 7: The Retweets/timestamp/Reply areas below should 
	also be hidden by default. These should only expand if you 
	click on the tweet. Use a jQuery animation to accomplish 
	the reveal, similar to how it’s done on Twitter.com*/

	$("#stream").on({
		focus:function() {
			var $parent = $(this).parent().parent();
			$parent.find(".stats").slideDown('slow');
			$(this).animate({height: HT_LRG})
		},
		blur:function() {
			var $parent = $(this).parent().parent();
			$parent.find(".stats").slideUp('slow');
			$(this).animate({height: HT_REG})
		}

	}, ".tweet-compose");
							


});