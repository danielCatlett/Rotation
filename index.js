var players; //string array of current players
var waitlist; //string array of waiting players
var roomsize; //ui should default it to 10, but option to change
var peopleRotating; //int that is the number of people rotating

$(document).ready(function ()
{
    players = [];
    waitlist = [];
    rotationTest();
});

//players starts out with all players, including surplus
//this method shuffles them, and puts any surplus players 
//into waitlist
function shuffle()
{
    var placeholder = [];
    while(players.length > 0)
    {
        //get a random index
        //put the player at the random index into placeholder
        //remove that index from players
        var rngesus = Math.floor(Math.random() * players.length);
        placeholder.push(players[rngesus]);
        players.splice(rngesus, 1);
    }

    placeholder.forEach(player => 
    {
        if(players.length < roomsize)
        {
            players.push(player);
        }
        else
        {
            waitlist.push(player);
        }
    });
}

//the core function of the app, rotating players through the two lists
function rotation()
{
    //take the first player out of the game and add them 
    //to the waitlist [peopleRotating] times
    //do the same for going from waitlist to playing
    for(var i = 0; i < peopleRotating; i++)
    {
        movePlayerToWaitlist(0, waitlist.length);
        movePlayerToPlaying(0, players.length);
    }
}

function removePlayer(index, isPlaying)
{
    if(isPlaying)
    {
        players.splice(index, 1);
        movePlayerToPlaying(0, players.length)
    }
    else
    {
        waitlist.splice(index, 1);
    }
}

//move someone around on the player list
function movePlayersPlaying(startLocation, endLocation)
{
    //get the string we are moving
    //remove the string from the array
    //insert it into the proper index
    var playerBeingMoved = players[startLocation];
    players.splice(startLocation, 1);
    players.splice(endLocation, 0, playerBeingMoved);
}

//move someone around on the waitlist
function movePlayersWaiting(startLocation, endLocation)
{
    //same logic as above, but for waitlist
    var playerBeingMoved = waitlist[startLocation];
    waitlist.splice(startLocation, 1);
    waitlist.splice(endLocation, 0, playerBeingMoved);
}

//move someone from the player list to the waitlist
function movePlayerToWaitlist(playersIndex, waitlistIndex)
{
    var playerBeingMoved = players[playersIndex];
    players.splice(playersIndex, 1);
    waitlist.splice(waitlistIndex, 0, playerBeingMoved);
}

//move someone from the waitlist to the player list
function movePlayerToPlaying(waitlistIndex, playersIndex)
{
    var playerBeingMoved = waitlist[waitlistIndex];
    waitlist.splice(waitlistIndex, 1);
    players.splice(playersIndex, 0, playerBeingMoved);
}

//tests
function shuffleTest()
{
    roomsize = 5;
    players.push("Player 1");
    players.push("Player 2");
    players.push("Player 3");
    players.push("Player 4");
    players.push("Player 5");
    players.push("Player 6");
    players.push("Player 7");

    shuffle();
    console.log('players');
    players.forEach(player => 
    {
        console.log(player);
    });
    console.log('waitlist');
    waitlist.forEach(waiting =>
    {
        console.log(waiting);
    });
}

function rotationTest()
{
    players.push("Player 1");
    players.push("Player 2");
    players.push("Player 3");
    players.push("Player 4");
    players.push("Player 5");

    waitlist.push("Player 6");
    waitlist.push("Player 7");
    waitlist.push("Player 8");

    console.log('start players');
    players.forEach(player => 
    {
        console.log(player);
    });
    console.log('start waitlist');
    waitlist.forEach(player => 
    {
        console.log(player);
    });

    peopleRotating = 1;
    rotation();
    console.log('first rotation players');
    players.forEach(player => 
    {
        console.log(player);
    });
    console.log('first rotation waitlist');
    waitlist.forEach(player => 
    {
        console.log(player);
    });

    peopleRotating = 2;
    rotation();
    console.log('second rotation players');
    players.forEach(player => 
    {
        console.log(player);
    });
    console.log('second rotation waitlist');
    waitlist.forEach(player => 
    {
        console.log(player);
    });

    peopleRotating = 3;
    rotation();
    console.log('third rotation players');
    players.forEach(player => 
    {
        console.log(player);
    });
    console.log('third rotation waitlist');
    waitlist.forEach(player => 
    {
        console.log(player);
    });
}

function movePlayersPlayingTest()
{
    players.push("Player 1");
    players.push("Player 2");
    players.push("Player 3");
    players.push("Player 4");
    players.push("Player 5");
    players.push("Player 6");
    players.push("Player 7");

    console.log('start');
    players.forEach(player => 
    {
        console.log(player);
    });

    movePlayersPlaying(0, 3);

    console.log('end');
    players.forEach(player => 
    {
        console.log(player);
    });
}

function doesSpliceWorkOnArrayEnd()
{
    players.push("Player 1");
    players.push("Player 2");
    players.push("Player 3");
    players.push("Player 4");
    players.push("Player 5");
    players.push("Player 6");

    console.log('start');
    players.forEach(player => 
    {
        console.log(player);
    });

    players.splice(players.length, 0, "Player 7");

    console.log('end');
    players.forEach(player => 
    {
        console.log(player);
    });
}