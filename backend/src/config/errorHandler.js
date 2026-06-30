export const apiError = (res , statusCode , message) => {
    return res.status(statusCode).json({
        succes :false,
        error :  message
    })
}