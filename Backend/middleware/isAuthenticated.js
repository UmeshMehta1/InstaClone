import jwt from 'jsonwebtoken';

const isAuthenticated = async (req, res, next) => {
    try {
        // Retrieve the token from the Authorization header or cookies
        let token = req.cookies.token;

        // If no token is found, return an error
        if (!token) {
            return res.status(401).json({
                message: "User not authenticated",
                success: false
            });
        }

        // Verify the token
        const decoded = jwt.verify(token, "hello")

        // Attach the user ID to the request object
        req.id = decoded.userId;
        next();
    } catch (error) {
        console.error("Authentication error:", error.message);
        return res.status(401).json({
            message: "Invalid or expired token",
            success: false
        });
    }
};

export default isAuthenticated;
