<script setup>
import { flashMessage } from '../config/functions';
import axios from 'axios';


</script>
<script>

export default {
  data() {
    return {
      isLoading: false,
      email: '',
      password: '',
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
        const response = await axios.post(`https://backend.qqltech.com:7021/login`, payload)
        const result = response.data;

        localStorage.setItem('admin', JSON.stringify(result.data));
        this.$router.push('home');

      } catch (error) {
        if (error.response && error.response.data && error.response.data.errormsg) {
          flashMessage('error', 'Error', error.response.data.errormsg);
        } else {
          flashMessage('error', 'Error', 'Email atau Password Salah');
        }
        this.isLoading = false;
      }
    }
  }
}
</script>
<template>
  <div class="wrapper">
    <div class="right-top"></div>
    <div class="left-bottom"></div>
    <div class="container main">
      <div class="row">
        <div class="col-md-6 left">
          <div class="text-left">
            <p class="text-header-box-1-1">
              <b><strong>WELCOME</strong></b>
            </p>
            <p class="text-header-box-1-2"><b>PT. MEPOLY INDUSTRY</b></p>
          </div>
          <!-------Image-------->
          <div class="side-image">
            <img src="/assets/image/hello-login.png" alt="Side Image" />
          </div>
        </div>

        <div class="col-md-6 right p-0">
          <div class="card shadow">
            <div class="card-body">
              <img class="img-card" src="/assets/image/logo-panjang.png" alt="Logo Mepoly-Industry" />

              <form method="POST" @submit.prevent="login">
                <div class="input-box">


                  <div class="input-field">
                    <label for="email">Email</label>
                    <input type="text" class="form-control" name="email" v-model="email" required autocomplete="off" />
                  </div>
                  <div class="input-field mt-3">
                    <label for="password">Password</label>
                    <input type="password" id="password" name="password" v-model="password" class="form-control"
                      autocomplete="off" required />
                    <i id="mybutton" onclick="change()" class="tombol-eye">
                      <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-eye-fill" fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                        <path fill-rule="evenodd"
                          d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
                      </svg>
                    </i>
                  </div>
                  <div class="input-field mt-5 mb-3">
                    <button type="submit" class="submitBtn" :disabled="isLoading" id="btn_login">Login <div
                        v-if="isLoading" class="spinner-border spinner-border-sm" role="status">
                        <span class="visually-hidden">Loading...</span>
                      </div></button>
                  </div>
                </div>
              </form>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.right-top {
  background-image: url("/assets/image/ujung.png");
  background-repeat: no-repeat;
  position: absolute;
  top: 0;
  right: 0;
  width: 500px;
  height: 350px;
  transform: rotate(180deg);

}

.left-bottom {
  background-image: url("/assets/image/ujung.png");
  background-repeat: no-repeat;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 500px;
  height: 350px;

}

@import url("https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;800&display=swap");

* {
  font-family: "Noto Sans", sans-serif;
}

.wrapper {
  padding: 0 20px 0 20px;
}

.main {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: transparent;
}

.row {
  width: 950px;
  height: 480px;
  border-radius: 10px;
  background: #fff;
  box-shadow: 5px 5px 10px 1px rgba(0, 0, 0, 0.2);

  overflow: hidden;
}

.left {
  background-color: #f5f5f5;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  position: relative;
  border-radius: 10px 0 0 10px;
}

.side-image img {
  width: auto;
  height: 150px;
}

img {
  width: 35px;
  position: absolute;
  top: 40%;
  left: 30px;
}

.text-left {
  text-align: center;
  justify-content: center;
  position: absolute;
  top: 25%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #244065;
}

.text-header-box-1-1 {
  font-size: 24px;
  font-style: normal;
  font-weight: bolder;
  margin: 0;
}

.text-header-box-1-2 {
  font-size: 16px;
  font-style: normal;
  font-weight: 350;
}

.right {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.input-box {
  width: 330px;
  box-sizing: border-box;
}

.input-box header {
  font-weight: 700;
  text-align: center;
  margin-bottom: 45px;
}

.input-field {
  display: flex;
  flex-direction: column;
  position: relative;
  padding: 0 10px 0 10px;

}

.form-control {
  margin-top: 10px;
  width: 100%;
  font-size: 14px;
  font-family: "Noto Sans", sans-serif;
  border: 1px solid #244065;
  border-radius: 5px;
  padding: 10px 20px;
  text-align: center;
}

.submitBtn {
  border: none;
  outline: none;
  height: 45px;
  background: #244065;
  color: white;
  border-radius: 5px;
  transition: 0.4s;
}

.submitBtn:hover {
  background: white;
  color: #244065;
  border: 2px solid #244065;
}

.signin {
  text-align: center;
  font-size: small;
  margin-top: 25px;
}

span a {
  text-decoration: none;
  font-weight: 700;
  color: #000;
  transition: 0.5s;
}

span a:hover {
  text-decoration: underline;
  color: #000;
}

@media only screen and (max-width: 768px) {


  .left,
  .img-card,
  .left-bottom,
  .right-top,
  .tombol-eye {
    display: none;
  }

  .form-control {
    width: 60vw;
  }

  .Btn {
    width: 50vw;
  }

  .row {
    max-height: 500px;
    height: 100%;
    max-width: 420px;
    width: 100%;
    background-color: white;
    border: none;
    box-shadow: none;
  }




}

.img-card {
  height: 50px;
  width: auto;
  position: relative;
  margin: 5px 50px;
  align-items: center;
  text-align: center;
  justify-self: center;
  justify-items: center;
}

.card {
  margin: 0;
}
</style>
