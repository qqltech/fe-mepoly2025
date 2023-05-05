<script setup>
import axios from 'axios';
import { flashMessage, format_date, getDataIsLogin } from '../config/functions'

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

const dataUser = getDataIsLogin();
export default {

  name: 'BarChart',
  components: { Bar, Line, Doughnut },
  data() {
    return {
      name: '',
      role: '',
      user: null,
      chartData1: {
        labels: ['Brand A', 'Brand B'],
        datasets: [
          {
            label: 'Stock Amount',
            backgroundColor: ['#244065', '#22AAD9'],
            data: [400, 200,],
            barThickness: 0.1,
            // barPercentage: 0.5

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
      options: {
        scales: {
          yAxes: [{
            barPercentage: 0.5
          }]
        },
        legend: {
            display: false
        }

      }
    }
  },
  methods: {
    logout() {
      localStorage.removeItem('admin')
      this.$router.push('/')
    },



  },
  computed: {
    isAuthenticated() {
      return localStorage.getItem('admin') !== null;
    },



  },

  created() {
    const user = JSON.parse(localStorage.getItem('admin'))
    this.nama = user.name
    this.role = user.role
  },
}
</script>

<template>
  <main>
    <!-- Sidebar -->
    <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
      <div class="offcanvas-header">
        <div class="row">
          <div class="col-md-3 .offset-md-3 offcanvas-header-left">

            <router-link to="/logout" @click="logout" aria-expanded="true"><button
                class="button2 button-danger"></button></router-link>
          </div>

          <div class="col-md-3  offcanvas-header-right">
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="button-closed bi bi-list"
              viewBox="0 0 16 16" data-bs-dismiss="offcanvas" aria-label="Close">
              <path fill-rule="evenodd"
                d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
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
            <div class="row mt-4">
              <h4><b>Show</b></h4>
              <hr class="garis-sidebar" />
            </div>
            <div class="row mt-2 mb-2">
              <div class="col-sm-6">
                <p>Product</p>
              </div>
              <div class="col-sm-6">
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                  <label class="form-check-label" for="flexCheckDefault">
                    Brand A
                  </label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                  <label class="form-check-label" for="flexCheckDefault">
                    Brand B
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
                  <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton"
                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    All
                  </button>
                  <div class="dropdown-menu scrollable-menu" aria-labelledby="dropdownMenuButton">
                    <form class="px-4 py-2">
                      <input type="search" class="form-control" id="searchStore" placeholder="Search Store..."
                        autofocus="autofocus">
                    </form>
                    <a class="dropdown-item" href="#">All</a>

                    <a class="dropdown-item" href="#">Store A</a>
                    <a class="dropdown-item" href="#">Store B</a>
                    <a class="dropdown-item" href="#">Store C</a>

                    <a class="dropdown-item" href="#">Store D</a>

                    <a class="dropdown-item" href="#">Store E</a>
                    <a class="dropdown-item" href="#">Store F</a>
                    <a class="dropdown-item" href="#">Store G</a>
                    <a class="dropdown-item" href="#">Store H</a>
                    <a class="dropdown-item" href="#">Store I</a>
                    <a class="dropdown-item" href="#">Store J</a>
                    <a class="dropdown-item" href="#">Store K</a>

                  </div>
                </div>
              </div>
            </div>
            <hr class="garis-sidebar" style=" margin-top: 20px" />
            <div class="row mt-2 mb-2">
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
                  <p>: Nazwa Dafa</p>
                  <p>: 03/04/2023</p>
                </div>
              </div>
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
          <input type="date" class="period-bar1" id="fromDate">
          <label class="label-date"><b>To</b></label>
          <input type="date" class="period-bar2" id="toDate">



        </div>
        <main class="content">
          <div class="container-fluid mt-5 p-0">
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
                  <h1 class="card-count mt-1 mb-3">123.456</h1>

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
                  <h1 class="card-count mt-1 mb-3">Rp. 1.000.000.000</h1>

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
                  <h1 class="card-count mt-1 mb-3">2.382</h1>

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
              <div class="card card-5">
                <div class="card-body">
                  <div class="card-body">
                    <p class="card-title"><b>Detail Order</b></p>
                    <div class="col-sm-12 canvas2">


                      <Line :data="chartData5" :options="options" />
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
                  <input type="date" class="form-control export-date" v-model="rptFrom">
                </div>
              </div>
              <div class="row tanggal-modal">
                <div class="col-sm-6 label-modal">
                  <label class="color-black label-modal" style="align-items: center;">To</label>
                </div>
                <div class="col-sm-6 input-modal">
                  <input type="date" class="form-control export-date" v-model="rptTo">
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
                  <input type="date" class="form-control export-date" v-model="rptFrom">
                </div>
              </div>
              <div class="row tanggal-modal">
                <div class="col-sm-6 label-modal">
                  <label class="color-black label-modal" style="align-items: center;">To</label>
                </div>
                <div class="col-sm-6 input-modal">
                  <input type="date" class="form-control export-date" v-model="rptTo">
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
