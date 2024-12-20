const form = document.querySelector("#chat-section form")! as HTMLFormElement;
const input = document.querySelector("input#chat-message")! as HTMLInputElement;

const messageTemplate = document.querySelector(
    "#chat-message-template"
)! as HTMLTemplateElement;

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const message = input.value;
    input.value = "";

    console.log({ message });

    fetch(form.action, { 
        method: "POST", 
        headers: { "Content-Type": "application/json" }, 
        body: JSON.stringify({ message })
    }).then(response => {
        if(response.status !== 200) {
            console.error("Error: ", response);
        }
    });
});

(() => {
    window.socket.on("message:0", 
        (payload: { message: string, sender: string, timestamp: string }) => {
            const messageElement = messageTemplate.content.cloneNode(true) as HTMLElement;
            messageElement.querySelector(".sender")!.textContent = `${payload.sender}:`;
            messageElement.querySelector(".content")!.textContent = payload.message;

            document.querySelector("#chat-section ul")!.appendChild(messageElement);
        });
})();