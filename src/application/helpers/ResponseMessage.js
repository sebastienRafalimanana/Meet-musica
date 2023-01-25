module.exports = class ResponseMessage{
    constructor(code,message,payload=null,status){
        this.code = code;
        this.message = message;
        this.payload = payload;
        this.status = status
    }
}

