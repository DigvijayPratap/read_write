const mongoose=require("mongoose");

//mongoose.connect( "mongodb+srv://Digvijaypratap1212:DDii1212@cluster0.scm7whs.mongodb.net/?retryWrites=true&w=majority" ,
mongoose.connect("mongodb+srv://Digvijaypratap1212:DDii1212@cluster0.scm7whs.mongodb.net/test",
{
    useNewUrlParser:true,
    //useCreateIndex:true,
    useUnifiedTopology:true,
    //useFindAndModify:false
})
.then(()=>{  console.log("connected database")})
.catch((e)=>{console.log(e)});