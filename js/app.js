    const cards = document.querySelectorAll('.memory-card');

    let hasFlippedCard = false;
    //this will lock the board until the card are finished 'flipping'
    let lockboard = false;
    let firstCard, secondCard;
    


//Determines if the 
    function flipCard() {
      if (lockboard) return;
      if (this === firstCard) return;
    
      this.classList.add('flip');
    
      if (!hasFlippedCard) {
        // first card click
        hasFlippedCard = true;
        firstCard = this;
        
        //will stop the operation if statement aboce is true
        return;
      }
      // second card click
      secondCard = this;
      checkForMatch();
    }

    //Do the cards match? This will check if the cards match together
    function checkForMatch() {
      let isMatch = firstCard.dataset.image === secondCard.dataset.image;
      //This will determine the action when the card matches
      isMatch ? disableCards() : unflipCards();
    }
    

    //Checks if the cards do not match
    function disableCards() {
      firstCard.removeEventListener('click', flipCard);
      secondCard.removeEventListener('click', flipCard);
    
      resetBoard();
    }
    
    function unflipCards() {
      lockboard = true;
    
      //Timer for the cards to flip
      setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
    
        resetBoard();
      }, 1500);
    }
    


//
    function resetBoard() {
      [hasFlippedCard, lockboard] = [false, false];
      [firstCard, secondCard] = [null, null];
    }
    


    //Shuffle funtion - when the game restarts it shuffle the cards. 
    (function shuffle() {
      cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
      });
    })();
    
    cards.forEach(card => card.addEventListener('click', flipCard));

