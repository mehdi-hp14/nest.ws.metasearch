import Vue from 'vue';
import VueSocketIO from 'vue-socket.io';

Vue.use(new VueSocketIO({
    // debug: true,
    connection: 'http://localhost:3001/metaSearch',
    options: {
        path: "/ws"
    }
}));

let app = new Vue({
    el: '#app',
    data: () => ({
        text: '',
        messages: []
    }),
    methods: {
        sendMessage() {
            console.log(this.$socket)
            this.$socket.emit('msgToEveryOne', this.text)
            this.text = '';
        }
    },
    sockets: {
        connect: function () {
            console.log('socket connected')
        },
        msgToClient: function (data) {
            console.log(data)
            this.messages.push(data);
        }
    }
});