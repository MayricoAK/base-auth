const authServices = require("../services/authService");

exports.register = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const userId = await authServices.registerUser(name, email, password, role);
    return res
      .status(201)
      .json({ message: "User registered successfully", userId });
  } catch (error) {
    console.error("Error during registration:", error.message);

    if (error.message === "Email already in use") {
      return res.status(400).json({ error: "Email already in use" });
    }

    return res.status(500).json({ error: "Server error" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const { token, user } = await authServices.loginUser(email, password);
    return res.status(200).json({ user, token });
  } catch (error) {
    // Log the error for debugging purposes
    console.error("Error during login:", error.message);

    if (
      error.message === "User not found" ||
      error.message === "Invalid credentials"
    ) {
      return res.status(400).json({ error: error.message });
    }

    return res.status(500).json({ error: "Server error" });
  }
};
