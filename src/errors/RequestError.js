class RequestError extends Error {
  constructor(code, status, message, error) {    
    super();
    this.code = code;
    this.status = status;
    this.message = message;
    this.inner = error;
  }
}
 
 module.exports = RequestError;