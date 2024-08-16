//  step 5: Write api response handling code. step 6 on: asyncHandler.js
class ApiResponse {
    constructor(statusCode,data,message = 'Success'){
        this.statusCode = statusCode
        this.data = data
        this.message = message
        this.success = statusCode < 400
    }
}

export{ApiResponse}