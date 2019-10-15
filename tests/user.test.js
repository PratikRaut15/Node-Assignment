const secretKey = 'mysecretKey';
const jwt = require('jsonwebtoken');
const auth = require('../auth');
describe('user.generateAuth Token ',() =>{
    it('should return a valid JWT Token',() => {
        const verifiedToken = auth.getToken();
        const decoded = jwt.verify(verifiedToken,secretKey);
       
        expect(decoded.user).toMatchObject({id : 1,username : "pratik raut",email : "pratikraut@gmail.com"});
        //expect(decoded.user.username).toBe("pratik raut");
       
    });
});