import mongoose from "mongoose";
import bcrypt from "bcrypt"


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        select :false,
    },
    verified: {
        type: Boolean,
        default: false
    },
}, { timestamps: true }) 

userSchema.pre("save" , async function (){
    // check your password already hashed , if password is hashed the is will be false and you do not to hash the password
    if(!this.isModified("password")) return ;

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password , salt);
    } catch (error) {
        throw error
    };
});


const userModel = mongoose.model("user", userSchema);

export default userModel;