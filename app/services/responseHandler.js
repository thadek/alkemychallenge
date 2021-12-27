module.exports = {

sendResponse: (status,response) => {
    if(status>=400 && status <=599) return { status:status, response:{ error:response}};
    return { status:status, response:response}
}

}