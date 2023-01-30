const Payload = require('./Payload')
module.exports = class ResponseMessage{
    constructor(code,message,payload,status){
        this.code = code;
        this.message = message;
        this.payload = new Payload(payload);
        this.status = status
    }
}