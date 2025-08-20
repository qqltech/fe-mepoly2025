<script setup>
import axios from "axios";
import {
  flashMessage,
  format_date,
  getDataIsLogin,
  formatRupiah,
  formattedNumber,
  exportReport,
} from "../config/functions";
import dayjs from "dayjs";
import "dayjs/locale/id";
import jsPDF from "jspdf";

import Swal from "sweetalert2";

import autoTable from "jspdf-autotable";
var tooltipTriggerList = [].slice.call(
  document.querySelectorAll('[data-bs-toggle="tooltip"]')
);
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl);
});
</script>

<script>
import { Bar, Line, Doughnut } from "vue-chartjs";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from "chart.js";
import { RouterLink } from "vue-router";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  Title,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement
);
export default {
  name: "BarChart",
  components: { Bar, Line, Doughnut, RouterLink },
  data() {
    return {
      today: new Date(),
      name: "",
      role: "",
      periodeEnd: "",
      periodeStart: "",
      products: [],
      storeId: "",
      isLoading: false,
      visit: [],
      visitData: [],
      data: null,
      user: null,
      token: "",
      stockData: "",
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
        },
      },
      isLoading: false,
      salesName: "",
      salesLastVisited: "",
      stores: [],
      storesName: [],
      storesShow: "",
      storesShowArea: "",
      area: [],
      areaExports: [],
      areaMaster: [],
      uniqueStoresArea: [],
      uniqueAreasExport: [],
      selectedArea: "All",
      selectedName: "All",
      totalVisit: "",
      totalOmzet: "",
      totalStock: "",
      selectedProducts: ["Tali", "Selang"],
      selectedStore: "1",
      isTali: true,
      isSelang: true,
      rptFrom: "",
      rptTo: "",
      selectedDataexports: "",
      selectedTypeexports: "",
      selectedNameEC: "",
      salesInfo: "",
      exportReport: [],
      fileUrl: null,
      downloadUrl: "",
      checkIn: "",
      brand: "",
      area: "",
      is_competitor: "",
      distributor: "",
      manager_id: "",
      salesmanData: [],
      salesmanNames: [],
      managerShow: "",
      manager: [],
      selectedManager: "",
      isAllSelected: true,
      isDropdownOpen: false,
      areaNameMaster: [],
      areaNames: "",
      areaMasters: [],
      areasShow: "",
      names: [],
      options: [],
      optionsExports: "",
      optionsSales: "",
      selectedOption: null,
      accounts: [],
      listAcc: [],
      selectedRoleEC: "",
      storesAreaExport: [],
      selectedAreaExports: [],
      selectedTypeSales: "",
      selectedFormatSales: "",
      selectedSales: [],
      selectedAreaSales: [],
    };
  },
  mounted() {
    this.isLoading = true;
    this.fetchDataVisit();
    this.fetchDataStores();
    this.fetchDataSalesman();
    this.fetchMasterArea();
    this.fetchDataAccount();
    // this.fetchDataAreaExports();
    const date = new Date();

    this.rptFrom = `${date.getFullYear()}-${("0" + (date.getMonth() + 1)).slice(
      -2
    )}-01`;
    this.rptTo = `${date.getFullYear()}-${("0" + (date.getMonth() + 1)).slice(
      -2
    )}-${("0" + date.getDate()).slice(-2)}`;
  },

  methods: {
    handleDataExport() {
      const url = new URL(
        "https://backend.qqltech.com:7021/public/dashboard/export"
      );
      const params = url.searchParams;
      params.set("from", this.rptFrom);
      params.set("to", this.rptTo);
      params.set("type", this.selectedDataexports);
      params.set("format", this.selectedTypeexports);
      params.set("area_ids", this.selectedAreaExports.join(","));
      this.downloadUrl = url.href;
      window.location.href = this.downloadUrl;
      // console.log(this.downloadUrl);
    },
    handleDataSalesman() {
      const url = new URL(
        "https://backend.qqltech.com:7021/public/dashboard/export"
      );
      const params = url.searchParams;
      params.set("from", this.rptFrom);
      params.set("to", this.rptTo);
      params.set("type", this.selectedTypeSales);
      params.set("format", this.selectedFormatSales);
      params.set("sales_ids", this.selectedSales.join(","));
      params.set("area_ids", this.selectedAreaSales.join(","));

      this.downloadUrl = url.href;
      window.location.href = this.downloadUrl;
      // console.log(this.downloadUrl);
    },
    handleDownload() {
      alert("Download will start soon!");
    },

    searchStores() {
      const input = document.querySelector(".searchCheck");
      const filter = input.value.toUpperCase();
      const stores = document.querySelectorAll(".checkStore");

      stores.forEach((store) => {
        const label = store.querySelector("label");
        const txtValue = label.textContent || label.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          store.style.display = "";
        } else {
          store.style.display = "none";
        }
      });
    },
    searchAreas() {
      const input = document.querySelector(".searchCheck");
      const filter = input.value.toUpperCase();
      const stores = document.querySelectorAll(".checkStore");

      stores.forEach((store) => {
        const label = store.querySelector("label");
        const txtValue = label.textContent || label.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          store.style.display = "";
        } else {
          store.style.display = "none";
        }
      });
    },

    logout() {
      if (confirm("Are you sure you want to exit?")) {
        localStorage.removeItem("admin");
        this.$router.push("/");
      }
    },

    formatDate(dateString) {
      const [dd, mm, yyyy] = dateString.split("-");
      return `${dd}-${mm}-${yyyy}`;
    },

    formatDate2(dateString) {
      const [dd, mm, yyyy] = dateString.split("/");
      return `${dd}/${mm}/${yyyy}`;
    },

    async fetchDataVisit() {
      try {
        if (getDataIsLogin()) {
          this.token = getDataIsLogin().token;
          const selectProduc = this.selectedProducts;
          if (selectProduc.length == 2) {
            this.isSelang = true;
            this.isTali = true;
          } else if (selectProduc[0] == "Tali") {
            this.isTali = true;
            this.isSelang = false;
          } else if (selectProduc[0] == "Selang") {
            this.isSelang = true;
            this.isTali = false;
          } else {
            this.isSelang = false;
            this.isTali = false;
          }
          this.getfilterCompany(this.selectedStore);
          const response = await axios.get(
            `https://backend.qqltech.com:7021/operation/dashboard/web`,
            {
              headers: {
                authorization: `${getDataIsLogin().token_type} ${this.token}`,
              },
              params: {
                periode_start: this.formatDate(this.periodeStart),
                periode_end: this.formatDate(this.periodeEnd),
                products: `${selectProduc[0] ? selectProduc[0] : ""}${
                  selectProduc[1] ? "-" + selectProduc[1] : ""
                }`,
                store_id: this.selectedStore,
              },
            }
          );
          const visit = response.data;
          // console.log(visit);
          this.salesLastVisited = visit.sales_last_visited;
          this.salesInfo = visit.sales_checkin;
          // console.log(this.salesInfo);
          this.totalStock = visit.total_stock;
          this.totalOmzet = visit.total_omzet;
          this.totalVisit = visit.total_checkin;
          const backgroundColor = [
            "#2234DA",
            "#ED1E1E",
            "#D92651",
            "#E8891D",
            "#244065",
          ];
          const backgroundColorBarLine = [
            "#1F5399",
            "#9E9E9E",
            "#9E9E9E",
            "#9E9E9E",
            "#9E9E9E",
            "#9E9E9E",
          ];

          const dataDifStock = this.eachDataDifChart(
            visit.chart_detail_differentiation_stock
          );
          const resultchartData1 = {
            labels: dataDifStock.label,
            datasets: [
              {
                data: dataDifStock.data,
                label: "Product Stock in %",
                backgroundColor: dataDifStock.label.map(
                  (_, index) => backgroundColor[index % backgroundColor.length]
                ),
              },
            ],
          };
          this.chartData1 = resultchartData1;

          const dataDifOmzet = this.eachDataDifChart(
            visit.chart_detail_differentiation_omzet
          );
          const resultchartData2 = {
            labels: dataDifOmzet.label,
            datasets: [
              {
                label: "Product Omzet in %",

                backgroundColor: dataDifStock.label.map(
                  (_, index) => backgroundColor[index % backgroundColor.length]
                ),

                data: dataDifOmzet.data,
              },
            ],
          };

          this.chartData2 = resultchartData2;

          const dataStock = this.eachDataChart(visit.chart_detail_stock);
          const resultchartData3 = {
            labels: dataStock.label,
            datasets: [
              {
                indexAxis: "y",
                label: "Detail Stock",
                backgroundColor: dataStock.label.map(
                  (_, index) =>
                    backgroundColorBarLine[index % backgroundColor.length]
                ),
                data: dataStock.data,
              },
            ],
          };
          this.chartData3 = resultchartData3;

          const dataOmset = this.eachDataChart(visit.chart_detail_omzet);
          const resultchartData4 = {
            labels: dataOmset.label,
            datasets: [
              {
                indexAxis: "y",
                label: "Detail Omzet",
                backgroundColor: dataOmset.label.map(
                  (_, index) =>
                    backgroundColorBarLine[index % backgroundColor.length]
                ),
                data: dataOmset.data,
              },
            ],
          };
          this.chartData4 = resultchartData4;

          const dataOrdertali = this.eachDataChart(
            visit.chart_detail_order_tali
          );
          const resultchartData5 = {
            labels: dataOrdertali.label,
            datasets: [
              {
                label: "Detail Order",
                backgroundColor: dataOrdertali.label.map(
                  (_, index) =>
                    backgroundColorBarLine[index % backgroundColor.length]
                ),
                data: dataOrdertali.data,
              },
            ],
          };
          this.chartData5 = resultchartData5;
          const dataOrderselang = this.eachDataChart(
            visit.chart_detail_order_selang
          );

          const resultchartData6 = {
            labels: dataOrderselang.label,
            datasets: [
              {
                label: "Detail Order",
                backgroundColor: dataOrderselang.label.map(
                  (_, index) =>
                    backgroundColorBarLine[index % backgroundColor.length]
                ),
                data: dataOrderselang.data,
              },
            ],
          };
          this.chartData6 = resultchartData6;

          this.loaded = true;
          // setTimeout(() => {
          //   alert(
          //     "This page is under maintenance by </Developers>, Please be patient!. Click OK to continue."
          //   );
          // }, 1000);
        }
      } catch (error) {
        flashMessage("error", "ERROR", error);
      } finally {
        this.isLoading = false;
      }
    },

    async fetchDataStores() {
      try {
        if (getDataIsLogin()) {
          this.token = getDataIsLogin().token;
          const response = await axios.get(
            `https://backend.qqltech.com:7021/operation/m_customer`,
            {
              headers: {
                authorization: `${getDataIsLogin().token_type} ${this.token}`,
              },
              params: {
                paginate: 9999,
              },
            }
          );
          const area = response.data;
          // console.log(area);
          this.storesArea = area.data;
          // console.log(this.storesArea);
          this.selectedArea = this.storesArea;
          const uniqueAreas = [
            ...new Set(this.storesArea.map((area) => area["m_area.name"])),
          ];
          uniqueAreas.sort((a, b) =>
            a.localeCompare(b, "en", { sensitivity: "base" })
          );

          this.uniqueStoresArea = ["All", ...uniqueAreas];
          const stores = response.data;
          // console.log(stores);

          this.storesName = stores.data.sort((a, b) =>
            a.company.localeCompare(b.company, "en", { sensitivity: "base" })
          );

          this.getfilterCompany(this.selectedStore);

          const storesAreaExport = response.data.data;
          this.storesAreaExport = storesAreaExport;
          const uniqueAreasExport = [
            ...new Set(this.storesAreaExport.map((area) => area["m_area.id"])),
          ];
          this.uniqueAreasExport = uniqueAreasExport;
          // console.log(this.uniqueAreasExport);
        }
      } catch (error) {
        flashMessage("error", "ERROR", error);
      } finally {
        this.isLoading = false;
      }
    },

    async fetchDataAccount() {
      try {
        if (getDataIsLogin()) {
          this.token = getDataIsLogin().token;
          const response = await axios.get(
            `https://backend.qqltech.com:7021/operation/default_users`,
            {
              headers: {
                authorization: `${getDataIsLogin().token_type} ${this.token}`,
              },
              params: {
                paginate: 9999,
              },
            }
          );

          const accounts = response.data.data;
          this.accounts = accounts;
          // this.accountsName = this.accounts.data;
          // console.log(this.accountsName);

          // console.log(accounts);
        }
      } catch (error) {
        flashMessage("error", "ERROR", error);
      } finally {
        this.isLoading = false;
      }
    },

    filterStoresByArea() {
      if (this.selectedArea.includes("All")) {
        this.isAllSelected = true;
        this.storesName = this.storesArea;
      } else {
        this.isAllSelected = false;
        this.storesName = this.storesArea.filter((store) =>
          this.selectedArea.includes(store["m_area.name"])
        );
      }
      this.selectedStore = {};
      this.isDropdownOpen = false;
    },

    getfilterCompany(id) {
      this.storesShow = this.storesName.find((data) => data.id == id);
    },

    getfilterArea(id) {
      this.areasShow = this.areaMasters.find((data) => data.id == id);
    },

    getfilterManager(id) {
      this.managerShow = this.managerNames.find((data) => data.id == id);
    },

    eachDataChart(array) {
      const labels = [];
      const data = [];

      array.forEach((element) => {
        if (element.total !== 0 ? parseInt(element.total) : null) {
          labels.push(element.code);
          data.push(parseInt(element.total));
        }
      });

      return {
        label: labels,
        data,
      };
    },

    eachDataDifChart(array) {
      const labels = [];
      const data = [];
      let total = 0;

      array.forEach((element) => {
        const sum = parseInt(element.tali) + parseInt(element.selang);
        // console.log(sum);
        if (sum !== 0) {
          labels.push(element.code);
          data.push(sum);
          total += sum;
        }
      });

      const dataPercentage = data.map((value) => (value / total) * 100);

      return {
        label: labels,
        data: dataPercentage,
      };
    },
    getManagerName(managerId) {
      const manager = this.managerNames.find(
        (manager) => manager.id === managerId
      );
      return manager ? manager.name : "";
    },

    addMasterArea() {
      const body = {
        code: this.area,
        name: this.area,
      };
      const config = {
        headers: {
          Authorization: `${getDataIsLogin().token_type} ${this.token}`,
          "Content-Type": "application/json",
        },
      };
      axios
        .post("https://backend.qqltech.com:7021/operation/m_area", body, config)
        .then((response) => {
          console.log("Data sent successfully:", response.data);
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "Data sent successfully",
            iconColor: "#244065",
            confirmButtonColor: "#244065",
            allowOutsideClick: false,
          }).then(() => {
            this.$router.push("/home");
            location.reload();
          });
        })
        .catch((error) => {
          console.error("Failed to send data:", error);
          if (error.response && error.response.status === 422) {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: "Data already exists",
              iconColor: "#244065",
              confirmButtonColor: "#244065",
              allowOutsideClick: false,
            });
          }
        });
    },

    addMasterBrand() {
      const isCompetitor = JSON.parse(this.is_competitor);
      const body = {
        code: this.brand,
        name: this.brand,
        is_competitor: isCompetitor,
      };
      const config = {
        headers: {
          Authorization: `${getDataIsLogin().token_type} ${this.token}`,
          "Content-Type": "application/json",
        },
      };
      axios
        .post(
          "https://backend.qqltech.com:7021/operation/m_brand",
          body,
          config
        )
        .then((response) => {
          console.log("Data sent successfully:", response.data);
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "Data sent successfully",
            iconColor: "#244065",
            confirmButtonColor: "#244065",
            allowOutsideClick: false,
          }).then(() => {
            this.$router.push("/home");
            location.reload();
          });
        })
        .catch((error) => {
          console.error("Failed to send data:", error);
          if (error.response && error.response.status === 422) {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: "Data already exists",
              iconColor: "#244065",
              confirmButtonColor: "#244065",
              allowOutsideClick: false,
            });
          }
        });
    },

    addMasterDistributor() {
      const body = {
        code: this.distributor,
        name: this.distributor,
        area_id: this.name,
      };
      // console.log(body);
      const config = {
        headers: {
          Authorization: `${getDataIsLogin().token_type} ${this.token}`,
          "Content-Type": "application/json",
        },
      };
      axios
        .post(
          "https://backend.qqltech.com:7021/operation/m_supplier",
          body,
          config
        )
        .then((response) => {
          console.log("Data sent successfully:", response.data);
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "Data sent successfully",
            iconColor: "#244065",
            confirmButtonColor: "#244065",
            allowOutsideClick: false,
          }).then(() => {
            this.$router.push("/home");
            location.reload();
          });
        })
        .catch((error) => {
          console.error("Failed to send data:", error);
          if (error.response && error.response.status === 422) {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: "Data already exists",
              iconColor: "#244065",
              confirmButtonColor: "#244065",
              allowOutsideClick: false,
            });
          }
        });
    },

    async fetchDataSalesman() {
      try {
        if (getDataIsLogin()) {
          this.token = getDataIsLogin().token;
          const response = await axios.get(
            `https://backend.qqltech.com:7021/operation/default_users`,
            {
              headers: {
                authorization: `${getDataIsLogin().token_type} ${this.token}`,
              },
              params: {
                where: "role = 'Salesman' OR role = 'Supervisor'",
                paginate: 9999,
              },
            }
          );
          const salesmanData = response.data;
          this.salesmanNames = salesmanData.data;
          this.salesmanNames.sort((a, b) =>
            a.name.localeCompare(b.name, "en", { sensitivity: "base" })
          );
          // console.log(salesmanData);
        }
      } catch (error) {
        flashMessage("error", "ERROR", error);
      } finally {
        this.isLoading = false;
      }
    },

    // exportCheckinSalesmanPDF() {
    //   const doc = new jsPDF();
    //   const data = this.salesInfo;

    //   if (this.periodeStart === this.periodeEnd) {
    //     doc.text(
    //       `Salesman Check In Reports PT. Mepoly Industry\n                    Period ${format_date(
    //         this.periodeStart
    //       )}\n`,
    //       35,
    //       15
    //     );
    //   } else {
    //     doc.text(
    //       `      Salesman Check In Reports PT. Mepoly Industry\n    Period ${format_date(
    //         this.periodeStart
    //       )} to ${format_date(this.periodeEnd)}`,
    //       35,
    //       15
    //     );
    //   }
    //   const header = [["Salesman Name", "Date", "Time", "Store"]];
    //   let rows = [];

    //   data.forEach((item) => {
    //     if (item.checkin && item.checkin.length > 0) {
    //       let row = [];

    //       row.push(item.name);
    //       if (item.checkin && item.checkin.length > 0) {
    //         const firstCheckin = item.checkin[0];
    //         row.push(firstCheckin.date || "");
    //         row.push(firstCheckin.time || "");
    //         row.push(firstCheckin.store || "");
    //       } else {
    //         row.push("");
    //         row.push("");
    //         row.push("");
    //       }

    //       rows.push(row);
    //     }
    //   });
    //   if (rows.length === 0) {
    //     rows = [["Tidak ada Salesman Check-in"]];
    //     doc.autoTable({
    //       head: header,
    //       body: rows,
    //       startY: 37,
    //     });
    //   } else {
    //     doc.autoTable({
    //       head: header,
    //       body: rows,
    //       startY: 27,
    //     });
    //   }
    //   doc.save("Salesman Check In Reports.pdf");
    // },

    async fetchMasterArea() {
      try {
        if (getDataIsLogin()) {
          this.token = getDataIsLogin().token;
          const response = await axios.get(
            `https://backend.qqltech.com:7021/operation/m_area`,
            {
              headers: {
                authorization: `${getDataIsLogin().token_type} ${this.token}`,
              },
              params: {
                paginate: 9999,
              },
            }
          );
          const areaMaster = response.data.data;
          // console.log(areaMaster);
          areaMaster.sort((a, b) =>
            a.name.localeCompare(b.name, "en", { sensitivity: "base" })
          );
          this.areaMasters = areaMaster;
          this.options = areaMaster.map((obj) => ({
            id: obj.id,
            name: obj.name,
          }));
          // this.names = names;

          this.optionsExports = areaMaster.map((obj) => ({
            id: obj.id,
            name: obj.name,
          }));

          this.optionsSales = areaMaster.map((obj) => ({
            id: obj.id,
            name: obj.name,
          }));

          // console.log(this.optionsExports);
        }
      } catch (error) {
        flashMessage("error", "ERROR", error);
      } finally {
        this.isLoading = false;
      }
    },
  },

  computed: {
    isAuthenticated() {
      return localStorage.getItem("admin") !== null;
    },
    filteredAccounts() {
      return this.accounts.filter((account) => {
        if (this.selectedRoleEC === "supervisor") {
          return account.role === "Supervisor";
        } else if (this.selectedRoleEC === "salesman") {
          return account.role === "Salesman";
        }
        return false;
      });
    },
    // dropdownLabel() {
    //   if (this.selectedAreaExports.length === 0) {
    //     return "Select Area";
    //   } else if (this.selectedAreaExports.length === 1) {
    //     return this.selectedAreaExports[0];
    //   } else {
    //     return "Multiple Areas Selected";
    //   }
    // },

    dropdownLabel() {
      if (this.selectedAreaExports.length === 0) {
        return "Select Area";
      } else if (this.selectedAreaExports.length === 1) {
        const selectedAreaId = this.selectedAreaExports[0];
        const selectedArea = this.optionsExports.find(
          (area) => area.id === selectedAreaId
        );
        return selectedArea ? selectedArea.name : "Unknown Area";
      } else {
        const selectedAreas = this.selectedAreaExports.map((selectedAreaId) => {
          const selectedArea = this.optionsExports.find(
            (area) => area.id === selectedAreaId
          );
          return selectedArea ? selectedArea.name : "Unknown Area";
        });
        return "Multiple Areas Selected";
      }
    },
    dropdownLabels() {
      if (this.selectedAreaSales.length === 0) {
        return "Select Area";
      } else if (this.selectedAreaSales.length === 1) {
        const selectedAreaId = this.selectedAreaSales[0];
        const selectedArea = this.optionsSales.find(
          (area) => area.id === selectedAreaId
        );
        return selectedArea ? selectedArea.name : "Unknown Area";
      } else {
        const selectedAreas = this.selectedAreaSales.map((selectedAreaId) => {
          const selectedArea = this.optionsSales.find(
            (area) => area.id === selectedAreaId
          );
          return selectedArea ? selectedArea.name : "Unknown Area";
        });
        return "Multiple Areas Selected";
      }
    },
    dropdownLabelss() {
      if (this.selectedSales.length === 0) {
        return "Select Name";
      } else if (this.selectedSales.length === 1) {
        const selectedSalesId = this.selectedSales[0];
        const selectedSales = this.salesmanNames.find(
          (sales) => sales.id === selectedSalesId
        );
        return selectedSales ? selectedSales.name : "Unknown";
      } else {
        const selectedSaless = this.selectedSales.map((selectedSalesId) => {
          const selectedSales = this.salesmanNames.find(
            (sales) => sales.id === selectedSalesId
          );
          return selectedSales ? selectedSales.name : "Unknown";
        });
        return "Multiple People Selected";
      }
    },
  },

  created() {
    const user = JSON.parse(localStorage.getItem("admin"));
    this.nama = user.data.name;
    this.role = user.data.role;

    const today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const dd1 = "01";

    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const yyyy = today.getFullYear();
    const formattedDate = `${yyyy}-${mm}-${dd}`;
    const formattedDatestart = `${yyyy}-${mm}-${dd1}`;

    this.periodeEnd = formattedDate;
    this.periodeStart = formattedDatestart;
  },
};
</script>

