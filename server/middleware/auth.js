import jwt from 'jsonwebtoken';


export const verifyToken = async (req, res, next) => {
    try{
        let token = req.header("Authorization");
        if(!token){
            return res.status(401).json({error: "No token, authorization denied"});
        }
        if(token.startsWith("Bearer")){
            token = token.slice(7, token.length).trimLeft();
        } 

        const verified = jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if(err){
                return res.status(401).json({error: "Token is not valid"});
            }
            req.user = verified;
            next();
        });

    } catch(err){
        res.status(500).json({error: err.message});
    }
}