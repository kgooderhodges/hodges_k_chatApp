import ChatMessage from "./components/TheMessageComponent.js"

(() => {
    console.log('fired');
// refers to socket.io library and makes a connection to app.js
    const socket = io();

//messenger service event handling -> incoming from the manager
    function setUserId({sID, message}) {
        //incoming connected event with data
        // debugger;

        vm.socketID = sID;
    }

    function appendMessage(message) {
        vm.messages.push(message);
    }

    const vm = new Vue({
        data: {
            //singular message = send, plural message(s) = receive
            messages: [],
            nickname: "",
            username: "",
            socketID: "",
            message: ""
        },

        created: function() {
            console.log('its alive');
            this.nickname = window.localStorage.getItem('name');
            console.log(window.localStorage);
        },

        methods: {
            dispatchMessage() {
                // debugger;
                socket.emit('chatmessage', {content: this.message, name: this.nickname || "Anonymous"});

                this.message = "";
            },

            setNickname(setUser){
                let name = setUser.target.elements[0].value;
                window.localStorage.setItem('name', name);
                window.location = '/chat';
            }
        },

        components: {
            newmessage: ChatMessage
        }

    }).$mount("#app");

    socket.addEventListener('connected', setUserId);
    socket.addEventListener('message', appendMessage);
}) ();