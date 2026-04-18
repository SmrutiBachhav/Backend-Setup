import mongoose, {Schema} from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
 

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true     //to make field searchable->optimize way,username based search
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    fullname: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        index: true
    },
    avatar: {
        type: String,   //cloudinary url
        required: true,
    },
    coverImage: {
        type: String,   //cloudinary url
    },
    watchHistory: [ //get from video video id
        {
            type: Schema.Types.ObjectId,
            ref: "Video"
        }
    ],
    password: {
        type: String,
        required: [true, 'Password is required!']
    },
    refreshToken: {
        type: String
    }
}, {
    timestamps: true
});

//using middleware perhook to perform action before storing in db | encrypt data before storing
//("functionality", callback)
userSchema.pre("save", async function (next) {
    if(!this.isModified("passwordd")) return next();    //if pass bot modified dont't bcrypt get out of the function
    //if password is mdified encrypt it
    this.password = bcrypt.hash(this.password, 10)
    next()
})

//inject user defined methods
userSchema.methods.isPasswordCorrect = async function(password) {
    return await bcrypt.compare(password, this.password)
}

//return generated access token by jwt
userSchema.methods.generateAccessToken = function(){
    //sign generate token
    return jwt.sign({
        //payload(data)name: from database       
        _id: this._id,
        email: this.email,
        username: this.username,
        fullname: this.fullname
    }, 
    process.env.ACCES_TOKEN_SECRET, 
    { 
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    })
}
//return generated refresh token by jwt
userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            //payload(data)name: from database       
            _id: this._id,
        }, 
        process.env.REFRESH_TOKEN_SECRET, 
        { 
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

                                
export const User = mongoose.model("User", userSchema);