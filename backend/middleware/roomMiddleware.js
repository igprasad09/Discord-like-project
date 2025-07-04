const {Room} = require('../db_models/roomdb')

async function createUserCheker(req, res, next){
         const {room_name} = req.body;
         if(!room_name){
            return res.status(411).json({
                 message: "empty input",
             })
         }
         const userExists = await Room.findOne({
               room_name
         });
         if(userExists){
             return res.status(411).json({
                 message: "Room Name Exists already",
             })
         }      
         
         return next();
}

module.exports = {
     createUserCheker,
}