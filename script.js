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


    let name =
        document.getElementById("name").value.trim();

    let email =
        document.getElementById("email").value.trim();

    let password =
        document.getElementById("password").value;

    let confirmPassword =
        document.getElementById("confirmPassword").value;

    let message =
        document.getElementById("message");


    if (password !== confirmPassword) {

        message.innerText =
            "Passwords do not match.";

        message.style.color =
            "red";

        return;
    }


    let users =
        JSON.parse(
            localStorage.getItem("users")
        ) || [];


    let existingUser =
        users.find(function(user) {

            return user.email === email;

        });


    if (existingUser) {

        message.innerText =
            "Email already registered.";

        message.style.color =
            "red";

        return;
    }


    let newUser = {

        name: name,

        email: email,

        password: password

    };


    users.push(newUser);


    localStorage.setItem(
        "users",
        JSON.stringify(users)
    );


    message.innerText =
        "Account created successfully!";

    message.style.color =
        "green";


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


    /* ADMIN LOGIN */

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


        window.location.href =
            "admin.html";

        return;
    }



    /* USER LOGIN */

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
   CHECK ADMIN
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
        document.getElementById("gameName")
        .value
        .trim();

    let developer =
        document.getElementById("developer")
        .value
        .trim();

    let genre =
        document.getElementById("genre")
        .value
        .trim();


    let games =
        JSON.parse(
            localStorage.getItem("games")
        ) || [];


    let game = {

        name: gameName,

        developer: developer,

        genre: genre

    };


    games.push(game);


    localStorage.setItem(
        "games",
        JSON.stringify(games)
    );


    alert(
        "🎮 Game added successfully!"
    );


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

    updateAdminStats();

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
        document.getElementById(
            "gameList"
        );


    if (!gameList) {

        return;

    }


    gameList.innerHTML = "";


    if (games.length === 0) {

        gameList.innerHTML = `

            <div class="empty-admin">

                <div>
                    🎮
                </div>

                <p>
                    No games available.
                </p>

            </div>

        `;

        return;
    }


    games.forEach(
        function(game, index) {

            gameList.innerHTML += `

                <div class="game-item">

                    <div class="item-icon">
                        🎮
                    </div>

                    <div class="item-info">

                        <h3>
                            ${game.name}
                        </h3>

                        <p>
                            ${game.developer}
                        </p>

                        <span>
                            ${game.genre}
                        </span>

                    </div>

                    <button
                        class="delete-button"
                        onclick="deleteGame(${index})">

                        🗑️

                    </button>

                </div>

            `;

        }
    );

}



/* =========================================
   DELETE GAME
========================================= */

function deleteGame(index) {

    let games =
        JSON.parse(
            localStorage.getItem("games")
        ) || [];


    if (
        !confirm(
            "Delete this game?"
        )
    ) {

        return;

    }


    games.splice(
        index,
        1
    );


    localStorage.setItem(
        "games",
        JSON.stringify(games)
    );


    displayGames();

    updateAdminStats();

}



/* =========================================
   DISPLAY USERS
========================================= */

function displayUsers() {

    let users =
        JSON.parse(
            localStorage.getItem("users")
        ) || [];


    let userList =
        document.getElementById(
            "userList"
        );


    if (!userList) {

        return;

    }


    userList.innerHTML = "";


    if (users.length === 0) {

        userList.innerHTML = `

            <div class="empty-admin">

                <div>
                    👥
                </div>

                <p>
                    No registered users.
                </p>

            </div>

        `;

        return;
    }


    users.forEach(
        function(user) {

            userList.innerHTML += `

                <div class="user-item">

                    <div class="user-avatar">
                        ${user.name
                            .charAt(0)
                            .toUpperCase()}
                    </div>

                    <div>

                        <strong>
                            ${user.name}
                        </strong>

                        <span>
                            ${user.email}
                        </span>

                    </div>

                </div>

            `;

        }
    );

}



/* =========================================
   CREATE TOURNAMENT
========================================= */

