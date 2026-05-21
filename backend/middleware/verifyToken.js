import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({ message: "Authorization header missing" });
        }

        // must be "Bearer token"
        const parts = authHeader.split(" ");

        if (parts.length !== 2) {
            return res.status(401).json({ message: "Invalid token format" });
        }

        const scheme = parts[0];
        const token = parts[1];

        if (scheme !== "Bearer" || !token || token === "undefined") {
            return res.status(401).json({ message: "Invalid token" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;
        next();

    } catch (error) {
        console.error("JWT Error:", error.message);

        return res.status(401).json({
            message: "Invalid or expired token"
        });
    }
};