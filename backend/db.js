const mongoose=require("mongoose")

mongoose.connect("mongodb+srv://chinmaysaraswat:0987chinmaysaraswat@cluster0.hrogdi9.mongodb.net/savefood")

const userSchema = new mongoose.Schema({
    userName: {
      type: String,
    },
    email: {
      type: String,
    },
    phoneNo: {
      type: String,
    },
    password: {
      type: String,
    
    }
  });

  const ngoSchema = new mongoose.Schema({
    phoneNo: {
      type: String,
     
    },
    ngoName: {
      type: String,
     
    },
    city: {
      type: String,
    },
    email: {
      type: String,
     
    },
    password: {
      type: String,
     
    }
  });

const User = mongoose.model('User', userSchema);
const NGO = mongoose.model('NGO', ngoSchema);

module.exports = { User, NGO };