function createMatch(event) {

    event.preventDefault();


    let matchName =
        document.getElementById(
            "matchName"
        ).value.trim();


    let matchGame =
        document.getElementById(
            "matchGame"
        ).value.trim();


    let prizePool =
        Number(
            document.getElementById(
                "prizePool"
            ).value
        );


    let venue =
        document.getElementById(
            "venue"
        ).value.trim();


    let matchDate =
        document.getElementById(
            "matchDate"
        ).value;


    let matchTime =
        document.getElementById(
            "matchTime"
        ).value;


    let maxPlayers =
        Number(
            document.getElementById(
                "maxPlayers"
            ).value
        );


    let entryFee =
        Number(
            document.getElementById(
                "entryFee"
            ).value
        );


    let matches =
        JSON.parse(
            localStorage.getItem("matches")
        ) || [];


    let match = {

        id: Date.now(),

        name: matchName,

        game: matchGame,

        prizePool: prizePool,

        venue: venue,

        date: matchDate,

        time: matchTime,

        maxPlayers: maxPlayers,

        entryFee: entryFee,

        joinedPlayers: 0,

        joinedUsers: []

    };


    matches.push(match);


    localStorage.setItem(
        "matches",
        JSON.stringify(matches)
    );


    alert(
        "🏆 Tournament created successfully!"
    );


    document.getElementById(
        "matchName"
    ).value = "";

    document.getElementById(
        "matchGame"
    ).value = "";

    document.getElementById(
        "prizePool"
    ).value = "";

    document.getElementById(
        "venue"
    ).value = "";

    document.getElementById(
        "matchDate"
    ).value = "";

    document.getElementById(
        "matchTime"
    ).value = "";

    document.getElementById(
        "maxPlayers"
    ).value = "";

    document.getElementById(
        "entryFee"
    ).value = "";


    displayMatches();

    updateAdminStats();

}



/* =========================================
   DISPLAY MATCHES - ADMIN
========================================= */

function displayMatches() {

    let matches =
        JSON.parse(
            localStorage.getItem("matches")
        ) || [];


    let matchList =
        document.getElementById(
            "matchList"
        );


    if (!matchList) {

        return;

    }


    matchList.innerHTML = "";


    if (matches.length === 0) {

        matchList.innerHTML = `

            <div class="empty-admin">

                <div>
                    🏆
                </div>

                <p>
                    No tournaments created.
                </p>

            </div>

        `;

        return;
    }


    matches.forEach(
        function(match) {

            let joined =
                Number(
                    match.joinedPlayers
                ) || 0;


            matchList.innerHTML += `

                <div class="admin-match-item">

                    <div class="admin-match-top">

                        <div class="item-icon">
                            🏆
                        </div>

                        <div>

                            <h3>
                                ${match.name}
                            </h3>

                            <span>
                                ${match.game}
                            </span>

                        </div>

                    </div>


                    <div class="admin-match-details">

                        <p>
                            💰 ₹${formatNumber(match.prizePool)}
                        </p>

                        <p>
                            📍 ${match.venue}
                        </p>

                        <p>
                            📅 ${formatDate(match.date)}
                        </p>

                        <p>
                            👥 ${joined}/${match.maxPlayers}
                        </p>

                    </div>


                    <button
                        class="delete-button full-delete"
                        onclick="deleteMatch(${match.id})">

                        🗑️ Delete Tournament

                    </button>

                </div>

            `;

        }
    );

}



/* =========================================
   DELETE MATCH
========================================= */

function deleteMatch(id) {

    if (
        !confirm(
            "Delete this tournament?"
        )
    ) {

        return;

    }


    let matches =
        JSON.parse(
            localStorage.getItem("matches")
        ) || [];


    matches =
        matches.filter(
            function(match) {

                return match.id !== id;

            }
        );


    localStorage.setItem(
        "matches",
        JSON.stringify(matches)
    );


    displayMatches();

    updateAdminStats();

}



