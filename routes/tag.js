const express= require('express');

const router= express.Router();

const connection= require('../mysql.js');

router.route('/tag').post((req,res)=>{
    console.log('/tag post');
    var writeIndex= req.body.index;
    var tags= req.body.tags;
    var userid= req.body.userId;

    for(var i=0;i<tags.length;i++){
        const tagInput={
            'bookmarkId':writeIndex,
            'contant':tags[i],
            'userid':userid 
        }
        connection.query('select ? from tag',[tags[i]],(err,result)=>{
            if(err){
                console.log(err);
                res.sendStatus(400);
            }
            if(!result){
                connection.query('insert into tags set ?',tagInput,(err,result)=>{
                    if(err){
                        console.log(err);
                        res.sendStatus(500);
                    }
                    console.log('insert tag : '+i+'/'+tags.length);
                    res.sendStatus(201);
                });
            }
        })
    }
}).delete((req,res)=>{
    console.log('/tag delete');
    const uid= req.body.uid;

    connection.query('delete from tag where uid=?',[uid],(err,result)=>{
        if(err){
            console.log(err);
            res.sendStatus(400);
        }
    })
})

module.exports= router;
