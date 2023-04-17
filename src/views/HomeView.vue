<script setup>
import axios from 'axios';
import { flashMessage, format_date, getDataIsLogin } from '../config/functions'
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

</script>

<script>
export default {

  name: 'BarChart',
  components: { Bar },
  data() {
    return {
      chartData: {
        labels: [ 'January', 'February', 'March'],
        datasets: [
          {
            label: 'Data One',
            backgroundColor: '#f87979',
            data: [40, 20, 12]
          }
        ]
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



    }
}
</script>

<template>
  <main>
    <!-- Sidebar -->
    <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
      <div class="offcanvas-header">
        <div class="row">
          <div class="col-md-3 .offset-md-3 offcanvas-header-left">

            <router-link to="/logout" @click="logout" aria-expanded="true"><button class="button2 button-danger"></button></router-link>
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
                <h6>User ID</h6>
                <h6>Position</h6>
              </div>
              <div class="col-sm-6 user-text-profile">
                <h6>: Isa Iman Muhammad</h6>
                <h6>: Director</h6>
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
                <h6>Product</h6>
              </div>
              <div class="col-sm-6">
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                  <label class="form-check-label" for="flexCheckDefault">
                    Tali
                  </label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                  <label class="form-check-label" for="flexCheckDefault">
                    Selang
                  </label>
                </div>
              </div>

            </div>
            <hr class="garis-sidebar" style=" margin-top: 20px" />
            <div class="row mt-2 mb-3">
              <div class="col-sm-6">
                <h6>Store Name</h6>
              </div>
              <div class="col-sm-6">
                <div class="form-check">
                  <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                  <label class="form-check-label" for="flexRadioDefault1">
                    All
                  </label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                  <label class="form-check-label" for="flexRadioDefault1">
                    Store A
                  </label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                  <label class="form-check-label" for="flexRadioDefault1">
                    Store B
                  </label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                  <label class="form-check-label" for="flexRadioDefault1">
                    Store C
                  </label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                  <label class="form-check-label" for="flexRadioDefault1">
                    Store D
                  </label>
                </div>
              </div>
            </div>
            <hr class="garis-sidebar" style=" margin-top: 20px" />
            <div class="row mt-2 mb-2">
              <h6 class="mb-2">Salesman Info</h6>
              <div class="row card-salesman">

                <div class="col-sm-2 mt-2">
                  <img class="img-profile" src="https://www.shareicon.net/data/512x512/2016/07/26/802001_man_512x512.png"
                    alt="" />
                </div>
                <div class="col-sm-4" style="justify-content: center; justify-items: center;">
                  <h6>Name</h6>
                  <h6>Last Visited</h6>
                </div>
                <div class="col-sm-6">
                  <h6>: Nazwa Dafa</h6>
                  <h6>: 03/04/2023</h6>
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

          <button class="button btn1 ">Export to PDF</button>
          <button class="button btn1">Export to CSV</button>

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
                          <p class="card-title">Total Stock</p>
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
                          <p class="card-title">Total Omzet</p>
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
                          <p class="card-title">Total Visit</p>
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
              <h5 class="card-title"><b>Product Stock Differentiation</b></h5>

            </div>
                </div>
              </div>
            </div>
            <div class="col-sm-6">
              <div class="card card-4 ">
                <div class="card-body ">
                  <div class="card-body">
              <h5 class="card-title"><b>Detail Order</b></h5>

             
            </div>
                </div>
              </div>
            </div>
          </div>

          <div class="row mt-4">
            <div class="col-sm-12">
              <div class="card card-5">
                <div class="card-body">
              <h5 class="card-title"><b>Detail Stock</b></h5>

              <Bar :data="chartData" />
            </div>
              </div>
            </div>
          </div>

          <div class="row mt-4">
            <div class="col-sm-12">
              <div class="card card-5">
                <div class="card-body">
              <h5 class="card-title"><b>Detail Omzet</b></h5>

              <!-- Bar Chart -->
              <div id="barChart"></div>

              <!-- <script>
                document.addEventListener("DOMContentLoaded", () => {
                  new ApexCharts(document.querySelector("#barChart"), {
                    series: [{
                      data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380]
                    }],
                    chart: {
                      type: 'bar',
                      height: 350
                    },
                    plotOptions: {
                      bar: {
                        borderRadius: 4,
                        horizontal: true,
                      }
                    },
                    dataLabels: {
                      enabled: false
                    },
                    xaxis: {
                      categories: ['South Korea', 'Canada', 'United Kingdom', 'Netherlands', 'Italy', 'France', 'Japan',
                        'United States', 'China', 'Germany'
                      ],
                    }
                  }).render();
                });
              </script> -->
              <!-- End Bar Chart -->

            </div>
              </div>
            </div>
          </div>

          <div class="row mt-4">
            <div class="col-sm-12">
              <div class="card card-5">
                <div class="card-body">
                  <h5 class="card-title"><b>Product Omzet Differentiation</b></h5>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
    <!-- END Main Page -->

  </main>
</template>
