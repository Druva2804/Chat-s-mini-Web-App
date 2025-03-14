const express=require("express");
const app=express();
const mongoose=require("mongoose");
const path=require("path");
const Chat=require("./models/chat.js");
const methodOverride=require("method-override");


app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));

main().then(()=>{
    console.log("Connection Successful");
}).catch(err=>console.log(err));

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/Whatsapp');

}

// let chat1=new Chat({
//     from:"Kholi",
//     to:"Rohit Sharma",
//     message:"Bhai 23rd ko match hai bhaii.",
//     created_at:new Date(),
// });

// chat1.save().then((res)=>{
//     console.log(res);
// });

const port=8080;

//Index Route
app.get("/chats",async(req,res)=>{
   let chats= await Chat.find();
   res.render("index.ejs",{chats});
});

//New Route(New Chat)
app.get("/chats/new",(req,res)=>{
    res.render("new.ejs");
});

//create route
app.post("/chats", async (req, res) => {
    let { from, message, to } = req.body;
    let newChat = new Chat({
        from: from,
        to: to,
        message: message,
        created_at: new Date()
    });
    
    try {
        await newChat.save();
        console.log("chat was saved");
        res.redirect("/chats");
    } catch (err) {
        console.log(err);
        res.send("An error occurred while saving the chat.");
    }
    
});

//Edit
app.get("/chats/:id/edit",async (req,res)=>{
    let {id}=req.params;
    let chat=await Chat.findById(id);
    res.render("edit.ejs",{chat});
})


//Update Route
app.put("/chats/:id",async (req,res)=>{
    let {id}=req.params;
    let {message:newMsg}=req.body;
    let updatedchat=await Chat.findByIdAndUpdate(id,{message:newMsg},{runValidators:true});
    console.log(updatedchat); 
    
    res.redirect("/chats");

})

//Delete Route
app.delete("/chats/:id",(req,res)=>{
    let {id}=req.params;
    let deletedChat=Chat.findByIdAndDelete(id);
    console.log(deletedChat);
    res.redirect("/chats");
})

app.get("/",(req,res)=>{
    res.send("Hello Everyone!!!");
});




app.listen(port,(req,res)=>{
    console.log(`Server is listening at ${port}`);
});

