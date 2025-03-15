import User from "../modal/UserModal.js";
import bcrypt from "bcryptjs";

/* -------------------------------------------------------------------------- */
/*                                CREATE USER                                 */
/* -------------------------------------------------------------------------- */
const createUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(409).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            role: role || "learner",
        });

        res.status(201).json({
            message: "User created successfully",
            user: { id: newUser.id, name: newUser.name, email: newUser.email, role: newUser.role }
        });

    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

/* -------------------------------------------------------------------------- */
/*                                UPDATE USER                                 */
/* -------------------------------------------------------------------------- */
const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, password, role } = req.body;

        const user = await User.findByPk(id);
        if (!user) return res.status(404).json({ message: "User not found" });

        const updatedUser = await user.update({
            name: name || user.name,
            email: email || user.email,
            password: password ? await bcrypt.hash(password, 10) : user.password,
            role: role || user.role
        });

        res.status(200).json({
            message: "User updated successfully",
            user: { id: updatedUser.id, name: updatedUser.name, email: updatedUser.email, role: updatedUser.role }
        });

    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

/* -------------------------------------------------------------------------- */
/*                                REMOVE USER                                 */
/* -------------------------------------------------------------------------- */
const removeUser = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findByPk(id);
        if (!user) return res.status(404).json({ message: "User not found" });

        await user.destroy();

        res.status(200).json({ message: "User deleted successfully" });

    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

/* -------------------------------------------------------------------------- */
/*                                LOGIN USER                                  */
/* -------------------------------------------------------------------------- */
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) return res.status(400).json({ message: "Email and password are required" });

        const user = await User.findOne({ where: { email } });

        if (!user) return res.status(404).json({ message: "Invalid email or password" });

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(401).json({ message: "Invalid email or password" });

        res.status(200).json({
            message: "Login successful",
            user: { id: user.id, name: user.name, email: user.email, role: user.role }
        });

    } catch (error) {
        console.error("Error logging in:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export { createUser, updateUser, removeUser, loginUser };
