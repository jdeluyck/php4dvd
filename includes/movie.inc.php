<?php
defined('DIRECTACCESS') OR exit('No direct script access allowed');

/**
 * Some important variables for other users to work with in code or templates:
 * - 'movie' is the requested movie
 * - 'photopath' is the path to the movie photo
 * - 'coverpath' is the path to the cover of the movie
 * - 'resultsPerPageDefault' is the default "results per page" amount
 * - 'numberOfCast' is the default amount of "cast" shown
 */
// Datamanagers
require_once($loc."/lib/db/Movies.class.php");
$moviedm = new Movies($settings["db"]);

// Photo and cover path
$photopath = $settings["photo"]["movies"];
$Website->assign("photopath", $photopath);
$coverpath = $settings["photo"]["covers"];
$Website->assign("coverpath", $coverpath);

// Number of results
$numOfResults = $settings["number_of_results"];

// Default results per page amount 
$resultsPerPageDefault = $settings["results_per_page"];
$Website->assign("resultsPerPageDefault", $resultsPerPageDefault);

// Number of pages before and after current
$pagination = $settings["pagination"];

// Default amount of cast shown
$numberOfCast = $settings["number_of_cast"];
$Website->assign("numberOfCast", $numberOfCast);

// Retrieve a movie
if(isset($_GET["id"])) {
	$movie = $moviedm->get($_GET["id"]);
	if($movie && $movie->id > 0) {
		// Show movie
		$Website->assign("movie", $movie);
	}
	else {
		back();
	}
}

// Retrieve a movie from imdb
if(isset($_GET["imdbid"])) {
	$imdbid = $_GET["imdbid"];
		
	// IMDB engine
	require_once($loc."/lib/imdbphp/bootstrap.php");
		
	// Search at IMDB by id
	$imdbmovie = new \Imdb\Title($imdbid);
	$Website->assign("imdbmovie", $imdbmovie);
	if(!isset($movie))
		$movie = new Movie();
	else 
		$movieId = $movie->id;
	$movie->fill($imdbmovie);
	if(isset($movie) && isset($movieId))
		$movie->id = $movieId;
	$Website->assign("movie", $movie);
}