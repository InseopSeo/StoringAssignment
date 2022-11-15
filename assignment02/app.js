let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let session = require('express-session')

app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 }}))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


let users = new Array();
users[0] = {
	"userId" : 0,
	"name" : "jin",
	"password" : "abc",
	"isAdmin" : true
}

app.put('/login', (req, res) => {
	let Id = req.body.userId;
	let password = req.body.name;
	let isAdmin = req.body.isAdmin;

	req.session.userId = Id;
	req.session.isAdmin = isAdmin;



	// users 배열에서 찾도록 처리 해야 함
	// admin 여부를 확인하여 체크
	// req.body.id : ID
	// req.body.name : 패스워드
	
	res.send("Login");
});

app.put('/logout', (req, res) => {
	// Logout
	// 세션 유효 여부를 체크하고 세션 Delete
	req.session.userId = null;
	res.send("LogOut");

});

let auth = (req, res, next) => {
	if (req.session.isAdmin)
		next();
	
	
	// Session Check
	// 어드민 여부 체크 필요
	if (req.session.userId != null)
		next();
	else
		res.send("Error");

};
app.get('/user/:userId', auth, (req, res) => {
	if (auth)
	// get User Information
	res.send("OK");
});

app.post('/userpost', (res, req) => {
	users[req.body.userId] = [req.body.userId, req.body.name, req.body.password, req.body.isAdmin];
	res.send("회원가입 완료");


	// 유저 회원가입
})

// 사용자 추가 시에 admin 여부도 추가해야 함

let server = app.listen(80);
