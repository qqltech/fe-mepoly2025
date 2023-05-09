<script setup>
import axios from 'axios';
import { flashMessage, getDataIsLogin, } from '../config/functions';
import dayjs from 'dayjs';
import 'dayjs/locale/id';
var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl)
})
</script>

<script>
import { Bar, Line, Doughnut } from 'vue-chartjs'
import {
  Chart as ChartJS, ArcElement, Tooltip, Legend,
  Title,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend,
  Title,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,)

// const dataUser = getDataIsLogin();
export default {

  name: 'BarChart',
  components: { Bar, Line, Doughnut },
  data() {
    return {
      today: new Date(),
      name: '',
      role: '',
      periodeEnd: '',
      periodeStart: '',
      products: '',
      storeId: '',
      isLoading: false,
      store: [],
      data: null,
      user: null,
      token: '',
      chartData1: {
        labels: ['Brand A', 'Brand B'],
        datasets: [
          {
            label: 'Stock Amount',
            backgroundColor: ['#244065', '#22AAD9'],
            data: [400, 200,],
            barThickness: 0.1,
          }
        ],

      },
      chartData2: {
        labels: ['Brand A', 'Brand B'],
        datasets: [
          {
            label: 'Omzet Amount',
            backgroundColor: ['#244065', '#22AAD9'],
            data: [100, 250,],
          }
        ]
      },
      chartData3: {
        labels: ['Mepoly', 'Trilliun', 'Sumber Jaya', 'Pusso', 'Turbo Hose'],
        datasets: [
          {
            indexAxis: 'y',
            label: 'Detail Stock (pcs)',
            backgroundColor: '#244065',
            data: [650, 500, 250, 200, 500]
          }
        ]
      },
      chartData4: {
        labels: ['Mepoly', 'Trilliun', 'Sumber Jaya', 'Pusso', 'Turbo Hose'],
        datasets: [
          {
            indexAxis: 'y',
            label: 'Detail Omzet',
            backgroundColor: '#244065',
            data: [680, 300, 250, 200, 150]
          }
        ]
      },
      chartData5: {
        labels: ['S. FLex', 'Stabilo', 'Seagull', 'Qrope', 'Hank', 'Bintang', 'PP. Band'],
        datasets: [
          {
            label: 'Detail Order',
            backgroundColor: '#244065',
            data: [47, 28, 58, 52, 56, 30, 52]
          }
        ]
      },
      chartData6: {
        labels: ['S. FLex', 'Stabilo', 'Seagull', 'Qrope', 'Hank', 'Bintang', 'PP. Band'],
        datasets: [
          {
            label: 'Detail Order',
            backgroundColor: '#244065',
            data: [47, 28, 58, 52, 56, 30, 52]
          }
        ]
      },
      options: {

        legend: {
          display: false,
          responsive: true,
          maintainAspectRatio: false,
        }

      },
      isLoading: false,
      salesName: '',
      salesLastVisited: '',
      products: '',


    }
  },
  mounted() {
    this.fetchDataStore();
  },

  methods: {
    logout() {
      if (confirm("Apakah Anda yakin ingin keluar?")) {
        localStorage.removeItem('admin')
        this.$router.push('/')
      }
    },
    formatDate(dateString) {
      const [dd, mm, yyyy] = dateString.split('-');
      return `${dd}-${mm}-${yyyy}`;
    },

    async fetchDataStore() {
      try {
        if (getDataIsLogin()) {
          this.token = getDataIsLogin().token
          const response = await axios.get(`https://backend.qqltech.com:7021/operation/dashboard/web`, {
            headers: {
              "authorization": `${getDataIsLogin().token_type} ${this.token}`,
            },
            params: 
              this.fetchDataParams,          
          }

          )
          const store = response.data;
          this.salesName = store.sales_name;
          this.salesLastVisited = store.sales_last_visited;
          this.products = store.filter.products;
          console.log(store);
        }
      } catch (error) {
        flashMessage('error', 'Gagal Mendapatkan Data', error)
      } finally {
        this.isLoading = false;
      }
    },
  },

  watch: {
    fetchDataParams: {
      handler() {
        this.fetchDataStore();
      },
      deep: true,
    },
  },

  computed: {
    isAuthenticated() {
      return localStorage.getItem('admin') !== null;
    },
    fetchDataParams(){
      return {
        periode_start: this.formatDate(this.periodeStart),
        periode_end: this.formatDate(this.periodeEnd),
        products: 'Tali',
        store_id: 2,
      }
    }
  },

  created() {
    const user = JSON.parse(localStorage.getItem('admin'))
    this.nama = user.data.name
    this.role = user.data.role

    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    const formattedDate = `${dd}-${mm}-${yyyy}`;
    this.periodeEnd = formattedDate;
    this.periodeStart = formattedDate;
  },
}
</script>

