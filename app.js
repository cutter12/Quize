const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000;
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const ADODB = require('node-adodb');
const flash = require('req-flash');

var     dirname = 'Provider=Microsoft.ACE.OLEDB.12.0;Data Source='+__dirname+'\\models\\QUIZ.accdb;Persist Security Info=False;';
const connection = ADODB.open(dirname);

app.set('view engine','ejs')
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser());
app.use(methodOverride('_method'));
app.use(express.static('public'));
app.use(session({
    secret:'Hello',
    resave:false,
    saveUninitialized:false
}));
app.use(flash());



var sess;

function isLoggedIn(req,res,next){
    sess = req.session;
    if(sess.pass){
        next();
    }else{
        res.redirect('/');
    }
    
}



app.post('/login',(req,res)=>{
    var password = req.body.password;
    if(password === '1'){
        sess = req.session;
        sess.pass = req.body.password;
        res.redirect('/body');
    }else{
        req.flash('error','รหัสไม่ถูกต้อง');
        res.redirect('/');
    }
});




app.post('/send',async(req,res)=>{

    var start = req.body.test_start.slice(0,24)
    var end = req.body.test_end.slice(0,24)
    var test_time = req.body.test_time
    var name = req.body.person_name;
    var score_testvision = 0;
    var v1;
    
   
    

// question and answer should be same var name
    

// แบบทดสอบที่ 1 ทดสอบการมองเห็น จำนวน 5 ข้อ 5 คะแนน
    var testvision = {
        a1:req.body.ans1,
        a2:req.body.ans2,
        a3:req.body.ans3,
        a4:req.body.ans4,
        a5:req.body.ans5
    }
    ans_testvision = {
        a1:'E',
        a2:'E',
        a3:'C',
        a4:'A',
        a5:'A'
    }

for(v1 in testvision){
    if(testvision[v1] === ans_testvision[v1]){
        score_testvision += 1;
    }
}
    
// -----------------------------------------------------------------------------------------------------------------------------------------------------
// แบบทดสอบที่ 2 แบบทดสอบ 3 มิติ จำนวน 5 ข้อ 5 คะแนน ** ในแต่ละข้อต้องตอบให้ถูกทั้ง 3 มุม จึงจะได้ 1 คะแนน
var score_test3d = 0;
var q1;
var q2;
var q3;
var q4;
var q5;
var a1 = 0;
var a2 = 0;
var a3 = 0;
var a4 = 0;
var a5 = 0;


    var test3d1 = {
        sideA:req.body.ans1_1,
        sideB:req.body.ans1_2,
        sideC:req.body.ans1_3,
    },
        test3d2 = {
        sideA:req.body.ans2_1,
        sideB:req.body.ans2_2,
        sideC:req.body.ans2_3,
    },
        test3d3 = {
        sideA:req.body.ans3_1,
        sideB:req.body.ans3_2,
        sideC:req.body.ans3_3,
    },
        test3d4 = {
        sideA:req.body.ans4_1,
        sideB:req.body.ans4_2,
        sideC:req.body.ans4_3,
    },
        test3d5 = {
        sideA:req.body.ans5_1,
        sideB:req.body.ans5_2,
        sideC:req.body.ans5_3,
    },
    ans_test3d1 = {
        sideA:'iii',        
        sideB:'ii',
        sideC:'iv'    
    },
    ans_test3d2 = {
        sideA:'iv',
        sideB:'i',
        sideC:'i'    
    },
    ans_test3d3 = {
        sideA:'i',
        sideB:'iii',
        sideC:'ii'    
    },
    ans_test3d4 = {
        sideA:'v',
        sideB:'v',
        sideC:'iii'    
    },
    ans_test3d5 = {
        sideA:'ii',
        sideB:'iv',
        sideC:'iv'    
    }    


    
    for(q1 in test3d1){
        if(test3d1[q1] === ans_test3d1[q1]){
            a1 += 1;
            if(a1 > 2){
                score_test3d+=1;
            }
        }
    }

    for(q2 in test3d2){
        if(test3d2[q2] === ans_test3d2[q2]){
            a2 += 1;
            if(a2 > 2){
                score_test3d+=1;
            }
        }
    }
    for(q3 in test3d3){
        if(test3d3[q3] === ans_test3d3[q3]){
            a3 += 1;
            if(a3 > 2){
                score_test3d+=1;
            }
        }
    }
    for(q4 in test3d4){
        if(test3d4[q4] === ans_test3d4[q4]){
            a4 += 1;
            if(a4 > 2){
                score_test3d+=1;
            }
        }
    }
    for(q5 in test3d5){
        if(test3d5[q5] === ans_test3d5[q5]){
            a5 += 1;
            if(a5 > 2){
                score_test3d+=1;
            }
        }
    }

// -----------------------------------------------------------------------------------------------------------------------------------------------------

//แบบทดสอบที่ 3 แบบลำดับต่อเนื่อง จำนวน 10 ข้อ   


    var TestQueue1 = {
        test1queue1:req.body.test1queue1,
        test1queue2:req.body.test1queue2
    },
        TestQueue2 = {
        test2queue1:req.body.test2queue1,
        test2queue2:req.body.test2queue2
    },
        TestQueue3 = {
        test3queue1:req.body.test3queue1,
        test3queue2:req.body.test3queue2
    },
        TestQueue4 = {
        test4queue1:req.body.test4queue1,
        test4queue2:req.body.test4queue2
    },
        TestQueue5 = {
        test5queue1:req.body.test5queue1,
        test5queue2:req.body.test5queue2
    },
        TestQueue6 = {
        test6queue1:req.body.test6queue1,
        test6queue2:req.body.test6queue2
    },
        TestQueue7 = {
        test7queue1:req.body.test7queue1,
        test7queue2:req.body.test7queue2
    },
        TestQueue8 = {
        test8queue1:req.body.test8queue1,
        test8queue2:req.body.test8queue2
    },
        TestQueue9 = {
        test9queue1:req.body.test9queue1,
        test9queue2:req.body.test9queue2
    },
        TestQueue10 = {
        test10queue1:req.body.test10queue1,
        test10queue2:req.body.test10queue2
    },
        ans_TestQueue1 = {
        test1queue1:'D',
        test1queue2:'E'
    },
        ans_TestQueue2 = {
        test2queue1:'E',
        test2queue2:'F'
    },
        ans_TestQueue3 = {
        test3queue1:'C',
        test3queue2:'E'
    },
        ans_TestQueue4 = {
        test4queue1:'D',
        test4queue2:'A'
    },
        ans_TestQueue5 = {
        test5queue1:'B',
        test5queue2:'F'
    },
        ans_TestQueue6 = {
        test6queue1:'B',
        test6queue2:'G'
    },
        ans_TestQueue7 = {
        test7queue1:'F',
        test7queue2:'G'
    },
        ans_TestQueue8 = {
        test8queue1:'B',
        test8queue2:'D'
    },
        ans_TestQueue9 = {
        test9queue1:'A',
        test9queue2:'I'
    },
        ans_TestQueue10 = {
        test10queue1:'F',
        test10queue2:'G'
    }

    var score_testqueue = 0;

    var j1;
    var j2;
    var j3;
    var j4;
    var j5;
    var j6;
    var j7;
    var j8;
    var j9;
    var j10;
    var k1 = 0;
    var k2 = 0;
    var k3 = 0;
    var k4 = 0;
    var k5 = 0;
    var k6 = 0;
    var k7 = 0;
    var k8 = 0;
    var k9 = 0;
    var k10 = 0;


    for(j1 in TestQueue1){
        if(TestQueue1[j1] === ans_TestQueue1[j1]){
            k1 += 1;
            if(k1 > 1){
                score_testqueue+=1;
            }
        }
    }
    for(j2 in TestQueue2){
        if(TestQueue2[j2] === ans_TestQueue2[j2]){
            k2 += 1;
            if(k2 > 1){
                score_testqueue+=1;
            }
        }
    }
    for(j3 in TestQueue3){
        if(TestQueue3[j3] === ans_TestQueue3[j3]){
            k3 += 1;
            if(k3 > 1){
                score_testqueue+=1;
            }
        }
    }
    for(j4 in TestQueue4){
        if(TestQueue4[j4] === ans_TestQueue4[j4]){
            k4 += 1;
            if(k4 > 1){
                score_testqueue+=1;
            }
        }
    }
    for(j5 in TestQueue5){
        if(TestQueue5[j5] === ans_TestQueue5[j5]){
            k5 += 1;
            if(k5 > 1){
                score_testqueue+=1;
            }
        }
    }
    for(j6 in TestQueue6){
        if(TestQueue6[j6] === ans_TestQueue6[j6]){
            k6 += 1;
            if(k6 > 1){
                score_testqueue+=1;
            }
        }
    }
    for(j7 in TestQueue7){
        if(TestQueue7[j7] === ans_TestQueue7[j7]){
            k7 += 1;
            if(k7 > 1){
                score_testqueue+=1;
            }
        }
    }
    for(j8 in TestQueue8){
        if(TestQueue8[j8] === ans_TestQueue8[j8]){
            k8 += 1;
            if(k8 > 1){
                score_testqueue+=1;
            }
        }
    }
    for(j9 in TestQueue9){
        if(TestQueue9[j9] === ans_TestQueue9[j9]){
            k9 += 1;
            if(k9 > 1){
                score_testqueue+=1;
            }
        }
    }
    for(j10 in TestQueue10){
        if(TestQueue10[j10] === ans_TestQueue10[j10]){
            k10 += 1;
            if(k10 > 1){
                score_testqueue+=1;
            }
        }
    }


var testword = {

    tw1:req.body.testword1,
    tw2:req.body.testword2,
    tw3:req.body.testword3,
    tw4:req.body.testword4,
    tw5:req.body.testword5,
    tw6:req.body.testword6,
    tw7:req.body.testword7,
    tw8:req.body.testword8,
    tw9:req.body.testword9,
    tw10:req.body.testword10

},
    ans_testword = {
    tw1:'C',
    tw2:'A',
    tw3:'D',
    tw4:'D',
    tw5:'B',
    tw6:'F',
    tw7:'D',
    tw8:'C',
    tw9:'E',
    tw10:'D'
}
var score_testword = 0;
var tt1;

for(tt1 in testword){
    if(testword[tt1] === ans_testword[tt1]){
        score_testword += 1;
    }
}

var testmath = {
    tm1:req.body.testmath1,
    tm2:req.body.testmath2,
    tm3:req.body.testmath3,
    tm4:req.body.testmath4,
    tm5:req.body.testmath5,
    tm6:req.body.testmath6,
    tm7:req.body.testmath7,
    tm8:req.body.testmath8,
    tm9:req.body.testmath9,
    tm10:req.body.testmath10,
},
    ans_testmath = {
        tm1:'4',
        tm2:'1.3',
        tm3:'1/9',
        tm4:'6',
        tm5:'64',
        tm6:'45',
        tm7:'4.90',
        tm8:'0.3',
        tm9:'14.50',
        tm10:'210'
    }
    var score_testmath = 0;
    var tm1;
    
    for(tm1 in testmath){
        if(testmath[tm1] === ans_testmath[tm1]){
            score_testmath += 1;
        }
    }

var testeng = {
        te1:req.body.testeng1,
        te2:req.body.testeng2,
        te3:req.body.testeng3,
        te4:req.body.testeng4,
        te5:req.body.testeng5,
        te6:req.body.testeng6,
        te7:req.body.testeng7,
        te8:req.body.testeng8,
        te9:req.body.testeng9,
        te10:req.body.testeng10,
        te11:req.body.testeng11,
        te12:req.body.testeng12,
        te13:req.body.testeng13,
        te14:req.body.testeng14,
        te15:req.body.testeng15,
        te16:req.body.testeng16,
        te17:req.body.testeng17,
        te18:req.body.testeng18,
        te19:req.body.testeng19,
        te20:req.body.testeng20
},
    ans_testeng = {
        te1:'C',
        te2:'C',
        te3:'D',
        te4:'B',
        te5:'C',
        te6:'A',
        te7:'A',
        te8:'D',
        te9:'B',
        te10:'C',
        te11:'B',
        te12:'B',
        te13:'A',
        te14:'C',
        te15:'C',
        te16:'D',
        te17:'B',
        te18:'C',
        te19:'B',
        te20:'C',
    }
    var score_testeng = 0;
    var ta1;
    
    for(ta1 in testeng){
        if(testeng[ta1] === ans_testeng[ta1]){
            score_testeng += 1;
        }
    }

    var summaryScore = 0;
    summaryScore = (score_testvision + score_test3d + score_testqueue + score_testword + score_testmath + score_testeng);


try{
    const data = await connection.execute(`
                        INSERT INTO Test(test_start,test_finish,test_time,
                        test_a1,test_a2,test_a3,test_a4,test_a5,
                        test3d1_A,test3d1_B,test3d1_C,
                        test3d2_A,test3d2_B,test3d2_C,
                        test3d3_A,test3d3_B,test3d3_C,
                        test3d4_A,test3d4_B,test3d4_C,
                        test3d5_A,test3d5_B,test3d5_C,
                        test1queue1,test1queue2,test2queue1,test2queue2,
                        test3queue1,test3queue2,test4queue1,test4queue2,
                        test5queue1,test5queue2,test6queue1,test6queue2,
                        test7queue1,test7queue2,test8queue1,test8queue2,
                        test9queue1,test9queue2,test10queue1,test10queue2,
                        testword1,testword2,testword3,testword4,testword5,
                        testword6,testword7,testword8,testword9,testword10,
                        testmath1,testmath2,testmath3,testmath4,testmath5,
                        testmath6,testmath7,testmath8,testmath9,testmath10,
                        testeng1,testeng2,testeng3,testeng4,testeng5,
                        testeng6,testeng7,testeng8,testeng9,testeng10,
                        testeng11,testeng12,testeng13,testeng14,testeng15,
                        testeng16,testeng17,testeng18,testeng19,testeng20,
                        score_vision,score_3d,score_queue,score_word,score_math,score_eng,
                        summaryScore
                        )
                        VALUES('${start}','${end}','${test_time}',
                        '${testvision.a1}','${testvision.a2}','${testvision.a3}','${testvision.a4}','${testvision.a5}',
                        '${test3d1.sideA}','${test3d1.sideB}','${test3d1.sideC}',
                        '${test3d2.sideA}','${test3d2.sideB}','${test3d2.sideC}',
                        '${test3d3.sideA}','${test3d3.sideB}','${test3d3.sideC}',
                        '${test3d4.sideA}','${test3d4.sideB}','${test3d4.sideC}',
                        '${test3d5.sideA}','${test3d5.sideB}','${test3d5.sideC}',
                        '${TestQueue1.test1queue1}','${TestQueue1.test1queue2}',
                        '${TestQueue2.test2queue1}','${TestQueue2.test2queue2}',
                        '${TestQueue3.test3queue1}','${TestQueue3.test3queue2}',
                        '${TestQueue4.test4queue1}','${TestQueue4.test4queue2}',
                        '${TestQueue5.test5queue1}','${TestQueue5.test5queue2}',
                        '${TestQueue6.test6queue1}','${TestQueue6.test6queue2}',
                        '${TestQueue7.test7queue1}','${TestQueue7.test7queue2}',
                        '${TestQueue8.test8queue1}','${TestQueue8.test8queue2}',
                        '${TestQueue9.test9queue1}','${TestQueue9.test9queue2}',
                        '${TestQueue10.test10queue1}','${TestQueue10.test10queue2}',
                        '${testword.tw1}','${testword.tw2}','${testword.tw3}','${testword.tw4}','${testword.tw5}',
                        '${testword.tw6}','${testword.tw7}','${testword.tw8}','${testword.tw9}','${testword.tw10}',
                        '${testmath.tm1}','${testmath.tm2}','${testmath.tm3}','${testmath.tm4}','${testmath.tm5}',
                        '${testmath.tm6}','${testmath.tm7}','${testmath.tm8}','${testmath.tm9}','${testmath.tm10}',
                        '${testeng.te1}','${testeng.te2}','${testeng.te3}','${testeng.te4}','${testeng.te5}',
                        '${testeng.te6}','${testeng.te7}','${testeng.te8}','${testeng.te9}','${testeng.te10}',
                        '${testeng.te11}','${testeng.te12}','${testeng.te13}','${testeng.te14}','${testeng.te15}',
                        '${testeng.te16}','${testeng.te17}','${testeng.te18}','${testeng.te19}','${testeng.te20}',
                        ${score_testvision},${score_test3d},${score_testqueue},${score_testword},${score_testmath},${score_testeng},
                        ${summaryScore})
                    `)
    const result = await connection.query(`
                                            SELECT TOP 1 test_id
                                            FROM Test 
                                            ORDER BY test_id DESC
                                        `)
    const done = await connection.execute(`
                                            INSERT INTO Person(person_fullname,test_id)
                                            VALUES ('${name}','${result[0].test_id}')
                                        `)

    
}catch(error){
    console.log(error)
}


//ตรวจคำตอบและเก็บคะแนน
});



app.get('/result',async(req,res)=>{
    try{
        const result = await connection.query(`
            SELECT Person.person_fullname,Test.* 
            FROM Person INNER JOIN Test ON Person.test_id = Test.test_id
            ORDER BY Test.test_id DESC`);
        res.render('result',{results:result});
    }catch(err) {console.log(err);}
})




app.get('/body',isLoggedIn,(req,res)=>{
    res.render('body');
});

app.get('/logout',(req,res)=>{
    req.session.destroy((error=>{
        console.log(error);
    }))
    res.redirect('/');
});


function encryptChar(){
    var i;
    var random_number = [];
    var symbol = [
                'a','B','c','D','e',
                'F','g','H','i','Z',
                ':','1','2','3','4',
                '5','6','7','8','9',
                '_','*','%','@','&'
                ];
    var result = [];
    var num;
    for(i = 0 ; i < 25 ; i++){   
        num = Math.floor(Math.random() * 25);
        result.push(symbol[num]);
    }
    const re = result.toString()
    return re.split(',').join('');
}



app.get('/',(req,res)=>{
    res.render('login',{log_check:req.flash()});
});

app.listen(PORT,()=>{`Server has started at PORT ${PORT}`});
