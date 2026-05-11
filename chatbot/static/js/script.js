const sendBtn = document.getElementById("send-btn");

sendBtn.addEventListener("click", sendMessage);

function sendMessage(){

    let input = document.getElementById("message");

    let message = input.value.trim();

    if(message === ""){
        return;
    }

    let chatBox = document.getElementById("chat-box");

    // Show User Message
    chatBox.innerHTML += `
        <div class="message user-message">
            ${message}
        </div>
    `;

    // Clear Input
    input.value = "";

    // Scroll
    chatBox.scrollTop = chatBox.scrollHeight;

    // Send Message to Django
    fetch("/", {

        method: "POST",

        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "X-CSRFToken": getCSRFToken()
        },

        body: "message=" + encodeURIComponent(message)

    })

    .then(response => response.json())

    .then(data => {

        // Show AI Response
        chatBox.innerHTML += `
            <div class="message bot-message">
                ${data.response}
            </div>
        `;

        chatBox.scrollTop = chatBox.scrollHeight;
    })

    .catch(error => {

        console.log(error);

        chatBox.innerHTML += `
            <div class="message bot-message">
                Error connecting server ❌
            </div>
        `;
    });
}


// CSRF TOKEN
function getCSRFToken() {

    let cookieValue = null;

    if(document.cookie && document.cookie !== ""){

        let cookies = document.cookie.split(";");

        for(let i = 0; i < cookies.length; i++){

            let cookie = cookies[i].trim();

            if(cookie.startsWith("csrftoken=")){

                cookieValue = cookie.substring("csrftoken=".length);

                break;
            }
        }
    }

    return cookieValue;
}