<template>
  <main v-if="isAuthenticated">
    <!-- Sidebar -->
    <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
      <div class="offcanvas-header">
        <div class="row">

          <div class="col-md-3  offcanvas-header-right">
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="button-closed bi bi-x" viewBox="0 0 16 16"
              data-bs-dismiss="offcanvas" aria-label="Close">
              <path
                d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
            </svg>
          </div>
        </div>
      </div>
      <div class="offcanvas-body">
        <div class="offcanvas-body-inside mt-1">
          <div class="row">

            <div class="row card-user">

              <div class="col-sm-2 mt-2">
                <img class="img-profile" src="https://www.shareicon.net/data/512x512/2016/07/26/802001_man_512x512.png"
                  alt="" />
              </div>
              <div class="col-sm-4 user-text-profile">
                <p>User ID</p>
                <p>Role</p>
              </div>
              <div class="col-sm-6 user-text-profile">
                <p>: {{ nama }}</p>
                <p>: {{ role }}</p>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="row  mt-2">
              <h4><b>Show</b></h4>

            </div>
            <hr class="garis-sidebar" style=" margin-top: 5px" />
            <div class="row mt-2 mb-2">
              <div class="col-sm-6">
                <p>Product</p>
              </div>
              <div class="col-sm-6">
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" value="" id="checkBoxBrand1" />
                  <label class="form-check-label" for="checkBoxBrand1">
                    Selang
                  </label>
                  
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" value="" id="checkBoxBrand2" />
                  <label class="form-check-label" for="checkBoxBrand2">
                    Tali
                  </label>
                </div>
              </div>

            </div>
            <hr class="garis-sidebar" style=" margin-top: 20px" />
            <div class="row mt-2 mb-3">
              <div class="col-sm-6">
                <p>Store Name</p>
              </div>
              <div class="col-sm-6">

                <div class="dropdown">
                  <button class=" dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown"
                    aria-haspopup="true" aria-expanded="false">
                    All
                  </button>
                  <div class="dropdown-menu scrollable-menu" aria-labelledby="dropdownMenuButton">
                    <form class="px-4 py-2">
                      <input type="search" class="form-control searchCheck" id="searchStore" placeholder="Search Store..."
                        autofocus="autofocus">
                    </form>
                    <hr>
                    <div class="form-check checkStore">
                      <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" checked>
                      <label class="form-check-label" for="flexCheckDefault">
                        All
                      </label>
                    </div>
                    <div class="form-check checkStore">
                      <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
                      <label class="form-check-label" for="flexCheckDefault">
                        Store A
                      </label>
                    </div>
                    <div class="form-check checkStore">
                      <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
                      <label class="form-check-label" for="flexCheckDefault">
                        Store B
                      </label>
                    </div>
                    <div class="form-check checkStore">
                      <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
                      <label class="form-check-label" for="flexCheckDefault">
                        Store C
                      </label>
                    </div>
                    <div class="form-check checkStore">
                      <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
                      <label class="form-check-label" for="flexCheckDefault">
                        Store D
                      </label>
                    </div>
                    <div class="form-check checkStore">
                      <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
                      <label class="form-check-label" for="flexCheckDefault">
                        Store E
                      </label>
                    </div>
                    <div class="form-check checkStore">
                      <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
                      <label class="form-check-label" for="flexCheckDefault">
                        Store F
                      </label>
                    </div>

                  </div>
                </div>
              </div>
            </div>
            <hr class="garis-sidebar" style=" margin-top: 20px" />
            <!-- <div class="row mt-2 mb-2">
                <p class="mb-2">Salesman Info</p>
                <div class="row card-salesman">

                  <div class="col-sm-2 mt-2">
                    <img class="img-profile" src="https://www.shareicon.net/data/512x512/2016/07/26/802001_man_512x512.png"
                      alt="" />
                  </div>
                  <div class="col-sm-4" style="justify-content: center; justify-items: center;">
                    <p>Name</p>
                    <p>Last Visited</p>
                  </div>
                  <div class="col-sm-6">
                    <p>: {{ salesName }}</p>
                    <p>: {{ salesLastVisited }}</p>
                  </div>
                </div>
              </div>  -->

            <div class="d-grid gap-2 mt-2">
              <router-link v-if="filtersSelected" to="" @click="applyFilters" aria-expanded="true" tag="button"
                class="button5 btn-success rtlink-btn4">Apply Filter</router-link>


              <router-link to="" @click="logout" aria-expanded="true" tag="button"
                class="button4 btn-danger rtlink-btn4"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                  fill="currentColor" class="bi bi-power" viewBox="0 0 16 16">
                  <path d="M7.5 1v7h1V1h-1z" />
                  <path
                    d="M3 8.812a4.999 4.999 0 0 1 2.578-4.375l-.485-.874A6 6 0 1 0 11 3.616l-.501.865A5 5 0 1 1 3 8.812z" />
                </svg> Logout</router-link>
            </div>
          </div>
        </div>

      </div>
    </div>
    <!-- END Sidebar -->
    <!-- Main Page  -->
    <div class="wrapper">
      <div class="main">
        <div class="navbar navbar-expand">
          <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor"
            class="button-closed bi bi-list sidebar-toggle js-sidebar-toggle" viewBox="0 0 16 16"
            data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample">
            <path fill-rule="evenodd"
              d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
          </svg>
          <img class="header-img-logo" src="/assets/image/logo-panjang.png" alt="Logo Mepoly-Industry" height="50px"
            width="auto" />
          <button class="button btn1 " data-toggle="modal" data-target="#exampleModalCenterPdf">Export to PDF</button>
          <button class="button btn1" data-toggle="modal" data-target="#exampleModalCenterCsv">Export to CSV</button>
          <label class="period-date"><b>Period :</b></label>
          <input type="date" v-model="periodeStart" class="period-bar1" id="fromDate">
          <label class="label-date"><b>To</b></label>
          <input type="date" v-model="periodeEnd" class="period-bar2" id="toDate">
        </div>
        <main class="content">
          <div class="container-fluid mt-3 p-0">
            <h1 class="h4"><b>Overview</b></h1>
          </div>
          <div class="row mt-4">
            <div class="col-sm-4">
              <div class="card ">
                <div class="card-body card-1">
                  <div class="row">
                    <div class="col mt-0">
                      <div class="row">
                        <div class="col-sm-2">
                          <div class="stat text-primary">
                            <img class="img-stat" src="/assets/image/box.png" alt="">
                          </div>
                        </div>
                        <div class="col-sm-10" style="justify-content: center;">
                          <p class="card-title"><b>Total Stock</b></p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p class="card-count mt-1 mb-1">123.456</p>
                </div>
              </div>
            </div>
            <div class="col-sm-4">
              <div class="card ">
                <div class="card-body card-2">
                  <div class="row">
                    <div class="col mt-0">
                      <div class="row">
                        <div class="col-sm-2">
                          <div class="stat text-primary">
                            <img class="img-stat2" src="/assets/image/money.png" alt="">
                          </div>
                        </div>
                        <div class="col-sm-10" style="justify-content: center;">
                          <p class="card-title"><b>Total Omzet</b></p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p class="card-count mt-1 mb-1">Rp. 1.000.000.000</p>
                </div>
              </div>
            </div>
            <div class="col-sm-4">
              <div class="card ">
                <div class="card-body card-3">
                  <div class="row">
                    <div class="col mt-0">
                      <div class="row">
                        <div class="col-sm-2">
                          <div class="stat text-primary">
                            <img class="img-stat3" src="/assets/image/maps.png" alt="">
                          </div>
                        </div>
                        <div class="col-sm-10" style="justify-content: center;">
                          <p class="card-title"><b>Total Visit</b></p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p class="card-count mt-1 mb-1">2.382</p>
                </div>
              </div>
            </div>
          </div>
          <div class="row mt-4">
            <div class="col-sm-6">
              <div class="card card-4 ">
                <div class="card-body ">
                  <div class="card-body">
                    <p class="card-title"><b>Product Stock Differentiation</b></p>
                    <div class="col-sm-12 canvas1">
                      <Doughnut :data="chartData1" :options="options" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-sm-6">
              <div class="card card-4 ">
                <div class="card-body ">
                  <div class="card-body">
                    <p class="card-title"><b>Product Omzet Differentiation</b></p>
                    <div class="col-sm-12 canvas1">
                      <Doughnut :data="chartData2" :options="options" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row mt-4">
            <div class="col-sm-12">
              <div class="card card-5">
                <div class="card-body">
                  <div class="card-body">
                    <p class="card-title"><b>Detail Stock</b></p>
                    <div class="col-sm-12 canvas2">
                      <Bar :data="chartData3" :options="options" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row mt-4">
            <div class="col-sm-12">
              <div class="card card-5">
                <div class="card-body">
                  <div class="card-body">
                    <p class="card-title"><b>Detail Omzet</b></p>
                    <div class="col-sm-12 canvas2">
                      <Bar :data="chartData4" :options="options" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row mt-4">
            <div class="col-sm-12">
              <div class="card mb-4 card-5">
                <div class="card-body">
                  <div class="card-body">
                    <p class="card-title"><b>Detail Order</b></p>
                    <div class="col-sm-12 canvas2">
                      <p class="card-title2"><b>Product : Tali</b></p>
                      <Line :data="chartData5" :options="options" />
                    </div>
                    <div class="col-sm-12 canvas2">
                      <p class="card-title2 mt-5"><b>Product : Selang</b></p>
                      <Line :data="chartData6" :options="options" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
    <!-- END Main Page -->
    <!-- Modal 1 -->
    <div class="modal fade" id="exampleModalCenterPdf">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Export Data</h5>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-6">
                <label class="color-black col-form-label" style="font-weight: bold;">Select Date :</label>
                <div class="col-sm-6">
                </div>
              </div>
              <div class="row tanggal-modal">
                <div class="col-sm-6 label-modal">
                  <label class="color-black label-modal" style="align-items: center;">From</label>
                </div>
                <div class="col-sm-6 input-modal">
                  <input type="date" class="form-control export-date">
                </div>
              </div>
              <div class="row tanggal-modal">
                <div class="col-sm-6 label-modal">
                  <label class="color-black label-modal" style="align-items: center;">To</label>
                </div>
                <div class="col-sm-6 input-modal">
                  <input type="date" class="form-control export-date">
                </div>
              </div>
            </div>
            <div class="mt-4 d-grid gap-2" style="align-items: center;">
              <button class="btn button3">Export PDF</button>
            </div>
          </div>
          <div class="modal-footer">
          </div>
        </div>
      </div>
    </div>
    <!-- Modal 2 -->
    <div class="modal fade" id="exampleModalCenterCsv">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Export Data</h5>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-6">
                <label class="color-black col-form-label" style="font-weight: bold;">Select Date :</label>
                <div class="col-sm-6">
                </div>
              </div>
              <div class="row tanggal-modal">
                <div class="col-sm-6 label-modal">
                  <label class="color-black label-modal" style="align-items: center;">From</label>
                </div>
                <div class="col-sm-6 input-modal">
                  <input type="date" class="form-control export-date">
                </div>
              </div>
              <div class="row tanggal-modal">
                <div class="col-sm-6 label-modal">
                  <label class="color-black label-modal" style="align-items: center;">To</label>
                </div>
                <div class="col-sm-6 input-modal">
                  <input type="date" class="form-control export-date">
                </div>
              </div>
            </div>
            <div class="mt-4 d-grid gap-2" style="align-items: center;">
              <button class="btn button3">Export CSV</button>
            </div>
          </div>
          <div class="modal-footer">
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
