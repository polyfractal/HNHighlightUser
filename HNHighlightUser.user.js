// ==UserScript==
// @name           HNHighlightUser
// @description    This script adds a "highlight" link next to posts on HN, so you can easily highlight authors in a single thread
// @include        http://news.ycombinator.com/*
// @include        https://news.ycombinator.com/*
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.7.0/jquery.min.js
// ==/UserScript==


//the style that is applied to highlighted posts.
var highlightClass = "<style>.highlight {background-color:#EEEEEE;}</style>";


if (window.location.pathname === "/item") {

	$("body").prepend(highlightClass);
	
	$("span.comhead").each(function() {
		var commentDetails = $(this).text().match(/([A-Za-z0-9_]+) ([0-9]{0,3} (?:minutes?|hours?|days?|years?) ago)/);
		
		//The comhead acts slightly differently depending on whether its "Ask HN" type post or a link
		//Links do not have comhead details so we have to check for null
		if(commentDetails !== null) {
			var commentAuthor = commentDetails[1];
			
			//very simple setup here.  Each highlight link's id is the author
			$(this).append(" | <a href='#' class='highlightLink' id='" + commentAuthor + "'>highlight</a>");
			
			//and each comment table row gets a class name that corresponds to the author
			$(this).parents().eq(1).addClass(commentAuthor);
		}
	});

    
	
	//when we want to highlight an author, just find all the classes that match the author name and toggle the class
	$(".highlightLink").click(function(e){
		$("." + this.id).toggleClass("highlight");
		e.preventDefault();
    });


}




