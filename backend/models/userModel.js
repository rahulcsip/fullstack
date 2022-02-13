const mongoose = require("mongoose");
const bcrypt = require('bcrypt')
const userSchema = mongoose.Schema({
    name:{
        type:String,required:true
    },
    email:{
        type:String,required:true,unique:true
    },
    password:{
        type:String,required:true
    },
    picture:{
        type:String,
        default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQ4TKmLL_Yab3zrnGsM-6FzOgBGSm3lcXkndb1E5xQagw5YlZ9ClcBcC46v3Eq9vfBSIQ&usqp=CAU"
    }
},
{
    timestamps:true
})

userSchema.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password)
}

userSchema.pre('save',async function(next){
if(!this.isModified){
    next()
}

const salt = await bcrypt.genSalt(10)

this.password = await bcrypt.hash(this.password, salt)

})

const User = mongoose.model('User',userSchema)

module.exports = User;