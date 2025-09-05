import jwt from "jsonwebtoken";

const authAdmin = async (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
        return res.status(401).json({ success: false, message: "Not Authorized, no token" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (decoded.role === "admin") {
            req.user = { id: decoded.id, email: decoded.email, role: decoded.role };
            next();
        } else {
            return res.status(403).json({ success: false, message: "Access denied: Admins only" });
        }
    } catch (error) {
        return res.status(401).json({ success: false, message: error.message });
    }
};

export default authAdmin;