/* =========================================
   USER LOGIN CHECK
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
        localStorage.getItem(
            "userEmail"
        );


    let users =
        JSON.parse(
            localStorage.getItem("users")
        ) || [];


    let user =
        users.find(
            function(account) {

                return (
                    account.email === email
                );

            }
        );


    let userName =
        document.getElementById(
            "userName"
        );


    if (
        user &&
        userName
    ) {

        userName.innerText =
            user.name;

    }

}



/* =========================================
   DISPLAY USER GAMES
========================================= */

function displayUserGames(
    gameData
) {

    let gamesGrid =
        document.getElementById(
            "gamesGrid"
        );


    if (!gamesGrid) {

        return;

    }


    gamesGrid.innerHTML = "";


    if (
        gameData.length === 0
    ) {

        gamesGrid.innerHTML = `

            <div class="no-games">

                <div class="no-game-icon">
                    🎮
                </div>

                <h2>
                    No Games Found
                </h2>

                <p>
                    Ask the admin to add some games.
                </p>

            </div>

        `;

        return;
    }


    gameData.forEach(
        function(game) {

            gamesGrid.innerHTML += `

                <div class="game-card">

                    <div class="game-image">

                        <div class="game-glow"></div>

                        <span>
                            🎮
                        </span>

                    </div>


                    <div class="game-content">

                        <div class="game-tag">
                            ${game.genre}
                        </div>

                        <h2>
                            ${game.name}
                        </h2>

                        <p>

                            <strong>
                                Developer
                            </strong>

                            ${game.developer}

                        </p>


                        <button
                            onclick="viewGame('${escapeQuotes(game.name)}')">

                            ⚡ View Game

                        </button>

                    </div>

                </div>

            `;

        }
    );

}



/* =========================================
   DISPLAY USER MATCHES
========================================= */

