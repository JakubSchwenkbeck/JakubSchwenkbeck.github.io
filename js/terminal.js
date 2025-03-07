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
        if (event.target === closeTerminal) return;
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
        event.stopPropagation();
        exitTerminal();
    });

    // Process commands on Enter key.
    terminalInput.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            let command = terminalInput.value.trim();
            terminalInput.value = "";

            if (["exit", "quit", "close", "bye", "q"].includes(command.toLowerCase())) {
                exitTerminal();
                return;
            }

            // Append the entered command (in light green)
            terminalOutput.innerHTML += `<p><span style="color: lightgreen;">$ ${command}</span></p>`;

            let response = processCommand(command);
            if (response) {
                // Append the response (in white)
                terminalOutput.innerHTML += `<p><span style="color: white;">${response}</span></p>`;
            }

            // Style previous commands in gray
            let allCommands = terminalOutput.querySelectorAll("p");
            allCommands.forEach((cmd, index) => {
                if (index < allCommands.length - 2) {
                    cmd.style.color = "gray";
                }
            });

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
            case "github":
                return 'Check out my code on <a href="https://github.com/JakubSchwenkbeck" target="_blank">GitHub</a>!';
            case "date":
                return new Date().toLocaleString();
            case command.match(/^echo\s+/)?.input:
                    return command.substring(5).trim() || "(empty)";
                
            case "sudo":
                return "Permission denied: You are not authorized to use sudo on this system!";
            case "hack":
                return "🕵️‍♂️ Initiating super elite hack mode...\n💻 Connecting to mainframe...\n🔓 Bypassing firewall...\n✅ Access granted! Just kidding. Stay ethical. 😆";
            
            case "help":
                return `<span style="color: cyan;">🤖 Available Commands:</span><br>
                <span style="color: gray;">────────────────────────────────</span><br>
                <span style="color: orange;">🔹 <b>General</b>:</span><br>
                &nbsp;&nbsp;<span style="color: lightgreen;">• <b>whoami</b></span> → About me<br>
                &nbsp;&nbsp;<span style="color: lightgreen;">• <b>projects</b></span> → My projects<br>
                &nbsp;&nbsp;<span style="color: lightgreen;">• <b>contact</b></span> → Get in touch<br>
                &nbsp;&nbsp;<span style="color: lightgreen;">• <b>github</b></span> → My GitHub profile<br>
                &nbsp;&nbsp;<span style="color: lightgreen;">• <b>date</b></span> → Show current date/time<br><br>
                
                <span style="color: orange;">🔹 <b>Git Shortcuts</b>:</span><br>
                &nbsp;&nbsp;<span style="color: lightblue;">• <b>git status</b></span> → See changes<br>
                &nbsp;&nbsp;<span style="color: lightblue;">• <b>git add</b></span> → Stage changes<br>
                &nbsp;&nbsp;<span style="color: lightblue;">• <b>git commit</b></span> → Commit staged changes<br>
                &nbsp;&nbsp;<span style="color: lightblue;">• <b>git push</b></span> → Push to repository<br>
                &nbsp;&nbsp;<span style="color: lightblue;">• <b>git pull</b></span> → Fetch latest changes<br><br>
                
                <span style="color: orange;">🔹 <b>Fun & Extras</b>:</span><br>
                &nbsp;&nbsp;<span style="color: violet;">• <b>echo [text]</b></span> → Repeat after me<br>
                &nbsp;&nbsp;<span style="color: red;">• <b>sudo</b></span> → Try your luck 😉<br>
                &nbsp;&nbsp;<span style="color: yellow;">• <b>hack</b></span> → Hack the planet! 🌍<br><br>
                
                <span style="color: orange;">🔹 <b>System</b>:</span><br>
                &nbsp;&nbsp;<span style="color: lightgray;">• <b>clear</b></span> (clc, cls, clean, clr) → Clear the terminal<br>
                &nbsp;&nbsp;<span style="color: lightgray;">• <b>exit</b></span> (quit, close, bye, q) → Close the terminal<br><br>
                
                <span style="color: cyan;">💡 Type a command and press Enter!</span>`;

            case "clear":
            case "cls":
            case "clr":
            case "clean":
            case "clc":
                terminalOutput.innerHTML = "";
                return "";
            
            case "git status":
                return "🤖 On branch master\n🚀 Your branch is up to date with 'origin/master'.\n\n⚠️ Uncommitted changes detected:\n  (use 'git add <file>...' to track changes)\n  (use 'git restore <file>...' to undo changes)\n\n📄 Modified file:\n  📝 js/terminal.js\n\n😬 No changes added yet! Don't forget 'git add' and 'git commit -a'!";

            case "git add":
                return "🤷‍♂️ Uhh... nothing specified, nothing added.\n💡 Maybe you meant 'git add .'?";

            case "git commit":  
                return "🚫 No changes added! Are you trying to commit air? 🌬️";

            case "git push":
                return "🚀 Pushing changes...\n🎉 Everything is already up-to-date. Go take a break! ☕";

            case "git pull":
                return "🔄 Checking for updates...\n✅ You’re already on the latest and greatest. Keep up the good work! 💻🔥";
            
            default:
                return "Command not found. Type 'help' to see available commands.";
        }
    }
});
