/* =========================================
   GAMEDEV HUB - MAIN JAVASCRIPT
========================================= */


/* =========================================
   HOME PAGE
========================================= */

function goToLogin() {
    window.location.href = "login.html";
}

function goToSignup() {
    window.location.href = "signup.html";
}


/* =========================================
   SIGNUP
========================================= */

function signup(event) {

    event.preventDefault();

    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let confirmPassword =
        document.getElementById("confirmPassword").value;

    let message =
        document.getElementById("message");


    /* Check passwords */

    if (password !== confirmPassword) {

        message.innerText =
            "Passwords do not match.";

        message.style.color = "red";

        return;
    }


    /* Get existing users */

    let users =
        JSON.parse(
            localStorage.getItem("users")
        ) || [];


    /* Check if email already exists */

    let existingUser =
        users.find(function(user) {

            return user.email === email;

        });


    if (existingUser) {

        message.innerText =
            "Email already registered.";

        message.style.color = "red";

        return;
    }


    /* Create new user */

    let newUser = {

        name: name,

        email: email,

        password: password

    };


    /* Add user */

    users.push(newUser);


    /* Save users */

    localStorage.setItem(
        "users",
        JSON.stringify(users)
    );


    message.innerText =
        "Account created successfully!";

    message.style.color = "green";


    /* Redirect to login */

    setTimeout(function() {

        window.location.href =
            "login.html";

    }, 1000);
}


/* =========================================
   LOGIN
========================================= */

function login(event) {

    event.preventDefault();


    let email =
        document.getElementById("email").value;

    let password =
        document.getElementById("password").value;

    let role =
        document.getElementById("role").value;

    let message =
        document.getElementById("message");


    /* =====================================
       ADMIN LOGIN
    ===================================== */

    if (
        role === "admin" &&
        email === "admin@gmail.com" &&
        password === "admin123"
    ) {

        localStorage.setItem(
            "loggedIn",
            "true"
        );

        localStorage.setItem(
            "role",
            "admin"
        );

        localStorage.setItem(
            "userEmail",
            email
        );


        /* Redirect to Admin */

        window.location.href =
            "admin.html";

        return;
    }


    /* =====================================
       USER LOGIN
    ===================================== */

    let users =
        JSON.parse(
            localStorage.getItem("users")
        ) || [];


    let user =
        users.find(function(account) {

            return (
                account.email === email &&
                account.password === password
            );

        });


    if (
        role === "user" &&
        user
    ) {

        localStorage.setItem(
            "loggedIn",
            "true"
        );

        localStorage.setItem(
            "role",
            "user"
        );

        localStorage.setItem(
            "userEmail",
            email
        );


        /* Redirect to User Dashboard */

        window.location.href =
            "user.html";

    }

    else {

        message.innerText =
            "Invalid email, password or role.";

        message.style.color =
            "red";

    }
}


/* =========================================
   CHECK ADMIN LOGIN
========================================= */

function checkAdmin() {

    let loggedIn =
        localStorage.getItem("loggedIn");

    let role =
        localStorage.getItem("role");


    if (
        loggedIn !== "true" ||
        role !== "admin"
    ) {

        window.location.href =
            "login.html";

    }
}


/* =========================================
   ADD GAME
========================================= */

function addGame(event) {

    event.preventDefault();


    let gameName =
        document.getElementById("gameName").value;

    let developer =
        document.getElementById("developer").value;

    let genre =
        document.getElementById("genre").value;


    /* Get existing games */

    let games =
        JSON.parse(
            localStorage.getItem("games")
        ) || [];


    /* Create game */

    let game = {

        name: gameName,

        developer: developer,

        genre: genre

    };


    /* Add game */

    games.push(game);


    /* Save games */

    localStorage.setItem(
        "games",
        JSON.stringify(games)
    );


    alert("Game added successfully!");


    /* Clear form */

    document.getElementById(
        "gameName"
    ).value = "";

    document.getElementById(
        "developer"
    ).value = "";

    document.getElementById(
        "genre"
    ).value = "";


    displayGames();

}


/* =========================================
   DISPLAY GAMES - ADMIN
========================================= */

function displayGames() {

    let games =
        JSON.parse(
            localStorage.getItem("games")
        ) || [];


    let gameList =
        document.getElementById("gameList");


    /* If element doesn't exist */

    if (!gameList) {
        return;
    }


    gameList.innerHTML = "";


    if (games.length === 0) {

        gameList.innerHTML =
            "<p>No games available.</p>";

        return;
    }


    games.forEach(function(game, index) {

        gameList.innerHTML += `

            <div class="game-item">

                <h3>
                    ${game.name}
                </h3>

                <p>
                    Developer:
                    ${game.developer}
                </p>

                <p>
                    Genre:
                    ${game.genre}
                </p>

                <button
                    onclick="deleteGame(${index})">
                    Delete
                </button>

            </div>

        `;

    });

}


