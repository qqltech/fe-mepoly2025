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

export {flashMessage, isLogin, getDataIsLogin};