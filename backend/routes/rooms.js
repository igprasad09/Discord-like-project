const express = require("express");
const { Room } = require("../db_models/roomdb");
const { createUserCheker } = require("../middleware/roomMiddleware");
const routes = express.Router();

routes.post("/create-room", createUserCheker, async (req, res) => {
  try {
    await Room.create({
      room_name: req.body.room_name,
    });

    return res.json({
      message: "Room created successfully",
    });
  } catch (error) {
    return res.status(411).json({
      message: error,
    });
  }
});

routes.delete("/delete-room", async (req, res) => {
  const { room_name } = req.body;

  Room.deleteOne({ room_name })
    .then(() => {
      res.json({
        message: "Removed successfully",
      });
    })
    .catch((error) => {
      res.status(411).json({
        message: error.message,
      });
    });
});

//push messages in room
routes.post("/addmsg",async (req, res) => {
          const {room_name} = req.headers;
          const text = req.body; 
          
          Room.findOneAndUpdate({
                 room_name
          },{
            $push:{
                messages: text
            }
          }).then(()=>{
               res.json({
                     message: "Success"
               })
          }).catch((error)=>{
              res.json({
                  message:error
              })
          })   
});


routes.get('/getrooms',async(req, res)=>{
        const room = await Room.find();
        const roomNames = room.map((name)=>{
                                return name.room_name
                           })
        return res.json({
           roomNames
        })
});

routes.get('/getmsgs',async(req, res)=>{
        const {room_name} = req.headers;
        
        try{
            const msgs = await Room.find({
                    room_name
               })

              return res.json({
                     message: msgs[0].messages
               })
        }catch(err){
             return res.status(411).json({
                  message: err
             })
        }

      
})

module.exports = routes;
