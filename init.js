const mongoose=require("mongoose");
const Chat = require("./models/chat");

main()
.then(()=>{
    console.log("connection successful");
})
.catch((err)=>{
    console.log("err");
});

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/Whatsapp");
}

const allchats = [
    {
        from: "Kohli",
        to: "Rohit Sharma",
        message: "Bhai 23rd ko match hai bhaii.",
        created_at: new Date(),
    },
    {
        from: "Dhoni",
        to: "Jadeja",
        message: "Practice kab shuru karni hai?",
        created_at: new Date(),
    },
    {
        from: "Rohit Sharma",
        to: "Bumrah",
        message: "Bowling plans discuss karne hain.",
        created_at: new Date(),
    },
    {
        from: "Virat Kohli",
        to: "Shubman Gill",
        message: "Net session kaisa raha?",
        created_at: new Date(),
    },
    {
        from: "Hardik Pandya",
        to: "KL Rahul",
        message: "Match ke baad dinner?",
        created_at: new Date(),
    },
    {
        from: "Shami",
        to: "Siraj",
        message: "Line aur length par focus karenge.",
        created_at: new Date(),
    },
    {
        from: "Ashwin",
        to: "Axar Patel",
        message: "Spinning pitch hai, ready rehna.",
        created_at: new Date(),
    },
    {
        from: "Jadeja",
        to: "Dhoni",
        message: "Batting order mein kya change hai?",
        created_at: new Date(),
    },
    {
        from: "KL Rahul",
        to: "Hardik Pandya",
        message: "Fielding drills kab start karenge?",
        created_at: new Date(),
    },
    {
        from: "Bumrah",
        to: "Rohit Sharma",
        message: "New ball ke saath strategy kya hai?",
        created_at: new Date(),
    }
];

Chat.insertMany(allchats);