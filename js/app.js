/*
 * Create a list that holds all of your cards
 */

let cards = ["fa fa-diamond", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-bolt",
        "fa fa-cube", "fa fa-anchor", "fa fa-leaf", "fa fa-bicycle", "fa fa-diamond", "fa fa-bomb",
        "fa fa-leaf", "fa fa-bomb", "fa fa-bolt", "fa fa-bicycle", "fa fa-paper-plane-o", "fa fa-cube"];
let liCards = document.querySelectorAll('.deck li');
let modal = document.querySelector('.modal');
let closeBtn = document.querySelector('.closeBtn');

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

const card = document.querySelectorAll('.card');
const openList=[];
const matcList=[];

//* set up the event listener for a card. If a card is clicked:
card.forEach(function(item){
	item.addEventListener('click', function(evt){
		display();
		openListFunction(evt);
		counter();
		
	})
});

//+ increment the move counter and display it on the page
let move = 0;
function counter(){
	move+=1;
	document.querySelector('.moves').innerHTML=move;
	if (move ===1){
		timerInterval = setInterval(function () {
                    startTimer();
                }, 1000);
	}
}
//- display the card's symbol (put this functionality in another function that you call from this one)
function display(e){
	event.target.classList.add('show')
	
}

// *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)

function openListFunction(e){
	openList.push(e.target.firstElementChild);
	matchOne();
	differntOne(openList);
}

//if the cards do match, lock the cards in the open position
function matchOne(){
//	console.log(openList);
	if(openList.length === 2 && openList[0].className===openList[1].className){
		openList.forEach(function(item){
			item.parentElement.classList.add('match');
			matcList.push(item);
			if(matcList.length===16){
			setTimeout(function(){
				stopTimer();
				move=0;
				showModal();	
				document.querySelector('.moves').innerHTML=move;
				matcList.forEach(function(item){
					item.parentElement.className='card';
				})
			},0);
}
			
		});
		openList.length=0;
	}
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
}

let restart = document.querySelector('.restart');
restart.addEventListener('click',function(){
	location.reload();
});


let timerCounter=0;
let timerMin=0;
let timerInterval;

  function startTimer() {
        let sec;
        timerCounter++
        sec = timerCounter;
        if (timerCounter === 60) {
            timerMin++;
            sec = 0;
            timerCounter = 0;
        }
        document.querySelector('.timer').innerHTML = addZeroToTimer(timerMin) + ':' + addZeroToTimer(sec);
    }
    
    function addZeroToTimer(number) {
        if (number < 10) {
            return '0' + number;
        } else {
            return number;
        }
    
    }
//	let fo = document.querySelector('.onee');
//	fo.addEventListener('click', stopTimer);
	 function stopTimer() {
        clearInterval(timerInterval);
        timerCounter = 0;
        timerMin = 0;
        document.querySelector('.timer').innerHTML = '00:00';
    }
function showModal (){
	modal.style.display='block';
}
closeBtn.addEventListener('click', hideModal)
function hideModal (){
	modal.style.display='none';
}
/* 

 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
