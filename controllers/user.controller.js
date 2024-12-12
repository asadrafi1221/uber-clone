import userModel from "../models/user.model.js";

export const registerUser = async (req, res) => {
    console.log('i am called');
    try {
        const { fullname, email, password } = req.body;

        if (!fullname.firstname || !email || !password) {
            return res.status(401).json({ message: 'Invalid, please enter your data' });
        }

        console.log(fullname.firstname, password, email);
        const usersdata = await userModel.find({})
        console.log(usersdata);

        const hashedPassword = await userModel.hashPassword(password);

        const user = await userModel.create({
            fullname: {
                firstname: fullname.firstname,
                lastname: fullname.lastname,
            },
            email: email,
            password: hashedPassword,
        });

        const token = user.generateAuthToken();

        return res.status(201).json({ message: "User created successfully", user, token });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
};
export const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) return res.status(401).json({ message: 'user not found' });

    const user = await userModel.findOne({ email: email }).select('+password')
    if(!user)  return res.status(401).json({message: 'invalid email or username'})
    const ismatch = await userModel.comparePassword(password);

    if (!ismatch) return res.status(401).json({message: 'invalid email or username'})
    const token = user.generateAuthToken();
    return res.status(201).json({ message: 'user login succesfully' }, user, token);
}
