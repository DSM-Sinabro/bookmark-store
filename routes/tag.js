const express= require('express');

const route= express.Router();

const connection= require('./mysql.js');

router.route('/tag').post((req,res)=>{
    console.log('/tag post');
    var writeIdx= req.body.index;
    var tags= req.body.tags;
    var userid= req.body.userid;

    for(var i=0;i<tags.length;i++){
        const tagInput={
            'bookmarkId':writeIdx,
            'contant':tags[i],
            'userid':userid 
        }
        connection.query('insert into tags set ?',tagInput,(err,result)=>{
            if(err){
                throw err;
                console.log(err);
            }
            console.log('insert tag : '+i+'/'+tags.length);
        });
    }
})