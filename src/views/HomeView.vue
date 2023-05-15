<script setup>
import axios from 'axios';
import { flashMessage, format_date, getDataIsLogin, formatRupiah, formattedNumber } from '../config/functions';
import dayjs from 'dayjs';
import 'dayjs/locale/id';
import jsPDF from 'jspdf'
import html2pdf from "html2pdf.js";

import autoTable from 'jspdf-autotable'
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
      products: [],
      storeId: '',
      isLoading: false,
      visit: [],
      visitData: [],
      data: null,
      user: null,
      token: '',
      stockData: '',
      loaded: false,
      chartData1: null,
      chartData2: null,
      chartData3: null,
      chartData4: null,
      chartData5: null,
      chartData6: null,
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
      stores: [],
      storesName: [],
      storesShow: '',
      totalVisit: '',
      totalOmzet: '',
      totalStock: '',
      selectedProducts: ['Tali', 'Selang'],
      selectedStore: '2',
      isTali: true,
      isSelang: true,
      rptFrom: '',
      rptTo: '',
      selectedDataexports: '',
      salesInfo: '',

    }
  },
  mounted() {
    this.isLoading = true;
    this.fetchDataVisit();
    this.fetchDataStores();
    const date = new Date();
    this.rptFrom = `${date.getFullYear()}-${("0" + (date.getMonth() + 1)).slice(-2)}-01`;
    this.rptTo = `${date.getFullYear()}-${("0" + (date.getMonth() + 1)).slice(-2)}-${("0" + date.getDate()).slice(-2)}`;

  },

  methods: {

    searchStores() {
      const input = document.querySelector('.searchCheck');
      const filter = input.value.toUpperCase();
      const stores = document.querySelectorAll('.checkStore');

      stores.forEach((store) => {
        const label = store.querySelector('label');
        const txtValue = label.textContent || label.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          store.style.display = '';
        } else {
          store.style.display = 'none';
        }
      });
    },
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

    async fetchDataVisit() {
      try {
        if (getDataIsLogin()) {
          this.token = getDataIsLogin().token
          const selectProduc = this.selectedProducts
          if (selectProduc.length == 2) {
            this.isSelang = true;
            this.isTali = true;
          } else if (selectProduc[0] == 'Tali') {
            this.isTali = true;
            this.isSelang = false;
          } else if (selectProduc[0] == 'Selang') {
            this.isSelang = true;
            this.isTali = false;

          } else {
            this.isSelang = false;
            this.isTali = false;
          }
          this.getfilterCompany(this.selectedStore)
          const response = await axios.get(`https://backend.qqltech.com:7021/operation/dashboard/web`, {
            headers: {
              "authorization": `${getDataIsLogin().token_type} ${this.token}`,
            },
            params:
            {
              periode_start: this.formatDate(this.periodeStart),
              periode_end: this.formatDate(this.periodeEnd),
              products: `${(selectProduc[0]) ? selectProduc[0] : ''}${(selectProduc[1] ? "-" + selectProduc[1] : '')}`,
              store_id: this.selectedStore,
            }
          }

          )
          const visit = response.data;
          // console.log(visit);
          this.salesLastVisited = visit.sales_last_visited;
          this.salesInfo = visit.sales_checkin;
          this.totalStock = visit.total_stock;
          this.totalOmzet = visit.total_omzet;
          this.totalVisit = visit.total_checkin;
          const backgroundColor = ['#2234DA', '#ED1E1E', '#D92651', '#E8891D', '#244065',];
          const backgroundColorBarLine = ['#1F5399', '#9E9E9E', '#9E9E9E', '#9E9E9E', '#9E9E9E', '#9E9E9E'];
          const dataDifStock = this.eachDataDifChart(visit.chart_detail_differentiation_stock)
          const resultchartData1 = {
            labels: dataDifStock.label,
            datasets: [{
              data: dataDifStock.data,
              label: 'Product Stock in %',
              backgroundColor: dataDifStock.label.map((_, index) => backgroundColor[index % backgroundColor.length]),

            }]



          };
          this.chartData1 = resultchartData1;

          const dataDifOmzet = this.eachDataDifChart(visit.chart_detail_differentiation_omzet
          )
          const resultchartData2 = {
            labels: dataDifOmzet.label,
            datasets: [{
              label: 'Product Omzet in %',

              backgroundColor: dataDifStock.label.map((_, index) => backgroundColor[index % backgroundColor.length]),

              data: dataDifOmzet.data,

            }],
          };

          this.chartData2 = resultchartData2;


          const dataStock = this.eachDataChart(visit.chart_detail_stock)
          const resultchartData3 = {
            labels: dataStock.label,
            datasets: [
              {
                indexAxis: 'y',
                label: 'Detail Stock',
                backgroundColor: dataStock.label.map((_, index) => backgroundColorBarLine[index % backgroundColor.length]),
                data: dataStock.data
              }
            ]
          };
          this.chartData3 = resultchartData3;

          const dataOmset = this.eachDataChart(visit.chart_detail_omzet)
          const resultchartData4 = {
            labels: dataOmset.label,
            datasets: [
              {
                indexAxis: 'y',
                label: 'Detail Omzet',
                backgroundColor: dataOmset.label.map((_, index) => backgroundColorBarLine[index % backgroundColor.length]),
                data: dataOmset.data
              }
            ]
          };
          this.chartData4 = resultchartData4;

          const dataOrdertali = this.eachDataChart(visit.chart_detail_order_tali)
          const resultchartData5 = {
            labels: dataOrdertali.label,
            datasets: [
              {
                label: 'Detail Order',
                backgroundColor: dataOrdertali.label.map((_, index) => backgroundColorBarLine[index % backgroundColor.length]),
                data: dataOrdertali.data
              }
            ]
          };
          this.chartData5 = resultchartData5;
          const dataOrderselang = this.eachDataChart(visit.chart_detail_order_selang)

          const resultchartData6 = {
            labels: dataOrderselang.label,
            datasets: [
              {
                label: 'Detail Order',
                backgroundColor: dataOrderselang.label.map((_, index) => backgroundColorBarLine[index % backgroundColor.length]),
                data: dataOrderselang.data
              }
            ]
          };
          this.chartData6 = resultchartData6;



          this.loaded = true;

        }
      } catch (error) {
        flashMessage('error', 'AXIOS EROR', error)
      } finally {
        this.isLoading = false;
      }
    },

    async fetchDataStores() {
      try {
        if (getDataIsLogin()) {
          this.token = getDataIsLogin().token
          const response = await axios.get(`https://backend.qqltech.com:7021/operation/m_customer`, {
            headers: {
              "authorization": `${getDataIsLogin().token_type} ${this.token}`,
            },

          }

          )
          const stores = response.data;
          this.storesName = stores.data;
          this.getfilterCompany(this.selectedStore)

        }
      } catch (error) {
        flashMessage('error', 'Error', error)
      } finally {
        this.isLoading = false;
      }
    },

    getfilterCompany(id) {
      this.storesShow = this.storesName.find(data => data.id == id)
    },

    eachDataChart(array) {
      const label = []
      const data = []
      array.forEach(element => {
        label.push(element.code)
        data.push(element.total)
      });

      return {
        label,
        data
      }
    },

    eachDataDifChart(array) {
      const label = []
      const data = []
      const total = array.reduce((accumulator, element) => {
        return accumulator + element.tali + element.selang
      }, 0)
      array.forEach(element => {
        label.push(element.code)
        data.push(element.tali + element.selang) / total * 100
      });

      return {
        label,
        data
      }
    },


    exportReportPDF() {
      const doc = new jsPDF();
      if (this.rptFrom === this.rptTo) {
        doc.text(`             Rekap Visit Sales PT. Mepoly Industry\n                    Periode ${format_date(this.rptFrom)}`, 35, 15)
      } else {
        doc.text(`             Rekap Visit Sales PT. Mepoly Industry\n    Periode ${format_date(this.rptFrom)} s/d ${format_date(this.rptTo)}`, 35, 15)
      }

      const data = this.visit.filter((tgl) => tgl.date >= this.rptFrom && tgl.date <= this.rptTo).sort((a, b) => new Date(a.date) - new Date(b.date));
      const header = [['Hari & Tanggal', 'Kategori Produk', 'Kategori Produk', 'Nama Supplier', 'Brand', 'Nama Sales', 'Catatan']]
      let rows = ''

      data.forEach((itemReports) => {
        let row = '';

        row.push(format_date(itemReports.date));
        row.push(itemReports.sales_name);
        row.push(itemReports.sales_last_visited);
        rows.push(row)
      })
      doc.autoTable({
        head: header,
        body: rows,
        startY: 27,
      })
      doc.save('Report PT. Mepoly Industry.pdf')

    },

    // exportReportCSV() {
    //   const data = this.visit.filter((tgl) => tgl.date >= this.rptFrom && tgl.date <= this.rptTo).sort((a, b) => new Date(a.date) - new Date(b.date));
    //   const dataToExport = data.map(item => {
    //     const result = {

    //     }
    //     return result;
    //   })
    //   const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    //   const workbook = XLSX.utils.book_new();
    //   XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    //   XLSX.writeFile(workbook, 'Report PT. Mepoly Industry.xlsx');
    // },



  },


  computed: {
    isAuthenticated() {
      return localStorage.getItem('admin') !== null;
    },
    fetchDataParams() {
      return {
        periode_start: this.formatDate(this.periodeStart),
        periode_end: this.formatDate(this.periodeEnd),
        products: this.selectedProducts,
        storeId: this.selectedStore,
      }
    },


  },

  created() {
    const user = JSON.parse(localStorage.getItem('admin'))
    this.nama = user.data.name
    this.role = user.data.role

    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    const formattedDate = `${yyyy}-${mm}-${dd}`;
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
                  <input class="form-check-input" checked type="checkbox" value="Selang" v-model="selectedProducts"
                    id="checkBoxBrand1" @change="fetchDataVisit()" />
                  <label class="form-check-label" for="checkBoxBrand1">
                    Selang
                  </label>

                </div>
                <div class="form-check">
                  <input class="form-check-input" checked type="checkbox" value="Tali" v-model="selectedProducts"
                    id="checkBoxBrand2" @change="fetchDataVisit()" />
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
                    {{ (storesShow) ? storesShow.company : '' }}


                  </button>
                  <div class="dropdown-menu scrollable-menu" aria-labelledby="dropdownMenuButton">
                    <form class="px-4 py-2">
                      <input type="search" class="form-control searchCheck" placeholder="Search Store..."
                        autofocus="autofocus" @input="searchStores()">
                    </form>
                    <hr>


                    <div class="form-check checkStore" v-for="(stores, index) in storesName">
                      <input class="form-check-input" type="radio" name="stores" :id="stores.id" :value="stores.id"
                        v-model="selectedStore" @change="fetchDataVisit()" />
                      <label class="form-check-label" :for="stores.id">{{ stores.company }}</label>
                    </div>

                  </div>
                </div>


              </div>
            </div>

            <hr class="garis-sidebar" style=" margin-top: 20px" />
            <div class="d-grid gap-2 mt-2">
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
          <button class="button btn1" data-toggle="modal" data-target="#exampleModalShow">Show Store</button>

          <label class="period-date"><b>Period :</b></label>
          <input type="date" v-model="periodeStart" class="period-bar1" id="fromDate" @change="fetchDataVisit()">
          <label class="label-date"><b>To</b></label>
          <input type="date" v-model="periodeEnd" class="period-bar2" id="toDate" @change="fetchDataVisit()">
        </div>
        <div id="element-to-convert">
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
                    <p class="card-count mt-1 mb-1">{{ formattedNumber(totalStock.toLocaleString()) }}</p>
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
                    <p class="card-count mt-1 mb-1">Rp. {{ formatRupiah(totalOmzet.toString()) }} -</p>
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
                    <p class="card-count mt-1 mb-1">{{ totalVisit }}</p>
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
                      <div class="col-sm-12 canvas1" :loading="isLoading">
                        <div v-if="isLoading">
                          <div class="d-flex align-items-center px-3">
                            <strong class="me-4">Loading...</strong>
                            <div class="spinner-border ms-auto" role="status" aria-hidden="true"></div>
                          </div>

                        </div>
                        <div v-else>
                          <Doughnut v-if="loaded" :data="chartData1" :options="options" />

                        </div>
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
                        <div v-if="isLoading">
                          <div class="d-flex align-items-center px-3">
                            <strong class="me-4">Loading...</strong>
                            <div class="spinner-border ms-auto" role="status" aria-hidden="true"></div>
                          </div>

                        </div>
                        <div v-else>
                          <Doughnut v-if="loaded" :data="chartData2" :options="options" />

                        </div>
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
                        <div v-if="isLoading">
                          <div class="d-flex align-items-center px-3">
                            <strong class="me-4">Loading...</strong>
                            <div class="spinner-border ms-auto" role="status" aria-hidden="true"></div>
                          </div>

                        </div>
                        <div v-else>
                          <Bar :data="chartData3" v-if="loaded" :options="options" />

                        </div>

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
                        <div v-if="isLoading">
                          <div class="d-flex align-items-center px-3">
                            <strong class="me-4">Loading...</strong>
                            <div class="spinner-border ms-auto" role="status" aria-hidden="true"></div>
                          </div>

                        </div>
                        <div v-else>
                          <Bar :data="chartData4" v-if="loaded" :options="options" />

                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row mt-4 mb-2">
              <div class="col-sm-12">
                <div class="card mb-4 card-5">
                  <div class="card-body">
                    <div class="card-body">
                      <p class="card-title"><b>Detail Order</b></p>


                      <div class="col-sm-12 canvas2" v-if="isTali">
                        <p class="card-title2"><b>Product : Tali</b></p>
                        <div v-if="isLoading">
                          <div class="d-flex align-items-center px-3">
                            <strong class="me-4">Loading...</strong>
                            <div class="spinner-border ms-auto" role="status" aria-hidden="true"></div>
                          </div>

                        </div>
                        <div v-else>

                          <Line :data="chartData5" v-if="loaded" :options="options" />
                        </div>
                      </div>
                      <div class="col-sm-12 canvas2" v-if="isSelang">
                        <p class="card-title2 mt-5"><b>Product : Selang</b></p>
                        <div v-if="isLoading">
                          <div class="d-flex align-items-center px-3">
                            <strong class="me-4">Loading...</strong>
                            <div class="spinner-border ms-auto" role="status" aria-hidden="true"></div>
                          </div>

                        </div>
                        <div v-else>
                          <Line :data="chartData6" v-if="loaded" :options="options" />
                        </div>
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
                      <p class="card-title"><b>Salesman Info</b></p>
                      <div class="row">

                        <div class="col-sm-6" v-for="(salesman, index) in salesInfo" :key="index">
                          <div class="accordion accordion-flush" id="accordion1">
                            <div class="accordion-item">
                              <h2 class="accordion-header">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                  :data-bs-target="'#flush-collapse-' + index" aria-expanded="false"
                                  :aria-controls="'flush-collapse-' + index">
                                  <div class="col-sm-1 area-img-salesman">
                                    <img class="img-salesman"
                                      src="https://www.shareicon.net/data/512x512/2016/07/26/802001_man_512x512.png"
                                      alt="" />

                                  </div>
                                  <div class="col-sm-8">
                                    <h6 id="txt-salesman" name="salesman" :value="name">
                                      {{ salesman.name }}

                                    </h6>
                                  </div>
                                </button>
                              </h2>
                              <div :id="'flush-collapse-' + index" class="accordion-collapse collapse"
                                :data-bs-parent="'#accordion1'">
                                <div class="accordion-body">
                                  <div class="row salesman-history">
                                    <div class="col-sm-6">
                                      <small class="salesman-history-txt">
                                        {{ (storesShow) ? storesShow.company : '' }}
                                      </small><br>

                                    </div>
                                    <div class="col-sm-6">
                                      <div v-if="salesman.checkin">
                                        <small class="salesman-history-txt">
                                          {{ salesman.checkin }}
                                        </small><br>
                                      </div>
                                      <div v-else>
                                        <small class="salesman-history-txt">
                                          Tidak ada Data
                                        </small><br>
                                      </div>

                                    </div>
                                  </div>

                                </div>
                              </div>
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
        </div>
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
              <div class="row tanggal-modal">
                <div class="col-sm-6 label-modal">
                  <label class="color-black label-modal" style="align-items: center;">Pilih Data</label>
                </div>
                <div class="col-sm-6">
                  <div class="col-sm-12">
                    <select class="form-select" aria-label="Default select example" v-model="selectedDataexports">
                      <option value="product">Product</option>
                      <option value="omzet">Omzet</option>
                    </select>

                  </div>
                </div>
              </div>
            </div>
            <div class="mt-4 d-grid gap-2" style="align-items: center;">
              <button class="btn button3" @click="exportReportPDF()">Export PDF</button>
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
              <div class="row tanggal-modal">
                <div class="col-sm-6 label-modal">
                  <label class="color-black label-modal" style="align-items: center;">Pilih Data</label>
                </div>
                <div class="col-sm-6">
                  <div class="col-sm-12">
                    <select class="form-select" aria-label="Default select example" v-model="selectedDataexports">
                      <option selected></option>
                      <option value="product">Product</option>
                      <option value="omzet">Omzet</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div class="mt-4 d-grid gap-2" style="align-items: center;">
              <button class="btn button3" @click="exportReportCSV()">Export CSV</button>
            </div>
          </div>
          <div class="modal-footer">
          </div>
        </div>
      </div>
    </div>
    <!-- Modal 3 -->
    <div class="modal fade" id="exampleModalShow">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Show Store</h5>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-4">
                <p><b>
                    Store Name
                  </b></p>
              </div>
              <div class="col-sm-8">
                <p>
                  : {{ (storesShow) ? storesShow.company : '' }}
                </p>
              </div>
              <div class="col-sm-4">
                <p>
                  <b>Customer Name</b>
                </p>
              </div>
              <div class="col-sm-8">
                <p>
                  : {{ (storesShow) ? storesShow.name : '' }}
                </p>
              </div>
              <div class="col-sm-4">
                <p>
                  <b>Area</b>
                </p>
              </div>
              <div class="col-sm-8">
                <p>
                  : {{ (storesShow) ? storesShow.area : '' }}
                </p>
              </div>
            </div>

          </div>
          <div class="modal-footer">
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
