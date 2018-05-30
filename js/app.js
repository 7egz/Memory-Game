/*
 * Create a list that holds all of your cards
 */
let collectCards = ["fa fa-diamond", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-bolt",
        "fa fa-cube",  "fa fa-leaf", "fa fa-bicycle", "fa fa-bomb"];
let cards = collectCards.concat(collectCards);
/*
 * Define all variables
 */
let liCards = document.querySelectorAll('.deck li');
const card = document.querySelectorAll('.card');
const openList=[];
const matcList=[];
let moveCount =document.querySelector('.moves');
let move = 0;
let stars= document.querySelector('.stars');
let timerCounter=0;
let timerMin=0;
let timerInterval;
let sec;
let clock = document.querySelector('.timer');
let newClock;
let modal = document.querySelector('.modal');
let modaContent = document.querySelector('.modalContent');
let closeBtn = document.querySelector('.closeBtn');
let restart = document.querySelector('.restart');
const restartGame = document.querySelector('.restartGame');
let defineRate;

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
function addRandomSymbolToCard(liCards) {
        let shuffleListOfCards = shuffle(cards);
        for (i = 0; i < liCards.length; i++) {
            liCards[i].firstElementChild.className = shuffleListOfCards[i];
        }
    }
addRandomSymbolToCard(liCards);

//* set up the event listener for a card. If a card is clicked:
card.forEach(function(item){
	item.addEventListener('click', function(evt){
		display();
		openListFunction(evt);
	},true)
});

//- display the card's symbol (put this functionality in another function that you call from this one)
function display(e){
	event.target.classList.add('show')
}

// *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
function openListFunction(e){
	const found = openList.find(item => item  == e.target.firstElementChild);
	if(!found){
		openList.push(e.target.firstElementChild);
		matchOne();
		differntOne(openList);
	   }
}

//if the cards do match, lock the cards in the open position
function matchOne(){
	if(openList.length === 2 && openList[0].className===openList[1].className){
		openList.forEach(function(item){
			item.parentElement.classList.add('match');
			matcList.push(item);
			if(matcList.length===16){
			setTimeout(endGame,0);
			matcList.length=0;
			}
			});
		openList.length=0;
	}
}

//function to end the game
function endGame(){
	stopTimer();
	showModal();
}
// if the cards do not match, remove the cards from the list and hide the card's symbol
function differntOne(){
	if(openList.length === 2 && openList[0].className!==openList[1].className){
		openList.forEach(function(item){
			setTimeout(function(){
			item.parentElement.classList.remove('show');
		},1000);
		});
		openList.length= 0 ;
		
	}
	else if(openList.length===1){
		counter();
	}
}

//+ increment the move counter and display it on the page
function counter(){
	move+=1;
	moveCount.innerHTML=move;
	if (move ===1){
		timerInterval = setInterval(function () {
                    startTimer();
                }, 1000);
	}
	updateStars(move)
}
//change the color of stars with increasing of moves
function updateStars(move){
	let rate;
	switch(move){
	case 10:
	rate= "your rate equal 3 first level";
	defineRate=rate;
	stars.lastElementChild.style.color = 'gray';
	break;
			
	case 20:
	rate= "your rate equal 2 second level";
	defineRate=rate;
	stars.children[1].style.color = 'gray';
	break;
			
	case 30:
	rate= "your rate equal 1 third level";
	defineRate=rate;
	break;
	}
}

//when click on restart button
restart.addEventListener('click',function(){
	let c = stars.children;
	for(var i=0;i<c.length;i++){
		c[i].style.color='yellow';
	}
	stopTimer();
	addRandomSymbolToCard(liCards);
	card.forEach(function(item){
		item.className='card';
	});
	move=0;
	moveCount.innerHTML=move;
	document.querySelector('.timer').innerHTML = '00:00';
});
//start the time counter
  function startTimer() {
        
        timerCounter++
        sec = timerCounter;
        if (timerCounter === 60) {
            timerMin++;
            sec = 0;
            timerCounter = 0;
        }
        clock.innerHTML = addZeroToTimer(timerMin) + ':' + addZeroToTimer(sec);
	  newClock = clock.innerHTML;
    }
    function addZeroToTimer(number) {
        if (number < 10) {
            return '0' + number;
        } else {
            return number;
        }
    
    }
//stop the time counter
	 function stopTimer() {
        clearInterval(timerInterval);
        timerCounter = 0;
        timerMin = 0;
    }

//pop with the result
function showModal (){
	modal.style.display='block';
	moveCount = document.querySelector('.moves');
	modaContent.children[1].childNodes[1].innerHTML=`Awesome you have done it in
	total moves= ${moveCount.innerHTML},
	total time= ${newClock} and 
	${defineRate},
	click the restart button to play again`;
}

closeBtn.addEventListener('click', hideModal)
function hideModal (){
	modal.style.display='none';
}
//restart button in popup to restart new game
restartGame.addEventListener('click', function(){
				move=0;	
				let c = stars.children;
				for(var i=0;i<c.length;i++){
				c[i].style.color='yellow';
				};
				document.querySelector('.timer').innerHTML = '00:00';
				document.querySelector('.moves').innerHTML=move;
				addRandomSymbolToCard(liCards);
				card.forEach(function(item){
				item.className='card';
				});
				hideModal();
	
},true);