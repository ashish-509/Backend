import mongoose, { Schema } from "mongoose";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'


const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true, // this helps in optimize and proper searching in database although it becomes little expensive.
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
      trim: true,
      index: true,
    },
    avatar: {
      type: String, // here, we get the url of image in String which is stored in Cloudinary.
      required: true,
    },
    coverImage: {
      type: String, // Cloudinary url
    },
    watchHistory: [
      {
        type: Schema.Types.ObjectId,
        ref: "Video",
      },
    ],
    password: {
      type: String,
      required: [true, "Password is required."],
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified("password")) return next(); // if password isn't modified.


  this.password = bcrypt.hash(this.password, 10) // if password is modified.
  next()
})

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function() {
  return jwt.sign({
    _id : this.id,
    email : this.email,
    username : this.username,
    fullname : this.fullname
  },
  process.env.ACCESS_TOKEN_SECRET,
  {
    expiresIn : process.env.ACCESS_TOKEN_EXPIRY
  }
)
}

userSchema.methods.generateRefreshToken = function() {
  return jwt.sign({
    _id : this.id
  },
  process.env.REFRESH_TOKEN_SECRET,
  {
    expiresIn : process.env.REFRESH_TOKEN_EXPIRY
  }
)
}

export const User = mongoose.model("User", userSchema);
