// // made async for promise function
// (async () => {
//     const gameBoardElement = document.getElementById("gameBoard")! as HTMLDivElement;

//     fetch("/games/setGameboard", {
//         method: "GET",
//         headers: {
//             "Content-Type": "application/json",
//         },
//     }).then(response => {
//         if(response.status !== 200) {
//             console.error("Error: ", response);
//         }
//         return response.json(); // Parse the JSON response
//         }).then((gameboard: { code: string; colorCode: string }[]) => {
//             const gameBoardElement = document.getElementById("gameBoard")! as HTMLDivElement;
    
//             gameboard.forEach(({ code, colorCode }) => {
//                 const card = document.createElement("div");
//                 card.classList.add("card");
//                 card.style.border = `2px solid ${colorCode}`;
//                 card.textContent = code;
    
//                 gameBoardElement.appendChild(card);
//             });
//         });
// })();

window.socket.on("game-started", (gameId) => {
    console.log("game-started picked up on");
    fetch(`/games/joining/${gameId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            body: JSON.stringify({ message: "Joining the game" })
        }
    }).then((res) => {
        console.log(res);
        window.location.href = res.url;
    }).catch((err) => {
        console.error(err);
    });
});

window.socket.on("hint-sent", ({ gameId, turnUpdate, hint, count }) => {
    console.log("hint-sent picked up on");
    fetch(`/games/${gameId}/${turnUpdate}?hint=${hint}&count=${count}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            body: JSON.stringify({ hint, count })
        }
    }).then((res) => {
        console.log(res);
        window.location.href = res.url;
    }).catch((err) => {
        console.error(err);
    });
});