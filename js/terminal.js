document.addEventListener("DOMContentLoaded", function () {
    const terminalBox = document.getElementById("terminal-box");
    const terminalInput = document.getElementById("terminal-input");
    const closeTerminal = document.getElementById("close-terminal");
    const terminalOutput = document.getElementById("terminal-output");

    // Hide terminal (set to embedded mode) by default
    terminalBox.classList.add("remove");

    // Activate terminal when clicking on the terminal box,
    // unless clicking on the close button.
    terminalBox.addEventListener("click", function (event) {
        if (event.target === closeTerminal) return; // Don't trigger activation when clicking the close button
        if (terminalBox.classList.contains("remove")) {
            terminalBox.classList.remove("remove");
        }
        if (!terminalBox.classList.contains("active")) {
            terminalBox.classList.add("active");
            terminalInput.focus();
        }
    });

    // Function to exit terminal mode and retain only the latest response.
    function exitTerminal() {
        const outputParagraphs = terminalOutput.querySelectorAll("p");
        let lastLine = "";
        if (outputParagraphs.length > 0) {
            lastLine = outputParagraphs[outputParagraphs.length - 1].outerHTML;
        }
        terminalOutput.innerHTML = lastLine;
        terminalBox.classList.remove("active");
        terminalBox.classList.add("remove");
        terminalInput.blur();
    }

    // Close button click event.
    closeTerminal.addEventListener("click", function (event) {
        event.stopPropagation(); // Prevent the click from triggering terminal activation.
        exitTerminal();
    });

    // Process commands on Enter key.
    terminalInput.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            let command = terminalInput.value.trim();
            terminalInput.value = "";
  
            // If command is "exit", exit terminal mode.
            if (command.toLowerCase() === "exit" || command.toLowerCase() === "quit" || command.toLowerCase() === "close" || command.toLowerCase() === "bye" || command.toLowerCase() === "q") {
                exitTerminal();
                return;
            }
  
            // Append the entered command and its response.
            terminalOutput.innerHTML += `<p>$ ${command}</p>`;
            let response = processCommand(command);
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
                return 'Visit: <a href="sites/projects.html" target="_blank"> my Projects</a>';
            case "contact":
                return 'Find me on <a href="https://linkedin.com/in/Jakub-Schwenkbeck" target="_blank">LinkedIn</a>';
            case "help":
                return "Available commands: whoami, projects, contact, clear, exit, help.";
            case "clear":
            case "cls":
            case "clr":
            case "clean":
            case "clc":
                    terminalOutput.innerHTML = "";
                    return "";
            default:
                return "Command not found. Type 'help' to see available commands.";
        }
    }
});
