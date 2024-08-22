const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { users } = require("../Models");

exports.registerUser = async (req, res) => {
  const { full_name, email, phone_number, password, role, location } = req.body;

  try {
    // Validate required fields
    if (!full_name || !email || !phone_number || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Trim values to remove extra spaces
    const trimmedEmail = email.trim().toLowerCase();
    const trimmedPhone = phone_number.trim();
    const trimmedFullName = full_name.trim();

    // Validate role (default to "User" if not provided)
    const validRoles = ["User", "Owner", "Admin"];
    const userRole = role && validRoles.includes(role) ? role : "User";

    // Check if email already exists
    const existingUser = await users.findOne({ where: { email: trimmedEmail } });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered." });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = await users.create({
      full_name: trimmedFullName,
      email: trimmedEmail,
      phone_number: trimmedPhone,
      location: location || null,
      password: hashedPassword,
      role: userRole,
    });

    // Send success response
    return res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser.id,
        full_name: newUser.full_name,
        email: newUser.email,
        phone_number: newUser.phone_number,
        role: newUser.role,
        location: newUser.location,
      },
    });

  } catch (error) {
    console.error("Error registering user:", error);

    // Handle Sequelize validation errors
    if (error.name === "SequelizeValidationError") {
      return res.status(400).json({ message: "Invalid data format", errors: error.errors });
    }

    return res.status(500).json({ message: "An error occurred while registering the user." });
  }
};


exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  console.log("bbbb", req.body)

  // Basic validation
  if (!email || !password) {
    return res.status(400).send("Email and password are required.");
  }

  try {
    // Check if the email exists
    const user = await users.findOne({ where: { email } });
    if (!user) {
      return res.status(404).send("User with that email does not exist.");
    }

    // Verify password
    const isPasswordMatched = bcrypt.compareSync(password, user.password);
    if (!isPasswordMatched) {
      return res.status(401).send("Invalid password.");
    }

    // Include role in the JWT token
    const token = jwt.sign(
      { id: user.id, role: user.role, location:user.location }, // Adding role to the payload
      process.env.SECRETKEY,
      { expiresIn: "30d" }
    );

    // Send the token and user role
    res.json({
      message: "Login successful",
      token,
      role: user.role
    });


  } catch (err) {
    console.error(err);
    res.status(500).send("An error occurred during login.");
  }
};