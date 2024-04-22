import mongoose from 'mongoose'; 

const userSchema = new mongoose.Schema({
    name: {
      type: String,
      required: false
    },
    userId: {
      type: String,
      required: true,
      unique: true,
      minlength: 4,
      maxlength: 4,
      validate: {
        validator: function(v) {
          return /^\d{4}$/.test(v);
        },
        message: props => `${props.value} is not a valid 4-digit number!`
      }
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
    }
  });

const User = mongoose.model('User', userSchema);

export default User;
  