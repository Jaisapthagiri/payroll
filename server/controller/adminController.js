import jwt from "jsonwebtoken";

// http://localhost:4000/api/admin/login
export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {

      const token = jwt.sign(
        { email, role: "admin" },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );
      
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      console.log("admin : " ,token);

      return res.json({ success: true, role: "admin" });
    }

    return res.status(401).json({ success: false, message: "Invalid admin credentials" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// http://localhost:4000/api/admin/logout
export const adminLogout = (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    });
    return res.json({ success: true, message: "Admin Logged Out" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getAdminDashboard = (req, res) => {
  return res.json({ success: true, message: "Welcome to Admin Dashboard" });
};
