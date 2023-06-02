<script setup>
import axios from 'axios';
import { flashMessage, format_date, getDataIsLogin } from '../config/functions';
import Swal from 'sweetalert2'
import 'bootstrap-icons/font/bootstrap-icons.css';
var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl)
})

</script>
<script>
export default {
  data() {
    return {
      account: [],
      listAcc: [],
      areaCodes: [],
      area_ids: '',
      items: [],
      areaMap: {},
      headers: [
        { text: 'Name', value: 'name', filter: 'format_date', sortable: true },
        { text: 'Employee ID', value: 'nip', sortable: true },
        {
          text: 'Area', value: 'area_list', sortable: true
        },
        { text: 'Email', value: 'email', sortable: true },
        { text: 'Username', value: 'username', sortable: true },
        { text: 'Phone', value: 'phone', sortable: true },
        { text: 'Role', value: 'role', sortable: true },
        { text: 'Status', value: 'status', sortable: true },
        { text: 'Action', value: 'action' },
      ],
      userAccount: '',
      isLoading: true,
      status: "ACTIVE",
      selectedEdit: '',
      item: {
        id: '',
        value: '',
      },
      value: '',
      token: '',
      status_active: '',
      status_inactive: '',
      status_disabled: '',
    }
  },
  mounted() {
    this.isLoading = true;
    this.fetchDataAccount();


  },
  methods: {
    async fetchDataAccount() {
      try {
        if (getDataIsLogin()) {
          this.token = getDataIsLogin().token
          const response = await axios.get(`https://backend.qqltech.com:7021/operation/default_users`, {
            headers: {
              "authorization": `${getDataIsLogin().token_type} ${this.token}`,
            },
          })

          const account = response.data.data.map(dt => {
            dt['area_list'] = dt.area.map(dArea => dArea.code).join(',');
            return dt;
          });
          console.log(account);

          this.listAcc = account
          console.log(this.listAcc);

          // const areaSales = account.flatMap(item => item.area);
          // console.log(areaSales);

          // const areaMap = [];
          // areaSales.map(dt => dt.code).join(',');
          // let resultKoma = areaSales.map(dt => dt.code).join(',')
          // console.log(resultKoma)


          // this.areaMap = areaMap
          // console.log(this.areaMap);






        }
      } catch (error) {
        flashMessage('error', 'ERROR', error)
      } finally {
        this.isLoading = false;
      }
    },

    async deleteFetch(data) {
      try {
        this.isLoading = true;
        if (getDataIsLogin()) {
          this.token = getDataIsLogin().token
          const response = await fetch(`https://backend.qqltech.com:7021/operation/default_users/${data.id}`, {
            method: "DELETE",
            headers: {
              'Authorization': `${getDataIsLogin().token_type} ${this.token}`,
              "Content-Type": "application/json",
            },
          });
          const result = await response.json();
          // console.log(result);
          if (result.success) {
            flashMessage('success', 'Success!', 'Data deleted!')
            this.isLoading = false
            window.location.reload();
          } else {
            flashMessage('error', 'Error', result.message)
            this.isLoading = false
          }
        }
      } catch (error) {
        flashMessage('error', 'Error', error)
        this.isLoading = false
      }
    },



    async deleteAccount(id) {
      const data_byId = this.account.find(x => x.id === id)

      Swal.fire({
        icon: 'question',
        title: `Delete ${data_byId.name}`,
        showCancelButton: true,
        confirmButtonText: 'Yes',
        iconColor: '#244065',
        confirmButtonColor: '#244065',
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          this.deleteFetch(data_byId);

        }
      })
    },
    logout() {
      if (confirm("Apakah Anda yakin ingin keluar?")) {
        localStorage.removeItem('admin')
        this.$router.push('/')
      }
    },


    async editData(id) {
      try {
        const dataIsLogin = await getDataIsLogin();
        if (getDataIsLogin()) {
          this.token = dataIsLogin.token
          const response = await axios.put(`https://backend.qqltech.com:7021/operation/default_users/${id}`, null, {
            headers: {
              "Authorization": `${getDataIsLogin().token_type} ${this.token}`,
              "Cache-Control": "no-cache"
            },
            params: {
              status: this.value.toString()
            },
          });
          // console.log(response);


          if (response.data.success) {
            flashMessage('success', 'Success!', 'Data Saved!')
            this.isLoading = false
            window.location.reload();
          } else {
            flashMessage('error', 'Error', result.message)
            this.isLoading = false
          }
        }
      } catch (error) {
        flashMessage('error', 'Error', error);
      } finally {
        this.isLoading = false;
      }
    },

    getAreaText(areaId) {
      switch (areaId) {
        case "1":
          return "SBY";
        case 2:
          return 'JKT';
        case 3:
          return 'Area 3';
        default:
          return '-';
      }
    },






  },
  computed: {
    isAuthenticated() {
      return localStorage.getItem('admin') !== null;
    },

  },
}
</script>

