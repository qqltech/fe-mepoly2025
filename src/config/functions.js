function flashMessage(icon, title, text){
 Swal.fire({
     icon,
     title,
     text,
     iconColor: '#244065',
     confirmButtonColor: '#244065',
     showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      }
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

function formatRupiah(angka, prefix){
    var number_string = angka.replace(/[^,\d]/g, '').toString(),
    split   		= number_string.split(','),
    sisa     		= split[0].length % 3,
    rupiah     		= split[0].substr(0, sisa),
    ribuan     		= split[0].substr(sisa).match(/\d{3}/gi);

    // tambahkan titik jika yang di input sudah menjadi angka ribuan
    if(ribuan){
        let separator = sisa ? '.' : '';
        rupiah += separator + ribuan.join('.');
    }

    rupiah = split[1] != undefined ? rupiah + ',' + split[1] : rupiah;
    return prefix == undefined ? rupiah : (rupiah ? 'Rp. ' + rupiah : '');
}

function formattedNumber(totalStock) {
    return Math.floor(totalStock).toLocaleString()
  }


  import axios from 'axios';
  function exportReport(params) {
    axios.get('https://backend.qqltech.com:7021/public/dashboard/export', {
      params: {
        from: params.from,
        to: params.to,
        type: params.type,
        format: params.format
      },
      responseType: 'blob'
    })
    .then(response => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'file.pdf');
      document.body.appendChild(link);
      link.click();
    })
    .catch(error => {
      console.error(error);
    });
  }

export {flashMessage, isLogin, getDataIsLogin, format_date, formatRupiah, formattedNumber, exportReport};