// Module importing:
import jsonwebtoken from 'jsonwebtoken';
import util from 'util';

// Converting verify ang sign to promise based functions?:
const verify = util.promisify(jsonwebtoken.verify);
const sign = util.promisify(jsonwebtoken.sign);

// Creating an object that will save all our promise based functions:
const jwt = {
    verify,
    sign
}

// Exporting jwt:
export default jwt;