/* =========================================
   DELETE GAME
========================================= */

function deleteGame(index) {

    let games =
        JSON.parse(
            localStorage.getItem("games")
        ) || [];


    games.splice(index, 1);


    localStorage.setItem(
        "games",
        JSON.stringify(games)
    );


    displayGames();

}


/* =========================================
   DISPLAY USERS - ADMIN
========================================= */

function displayUsers() {

    let users =
        JSON.parse(
            localStorage.getItem("users")
        ) || [];


    let userList =
        document.getElementById("userList");


    if (!userList) {
        return;
    }


    userList.innerHTML = "";


    if (users.length === 0) {

        userList.innerHTML =
            "<p>No registered users.</p>";

        return;
    }


    users.forEach(function(user) {

        userList.innerHTML += `

            <div class="game-item">

                <p>
                    <strong>Name:</strong>
                    ${user.name}
                </p>

                <p>
                    <strong>Email:</strong>
                    ${user.email}
                </p>

            </div>

        `;

    });

}


/* =========================================
   CHECK USER LOGIN
========================================= */

function checkUser() {

    let loggedIn =
        localStorage.getItem("loggedIn");

    let role =
        localStorage.getItem("role");


    if (
        loggedIn !== "true" ||
        role !== "user"
    ) {

        window.location.href =
            "login.html";

    }
}


/* =========================================
   SHOW USER NAME
========================================= */

function showUserName() {

    let email =
        localStorage.getItem("userEmail");


    let users =
        JSON.parse(
            localStorage.getItem("users")
        ) || [];


    let user =
        users.find(function(account) {

            return account.email === email;

        });


    let userName =
        document.getElementById("userName");


    if (user && userName) {

        userName.innerText =
            user.name;

    }

}


/* =========================================
   DISPLAY GAMES - USER
========================================= */

function displayUserGames(gameData) {

    let gamesGrid =
        document.getElementById("gamesGrid");


    if (!gamesGrid) {
        return;
    }


    gamesGrid.innerHTML = "";


    if (gameData.length === 0) {

        gamesGrid.innerHTML = `

            <div class="no-games">

                <h2>
                    No Games Found 🎮
                </h2>

                <p>
                    Ask the admin to add some games.
                </p>

            </div>

        `;

        return;
    }


    gameData.forEach(function(game) {

        gamesGrid.innerHTML += `

            <div class="game-card">

                <div class="game-image">
                    🎮
                </div>

                <div class="game-content">

                    <h2>
                        ${game.name}
                    </h2>

                    <p>
                        <strong>
                            Developer:
                        </strong>

                        ${game.developer}
                    </p>

                    <p>
                        <strong>
                            Genre:
                        </strong>

                        ${game.genre}
                    </p>

                    <button
                        onclick="viewGame('${game.name}')">

                        View Game

                    </button>

                </div>

            </div>

        `;

    });

}


/* =========================================
   LOAD USER GAMES
========================================= */

function loadGames() {

    let games =
        JSON.parse(
            localStorage.getItem("games")
        ) || [];


    displayUserGames(games);

}


/* =========================================
   SEARCH GAMES
========================================= */

function searchGames() {

    let search =
        document.getElementById("search")
        .value
        .toLowerCase();


    let games =
        JSON.parse(
            localStorage.getItem("games")
        ) || [];


    let filteredGames =
        games.filter(function(game) {

            return (

                game.name
                    .toLowerCase()
                    .includes(search)

                ||

                game.genre
                    .toLowerCase()
                    .includes(search)

                ||

                game.developer
                    .toLowerCase()
                    .includes(search)

            );

        });


    displayUserGames(filteredGames);

}


/* =========================================
   VIEW GAME
========================================= */

function viewGame(gameName) {

    alert(
        "You selected: " + gameName
    );

}


/* =========================================
   LOGOUT
========================================= */

function logout() {

    localStorage.removeItem(
        "loggedIn"
    );

    localStorage.removeItem(
        "role"
    );

    localStorage.removeItem(
        "userEmail"
    );


    window.location.href =
        "index.html";

}


/* =========================================
   PAGE INITIALIZATION
========================================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {


        /* ADMIN PAGE */

        if (
            document.getElementById("gameList") &&
            document.getElementById("userList")
        ) {

            checkAdmin();

            displayGames();

            displayUsers();

        }


        /* USER DASHBOARD */

        if (
            document.getElementById("userName")
        ) {

            checkUser();

            showUserName();

        }


        /* GAMES PAGE */

        if (
            document.getElementById("gamesGrid")
        ) {

            checkUser();

            loadGames();

        }

    }
);