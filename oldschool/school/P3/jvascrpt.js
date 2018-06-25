function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
	var visits = 0;
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return "";
}

function checkCookie() {
    var user = getCookie("username");
	var uno = user;
	document.getElementById("name24").innerHTML = "";
    if (user != "") {
		if(user == "Captain Jean-Luc Picard of the USS Enterprise"){
			alert("Welcome aboard, Captain!");
			document.body.style.background = "url('woo.gif')";
			document.getElementById("yeno").src = "jlp.mp3";
			for(i = 1; i < 22; i++){
				document.getElementById("name" + i).innerHTML = user;
			}	
			document.getElementById("name23").innerHTML = "";
			colorz();
		}else{
			alert("Welcome again " + user + ", your visit has been noted.")
			var r = confirm("Будете ли вы, " + user + ", присоединиться к КГБ за Родину?");
			if(r == true){
					if(user == "Putin"){
						alert("You Salute You");
						document.getElementById("name23").innerHTML = "";
						document.body.style.background = "url('yey.jpg')";
					}else{
						alert("Putin Salutes You");
						document.body.style.background = "url('urwelcom.gif')";
							//putin 4 president
						document.getElementById("h1").innerHTML = "Виноваты Aмериканцев!";
						document.getElementById("reel").innerHTML = "Голосуйте за Путина!";
						document.getElementById("родина").src = "url('??????.gif')";
						document.getElementById("woo").src = "yey.jpg";
					}
				document.getElementById("yeno").src = "anth.mp3";
			}else{
				if(user == "Putin"){
					alert("You must have misclicked");
					checkCookie();
				}else{
					alert("Whatever. Be that way");
					document.getElementById("woo").src = "disappoint.jpg";
					document.getElementById("yeno").src = "revanth.mp3";
				}
			}
		}
    } else {
        user = prompt("Enter your name comrade:", "");
        if (user != "" && user != null) {
            setCookie("username", user, 365);
        }
    }
}

function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function colorz(){
	setInterval(function(){
		for(i = 1; i < 22; i++){
				document.getElementById("name" + i).style.color = getRandomColor();
		}
	}, 50)
}