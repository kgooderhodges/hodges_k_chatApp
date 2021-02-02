(() => {
    console.log('fired');
// 
    const socket = io();

    const vm = new Vue({
        data: {
            messages: [],
            nickname: "",
            username: "",
        },

        created: function() {
            console.log('its alive');
        },

        methods: {

        }
    }).$mount("#app");
}) ();