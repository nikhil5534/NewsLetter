const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https =require("https");

const app =express();

app.use(express.static("Public"));
app.use(bodyParser.urlencoded({extended: true}));
app.get("/",function(req,res){
    res.sendFile(__dirname + "/signup.html");
});
app.post("/",function(req,res){
    const fn =req.body.fn;
    const ln =req.body.ln;
    const email =req.body.e;
    const data = {
        members: [
            {
                email_address:email,
                status: "subscribed",
                merge_fields: {
                    FN:fn,
                    LN:ln
                }
            }
        ]
    };
    const jsonData =JSON.stringify(data);
    const url="https://us12.api.mailchimp.com/3.0/lists/5aa90e97f1";
    const option ={
        method: "POST",
        auth :"nikhil:5af3f7f86c364909f35fbbecea0cf936-us12"
    }
    const request = https.request(url,option,function(resp){
        if (resp.statusCode === 200) {
            res.sendFile(__dirname + "/success.html");
        }
        else{
            res.sendFile(__dirname + "/failure.html");
        }
        resp.on ("data",function(data){
            console.log(JSON.parse(data));
        })
    })
    request.write(jsonData); 
    request.end();
});
app.post("/failure",function(req,res){
    res.redirect("/");
})

app.listen(process.env.PORT||3000,function(){
    console.log("Server running at port 3000");
});
// 
// 