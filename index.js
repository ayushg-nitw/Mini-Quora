const express= require("express");
const app= express();
const port= 8080;
const path= require("path");
const { v4: uuidv4 } = require("uuid");
const coolImages = require("cool-images");
const methodOverride=require("method-override");

app.use(methodOverride('_method'));
app.set("view engine","ejs");
app.set(path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended : true}));

//genrally from db below array data comes
let posts=[   
  {  username: "ayushg-nitw",
     content :"Don't think what people will think",
     image:coolImages.one(),
     id:uuidv4()
  },
  {  username: "manish-verma",
     content :"Nothing is permanent in the world",
     image:coolImages.one(),
     id:uuidv4()
  },
  {  username: "amanraj-bihar",
     content :"One day this time will also go",
     image:coolImages.one(),
     id:uuidv4()
  },
  {  username: "heramb-mumbai",
     content :"You are previliged for being a human",
     image:coolImages.one(),
     id:uuidv4()
  }
]

app.get("/posts",(req,res)=>{
   res.render("index.ejs",{posts});
});

app.get("/posts/new",(req,res)=>{
   res.render("new.ejs");
});

app.post("/posts",(req,res)=>{
   let {username,content}=req.body;
   let image = coolImages.one();
   let id=uuidv4();
   posts.push({username,content,image,id});
   res.redirect("/posts");
});

app.get("/posts/:username",(req,res)=>{
   let {username}=req.params;
   let post=posts.find((p)=> username===p.username);
   if(post){
      res.render("show.ejs",{post});
   }
   else{
      res.render("error.ejs");
   }
});

app.get("/posts/:username/edit",(req,res)=>{
    let {username}=req.params;
   let post=posts.find((p)=> username===p.username);
      res.render("edit.ejs",{post});
});

app.patch("/posts/:username",(req,res)=>{
    let {username}=req.params;
    let post=posts.find((p)=> username===p.username);
    post.content=req.body.content;
    res.redirect("/posts");
});

app.delete("/posts/:username",(req,res)=>{
   let {username}=req.params;
   posts = posts.filter((p)=> username!==p.username);  //save in original posts after filtering
   res.redirect("/posts");
});

app.listen(port,()=>{
    console.log(`Server is ON at port ${port}`);
});