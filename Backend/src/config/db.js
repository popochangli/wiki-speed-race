import mongoose from 'mongoose';

mongoose.connect('mongodb+srv://popo:1234@cluster0.ksomz0k.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0').then(() => {
  console.log(`successfully connected`);
}).catch((e) => {
  console.log(`not connected` + e);
});