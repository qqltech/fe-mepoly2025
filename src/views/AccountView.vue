<script setup>
import axios from 'axios';
import { flashMessage, format_date, getDataIsLogin } from '../config/functions';
</script>
<script>
export default {
 data() {

 },
 computed: {
  isAuthenticated() {
   return localStorage.getItem('admin') !== null;
  }
 }
}
</script>

<template>
 <main v-if="isAuthenticated">

  <div class="wrapper">
   <div class="main">
    <div class="navbar navbar-expand">
     <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor"
      class="button-closed bi bi-list sidebar-toggle js-sidebar-toggle" viewBox="0 0 16 16" data-bs-toggle="offcanvas"
      href="#offcanvasExample" role="button" aria-controls="offcanvasExample">
      <path fill-rule="evenodd"
       d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
     </svg>
     <img class="header-img-logo" src="/assets/image/logo-panjang.png" alt="Logo Mepoly-Industry" height="50px"
      width="auto" />

     <div class="header-kanan">
      <router-link to="" @click="logout" aria-expanded="true" tag="button" class="button4 btn-danger rtlink-btn4"><svg
        xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-power"
        viewBox="0 0 16 16">
        <path d="M7.5 1v7h1V1h-1z" />
        <path d="M3 8.812a4.999 4.999 0 0 1 2.578-4.375l-.485-.874A6 6 0 1 0 11 3.616l-.501.865A5 5 0 1 1 3 8.812z" />
       </svg> Logout</router-link>
     </div>

    </div>
    <hr class="garis-sidebar" style="margin-top: 0px !important;" />

   </div>
  </div>
 </main>
</template>

<style scoped></style>