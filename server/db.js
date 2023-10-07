const mongoose=require('mongoose');
const Connection =async()=>{
    try{
mongoose.connect("mongodb://127.0.0.1:27017/iNoteBook");
console.log("db connected")

} catch(error){
    console.log("error found",error)
}
}
module.exports=  Connection;
