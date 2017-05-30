(function() {
    var crystals = document.querySelectorAll('.crystal'),
        goal = document.querySelector('div.goal span'),
        score = document.querySelector('div.your-score span'),
        goalTotal = 0,
        yourScore = 0,
        counter = 0,
        float = setInterval(function() {
            makeFloat();
        }, 250),
        generateGameTotal = function() {
            goalTotal = Math.floor(Math.random() * 100);
            if (goalTotal < 30) {
                generateGameTotal();
            }
        },
        generateCrystalPoints = function() {
            let points = Math.floor(Math.random() * goalTotal / crystals.length);
            if (points === 0) {
                points = Math.ceil(Math.random() * goalTotal / crystals.length);
            }
            return points;
        },
        buildGame = function() {
            float;
            yourScore = 0;
            goal.textContent = goalTotal;
            score.textContent = 0;
        },
        startGame = function() {
            goal.textContent = 0;
            generateGameTotal();
            for (var i = 0; i < crystals.length; i++) {
                crystals[i].children[0].textContent = generateCrystalPoints();
            }
            buildGame();
        },
        addToLosses = function() {
            let losses = document.querySelector('div.losses span');
            losses.innerText = parseInt(losses.innerText) + 1;

            alert("Sorry, you lost.");
            setTimeout(function() {
                startGame();
            }, 500);
        },
        addToWins = function() {
            let wins = document.querySelector('div.wins span');
            wins.innerText = parseInt(wins.innerText) + 1;

            alert("Awesome, you won!");
            setTimeout(function() {
                startGame();
            }, 500);
        },
        updateYourScore = function() {
            score.textContent = yourScore;
            if (yourScore > goalTotal) {
                addToLosses();
            } else if (yourScore == goalTotal) {
                addToWins();
            }
        },
        removeScoreShow = function(c, p) {
            p.classList.toggle('show-points');
            c.classList.toggle('no-click');
        },
        makeFloat = function() {
            crystals[counter].classList.add('float');
            counter++;

            if (counter === crystals.length) {
                clearInterval(float);
            }
        };

    for (var i = 0; i < crystals.length; i++) {
        crystals[i].addEventListener('click', function(e) {
            let crys = this,
                poin = this.children[0];

            yourScore += parseInt(crys.innerText);
            poin.classList.toggle('show-points');
            crys.classList.toggle('no-click');
            setTimeout(function() {
                removeScoreShow(crys, poin);
            }, 400);
            updateYourScore();
        });
    }

    startGame();

})();
