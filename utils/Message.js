class Message {

    constructor(messages){
        this.messages = messages;
    }

    error(){
        return {
            type: 'alert',
            messages: this.messages
        }
    }

    info(){
        return {
            type: 'info',
            messages: this.messages
        }
    }

    warning(){
        return {
            type: 'warning',
            messages: this.messages
        }
    }

    success(){
        return {
            type: 'success',
            messages: this.messages
        }
    }

}

export default Message;