import mongoose from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: true,
            minlength: [
                3, "First name must be atleast 4 characters long"
            ]
        },
        lastname: {
            type: String,
            minlength: [
                3, "Lastname must be atleast 4 characters long"
            ]
        },
    },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            select: false,
            required: true,
        },
        socketId: {
            type: String,
        }

})

userSchema.methods.generateAuthToken = function () {
    console.log(this.fullname);
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET);
    return token;
};

userSchema.methods.comparePassword = async (password) => {
    return await bcrypt.compare(password, this.password);
}

userSchema.statics.hashPassword = async (password) => {
    return await bcrypt.hash(password, 10);
}

const userModel = mongoose.model('users',userSchema)

export default userModel;