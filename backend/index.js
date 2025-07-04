const express = require('express');
const Roomroutes = require('./routes/rooms');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.text());

app.use('/api/v1',Roomroutes);

app.listen(3000,()=>console.log("server is running...."));