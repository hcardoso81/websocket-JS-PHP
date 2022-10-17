"use strict";
document.addEventListener('DOMContentLoaded', () => {

        //create a new WebSocket object.
        const wsUri = "ws://localhost:9000/demo/server.php";
        const websocket = new WebSocket(wsUri);
        console.log("conexion exitosa");
        
  

       
    const buttonSend = document.getElementById('sendMessage');
    if (buttonSend) {
        buttonSend.addEventListener('click', sendMmessage );
    }

    websocket.onopen = function (ev) { // connection is open 
        console.log("onOPen");
        const content = document.getElementById('content');
        if (content) {
            content.innerHTML = "Conexion iniciada: leer valor inicial desde Servicio";
        }
    }
    // Message received from server
    websocket.onmessage = function (ev) {
        const response = JSON.parse(ev.data); //PHP sends Json data
        let text = (response.message) ? response.message : 'volver a consultar estado del servicio';
  
        const content = document.getElementById('content');
        if(content) {
            content.innerHTML = text;
        }
    };

    websocket.onerror = function (ev) {
        console.log("error");
    };
    websocket.onclose = function (ev) {
        console.log("close");
    };

    //Send message
    function sendMmessage(e) {
        try {
            e.preventDefault();
            let message = document.getElementById('message').value;
            var msg = {
                message: message,

            };
            if (message.length == 0) {
                alert("empty");
                return;
            }
            //convert and send data to server
            try {
                websocket.send(JSON.stringify(msg));
                console.log("sended...");
            } catch (error) {
                console.log(error);
            }
            websocket.send(JSON.stringify(msg));
            document.getElementById('message').value = "";
            let success = document.getElementById('success');
            if (success) {
                success.style.display = "block";
            }
            
        } catch (error) {
            console.log("error sendData");
            console.log(error);
            
        }

    }
});