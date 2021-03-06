/**
 * All JavaScript functionality is placed here.
 */

// Only 1 search at the time
var ajaxSearchLock = false;
var loadingTimer;

/**
 * Search movies
 */
function search() {
	if(!ajaxSearchLock) {
		ajaxSearchLock = true;
		
		// Make url
		var location = "./#!/";
		var url = "./?go=movies";
		
		// Query
		var q = $("#q").val();
		if(q) {
			url += "&q=" + encodeURIComponent(q);
			location += "search/" + encodeURIComponent(q) + "/";
			Cookies.set("search", q, { expires: 14 });
		} else {
			Cookies.remove("search");
		}
		
		// Category
		var c = $("#category").val();
		if(c) {
			url += "&c=" + encodeURIComponent(c);
			location += "category/" + encodeURIComponent(c) + "/";
			Cookies.set("category", c, { expires: 14 });
		} else {
			Cookies.remove("category");
		}
		
		// Format
		var f = $("#format").val();
		if(f) {
			url += "&f=" + encodeURIComponent(f);
			location += "format/" + encodeURIComponent(f) + "/";
			Cookies.set("format", f, { expires: 14 });
		} else {
			Cookies.remove("format");
		}
		
		// Sort
		var s = $("#sort").val();
		if(s) {
			url += "&s=" + encodeURIComponent(s);
			location += "sort/" + encodeURIComponent(s) + "/";
			Cookies.set("sort", s, { expires: 14 });
		} else {
			Cookies.remove("sort");
		}
		
		// Format
		var f = $("#format").val();
		if(f) {
			url += "&f=" + encodeURIComponent(f);
			location += "format/" + encodeURIComponent(f) + "/";
			Cookies.set("format", f, { expires: 14 });
		} else {
			Cookies.remove("format");
		}
		
		// Layout
		var l = $("#l").val();
		if(l) {
			url += "&l=" + encodeURIComponent(l);
			Cookies.set("layout", l, { expires: 14 });
		} else {
			Cookies.set("layout", 0);
		}
		
		// Page
		var p = $("#p").val();
		if(p && p > 0) {
			url += "&p=" + encodeURIComponent(p);
			location += "page/" + encodeURIComponent(p) + "/";
			Cookies.set("page", p, { expires: 14 });
		} else {
			Cookies.set("page", 0);
		}
		
		// Number of results
		var n = $("#n").val();
		if(n && n > 0) {
			url += "&n=" + encodeURIComponent(n);
			location += "results/" + encodeURIComponent(n) + "/";
			Cookies.set("results", n, { expires: 14 });
		} else {
			Cookies.remove("results");
		}
		
		// Start loading
		$("#results").hide();
		$("#loading").delay(600).show(0);
		
		// Make request
		$.ajax({
			url: url,
			dataType: "html",
			success: function(data) {
				$("#results").html(data).fadeIn(600);
				$("#loading").hide(0);
			},
			complete: function() {
				// Save search parameters to url
				window.location.href = location;
				
				// Release lock
				ajaxSearchLock = false;
			}
		});
	}
}

function setPage(p) {
	$("#p").val(p);
	search();
}

$(document).ready(function() {
	$('i','#layout').on('click', function() {
		var $this = $(this);
		$this.addClass('active').siblings().removeClass('active');
		document.getElementById("l").value = $this.data('value');
		search();
	});
});


/**
 * Get the parameters from the query string that follow the '#!/' part of the url.
 */
function getQueryStringParameters() {
	// Get query string from url
	var queryString = new RegExp("#!/(.*?)/?$").exec(window.location.href);
	
	// Split parameters
	if(queryString && queryString.length > 0) {
		var parameters = new Array();
		var parts = queryString[1].split("/");
		for(var i = 0; i < parts.length; i++) {
			parameters[decodeURIComponent(parts[i])] = decodeURIComponent(parts[++i]);
		}
		return parameters;
	}
	else {
		return false;
	}
}
