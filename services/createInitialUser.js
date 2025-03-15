import User from "../modal/UserModal.js";
import bcrypt from "bcryptjs";

/* -------------------------------------------------------------------------- */
/*                           FUNCTION TO CREATE INITIAL USER                  */
/* -------------------------------------------------------------------------- */

async function createInitialUser() {
    try {
        const email = process.env.INIT_USER;
        const password = process.env.INIT_PASS
        const existingUser = await User.findOne({ email : email });
        if (!existingUser) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            const newUser = new User({
                name: "admin",
                email: email,
                password: hashedPassword,
                role: "admin",
            });

            await newUser.save();
            console.log("Initial admin user created");
        } else {
            console.log("Admin user already exists");
        }
    } catch (error) {
        console.error("Error creating user:", error);
    }
}

export default createInitialUser;