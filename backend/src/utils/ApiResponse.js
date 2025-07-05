class ApiResponse{
    constructor(statusCode,data,message="success"){
        statusCode = statusCode ;
        this.statusCode = statusCode;
        this.data = data;
        this.message = message;
        this.succees = statusCode < 400;   
    }
}

export {ApiResponse}