const express = require('express'); 
const mongoose = require('mongoose'); 
const dotenv = require('dotenv');
dotenv.config();
const app = express();
app.use(express.json())

//-------------------- เชื่อมต่อ mongoDB --------------------//
mongoose.connect(process.env.MONGO_DB_URI,{

}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

//--------------------------------------------------------//


//config Routes

  const authRoute = require('./routes/auth');
  app.use('/api/auth', authRoute);


  const transactionRoutes = require('./routes/transaction');
  app.use('/api', transactionRoutes);
  

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));