<template>
  <main v-if="isAuthenticated">

    <div class="wrapper">
      <div class="main">
        <div class="navbar navbar-expand">
          <router-link to="/home">
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor"
              class="button-backtohome bi bi-arrow-left" viewBox="0 0 16 16">
              <path fill-rule="evenodd"
                d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
            </svg></router-link>
          <img class="header-img-logo" src="/assets/image/logo-panjang.png" alt="Logo Mepoly-Industry" height="50px"
            width="auto" />

          <p class="header-txt">Account Settings</p>

          <div class="header-kanan">
            <router-link to="" @click="logout" aria-expanded="true" tag="button" class="button4 btn-danger rtlink-btn4"
              style="position: absolute; right: 0; top: 15px; width: 200px;"><svg xmlns="http://www.w3.org/2000/svg"
                width="16" height="16" fill="currentColor" class="bi bi-power" viewBox="0 0 16 16">
                <path d="M7.5 1v7h1V1h-1z" />
                <path
                  d="M3 8.812a4.999 4.999 0 0 1 2.578-4.375l-.485-.874A6 6 0 1 0 11 3.616l-.501.865A5 5 0 1 1 3 8.812z" />
              </svg> Logout</router-link>
          </div>

        </div>
        <hr class="garis-sidebar" style="margin-top: 0px !important;" />


        <div class="row mt-4 mb-4">
          <div class="col-sm-12">
            <div class="card card-5">
              <div class="card-body">
                <div class="card-body">
                  <p class="card-title"><b>List Account</b></p>
                  <div class="col-sm-12 ">
                    <div v-if="isLoading">
                      <div class="d-flex align-items-center px-3">
                        <strong class="me-4">Loading...</strong>
                        <div class="spinner-border ms-auto" role="status" aria-hidden="true"></div>
                      </div>

                    </div>
                    <div v-else>
                      <EasyDataTable show-index :loading="isLoading" :headers="headers" :items="listAcc"
                        theme-color="#0068D4" show-index-symbol="No." header-text-direction=center
                        table-class-name="customize-table" :rows-per-page=10>

                        <template #item-action="item">
                          <div>
                            <div class="button-container">
                              <div class="dropdown">

                                <button class="button6 " type="button" id="dropdownMenuButton" data-toggle="dropdown"
                                  aria-haspopup="true" aria-expanded="false">
                                  <!-- {{ (value) ? value : 'Change Status' }} -->
                                  <i class="bi bi-pencil"></i>

                                </button>
                                <div class="dropdown-menu scrollable-menu" aria-labelledby="dropdownMenuButton">

                                  <div class="form-check checkStore">
                                    <input class="form-check-input" type="radio" name="status" :id="status_disabled"
                                      disabled />
                                    <label class="form-check-label" :for="status_disabled">Select Status</label>
                                  </div>
                                  <div class="form-check checkStore">
                                    <input class="form-check-input" type="radio" name="status" :id="status_active"
                                      value="ACTIVE" v-model="value" @change="editData(item.id)" />
                                    <label class="form-check-label" :for="status_active">ACTIVE</label>
                                  </div>
                                  <div class="form-check checkStore">
                                    <input class="form-check-input" type="radio" name="status" :id="status_inactive"
                                      value="INACTIVE" v-model="value" @change="editData(item.id)" />
                                    <label class="form-check-label" :for="status_inactive">INACTIVE</label>
                                  </div>


                                </div>

                              </div>
                              <br>
                              <button class="button5" style="margin-left: 5px;" id="btn-detail"
                                @click="deleteAccount(item.id)"><svg xmlns="http://www.w3.org/2000/svg" width="16"
                                  height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                  <path
                                    d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                                  <path
                                    d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                                </svg></button>
                            </div>
                          </div>
                        </template>
                        <template #item-status="item">
                          <div class="centered-column">{{ item.status }}</div>
                        </template>

                      </EasyDataTable>
                    </div>
                    <div>
                      <!-- Tampilkan areaCodes di dalam komponen -->
                      <ul>
                        <li v-for="code in areaCodes" :key="code">{{ code }}</li>
                      </ul>
                    </div>






                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </main>
</template>

<style scoped>
.customize-table {
  --easy-table-header-font-color: #fff;
  --easy-table-header-font-size: 14px;
  --easy-table-header-background-color: #244065;
}

.button-container {
  display: flex;
  justify-content: center;
  align-items: center;

}

.centered-column {
  text-align: center;
}
</style>