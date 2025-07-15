const asyncHandler = (fn) => 
    async (req,res,next) =>{
        try {
            return await fn(req,res,next);
        } catch (error) {
            return res.status(error.statusCode || 500).json({
                success: false,
                message: error.message || "Server Error",
                statusCode: error.statusCode || 500
            });
        }
    }

export {asyncHandler};