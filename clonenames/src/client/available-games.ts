const rowTemplate = document.querySelector<HTMLTemplateElement>("#game-row")!;
const gamesList = document.querySelector<HTMLTableSectionElement>("#available-games")!;

window.socket.on("game-created", (game) => {
    console.log("Game Created", { game });
// issue here TODO: need to get the host added to game 
    const rowCount = gamesList.querySelectorAll("tr").length;

    const row = rowTemplate.content.cloneNode(true) as DocumentFragment;

    row.querySelector("th")!.textContent = (rowCount + 1).toString(); // index
    row.querySelector("td:nth-child(1)")!.textContent = game.host;   // host
    row.querySelector("td:nth-child(2)")!.textContent = `${game.players}/4`; // players
    row.querySelector<HTMLFormElement>("td:nth-child(3) form")!.action =
    `/games/join/${game.id}`;

    gamesList.appendChild(row);
});