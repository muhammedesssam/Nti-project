const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please enter your name'],
    },
    email: {
      type: String,
      required: [true, 'Please provide your email'],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, 'Please provide a valid email'],
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    gender: {
      type: String,
      trim: true,
      lowercase: true,
      enum: ['male', 'female'],
    },
    age: {
      type: Number,
      min: 20,
      max: 60,
      required: true,
    },
    password: {
      type: String,
      required: [true, 'please provide a password'],
      minlength: 8,
    },
    // passwordConfirm: {
    //   type: String,
    //   required: [true, 'please confirm your password'],
    //   validate: {
    //     // This only works on CREATE and SAVE!!
    //     validator: function (el) {
    //       return el === this.password;
    //     },
    //     message: 'Passwords are not the same',
    //   },
    // },
    tokens: [
      {
        token: {
          type: String,
          require: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

userSchema.pre('save', async function () {
  if (this.isModified('password'))
    this.password = await bcrypt.hash(this.password, 12);
});

userSchema.statics.login = async (email, password) => {
  const user = await userModel.findOne({ email });
  if (!user) throw new Error('invalid email');
  const matched = await bcrypt.compare(password, user.password);
  if (!matched) throw new Error('invalid password');
  return user;
};

userSchema.methods.generateToken = async function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWTKEY);
  this.tokens.push({ token });
  // this.token = this.token.concat({ token });
  await this.save();
  return token;
};

// userSchema.statics.loginAdmin = async (email, password) => {
//   const admin = await userModel.findOne({
//     email,
//     role: 'admin',
//   });
//   if (!admin) throw new Error('invalid email');
//   const isMatch = await bcrypt.compare(
//     password,
//     user.password
//   );
//   if (!isMatch) throw new Error('invalid password');
//   return admin;
// };

const userModel = mongoose.model('User', userSchema);
module.exports = userModel;
