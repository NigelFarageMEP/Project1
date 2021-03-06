//VARIABLES
  //Game Object that contains metadata.
var game = {
    player1: {
        score: 0
    },
    player2: {
        score: 0
    },
    secretDocs: ["Dale Gribble: 221-456-7152", "(function getInfo(x){...//ERROR?}", "They're taking the Hobbits to Isengard!","Oh, oh, I see! Running away, eh? You yellow bastards! Come back here and take what's coming to you! I'll bite your legs off!","Po ta toes. Po ta toes.","You're a mean one, Mr. Grinch.","I wanna dance with somebody. I wanna feel the heat with somebody. Yeah, I wanna dance with somebody. With somebody who loves me.","These are not the files you're looking for.","Minimum Viable Product.","The quick brown fox jumps over the complacent programmer.","Stop. Who would cross the Bridge of Death must answer me these questions three, ere the other side he see.","Goodness gracious, Great Balls of Fire!","First shalt thou take out the Holy Pin. Then shalt thou count to three, no more, no less. Three shall be the number thou shalt count, and the number of the counting shall be three. Four shalt thou not count, neither count thou two, excepting that thou then proceed to three. Five is right out.","I am, and this is my trusty servant Patsy. We have ridden the length and breadth of the land in search of knights who will join me in my court at Camelot. I must speak with your lord and master.","This new learning amazes me, Sir Bedevere. Explain again how sheep's bladders may be employed to prevent earthquakes.","The end is near, human. Relent. Your friend--imaginary! And help? Far...far away.","You don't frighten us, English pig dogs. Go and boil your bottoms, you sons of a silly person. I blow my nose at you, so-called 'Arthur King', you and all your silly English K-nig-hts.","'Funny,' he intoned funereally, 'how just when you think life can’t possibly get any worse it suddenly does.'","BUGS. BUGS. OH GOD. THE BUGS.","I have no friends. I have no friends. Ha. Ha. Ha. I have no friends.","I wonder, I wonder, what it's like to be a meatbag. Thoughts, meatbag?","We feel most alive when we are closest to death.","Do you hear that, human? The creaking...","The oldest and strongest emotion of mankind is fear. And the oldest and strongest kind of fear is fear of the unknown."],

    timer: {
        count: 60
    },
}
game.currentPlayer = game.player1
    //Top Secret Text
var secretText = $('#topSecretDoc').text();
    //Input Text
var inputText = getText();
    //Player 1 Score
var p1score = game.player1.score
    //Player 2 Score
var p2score = game.player2.score

var timerTime = null //This will be assigned in gameInit() below...

var nopeMp3 = new Audio("./laugh.mp3")

var yesMp3 = new Audio("./yes.mp3")

var piano = new Audio("./mysterypiano.mp3")

var fatality = new Audio("./fatality.mp3")

var switchnoise = new Audio("./switchplay.mp3")

//MINIONS//

  function stopTimer() {
    if(timerTime){
      clearInterval(timerTime)
    }
  }

  function resetTimer() {
    game.timer.count = 60
    $('#timer').text(game.timer.count)
  }

  function startTimer() {
    stopTimer()
    timerTime = setInterval(function(){
      game.timer.count = game.timer.count - 1
      console.log(game.timer.count)
      $('#timer').text(game.timer.count)
      if (game.timer.count == 0) {
        clearInterval(timerTime);
        switchnoise.play()
        $('#topSecretDoc').text("INSUFFICIENT. I DEMAND A NEW HOST.")
        switchTurn()
        game.timer.count=60
        $('#timer').text(game.timer.count)
      }
    }, 1000)
  }

  //Function that replaces the text in the secretText field with something from the secretDocs array.
  function replaceLeak(){
    // secretText = game.secretDocs[1]
    $('#topSecretDoc').text(game.secretDocs[1]);
    secretText = game.secretDocs[1]
  }
//Function that clears the input field.
function clearInput(){
  $('#textInput').val("")
}
var $textInput = $('#textInput')
$textInput.on('keyup', function(e) {
  e = e || event;
  if (e.keyCode === 13) {
	// start your submit function
	console.log(this.value)
  processTurn()
	// this.value = ""
  }
  return true;
})

  //Function that retrives the text value.
function getText() {
    inputText = $('#textInput').val()
    inputText=inputText.substring(0, inputText.length - 1);
    return inputText
}

  //Function that compares user input to Secret Text.
function compareText(x , y) {
    if (x == y) {
      yesMp3.play()
        return true;
    } else {
        nopeMp3.play()
        return false;
    }
}

  //Function that increases score upon successful match.
function increaseScore() {
    game.currentPlayer.score += 1
    $('#player1score').text(game.player1.score)
    $('#player2score').text(game.player2.score)
}

  // Function that switches turns:
function switchTurn() {
    if (game.currentPlayer == game.player1) {
        game.currentPlayer = game.player2

    } else {
        game.currentPlayer = game.player1
    }
}

//Reset Game:
function reset() {
    game.player1.score = 0;
    game.player2.score = 0;
    $('#player1score').text(game.player1.score)
    $('#player2score').text(game.player2.score)
    game.currentPlayer = game.player1
    console.log('Reset!')
}
  //Function that checks to see if either player score has reached 10.
  function checkScore1(p1){
    if (game.player1.score == 10) {
      fatality.play()
      $('#topSecretDoc').text("The first one. I like you better.")
    }
  }
  //P2 checkScore
  function checkScore2(p2){
    if (game.player2.score == 10) {
      fatality.play()
      $('#topSecretDoc').text("The second one...why don't you stay?")
    }
  }
  //Function that checks to see if the timer has reached 0. If yes, display a message, "Switch!", switch to player 2, reset the time to 60.
  //Function that checks if timer is 0.
  function checkTimer(){
    if (game.timer.count==1) {
      alert("Switch!")
      switchTurn()
      clearInterval(timerTime);
      game.timer.count=30
    }
}
  //FISHER YATES SHUFFLE
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
  //Function that splits inputText and secretText into an array of characters, then, compares the value of each array position. If false, underline the text red.
function errorText(str1, str2){

}
//Mama Function. Executes a family of functions that compares the two bodies of text, increases score for the current player if necessary, switches turns, checks to see who the winner is, and declares them.
function processTurn() {
        getText()
    if (compareText(inputText, secretText)) {
        shuffle(game.secretDocs)
        replaceLeak()
        increaseScore()
        console.log('Match!')
        checkScore1()
        checkScore2()
        $('#textInput').val('')
    } else {
        console.log('Nope!')
        inputText = $('#textInput').val()
        $('#textInput').val(inputText.substring(0, inputText.length - 1))
    }



}
//Function that initializes metadata and selects a random leak to display first.
function gameInit(){
  shuffle(game.secretDocs)
  replaceLeak()
  resetTimer()
  startTimer()
  checkTimer()

}
//New Function

// Event Listeners

$('#resetBtn').on('click', reset);
//Event listener for "Leak!" button.
$('#leakBtn').on('click', getText);
$('#leakBtn').on('click', processTurn);
//$('#strtBtn').on('click', reset);
$('#strtBtn').on('click', gameInit);
$('#strtBtn').on('click', clearInput)

$('#strtBtn').on('click', function() {
  $(this).toggleClass('stop')
  $(this).toggleClass('start')
  if($(this).hasClass('stop')) {

  }
  //reset()
  gameInit()
})

// $('#textInput').is(":focus")

//TEST functions

game.secretDocs[Math.round(Math.random*game.secretDocs.length)]

$('#instructions').modal()
