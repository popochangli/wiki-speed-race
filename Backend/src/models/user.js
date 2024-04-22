import mongoose from 'mongoose'; 

const userSchema = new mongoose.Schema({
    name: {
      type: String,
      unique: true,
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
        require: false
    },
    start: {
        type: String,
        require: true
    },
    goal: {
        type: String,
        require: true
    }
  });

const User = mongoose.model('User', userSchema);

export default User;
  