function displayUserMatches(
    matchData
) {

    let matchesGrid =
        document.getElementById(
            "matchesGrid"
        );


    if (!matchesGrid) {

        return;

    }


    let matches =
        matchData ||
        JSON.parse(
            localStorage.getItem(
                "matches"
            )
        ) || [];


    matchesGrid.innerHTML = "";


    if (
        matches.length === 0
    ) {

        matchesGrid.innerHTML = `

            <div class="no-matches">

                <div class="no-match-icon">
                    🏆
                </div>

                <h2>
                    No Live Tournaments
                </h2>

                <p>
                    New tournaments will appear here when the admin creates them.
                </p>

            </div>

        `;

        return;

    }


    matches.forEach(
        function(match) {

            let joined =
                Number(
                    match.joinedPlayers
                ) || 0;


            let maximum =
                Number(
                    match.maxPlayers
                ) || 1;


            let remaining =
                Math.max(
                    maximum - joined,
                    0
                );


            let progress =
                (
                    joined /
                    maximum
                ) * 100;


            if (
                progress > 100
            ) {

                progress = 100;

            }


            let isFull =
                joined >= maximum;


            let currentUser =
                localStorage.getItem(
                    "userEmail"
                );


            let joinedUsers =
                Array.isArray(
                    match.joinedUsers
                )
                    ? match.joinedUsers
                    : [];


            let alreadyJoined =
                joinedUsers.includes(
                    currentUser
                );


            let buttonText;


            if (isFull) {

                buttonText =
                    "🔒 Tournament Full";

            }

            else if (
                alreadyJoined
            ) {

                buttonText =
                    "✅ Already Joined";

            }

            else {

                buttonText =
                    "⚡ Join Tournament";

            }


            matchesGrid.innerHTML += `

                <div class="match-card">


                    <!-- BANNER -->

                    <div class="match-banner">


                        <div class="match-banner-pattern">
                        </div>


                        <div class="match-trophy">
                            🏆
                        </div>


                        <div class="match-banner-text">

                            <span>
                                ${match.game}
                            </span>

                            <h2>
                                ${match.name}
                            </h2>

                        </div>


                        <div class="prize-box">

                            <small>
                                PRIZE POOL
                            </small>

                            <strong>
                                ₹${formatNumber(
                                    match.prizePool
                                )}
                            </strong>

                        </div>


                    </div>



                    <!-- CONTENT -->

                    <div class="match-content">


                        <div class="match-info-grid">


                            <div class="match-info">

                                <span class="info-icon">
                                    📍
                                </span>

                                <div>

                                    <small>
                                        VENUE
                                    </small>

                                    <strong>
                                        ${match.venue}
                                    </strong>

                                </div>

                            </div>



                            <div class="match-info">

                                <span class="info-icon">
                                    📅
                                </span>

                                <div>

                                    <small>
                                        DATE
                                    </small>

                                    <strong>
                                        ${formatDate(
                                            match.date
                                        )}
                                    </strong>

                                </div>

                            </div>



                            <div class="match-info">

                                <span class="info-icon">
                                    ⏰
                                </span>

                                <div>

                                    <small>
                                        START TIME
                                    </small>

                                    <strong>
                                        ${formatTime(
                                            match.time
                                        )}
                                    </strong>

                                </div>

                            </div>



                            <div class="match-info">

                                <span class="info-icon">
                                    🎟️
                                </span>

                                <div>

                                    <small>
                                        ENTRY FEE
                                    </small>

                                    <strong>
                                        ₹${formatNumber(
                                            match.entryFee
                                        )}
                                    </strong>

                                </div>

                            </div>


                        </div>



                        <!-- PLAYERS -->

                        <div class="players-section">


                            <div class="players-header">

                                <span>
                                    👥 Player Slots
                                </span>

                                <strong>
                                    ${joined}/${maximum}
                                </strong>

                            </div>


                            <div class="progress-bar">

                                <div
                                    class="progress-fill"
                                    style="width:${progress}%">
                                </div>

                            </div>


                            <small>

                                ${
                                    isFull
                                        ? "No slots remaining"
                                        : remaining +
                                          " spots remaining"
                                }

                            </small>


                        </div>



                        <!-- JOIN BUTTON -->

                        <button
                            class="join-match-button
                            ${alreadyJoined
                                ? "joined-button"
                                : ""}"
                            onclick="joinMatch(${match.id})"
                            ${isFull || alreadyJoined
                                ? "disabled"
                                : ""}>

                            ${buttonText}

                        </button>


                    </div>

                </div>

            `;

        }
    );

}



/* =========================================
   JOIN TOURNAMENT
========================================= */

function joinMatch(id) {

    let email =
        localStorage.getItem(
            "userEmail"
        );


    if (!email) {

        alert(
            "Please login first."
        );

        return;

    }


    let matches =
        JSON.parse(
            localStorage.getItem(
                "matches"
            )
        ) || [];


    let match =
        matches.find(
            function(item) {

                return item.id === id;

            }
        );


    if (!match) {

        alert(
            "Tournament not found."
        );

        return;

    }


    if (
        !Array.isArray(
            match.joinedUsers
        )
    ) {

        match.joinedUsers = [];

    }


    if (
        match.joinedUsers.includes(
            email
        )
    ) {

        alert(
            "You have already joined this tournament."
        );

        return;

    }


    if (
        match.joinedPlayers >=
        match.maxPlayers
    ) {

        alert(
            "This tournament is full."
        );

        return;

    }


    match.joinedUsers.push(
        email
    );


    match.joinedPlayers =
        match.joinedUsers.length;


    localStorage.setItem(
        "matches",
        JSON.stringify(matches)
    );


    alert(
        "⚡ Successfully joined the tournament!"
    );


    displayUserMatches();

}



/* =========================================
   LOAD GAMES + MATCHES
========================================= */

function loadGames() {

    let games =
        JSON.parse(
            localStorage.getItem(
                "games"
            )
        ) || [];


    displayUserGames(
        games
    );


    /* IMPORTANT */

    displayUserMatches();

}



