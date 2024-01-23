const express = require('express');
const app = express({xPoweredBy:false});
const fs = require('fs');

app.set('view engine', 'ejs');
app.set('views', 'templates');

app.use(require('./setting'));

app.use('/user',(req,res,next)=>{
    req.users =
    JSON.parse(
        fs.readFileSync(
            'user.json',{encoding:'utf-8'}
        )
    ).users;
    next();
});
app.get('/user',(req,res,next)=>{
    fs.readFileSync('user.json');
    res.send(total);
});

app.post('/user',(req,res,next)=>{
    if(req.body.id && req.body.pw){
        let user = req.users
        .filter(
            user=>
            req.body.id.toLowerCase() ===
            user.id.toLowerCase() &&
            req.body.pw ===
            user.pw
        );
        if(user.lenth === 0) res.status(404);
        else res.send(user[0])
    }else res.status(200).send({});
    
});
app.put('/user',(req,res,next)=>{
    if(req.body.id && req.body.pw){
        if(req.users
            .filter(
            user=>
            req.body.id.toLowerCase() ===
            user.id.toLowerCase()
        )){
        req.users.push({
            id:req.body.id,
            pw:req.body.pw,
            role:"user"
        });
        fs.writeFileSync(
            'user.json',
            JSON.stringify(
                {users:req.users}
            )
        )
        }
        else res.status(200).send({});
    }
});

module.exports = app;