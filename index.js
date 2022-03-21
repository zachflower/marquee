#! /usr/bin/env node
var sys = require('sys')
var exec = require('child_process').execSync;
var fs = require('fs');

// import the typeface character map, based on the TI-84 calculator
var charmap = require('./charmap');

var args = process.argv.slice(2)
var input = args[0];

if ( input == undefined ) {
  console.log("Syntax: marquee <message>");
  return;
}

writeCommits(input);

// write historical git commit messages based on generated message grid
function writeCommits(message) {
  var dates = setupCalendar();
  var grid = parseMessage(message);

  exec("git init");

  for ( var i = 0; i < 7; i++ ) {
    for ( var j = 0; j < grid[i].length; j++ ) {
      if ( grid[i][j] == 1 ) {
        fs.writeFileSync("marquee.log", dates[i][j] + "\n", {'flag':'a'});

        exec("git add marquee.log");
        exec("GIT_AUTHOR_DATE='" + dates[i][j] + "' GIT_COMMITTER_DATE='" + dates[i][j] + "' git commit -m '" + dates[i][j] + "'");
      }
    }
  }
}

// parse out the inputted message as a grid of 5x7 blocks 
function parseMessage(message) {
  var grid = [...Array(7).fill([...Array(52).fill(0)])];

  // split the message into an array of characters
  message = message.split("");

  var pos = 0;

  for ( var l = 0; l < message.length; l++ ) {
    var character = message[l];

    // only write out characters in the charmap
    if ( typeof charmap[character] === 'undefined' ) {
      continue;
    }

    for ( var x = 0; x < 5; x++ ) {
      for ( var y = 0; y < 7; y++ ) {
        if ( typeof grid[y][pos] !== 'undefined' ) {
          grid[y][pos] = charmap[character][y][x];
        }
      }

      pos++;
    }

    // skip a column after every character for readability
    pos++;
  }

  return grid;
}

// setup historical calendar dates for the grid
function setupCalendar() {
  var today = new Date();
  var start = new Date();
  
  start.setYear(today.getFullYear() - 1);

  var dates = [];

  // if the first day on the grid isn't sunday, start with the following sunday
  if ( start.getDay() !== 0 ) {
    start.setDate(start.getDate() - (start.getDay() + 1) + 7);
  }

  for ( var w = 0; w < 52; w++ ) {
    for ( var d = 0; d < 7; d++ ) {
      if ( typeof dates[d] === 'undefined' ) {
        dates[d] = [];
      }

      dates[d][w] = new Date(start.setDate(start.getDate() + 1));
    }
  }

  return dates;
}
