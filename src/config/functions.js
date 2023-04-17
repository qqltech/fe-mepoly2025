function flashMessage(icon, title, text){
 Swal.fire({
     icon,
     title,
     text,
     iconColor: '#244065',
     confirmButtonColor: '#244065',
 })
}

function isLogin(){
 const getDataLocal = localStorage.getItem('admin');
 const isexist = JSON.parse(getDataLocal);
 if(isexist.token && isexist.user.role === 'admin'){
     return true;
 }
 return false;
}

function getDataIsLogin(){
 const getDataLocal = localStorage.getItem('admin');
 const data = JSON.parse(getDataLocal);
 if(isLogin){
     return data;
 }
 return null;
}

function format_date(date) {
    const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    };
    const dateTemp = new Date(date);
    return dateTemp.toLocaleDateString("id-ID", options);
}

export {flashMessage, isLogin, getDataIsLogin, format_date};