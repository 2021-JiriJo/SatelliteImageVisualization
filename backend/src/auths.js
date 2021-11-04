import express from 'express';
import crypto from 'crypto';
import connection from '../db_connection.js';

const router = express.Router();


router.post('/login', (req, res)=>{

    try {
        const query = {
            name: 'login',
            text: 'select id, user_id, password from public.users where id = $1',
            values: [req.body.id]
        };
        
        connection
            .query(query)
            .then(query_res=>{
                if(query_res.rows.length <= 0) {
                    return res.status(401).send("로그인 실패"); 
                }
                else{
                    const pw = crypto.pbkdf2Sync(req.body.password,'salt',103286,64,'sha512').toString('base64');
                    if(query_res.rows[0].password == pw){
                        
                        req.session.save(err=>{
                            req.session.user_id = query_res.rows[0].id;
                            req.session.uuid = query_res.rows[0].user_id;
                            if(err) throw err;
                            res.send(query_res.rows[0].id);
                        })
                        
                    }
                    else{
                        return res.status(401).send("로그인 실패");
                    }
                    
                }
            })
            .catch(err=>{
                console.log(err);
            });

      }catch(e){
          console.log(e);
      }
});

router.get('/login', (req, res)=>{
    if(req.session.user_id != undefined){
        res.send(req.session.user_id);
    }
    else{
        res.sendStatus(401);
    }    

});

router.get('/logout', (req, res)=>{

    if(req.session.user_id != undefined){
        req.session.destroy(err=>{
            if(err) throw err;
        });
        res.sendStatus(200);
    }
    else{
        res.sendStatus(401);
    }
        
});



router.post('/register', (req, res)=>{
    try {
        if(req.body.password.length < 8){
            return res.status(401).send("비밀번호가 너무 짧습니다");
        }

        const password = crypto.pbkdf2Sync(req.body.password,'salt',103286,64,'sha512').toString('base64');

        const query = {
            name: 'register',
            text: `INSERT INTO public.users(id, name, password) VALUES ($1,'test',$2);`,
            values: [req.body.id, password]
        };

        connection
            .query(query)
            .then((query_res)=>{
                res.send("가입 성공");
            })
            .catch(err=>{
                console.log(err.detail);
                return res.status(401).send("가입 실패. 이미 아이디가 존재합니다");
            })

      }catch(e){
          console.log(e);
      }
});

export default router;