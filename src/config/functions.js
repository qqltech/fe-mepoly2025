function flashMessage(icon, title, text){
 Swal.fire({
     icon,
     title,
     text,
     iconColor: '#244065',
     confirmButtonColor: '#244065',
 })
}


export {flashMessage};