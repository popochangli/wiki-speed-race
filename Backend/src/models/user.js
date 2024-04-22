import mongoose from 'mongoose'; 

const userSchema = new mongoose.Schema({
    name: {
      type: String,
      required: false
    },
    userId: {
      type: String,
      required: true,
      minlength: 4,
      maxlength: 4,
    },
    totalArticle: {
        type: [String],
        required: false
    },
    start: {
        type: String,
        required: false
    },
    goal: {
        type: String,
        required: false
    },
    finishTime: {
      type: Number,
      require: false
    }
  });

const User = mongoose.model('User', userSchema);

export default User;
  