<template>
  <main v-if="isAuthenticated">
    <!-- Sidebar -->
    <div
      class="offcanvas offcanvas-start"
      tabindex="-1"
      id="offcanvasExample"
      aria-labelledby="offcanvasExampleLabel"
    >
      <div class="offcanvas-header">
        <div class="row">
          <div class="col-md-3 offcanvas-header-right">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              class="button-closed bi bi-x"
              viewBox="0 0 16 16"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            >
              <path
                d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
              />
            </svg>
          </div>
        </div>
      </div>
      <div class="offcanvas-body">
        <div class="offcanvas-body-inside mt-1">
          <div class="row">
            <div class="row card-user">
              <div class="col-sm-2 mt-2">
                <img
                  class="img-profile"
                  src="https://www.shareicon.net/data/512x512/2016/07/26/802001_man_512x512.png"
                  alt=""
                />
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
            <div class="row mt-2">
              <h4><b>Show</b></h4>
            </div>
            <hr class="garis-sidebar" style="margin-top: 5px" />
            <div class="row mt-2 mb-2">
              <div class="col-sm-6">
                <p>Product</p>
              </div>
              <div class="col-sm-6">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    checked
                    type="checkbox"
                    value="Selang"
                    v-model="selectedProducts"
                    id="checkBoxBrand1"
                    @change="fetchDataVisit()"
                  />
                  <label class="form-check-label" for="checkBoxBrand1">
                    Selang
                  </label>
                </div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    checked
                    type="checkbox"
                    value="Tali"
                    v-model="selectedProducts"
                    id="checkBoxBrand2"
                    @change="fetchDataVisit()"
                  />
                  <label class="form-check-label" for="checkBoxBrand2">
                    Tali
                  </label>
                </div>
              </div>
            </div>
            <hr class="garis-sidebar" style="margin-top: 20px" />
            <div class="row mt-2 mb-3">
              <div class="col-sm-6">
                <p>Filter Store Area</p>
              </div>
              <div class="col-sm-6">
                <div class="dropdown">
                  <button
                    class="dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton"
                    data-toggle="dropdown"
                    :aria-expanded="isDropdownOpen ? 'true' : 'false'"
                    @click="isDropdownOpen = !isDropdownOpen"
                  >
                    Select Area
                  </button>
                  <div
                    class="dropdown-menu scrollable-menu"
                    aria-labelledby="dropdownMenuButton"
                  >
                    <div
                      class="form-check checkStore"
                      v-for="area in uniqueStoresArea"
                      :key="area"
                    >
                      <input
                        class="form-check-input"
                        type="checkbox"
                        name="area"
                        :id="area"
                        :value="area"
                        v-model="selectedArea"
                        @change="filterStoresByArea"
                      />
                      <label class="form-check-label" :for="area">{{
                        area
                      }}</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <hr class="garis-sidebar" style="margin-top: 20px" />
            <div class="row mt-2 mb-3">
              <div class="col-sm-6">
                <p>Store Name</p>
              </div>
              <div class="col-sm-6">
                <div class="dropdown">
                  <button
                    class="dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    {{ storesShow ? storesShow.company : "" }}
                  </button>
                  <div
                    class="dropdown-menu scrollable-menu"
                    aria-labelledby="dropdownMenuButton"
                  >
                    <form class="px-4 py-2">
                      <input
                        type="search"
                        class="form-control searchCheck"
                        placeholder="Search Store..."
                        autofocus="autofocus"
                        @keyup="searchStores"
                      />
                    </form>
                    <hr />

                    <div
                      class="form-check checkStore"
                      v-for="(stores, index) in storesName"
                    >
                      <input
                        class="form-check-input"
                        type="radio"
                        name="stores"
                        :id="stores.id"
                        :value="stores.id"
                        v-model="selectedStore"
                        @change="fetchDataVisit()"
                      />
                      <label class="form-check-label" :for="stores.id">{{
                        stores.company
                      }}</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <hr class="garis-sidebar" style="margin-top: 20px" />

            <div class="row mt-2">
              <h6><b>Add Masters</b></h6>
            </div>
            <div class="row mt-3">
              <div class="col-sm-4">
                <button
                  class="btn buttonmodal"
                  data-bs-target="#exampleModalBrand"
                  data-bs-toggle="modal"
                >
                  Brand
                </button>
              </div>
              <div class="col-sm-4">
                <button
                  class="btn buttonmodal"
                  data-bs-target="#exampleModalArea"
                  data-bs-toggle="modal"
                >
                  Area
                </button>
              </div>
              <div class="col-sm-4">
                <button
                  class="btn buttonmodal"
                  data-bs-target="#exampleModalDistributor"
                  data-bs-toggle="modal"
                >
                  Distributor
                </button>
              </div>
            </div>
            <hr class="garis-sidebar" style="margin-top: 20px" />
            <div class="d-grid gap-2 mt-2">
              <router-link
                to="/customers"
                aria-expanded="true"
                tag="button"
                class="button3 btn-primary rtlink-btn4"
                ><svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-people-fill"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7Zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm-5.784 6A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216ZM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"
                  />
                </svg>
                Customer List</router-link
              >
            </div>
            <div class="d-grid gap-2 mt-2">
              <router-link
                to="/account"
                aria-expanded="true"
                tag="button"
                class="button3 btn-primary rtlink-btn4"
                ><svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-person-fill-gear"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm-9 8c0 1 1 1 1 1h5.256A4.493 4.493 0 0 1 8 12.5a4.49 4.49 0 0 1 1.544-3.393C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4Zm9.886-3.54c.18-.613 1.048-.613 1.229 0l.043.148a.64.64 0 0 0 .921.382l.136-.074c.561-.306 1.175.308.87.869l-.075.136a.64.64 0 0 0 .382.92l.149.045c.612.18.612 1.048 0 1.229l-.15.043a.64.64 0 0 0-.38.921l.074.136c.305.561-.309 1.175-.87.87l-.136-.075a.64.64 0 0 0-.92.382l-.045.149c-.18.612-1.048.612-1.229 0l-.043-.15a.64.64 0 0 0-.921-.38l-.136.074c-.561.305-1.175-.309-.87-.87l.075-.136a.64.64 0 0 0-.382-.92l-.148-.045c-.613-.18-.613-1.048 0-1.229l.148-.043a.64.64 0 0 0 .382-.921l-.074-.136c-.306-.561.308-1.175.869-.87l.136.075a.64.64 0 0 0 .92-.382l.045-.148ZM14 12.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0Z"
                  />
                </svg>
                Account Settings</router-link
              >
            </div>
            <hr class="garis-sidebar" style="margin-top: 20px" />

            <div class="d-grid gap-2 mt-2 mb-4">
              <router-link
                to=""
                @click="logout"
                aria-expanded="true"
                tag="button"
                class="button4 btn-danger rtlink-btn4"
                ><svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-power"
                  viewBox="0 0 16 16"
                >
                  <path d="M7.5 1v7h1V1h-1z" />
                  <path
                    d="M3 8.812a4.999 4.999 0 0 1 2.578-4.375l-.485-.874A6 6 0 1 0 11 3.616l-.501.865A5 5 0 1 1 3 8.812z"
                  />
                </svg>
                Logout</router-link
              >
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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            class="button-closed bi bi-list sidebar-toggle js-sidebar-toggle"
            viewBox="0 0 16 16"
            data-bs-toggle="offcanvas"
            href="#offcanvasExample"
            role="button"
            aria-controls="offcanvasExample"
          >
            <path
              fill-rule="evenodd"
              d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
            />
          </svg>
          <img
            class="header-img-logo"
            src="/assets/image/logo-panjang.png"
            alt="Logo Mepoly-Industry"
            height="50px"
            width="auto"
          />

          <button
            class="button btn1"
            data-toggle="modal"
            data-target="#exampleModalCenterReports"
          >
            Export Data
          </button>
          <button
            class="button btn1"
            data-toggle="modal"
            data-target="#exampleModalSalesman"
          >
            Check In Data
          </button>
          <button
            class="button btn1"
            data-toggle="modal"
            data-target="#exampleModalShow"
          >
            Show Store
          </button>
          <!-- <router-link to="/customers" class="button btn1">
           Master Customer
          </router-link> -->

          <label class="period-date"><b>Period :</b></label>
          <input
            type="date"
            v-model="periodeStart"
            class="period-bar1"
            id="fromDate"
            @change="fetchDataVisit()"
          />
          <label class="label-date"><b>To</b></label>
          <input
            type="date"
            v-model="periodeEnd"
            class="period-bar2"
            id="toDate"
            @change="fetchDataVisit()"
          />
        </div>
        <hr class="garis-sidebar" style="margin-top: 0px !important" />

        <div id="element-to-convert">
          <main class="content">
            <div class="container-fluid mt-3 p-0">
              <h1 class="h4"><b>Overview</b></h1>
            </div>

            <div class="row mt-4">
              <div class="col-sm-4">
                <div class="card">
                  <div class="card-body card-1">
                    <div class="row">
                      <div class="col mt-0">
                        <div class="row">
                          <div class="col-sm-2">
                            <div class="stat text-primary">
                              <img
                                class="img-stat"
                                src="/assets/image/box.png"
                                alt=""
                              />
                            </div>
                          </div>
                          <div
                            class="col-sm-10"
                            style="justify-content: center"
                          >
                            <p class="card-title"><b>Total Stock</b></p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <p class="card-count mt-1 mb-1">
                      {{ formattedNumber(totalStock.toLocaleString()) }} Pcs
                    </p>
                  </div>
                </div>
              </div>
              <div class="col-sm-4">
                <div class="card">
                  <div class="card-body card-2">
                    <div class="row">
                      <div class="col mt-0">
                        <div class="row">
                          <div class="col-sm-2">
                            <div class="stat text-primary">
                              <img
                                class="img-stat2"
                                src="/assets/image/money.png"
                                alt=""
                              />
                            </div>
                          </div>
                          <div
                            class="col-sm-10"
                            style="justify-content: center"
                          >
                            <p class="card-title"><b>Total Omzet</b></p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <p class="card-count mt-1 mb-1">{{ totalOmzet }} Pcs</p>
                  </div>
                </div>
              </div>
              <div class="col-sm-4">
                <div class="card">
                  <div class="card-body card-3">
                    <div class="row">
                      <div class="col mt-0">
                        <div class="row">
                          <div class="col-sm-2">
                            <div class="stat text-primary">
                              <img
                                class="img-stat3"
                                src="/assets/image/maps.png"
                                alt=""
                              />
                            </div>
                          </div>
                          <div
                            class="col-sm-10"
                            style="justify-content: center"
                          >
                            <p class="card-title"><b>Total Visit</b></p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <p class="card-count mt-1 mb-1">{{ totalVisit }} Times</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="row mt-4">
              <div class="col-sm-6">
                <div class="card card-4">
                  <div class="card-body">
                    <div class="card-body">
                      <p class="card-title">
                        <b>Product Stock Differentiation</b>
                      </p>
                      <div class="col-sm-12 canvas1" :loading="isLoading">
                        <div v-if="isLoading">
                          <div class="d-flex align-items-center px-3">
                            <strong class="me-4">Loading...</strong>
                            <div
                              class="spinner-border ms-auto"
                              role="status"
                              aria-hidden="true"
                            ></div>
                          </div>
                        </div>
                        <div v-else>
                          <Doughnut
                            v-if="loaded"
                            :data="chartData1"
                            :options="options"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-sm-6">
                <div class="card card-4">
                  <div class="card-body">
                    <div class="card-body">
                      <p class="card-title">
                        <b>Product Omzet Differentiation</b>
                      </p>
                      <div class="col-sm-12 canvas1">
                        <div v-if="isLoading">
                          <div class="d-flex align-items-center px-3">
                            <strong class="me-4">Loading...</strong>
                            <div
                              class="spinner-border ms-auto"
                              role="status"
                              aria-hidden="true"
                            ></div>
                          </div>
                        </div>
                        <div v-else>
                          <Doughnut
                            v-if="loaded"
                            :data="chartData2"
                            :options="options"
                          />
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
                            <div
                              class="spinner-border ms-auto"
                              role="status"
                              aria-hidden="true"
                            ></div>
                          </div>
                        </div>
                        <div v-else>
                          <Bar
                            :data="chartData3"
                            v-if="loaded"
                            :options="options"
                          />
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
                            <div
                              class="spinner-border ms-auto"
                              role="status"
                              aria-hidden="true"
                            ></div>
                          </div>
                        </div>
                        <div v-else>
                          <Bar
                            :data="chartData4"
                            v-if="loaded"
                            :options="options"
                          />
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
                            <div
                              class="spinner-border ms-auto"
                              role="status"
                              aria-hidden="true"
                            ></div>
                          </div>
                        </div>
                        <div v-else>
                          <Line
                            :data="chartData5"
                            v-if="loaded"
                            :options="options"
                          />
                        </div>
                      </div>
                      <div class="col-sm-12 canvas2" v-if="isSelang">
                        <p class="card-title2 mt-5"><b>Product : Selang</b></p>
                        <div v-if="isLoading">
                          <div class="d-flex align-items-center px-3">
                            <strong class="me-4">Loading...</strong>
                            <div
                              class="spinner-border ms-auto"
                              role="status"
                              aria-hidden="true"
                            ></div>
                          </div>
                        </div>
                        <div v-else>
                          <Line
                            :data="chartData6"
                            v-if="loaded"
                            :options="options"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row mt-1 mb-4">
              <div class="col-sm-12">
                <div class="card mb-4 card-5">
                  <div class="card-body">
                    <div class="card-body">
                      <p class="card-title"><b>Salesman Info</b></p>
                      <!-- <button
                        class="button btn1 btn-salesman-exports"
                        @click="exportCheckinSalesmanPDF()"
                      >
                        Export
                      </button> -->

                      <div
                        class="row"
                        v-for="(salesman, index) in salesInfo"
                        :key="index"
                      >
                        <div
                          class="col-sm-12 mt-1"
                          v-if="salesman.checkin && salesman.checkin.length > 0"
                        >
                          <div
                            class="accordion accordion-flush"
                            id="accordion1"
                          >
                            <div class="accordion-item">
                              <h2 class="accordion-header">
                                <button
                                  class="accordion-button collapsed"
                                  type="button"
                                  data-bs-toggle="collapse"
                                  :data-bs-target="'#flush-collapse-' + index"
                                  aria-expanded="false"
                                  :aria-controls="'flush-collapse-' + index"
                                >
                                  <div class="col-sm-1 area-img-salesman">
                                    <img
                                      class="img-salesman"
                                      src="https://www.shareicon.net/data/512x512/2016/07/26/802001_man_512x512.png"
                                      alt=""
                                    />
                                  </div>
                                  <div class="col-sm-8">
                                    <h6
                                      id="txt-salesman"
                                      name="salesman"
                                      :value="name"
                                    >
                                      {{ salesman.name }}
                                    </h6>
                                  </div>
                                </button>
                              </h2>
                              <div
                                :id="'flush-collapse-' + index"
                                class="accordion-collapse collapse"
                                :data-bs-parent="'#accordion1'"
                              >
                                <div class="accordion-body">
                                  <div class="row salesman-history">
                                    <div class="col-sm-4">
                                      <div v-if="salesman.checkin">
                                        <small class="salesman-history-txt">
                                          <!-- {{ salesman.checkin[0].store }} -->
                                          <li
                                            v-for="(
                                              item, index
                                            ) in salesman.checkin"
                                            :key="index"
                                          >
                                            {{ item.store }}
                                          </li> </small
                                        ><br />
                                      </div>
                                      <div v-else>
                                        <small class="salesman-history-txt">
                                          Tidak ada Data </small
                                        ><br />
                                      </div>
                                    </div>
                                    <div class="col-sm-4">
                                      <div v-if="salesman.checkin">
                                        <small class="salesman-history-txt">
                                          <li
                                            v-for="(
                                              item, index
                                            ) in salesman.checkin"
                                            :key="index"
                                          >
                                            {{ item.date }}
                                          </li> </small
                                        ><br />
                                      </div>
                                      <div v-else>
                                        <small class="salesman-history-txt">
                                          Tidak ada Data </small
                                        ><br />
                                      </div>
                                    </div>
                                    <div class="col-sm-4">
                                      <div v-if="salesman.checkin">
                                        <small class="salesman-history-txt">
                                          <li
                                            v-for="(
                                              item, index
                                            ) in salesman.checkin"
                                            :key="index"
                                          >
                                            {{ item.time }}
                                          </li> </small
                                        ><br />
                                      </div>
                                      <div v-else>
                                        <small class="salesman-history-txt">
                                          Tidak ada Data </small
                                        ><br />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <p
                              v-if="
                                salesInfo.every(
                                  (salesman) =>
                                    !salesman.checkin ||
                                    salesman.checkin.length === 0
                                )
                              "
                            >
                              Tidak ada Salesman Checkin
                            </p>
                          </div>
                        </div>
                        <!-- 
                        <v-else>
                              Tidak ada Salesman Checkin
                        </v-else> -->
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
    <div class="modal fade" id="exampleModalCenterReports">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Export Data</h5>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-6">
                <label
                  class="color-black col-form-label"
                  style="font-weight: bold"
                  >Select Date</label
                >
                <div class="col-sm-6"></div>
              </div>
              <div class="row tanggal-modal">
                <div class="col-sm-6 label-modal">
                  <label
                    class="color-black label-modal"
                    style="align-items: center"
                    >From<label style="color: red">*</label></label
                  >
                </div>
                <div class="col-sm-6 input-modal">
                  <input
                    type="date"
                    class="form-control export-date"
                    v-model="rptFrom"
                    required
                  />
                </div>
              </div>
              <div class="row tanggal-modal">
                <div class="col-sm-6 label-modal">
                  <label
                    class="color-black label-modal"
                    style="align-items: center"
                    >To<label style="color: red">*</label></label
                  >
                </div>
                <div class="col-sm-6 input-modal">
                  <input
                    type="date"
                    class="form-control export-date"
                    v-model="rptTo"
                    required
                  />
                </div>
              </div>
              <div class="row tanggal-modal">
                <div class="col-sm-6 label-modal">
                  <label
                    class="color-black label-modal"
                    style="align-items: center; font-weight: bold"
                    >Select Data<label style="color: red">*</label></label
                  >
                </div>
                <div class="col-sm-6">
                  <div class="col-sm-12">
                    <select
                      class="form-select"
                      aria-label="Default select example"
                      v-model="selectedDataexports"
                      required
                    >
                      <option value="omzet_new" selected>Stock + Omzet</option>
                      <option value="order">Order</option>
                    </select>
                  </div>
                </div>
              </div>

              <div class="row tanggal-modal">
                <div class="col-sm-6 label-modal">
                  <label
                    class="color-black label-modal"
                    style="align-items: center; font-weight: bold"
                    >Select Area<label style="color: red">*</label></label
                  >
                </div>
                <div class="col-sm-6">
                  <div class="dropdown">
                    <button
                      class="dropdown-toggle toggle2"
                      type="button"
                      id="dropdownMenuButton"
                      data-toggle="dropdown"
                      :aria-expanded="isDropdownOpen ? 'true' : 'false'"
                      @click="isDropdownOpen = !isDropdownOpen"
                    >
                      {{ dropdownLabel }}
                    </button>
                    <div
                      class="dropdown-menu scrollable-menu"
                      aria-labelledby="dropdownMenuButton"
                    >
                      <div
                        class="form-check checkStore"
                        v-for="areaExports in optionsExports"
                        :key="areaExports.id"
                      >
                        <input
                          class="form-check-input"
                          type="checkbox"
                          :id="areaExports.id"
                          :value="areaExports.id"
                          v-model="selectedAreaExports"
                          required
                        />
                        <label class="form-check-label" :for="areaExports.id">{{
                          areaExports.name
                        }}</label>
                      </div>
                    </div>
                    <!-- <p>{{ selectedAreaExports }}</p> -->
                  </div>
                </div>
              </div>
              <div class="row tanggal-modal">
                <div class="col-sm-6 label-modal">
                  <label
                    class="color-black label-modal"
                    style="align-items: center; font-weight: bold"
                    >Select File Type<label style="color: red">*</label></label
                  >
                </div>
                <div class="col-sm-6">
                  <div class="col-sm-12">
                    <select
                      class="form-select"
                      aria-label="Default select example"
                      v-model="selectedTypeexports"
                      required
                    >
                      <option value="html" selected>HTML</option>
                      <option value="excel">EXCEL</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div class="mt-4 d-grid gap-2 mb-3" style="align-items: center">
              <a
                :href="downloadUrl"
                download=""
                class="btn button3"
                @click.prevent="handleDataExport()"
                >Export Data</a
              >
            </div>
          </div>
          <!-- <div class="modal-footer"></div> -->
        </div>
      </div>
    </div>

    <!-- Modal 2 -->
    <div class="modal fade" id="exampleModalShow">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Show Store</h5>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-4">
                <p><b> Store Name </b></p>
              </div>
              <div class="col-sm-8">
                <p>: {{ storesShow ? storesShow.company : "" }}</p>
              </div>
              <div class="col-sm-4">
                <p>
                  <b>Customer Name</b>
                </p>
              </div>
              <div class="col-sm-8">
                <p>: {{ storesShow ? storesShow.name : "" }}</p>
              </div>
              <div class="col-sm-4">
                <p>
                  <b>Area</b>
                </p>
              </div>
              <div class="col-sm-8">
                <p>: {{ storesShow ? storesShow["m_area.name"] : "" }}</p>
              </div>
              <div class="col-sm-4">
                <p>
                  <b>Tipe</b>
                </p>
              </div>
              <div class="col-sm-8">
                <p>: {{ storesShow ? storesShow.tipe : "" }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal 3 -->
    <div class="modal fade" id="exampleModalSalesman">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Export Check In Data</h5>
          </div>
          <div class="modal-body">
            <div class="modal-body">
              <div class="row">
                <div class="col-sm-6">
                  <label
                    class="color-black col-form-label"
                    style="font-weight: bold"
                    >Select Date</label
                  >
                  <div class="col-sm-6"></div>
                </div>
                <div class="row tanggal-modal">
                  <div class="col-sm-6 label-modal">
                    <label
                      class="color-black label-modal"
                      style="align-items: center"
                      >From<label style="color: red">*</label></label
                    >
                  </div>
                  <div class="col-sm-6 input-modal">
                    <input
                      type="date"
                      class="form-control export-date"
                      v-model="rptFrom"
                    />
                  </div>
                </div>
                <div class="row tanggal-modal">
                  <div class="col-sm-6 label-modal">
                    <label
                      class="color-black label-modal"
                      style="align-items: center"
                      >To<label style="color: red">*</label></label
                    >
                  </div>
                  <div class="col-sm-6 input-modal">
                    <input
                      type="date"
                      class="form-control export-date"
                      v-model="rptTo"
                    />
                  </div>
                </div>
                <div class="row tanggal-modal">
                  <div class="col-sm-6 label-modal">
                    <label
                      class="color-black label-modal"
                      style="align-items: center; font-weight: bold"
                      >Select Data<label style="color: red">*</label></label
                    >
                  </div>
                  <div class="col-sm-6">
                    <div class="col-sm-12">
                      <select
                        class="form-select"
                        aria-label="Default select example"
                        v-model="selectedTypeSales"
                        required
                      >
                        <option value="checkin" selected>Data Check In</option>
                        <!-- <option value="order">Order</option> -->
                      </select>
                    </div>
                  </div>
                </div>
                <!-- <div class="row tanggal-modal">
                  <div class="col-sm-6 label-modal">
                    <label
                      class="color-black label-modal"
                      style="align-items: center; font-weight: bold"
                      >Select Role<label style="color: red">*</label></label
                    >
                  </div>
                  <div class="col-sm-6">
                    <div class="col-sm-12">
                      <select
                        class="form-select"
                        aria-label="Default select example"
                        v-model="selectedRoleCheckin"
                        required
                      >
                        <option value="All" selected>All</option>
                        <option value="Supervisor">Supervisor</option>
                        <option value="Salesman">Salesman</option>
                      </select>
                    </div>
                  </div>
                </div> -->
                <!-- <div class="row tanggal-modal">
                  <div class="col-sm-6 label-modal">
                    <label
                      class="color-black label-modal"
                      style="align-items: center; font-weight: bold"
                      >Area<label style="color: red">*</label></label
                    >
                  </div>
                  <div class="col-sm-6">
                    <div class="dropdown">
                      <button
                        class="dropdown-toggle toggle2"
                        type="button"
                        id="dropdownMenuButton"
                        data-toggle="dropdown"
                        :aria-expanded="isDropdownOpen ? 'true' : 'false'"
                        @click="isDropdownOpen = !isDropdownOpen"
                      >
                        {{ dropdownLabels }}
                      </button>
                      <div
                        class="dropdown-menu scrollable-menu"
                        aria-labelledby="dropdownMenuButton"
                      >
                        <div
                          class="form-check checkStore"
                          v-for="areaSales in optionsSales"
                          :key="areaSales.id"
                        >
                          <input
                            class="form-check-input"
                            type="checkbox"
                            :id="areaSales.id"
                            :value="areaSales.id"
                            v-model="selectedAreaSales"
                            required
                          />
                          <label class="form-check-label" :for="areaSales.id">{{
                            areaSales.name
                          }}</label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div> -->
                <div class="row tanggal-modal">
                  <div class="col-sm-6 label-modal">
                    <label
                      class="color-black label-modal"
                      style="align-items: center; font-weight: bold"
                      >Name<label style="color: red">*</label></label
                    >
                  </div>
                  <div class="col-sm-6">
                    <div class="col-sm-12">
                      <div class="dropdown">
                        <button
                          class="dropdown-toggle toggle2"
                          type="button"
                          id="dropdownMenuButton"
                          data-toggle="dropdown"
                          :aria-expanded="isDropdownOpen ? 'true' : 'false'"
                          @click="isDropdownOpen = !isDropdownOpen"
                        >
                          {{ dropdownLabelss }}
                        </button>
                        <div
                          class="dropdown-menu scrollable-menu"
                          aria-labelledby="dropdownMenuButton"
                        >
                          <div
                            class="form-check checkStore"
                            v-for="salesNames in salesmanNames"
                            :key="salesNames.id"
                          >
                            <input
                              class="form-check-input"
                              type="checkbox"
                              :id="salesNames.id"
                              :value="salesNames.id"
                              v-model="selectedSales"
                              required
                            />
                            <label
                              class="form-check-label"
                              :for="salesNames.id"
                              >{{ salesNames.name }}</label
                            >
                          </div>
                        </div>
                        <!-- <p>{{ selectedSales }}</p> -->
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row tanggal-modal">
                  <div class="col-sm-6 label-modal">
                    <label
                      class="color-black label-modal"
                      style="align-items: center; font-weight: bold"
                      >Select File Format<label style="color: red"
                        >*</label
                      ></label
                    >
                  </div>
                  <div class="col-sm-6">
                    <div class="col-sm-12">
                      <select
                        class="form-select"
                        aria-label="Default select example"
                        v-model="selectedFormatSales"
                        required
                      >
                        <option value="pdf">PDF</option>
                        <option value="excel">EXCEL</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div class="mt-4 d-grid gap-2" style="align-items: center">
                <button
                  download=""
                  class="btn button3"
                  @click="handleDataSalesman()"
                >
                  Export
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Area -->

    <div class="modal fade" id="exampleModalArea" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Master Data - Area</h5>
          </div>
          <div class="modal-body">
            <div class="modal-body">
              <form method="POST" @submit.prevent="addMasterArea">
                <div class="row tanggal-modal">
                  <div class="col-sm-6">
                    <label
                      class="color-black col-form-label"
                      style="font-weight: bold"
                      >Add Area<label style="color: red">*</label></label
                    >
                  </div>
                  <div class="col-sm-6">
                    <input
                      type="text"
                      class="form-control form-masterdata"
                      v-model="area"
                      required
                    />
                  </div>
                </div>

                <div class="mt-2 d-grid gap-2" style="align-items: center">
                  <button type="submit" class="btn button3" title="Add Data">
                    Add {{ area }}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div class="modal-footer"></div>
      </div>
    </div>

    <!-- Modal Brand -->

    <div class="modal fade" id="exampleModalBrand" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Master Data - Brand</h5>
          </div>
          <div class="modal-body">
            <div class="modal-body">
              <form method="POST" @submit.prevent="addMasterBrand">
                <div class="row tanggal-modal">
                  <div class="col-sm-6">
                    <label
                      class="color-black col-form-label"
                      style="font-weight: bold"
                      >Add Brand<label style="color: red">*</label></label
                    >
                  </div>
                  <div class="col-sm-6">
                    <input
                      type="text"
                      class="form-control form-masterdata"
                      v-model="brand"
                      required
                    />
                  </div>
                </div>
                <div class="row tanggal-modal">
                  <div class="col-sm-6">
                    <label
                      class="color-black col-form-label"
                      style="font-weight: bold"
                      >Competitor?<label style="color: red">*</label></label
                    >
                  </div>
                  <div class="col-sm-6">
                    <select
                      class="form-select"
                      aria-label="Default select example"
                      v-model="is_competitor"
                      required
                    >
                      <!-- <option selected disabled>- Select Option -</option> -->
                      <option :value="1">Yes</option>
                      <option :value="0">No</option>
                    </select>
                  </div>
                  <!-- <p>{{ is_competitor }}</p> -->
                </div>
                <div class="mt-2 d-grid gap-2" style="align-items: center">
                  <button type="submit" class="btn button3" title="Add Data">
                    Add {{ brand }}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div class="modal-footer"></div>
      </div>
    </div>
    <!-- Modal Distributor -->
    <div class="modal fade" id="exampleModalDistributor" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Master Data - Distributor</h5>
          </div>
          <div class="modal-body">
            <div class="modal-body">
              <form method="POST" @submit.prevent="addMasterDistributor">
                <div class="row tanggal-modal">
                  <div class="col-sm-6">
                    <label
                      class="color-black col-form-label"
                      style="font-weight: bold"
                      >Add Distributor<label style="color: red">*</label></label
                    >
                  </div>
                  <div class="col-sm-6">
                    <input
                      type="text"
                      class="form-control form-masterdata"
                      v-model="distributor"
                      required
                    />
                  </div>
                </div>
                <div class="row tanggal-modal">
                  <div class="col-sm-6">
                    <label
                      class="color-black col-form-label"
                      style="font-weight: bold"
                      >Select Area<label style="color: red">*</label></label
                    >
                  </div>
                  <div class="col-sm-6">
                    <div class="dropdown">
                      <button
                        class="dropdown-toggle"
                        type="button"
                        id="dropdownMenuButton"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        Select Area
                      </button>
                      <div
                        class="dropdown-menu scrollable-menu"
                        aria-labelledby="dropdownMenuButton"
                      >
                        <div
                          class="form-check checkStore"
                          v-for="option in options"
                          :key="option.id"
                        >
                          <input
                            class="form-check-input"
                            type="radio"
                            :id="option.id"
                            name="name"
                            v-model="name"
                            :value="option.id"
                            required
                          />
                          <label class="form-check-label" :for="option.id">{{
                            option.name
                          }}</label>
                          <!-- <p>{{ option.id }}</p> -->
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="mt-2 d-grid gap-2" style="align-items: center">
                  <button type="submit" class="btn button3" title="Add Data">
                    Add {{ distributor }}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div class="modal-footer"></div>
      </div>
    </div>

    <!-- Modal EC -->
  </main>
</template>