/* =========================================
   SEARCH
========================================= */

function searchGames() {

    let searchInput =
        document.getElementById(
            "search"
        );


    if (!searchInput) {

        return;

    }


    let search =
        searchInput.value
        .toLowerCase()
        .trim();


    /* ================================
       SEARCH GAMES
    ================================= */

    let games =
        JSON.parse(
            localStorage.getItem(
                "games"
            )
        ) || [];


    let filteredGames =
        games.filter(
            function(game) {

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

            }
        );


    displayUserGames(
        filteredGames
    );



    /* ================================
       SEARCH MATCHES
    ================================= */

    let matches =
        JSON.parse(
            localStorage.getItem(
                "matches"
            )
        ) || [];


    let filteredMatches =
        matches.filter(
            function(match) {

                return (

                    match.name
                        .toLowerCase()
                        .includes(search)

                    ||

                    match.game
                        .toLowerCase()
                        .includes(search)

                    ||

                    match.venue
                        .toLowerCase()
                        .includes(search)

                );

            }
        );


    displayUserMatches(
        filteredMatches
    );

}



/* =========================================
   VIEW GAME
========================================= */

function viewGame(
    gameName
) {

    alert(
        "🎮 You selected: " +
        gameName
    );

}



/* =========================================
   FORMAT NUMBER
========================================= */

function formatNumber(
    number
) {

    return Number(
        number || 0
    ).toLocaleString(
        "en-IN"
    );

}



/* =========================================
   FORMAT DATE
========================================= */

function formatDate(
    dateString
) {

    if (!dateString) {

        return "Not specified";

    }


    let date =
        new Date(
            dateString +
            "T00:00:00"
        );


    return date.toLocaleDateString(
        "en-IN",
        {
            day: "2-digit",
            month: "short",
            year: "numeric"
        }
    );

}



/* =========================================
   FORMAT TIME
========================================= */

function formatTime(
    timeString
) {

    if (!timeString) {

        return "Not specified";

    }


    let parts =
        timeString.split(":");


    let hour =
        parseInt(
            parts[0]
        );


    let minute =
        parts[1];


    let period =
        hour >= 12
            ? "PM"
            : "AM";


    hour =
        hour % 12 || 12;


    return (
        hour +
        ":" +
        minute +
        " " +
        period
    );

}



/* =========================================
   ADMIN STATISTICS
========================================= */

function updateAdminStats() {

    let games =
        JSON.parse(
            localStorage.getItem(
                "games"
            )
        ) || [];


    let matches =
        JSON.parse(
            localStorage.getItem(
                "matches"
            )
        ) || [];


    let users =
        JSON.parse(
            localStorage.getItem(
                "users"
            )
        ) || [];


    let gameCount =
        document.getElementById(
            "gameCount"
        );


    let matchCount =
        document.getElementById(
            "matchCount"
        );


    let userCount =
        document.getElementById(
            "userCount"
        );


    if (gameCount) {

        gameCount.innerText =
            games.length;

    }


    if (matchCount) {

        matchCount.innerText =
            matches.length;

    }


    if (userCount) {

        userCount.innerText =
            users.length;

    }

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
   ESCAPE QUOTES
========================================= */

function escapeQuotes(
    value
) {

    return String(value)
        .replace(
            /'/g,
            "\\'"
        );

}



/* =========================================
   PAGE INITIALIZATION
========================================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {


        /* ADMIN */

        if (
            document.getElementById(
                "gameList"
            ) &&
            document.getElementById(
                "userList"
            )
        ) {

            checkAdmin();

            displayGames();

            displayMatches();

            displayUsers();

            updateAdminStats();

        }



        /* USER DASHBOARD */

        if (
            document.getElementById(
                "userName"
            )
        ) {

            checkUser();

            showUserName();

        }



        /* GAMES PAGE */

        if (
            document.getElementById(
                "gamesGrid"
            )
        ) {

            checkUser();

            loadGames();

        }

    }
);