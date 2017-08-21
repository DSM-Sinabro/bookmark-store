const express= require('express');

const router= express.Router();

const connection= require('../mysql.js');

router.route('/search').post((req,res)=>{
    console.log('/search post');
    const input= req.body.search;
    
    const tagSql='SELECT url, title, userId, rec, date from bookmark where uid= select bookmarkId from tag where contant=?';
    const titleSql='SELECT url, title, userId, rec, date from bookmark where title= ?';
    const output={

    };
    const sendOutput={

    };
    const limit=10;
    connection.query(tagSql,[input],(err, tagResult)=>{
        if(err){
            console.log(err);
            res.sendStatus(400);
        }
        output+=tagResult;
        connection.query(titleSql,[input],(err,titleResult)=>{
            if(err){
                console.log(err);
                res.sendStatus(400);
            }
            output+=titleResult;
            for(var i=0; i<limit;i++){
                sendOutput+=output[i];
                if(i==limit){
                    res.json(output);
                }
            }
        });
    });
})

module.exports= router;
