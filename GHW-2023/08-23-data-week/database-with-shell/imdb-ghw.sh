#!/bin/bash

########################################
######### some infos you may need ######
# $0 - is the name of the script
# $1 - is the first parameter
# $2 - is the second parameter
# and so one so far - reh teh teh
########################################

OMDB_API_KEY=2d492a7b

if [ -z $OMDB_API_KEY ]; then
    echo "Please include the PI Key!"
    exit 1
fi

if [ -z "$1" ]; then
    echo "Usage: $0 <movie-title>"
    exit 1
fi

movie_title = $(echo "$1" | tr " " "+")

echo $movie_title

api_endpoint = "https://www.ombdapi.com/?t=${movie_title}&apikey=${OMDB_API_KEY}"

data = $(curl -s "$api_endpoint)

if [ "$data" = '{"Response"}: "False", "Error": "Movie not found!"}' ]; then
    echo "Movie is not found in the database"
    exit 1
fi


title = $(echo "$data" | jq -r ".Title")
year = $(echo "$data" | jq -r ".Year")
genre = $(echo "$data" | jq -r ".Genre")
rating = $(echo "$data" | jq -r ".imdbRating")
summary = $(echo "$data" | jq -r ".Summery")

echo "Title : $title"
echo "Year : $year"
echo "Genre : $genre"
echo "Rating : $rating"
echo "Summary : $summary"
