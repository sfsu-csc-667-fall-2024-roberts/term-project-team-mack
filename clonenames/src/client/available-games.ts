const list = document.querySelector<HTMLTableSectionElement>("#available-games-list")!;
const rowTemplate = document.querySelector<HTMLTemplateElement>("#game-row-template")!;

window.socket.on("game-created", (game) => {
    const row = rowTemplate.content.cloneNode(true) as HTMLTableRowElement;
    const rowIndex = list.querySelectorAll("tr").length;

    row.querySelector("tr")!.id = `game-row-${game.id}`;
    row.querySelector("th")!.textContent = (rowIndex + 1).toString(); // index
    row.querySelector(".host")!.textContent = game.host; // host 
    row.querySelector(".players")!.textContent = `${game.players}/4`; // players
    row.querySelector<HTMLFormElement>(".joinGame form")!.action = `/games/join/${game.id}`;
  
    list.appendChild(row);
});

window.socket.on("game-updated", (game) => {
    const row = list.querySelector<HTMLTableRowElement>(`#game-row-${game.game_id}`);
    
    if(row) {
        if(parseInt(game.players) === 3) {
            row.remove();
        } else {
            row.querySelector(".players")!.textContent = `${parseInt(game.players) + 1}/4`; // players
        }
    }
});