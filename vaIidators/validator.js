const isvalidEmail = function (gmail) {
    let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/   //.test(gmail);
    return regex.test(gmail)
}

const valid = function (value) {

    if (typeof (value) === 'undefined' || value === null) return false
      if(typeof (value) !== "string") return false 
    if (typeof (value) === "string" && value.trim().length == 0) return false

    return true
}

const passwordRegex = (value) => {
    let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/;
    if (passwordRegex.test(value))
        return true;
}


module.exports = { valid, isvalidEmail, passwordRegex};