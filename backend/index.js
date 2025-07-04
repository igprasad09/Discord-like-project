const express = require('express');
const Roomroutes = require('./routes/rooms');
const cors = require('cors');
const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.text());

app.use('/api/v1',Roomroutes);

app.listen(PORT,()=>console.log("server is running...."));