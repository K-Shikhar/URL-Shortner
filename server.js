const express= require("express")
const app=express()
const shortURL = require("./models/shortUrl")
const mongoose=require("mongoose")
const shortId =require("shortid")
const {DBHOST} = require("./config/config")


mongoose.connect(DBHOST,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(()=>console.log("Database Connected")).catch(err=>res.send(err));


app.set('view engine','ejs');
app.use(express.urlencoded({extended:true}));


app.get("/",(req,res)=>{
    res.render("shortUrl",{"shortUrl":""})
})

app.post("/",async (req,res)=>{
    const short = shortId.generate();
    await shortURL.create({fullUrl:req.body.fullURL,shortUrl:short});
    const URL =req.protocol + '://' + req.get('host')+'/'+short

    res.render("shortUrl",{"shortUrl":short,"URL":URL});
})

app.get("/:shortURL",async (req,res)=>{
    const shortUrl= await shortURL.findOne({shortUrl:req.params.shortURL});
    if(shortUrl==null)
    {
        return res.send("Invalid URL");
    }
    res.redirect(shortUrl.fullUrl);
})



const Port= process.env.PORT || 5000

app.listen(Port,()=>{
    console.log("server started")
})
