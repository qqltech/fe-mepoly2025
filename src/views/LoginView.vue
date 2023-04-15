<script setup>
import config from '../config/config'
import { flashMessage } from '../config/functions'
import axios from 'axios';

</script>

<script>
const base_url = config.base_url;

export default {
    data() {
        return {
            isLoading: false,
            email: '',
            password: '',
            data: null,
        }
    },
    methods: {
        async login() {
            const payload = {
                email: this.email,
                password: this.password
            }
            try {
               this.isLoading = true

                const response = await axios.post(`${base_url}/login`, payload)
                console.log(response);
                const result = response.data;
               //  console.log(result);
                if (result.success) {
                    localStorage.setItem('admin', JSON.stringify(result.data));
                    window.location.href = '/home'
                } else {

                    flashMessage('error', 'Error', result.errormsg)
                    this.isLoading = false
                }
            } catch (error) {

                flashMessage('error', 'Error', error.response.data.errormsg)
                this.isLoading = false
            }
        }
    }
}

// export default {
//   data() {
//     return {
//       email: '',
//       password: '',
//     };
//   },
//   methods: {
//     login() {
//       axios.post('https://backend.qqltech.com:7021/login', {
//         email: this.email,
//         password: this.password
//       })
//       .then(response => {
//         // Simpan data respons ke localStorage
//         localStorage.setItem('token', response.data.token);
//         localStorage.setItem('admin', JSON.stringify(response.data.admin));
        
//         // Alihkan ke halaman lain
//         this.$router.push('/home');
//       })
//       .catch(error => {
//         console.log(error);
//         flashMessage('error', 'Error', error.response.data.message)
//       });
//     }
//   }
// };
</script>
<template>
   <div class="right-top"></div>
   <div class="left-bottom"></div>
 <div class="container">
  <div class="body d-md-flex align-items-center justify-content-between">
   <div class="box-1 mt-md-0 mt-5">
    <div class="header-box-1">
     <p class="text-header-box-1-1"><b>WELCOME</b></p>
     <p class="text-header-box-1-2 "><b>PT. MEPOLY INDUSTRY</b></p>
    </div>
    <div class="img-box-1">
     <img src="/assets/image/hello-login.png" alt="" />
    </div>
   </div>
   <div class="box-2 d-flex flex-column">
    <div class="card shadow">
     <div class="card-body">
      <div class="img-card-mt mb-2">
       <img class="img-card" src="/assets/image/logo-panjang.png" alt="Logo Mepoly-Industry" />
      </div>
      <form method="post" @submit.prevent="login">
       <div class="form-input">
        <div class="mb-3">
         <label for="inputEmail" class="form-label">Email</label>
         <input type="text" name="email" class="form-control" v-model="email" id="email" placeholder="" autocomplete="off" required/>
        </div>
        <div class="mb-3">
         <label for="inputPassword" class="form-label">Password</label>
         <input type="password" name="password" v-model="password" class="form-control position-relative" id="password" placeholder="" autocomplete="off" required/>
         <i id="mybutton" onclick="change()" class="tombol-eye">
                                        <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-eye-fill"
                                            fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                                            <path fill-rule="evenodd"
                                                d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
                                        </svg>
                                    </i>
        </div>
        <div class="mt-5  d-grid gap-2">
         <button class="btn btn-primary" type="submit" :disabled="isLoading" id="btn_login"
                                    >
                                    Login
                                    <div v-if="isLoading" class="spinner-border spinner-border-sm" role="status">
                                        <span class="visually-hidden">Loading...</span>
                                    </div>
                                </button>
        </div>
       </div>
      </form>
     </div>
    </div>
   </div>
  </div>
 </div>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Noto Sans:wght@300;400;500;600;700;800;900&display=swap");

* {
 margin: 0;
 padding: 0;
 box-sizing: border-box;
 font-family: "Noto Sans", sans-serif;
}
@media screen and (max-width:680px){

.body{
   width: auto;
   float: none;
}

}

.right-top {
   background-image: url("/assets/image/kiri.png");
   background-repeat: no-repeat;
   position: absolute;
   top: 0;
   right: 0;
   left: 150;
   width: 500px;
   height: 350px;
   transform: rotate(180deg);
}

.left-bottom {
   background-image: url("/assets/image/kiri.png");
   background-repeat: no-repeat;
   position: absolute;
   bottom: 0;
   left: 0;
   width: 500px;
   height: 350px;
}
.container {
 margin: 50px auto;
width: auto;
 zoom: 120%;
}

.body {
 position: relative;
 width: auto;
 height: 440px;
 margin: 20px auto;
 border: none;
 background-color: white !important;
 color: black !important;
 border-radius: 10px;
 overflow: hidden;
 box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
 zoom: 120%;
}

.card{
 border: none !important;
 border-radius: 10px;
}
.box-1 {
 width: 100%;
 height: 100%;
 object-fit: cover;
 background-color: #f5f5f5;
 justify-content: center;
 text-align: center;
 padding: 70px 0px;
}

.header-box-1 {
 color: #244065;
 text-align: center;
 justify-content: center;
}

.text-header-box-1-1 {
 font-size: 24px;
 font-style: normal;
 font-weight: 1000;
}

.text-header-box-1-2 {
 font-size: 16px;
 font-style: normal;
 font-weight:350;
}

.img-box-1 img {
 margin-top: 50px;
 height: 150px;
 width: 350px;
 padding: 0px 10px 0px 10px;
}

.box-2 {
 margin: 50px;
 height: 350px;
}

.inside-box-2 {
 margin: 140px;
 align-items: center;
 justify-content: center;
}

.card-body {
 padding: 40px 0px;
 border: none;
}

.img-card{
 text-align: center;
}
.form-input {
 padding: 0px 30px;
}

.form-label {
 font-size: 11px;
}

.form-control {
 padding: 5px 10px;
 font-size: 12px;
 font-family: "Noto Sans", sans-serif;
 border: 1px solid #244065;
 border-radius: 5px;
}

.box-1,
.box-2 {
 width: 50%;
}

.h-1 {
 font-size: 24px;
 font-weight: 700;
}

.text-muted {
 font-size: 14px;
}

.container .box {
 width: 100px;
 height: 100px;
 display: flex;
 flex-direction: column;
 align-items: center;
 justify-content: center;
 border: 2px solid transparent;
 text-decoration: none;
 color: #615f5fdd;
}


.btn.btn-primary {
 background-color: #244065;
 color: white;
 border: 0px;
 padding: 0;
 font-size: 12px;
 height: 30px;
 border-radius: 5px;
}

.btn:hover{
 background-color: white;
 color: #244065;
 border: 1px solid #244065;
}

.btn.btn-primary .fas.fa-chevron-right {
 font-size: 12px;
}

.footer .p-color {
 color: #ee82ee;
}

.footer.text-muted {
 font-size: 10px;
}

.fas.fa-times {
 position: absolute;
 top: 20px;
 right: 20px;
 height: 20px;
 width: 20px;
 background-color: #f3cff379;
 font-size: 18px;
 display: flex;
 align-items: center;
 justify-content: center;
}

.fas.fa-times:hover {
 color: #ff0000;
}

@media (max-width: 767px) {
 body {
  padding: 10px;
 }

 .body {
  width: 100%;
  height: 100%;
 }

 .box-1 {
  width: 100%;
 }

 .box-2 {
  width: 100%;
  height: 440px;
 }
}
</style>
