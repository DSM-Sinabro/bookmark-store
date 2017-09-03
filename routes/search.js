const express= require('express');

const router= express.Router();

const connection= require('../mysql.js');

router.route('/search').post((req,res)=>{
    console.log('/search post');
    const input= req.body.query;
    const sort= req.body.sort;
    
    const tagSql='SELECT url, title, userId, rec, date from bookmark where uid=(select bookmarkId from tag where content=?)';
    const titleSql='SELECT url, title, userId, rec, date from bookmark where title=?';
    const output;
    const limit=10;
    if(sort==)
    connection.query(tagSql,['%' + input + '%'],(err, tagResult)=>{
        if(err){
            console.log(err);
            res.sendStatus(400);
        }
        output=tagResult;
        connection.query(titleSql,['%' + input + '%'],(err,titleResult)=>{
            if(err){
                console.log(err);
                res.sendStatus(400);
            }
            output=output.concat(titleResult);
            res.json(output);
        });
    });
})

module.exports= router;
