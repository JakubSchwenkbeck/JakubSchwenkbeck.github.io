document.addEventListener("DOMContentLoaded", function () {
    const terminalOutput = document.getElementById("terminal-output");
    const terminalInput = document.getElementById("terminal-input");

    terminalInput.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            let command = terminalInput.value.trim();
            terminalInput.value = ""; 

            let response = processCommand(command);

            terminalOutput.innerHTML += `<p>$ ${command}</p>`;
            if (response) {
                terminalOutput.innerHTML += `<p>${response}</p>`;
            }
            
            terminalOutput.scrollTop = terminalOutput.scrollHeight;
        }
    });

    function processCommand(command) {
        switch (command.toLowerCase()) {
            case "whoami":
                return "Jakub Schwenkbeck - Software Engineer & Computer Science Student.";
            case "projects":
                return 'Visit: <a href="https://github.com/JakubSchwenkbeck" target="_blank">My GitHub</a>';
            case "contact":
                return 'Find me on <a href="https://linkedin.com/in/Jakub-Schwenkbeck" target="_blank">LinkedIn</a>';
            case "clear":
                terminalOutput.innerHTML = "";
                return "";
            case "help":
                return "Available commands: whoami, projects, contact, clear, help.";
            default:
                return "Command not found. Type 'help' to see available commands.";
        }
    }
});
