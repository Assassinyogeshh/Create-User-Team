import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config({ path: './.env' })

const checkToken = async (req, res, next) => {

    try {

        if (!req.headers.authorization) {
            console.log('Missing Token');
            return res.status(401).send('UnAuthorized User')
        }

        const token = req.headers.authorization.split(' ')[1];

        const decodeToken = jwt.verify(token, process.env.SECRET_KEY, { algorithms: ['HS256'] });

        const currentTimestamp = Math.floor(Date.now() / 1000);
        if (decodeToken.exp && decodeToken.exp < currentTimestamp) {
            return res.status(401).json({ message: 'Token has expired' });
        }

        req.userId = decodeToken?.id;

        next();

    } catch (error) {
        console.log(error);
        return res.status(401).send('Unauthorized')
    }
}

export default checkToken;