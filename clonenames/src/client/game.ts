// made async for promise function
(async () => {
    const gameBoardElement = document.getElementById("gameBoard")! as HTMLDivElement;

    fetch("/games/setGameboard", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    }).then(response => {
        if(response.status !== 200) {
            console.error("Error: ", response);
        }
        return response.json(); // Parse the JSON response
        }).then((gameboard: { code: string; colorCode: string }[]) => {
            const gameBoardElement = document.getElementById("gameBoard")! as HTMLDivElement;
    
            gameboard.forEach(({ code, colorCode }) => {
                const card = document.createElement("div");
                card.classList.add("card");
                card.style.border = `2px solid ${colorCode}`;
                card.textContent = code;
    
                gameBoardElement.appendChild(card);
            });
        });
})();