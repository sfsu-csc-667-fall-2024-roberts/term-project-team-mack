window.socket.on("player-updated", (gameId) => {
    console.log("player-updated");
    window.location.href = `/games/lobby/${gameId}`
});