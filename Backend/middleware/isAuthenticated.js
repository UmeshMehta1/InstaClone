import jwt from 'jsonwebtoken';
// import promisify from 'util'

const isAuthenticated = async (req, res, next) => {
    try {
        // Retrieve the token from the Authorization header or cookies
        const token = req.headers.authorization
        console.log(token)

        // If no token is found, return an error
        if (!token) {
            return res.status(401).json({
                message: "User not authenticated",
                success: false
            });
        }


        //  pathayo vaney k garney tw 
    // verify if the token is legit or not
    jwt.verify(token,"hello",(err,success)=>{
        if(err){
            res.status(400).json({
                message : "Invalid Token"
            })
        }else{
            res.status(200).json({
                message : "Valid Token"
            })
      }
    })


        // alteernive
    //     const decoded = await promisify(jwt.verify)(token,"hello")
   
    //     const doesUserExist =  await User.findOne({_id : decoded.id})
    
    //    if(!doesUserExist){
    //     return res.status(404).json({
    //         message : "User doesn't exists with that token/id"
    //     })
    //    }
    //    req.user  = doesUserExist
    
    //    next()

         //     // Verify the token
    //     const decoded = jwt.verify(token,"hello")

    //     // Attach the user ID to the request object
    //     req.id = decoded.userId;
    //     next();
    // } catch (error) {
    //     console.error("Authentication error:", error.message);
    //     return res.status(401).json({
    //         message: "Invalid or expired token",
    //         success: false
    //     });
    // }

    }catch(error){
        console.log(error)
    }

   
};

export default isAuthenticated;
