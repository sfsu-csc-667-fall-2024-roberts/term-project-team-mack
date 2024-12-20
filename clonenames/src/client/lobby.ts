window.socket.on("player-updated", (player) => {
    location.reload();
    // const { team, role, username } = player;
     
    // // make the right selector based on team and role
    // const selector = `.${team}${role.charAt(0).toUpperCase() + role.slice(1)}`;

    // const roleElement = document.querySelector(selector);
    
    // if(roleElement) {
    //     roleElement.textContent = `${role.charAt(0).toUpperCase() + role.slice(1)}: ${username}`;
    // } else {
    //     console.error("Role element does not exist");
    // }
});