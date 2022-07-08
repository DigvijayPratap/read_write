const express =require("express");
  const path=require("path");
  const app=express();
  const hbs=require("hbs");
     require("./db/conn.js");
const Register=require("./models/registerModel")
const { json } = require("express");
const port=process.env.PORT||5000;



const static_path=path.join(__dirname,"../public");//connecting  public folder
const views_path=path.join(__dirname,"../template/views"); // to use temletes folder
 const partials_path=path.join(__dirname,"../template/partials");

 //app.use(express.json());
 app.use(express.urlencoded({extended:false}));
 app.use(express.static(static_path));  // to use static files
 app.set("views",views_path); // to use views's files
 hbs.registerPartials(partials_path); //to use partials files
app.set("view engine", "hbs"); // to use handlebar

app.get('/',(req,res)=>{
    res.render("index1");
})
app.get('/index',(req,res)=>{
    res.render("index1");
})


app.post('/index', async (req,res)=>{
    try{
       // const name=req.body.name;
        const emailId=req.body.name
  const user= await Register.findOne({email:emailId});
 //const all_Regis= await Register.find(name);
 //const user=all_Regis[0];
 const fullName=user.fullName;
 const gender=user.gender;
 const email=user.email;
 const mobNumber=user.mobNumber
const  DOB=user.DOB;
 const occupation=user.occupation;
// const password=user.password;
 // console.log(fullName)
 // console.log(DOB);
 // console.log(occupation);
  res.render("index",{
               fullName:fullName,
               gender:gender,
               email:email,
               mobNumber:mobNumber,
               DOB:DOB,
               occupation:occupation,
               
   } ); 
}catch(err){
       // res.send(err);
      res.render("error",{error:"No Record Found."});
       //console.log(err);
        }
});
app.get('/login',(req,res)=>{
    res.render("login" );
    });
app.post('/login',async (req,res)=>{
        try {
            const password=req.body.password;
            const emailId=req.body.userID;
            const user= await Register.findOne({email:emailId});
            const fullName=user.fullName;
                const gender=user.gender;
                const email=user.email;
                const mobNumber=user.mobNumber
               const  DOB=user.DOB;
                const occupation=user.occupation;
           
            if(user.password===password){
                res.render("index",{
                    fullName:fullName,
                    gender:gender,
                    email:email,
                    mobNumber:mobNumber,
                    DOB:DOB,
                    occupation:occupation,
                    
        } );
                
            }
            else{
                //console.log("envalid password");
                res.render("error",{error:"envalid password"});
            }
        } catch (err) {
            res.render("error",{error:`No record found.
                Please Register First.`})
           // res.status(400).send(err);
           // console.log(err);
        }
})
app.get('/register',(req,res)=>{
        res.render("register");
        });

app.post('/register', async (req,res)=>{
            try{
                if(req.body.confermPassword===req.body.password){
                
                    const registerEmp= new Register(
                    {
                fullName:req.body.fullName,
                gender:req.body.gender,
                email:req.body.email,
                mobNumber:req.body.mobNumber,
                DOB:req.body.DOB,
                occupation:req.body.occupation,
                password:req.body.password
                    }
                );
                const registred = await registerEmp.save();
                res.status(201).render("index",
                    {
                        fullName:req.body.fullName,
                        gender:req.body.gender,
                        email:req.body.email,
                        mobNumber:req.body.mobNumber,
                        DOB:req.body.DOB,
                        occupation:req.body.occupation
                        
                            }
                );

                }
                else{ res.render("error",{error:"Password and Conferm Password are Not Matching"});  }
                
            }catch(err){
                 if(err.keyPattern.email===1){
                            res.render("error",{error:"Email Already Registered"});
                 }
                 else
                res.status(400).send(err);
            }
       });
app.listen(port, ()=>{
   // console.log(`running at port ${port}`);
})