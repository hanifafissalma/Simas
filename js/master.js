var url= window.location.pathname;
var url_array=url.split('/');
var current = url_array[url_array.length-1];
if(getCookie('princess')!=''){
    if(current=='login.html'){
        window.location.href='./';
    }
}else{
    if(current=='index.html'|| current==''){
        window.location.href='login.html';
    }
}
console.log(url_array[url_array.length-1]);

function setCookie(cname, cvalue) {
    document.cookie = cname + "=" + cvalue + ";";
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}