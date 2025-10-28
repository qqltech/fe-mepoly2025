<template>
  <main v-if="isAuthenticated">
    <!-- Sidebar -->
    <div
      class="offcanvas offcanvas-start"
      tabindex="-1"
      id="offcanvasCustomer"
      aria-labelledby="offcanvasCustomerLabel"
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
                d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1-.708-.708l-4 4a.5.5 0 0 1 0 .708l4 4a.5.5 0 0 1-.708-.708z"
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
              <h4><b>Filter Customers</b></h4>
            </div>
            <hr class="garis-sidebar" style="margin-top: 5px" />
            <div class="row mt-2 mb-2">
              <div class="col-sm-12">
                <label><b>Search Customers</b></label>
                <input
                  type="search"
                  class="form-control"
                  placeholder="Search by name, email, phone..."
                  v-model="searchQuery"
                  @input="onSearchInput"
                />
              </div>
            </div>
            <div class="row mt-2 mb-2">
              <div class="col-sm-12">
                <label><b>Filter by Area</b></label>
                <select class="form-select" v-model="selectedArea" @change="onFilterChange">
                  <option value="">All Areas</option>
                  <option v-for="area in areas" :key="area.id" :value="area.name">
                    {{ area.name }}
                  </option>
                </select>
              </div>
            </div>
          </div>
          <hr class="garis-sidebar" style="margin-top: 20px" />
          <div class="d-grid gap-2 mt-2">
            <router-link
              to="/home"
              aria-expanded="true"
              tag="button"
              class="button3 btn-primary rtlink-btn4"
              >Home</router-link
            >
          </div>
        </div>
      </div>
    </div>
    <!-- END Sidebar -->

    <!-- Main Page -->
    <div class="wrapper" style="width: 100%; padding: 0; margin: 0;">
      <div class="main" style="width: 100%; padding: 0; margin: 0;">
        <div class="navbar navbar-expand" style="width: 100%; display: flex; justify-content: space-between; align-items: center; padding: 0.5rem 1rem; margin: 0;">
          <div style="display: flex; align-items: center;">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              class="button-closed bi bi-list sidebar-toggle js-sidebar-toggle"
              viewBox="0 0 16 16"
              data-bs-toggle="offcanvas"
              href="#offcanvasCustomer"
              role="button"
              aria-controls="offcanvasCustomer"
              style="margin-right: 1rem; cursor: pointer;"
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
          </div>

          <p class="header-txt" style="margin: 0; font-size: 1.5rem; font-weight: bold;">Customer List</p>

          <div class="header-kanan">
            <router-link
              to="/home"
              aria-expanded="true"
              tag="button"
              class="button3 btn-primary rtlink-btn4"
              style="width: 200px; padding: 0.5rem;"
              >Home</router-link
            >
          </div>
        </div>
        <hr class="garis-sidebar" style="margin-top: 0px !important" />

        <div class="row mt-4 mb-4" style="width: 100%; margin: 0; padding: 0;">
          <div class="col-12 px-0">
            <div class="card card-5" style="width: 100%; border-radius: 10px; margin: 0;">
              <div class="card-body" style="padding: 1.5rem;">
                <div class="card-body" style="padding: 0;">
                  <div class="row">
                    <div class="col-sm-6">
                      <p class="card-title"><b>Customer Management</b></p>
                    </div>
                    <div class="col-sm-6 text-end">
                      <button
                        class="btn button3"
                        data-bs-toggle="modal"
                        data-bs-target="#customerModal"
                        @click="resetForm"
                      >
                        <i class="bi bi-plus-circle"></i> Add Customer
                      </button>
                    </div>
                  </div>

                  <!-- Search and Filter Section -->
                  <div class="row mt-3 mb-3">
                    <div class="col-md-4">
                      <label><b>Search Customers</b></label>
                      <input
                        type="search"
                        class="form-control"
                        placeholder="Search by name, email, phone..."
                        v-model="searchQuery"
                        @input="onSearchInput"
                      />
                    </div>
                    <div class="col-md-4">
                      <label><b>Filter by Area</b></label>
                      <select class="form-select" v-model="selectedArea" @change="onFilterChange">
                        <option value="">All Areas</option>
                        <option v-for="area in areas" :key="area.id" :value="area.name">
                          {{ area.name }}
                        </option>
                      </select>
                    </div>
                  </div>

                  <div class="row mt-3">
                    <div class="col-12">
                      <div class="table-responsive w-100">
                        <table class="table table-hover w-100">
                          <thead class="table-dark">
                            <tr>
                              <th>No</th>
                              <th>Customer Name</th>
                              <th>Company</th>
                              <th>Email</th>
                              <th>Phone</th>
                              <th>Area</th>
                              <th>Address</th>
                              <th>Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr v-for="(customer, index) in customers" :key="customer.id">
                              <td>{{ (currentPage - 1) * itemsPerPage + index + 1 }}</td>
                              <td>{{ customer.name }}</td>
                              <td>{{ customer.company }}</td>
                              <td>{{ customer.email }}</td>
                              <td>{{ customer.phone }}</td>
                              <td>{{ customer["m_area.name"] || customer.area_name }}</td>
                              <td>{{ formatAddress(customer["address"] || customer.address) }}</td>
                              <td>
                                <button
                                  class="btn btn-sm btn-primary me-1"
                                  data-bs-toggle="modal"
                                  data-bs-target="#customerModal"
                                  @click="editCustomer(customer)"
                                  title="Edit"
                                >
                                  <i class="bi bi-pencil"></i>
                                </button>
                                <button
                                  class="btn btn-sm btn-danger"
                                  @click="deleteCustomer(customer.id)"
                                  title="Delete"
                                >
                                  <i class="bi bi-trash"></i>
                                </button>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>

                  <!-- Pagination -->
                  <div class="row mt-3">
                    <div class="col-sm-12">
                      <nav aria-label="Page navigation">
                        <ul class="pagination justify-content-center">
                          <li class="page-item" :class="{ disabled: currentPage === 1 }">
                            <a class="page-link" href="#" @click.prevent="prevPage">Previous</a>
                          </li>
                          <li
                            class="page-item"
                            v-for="page in visiblePages"
                            :key="page"
                            :class="{ active: currentPage === page }"
                          >
                            <a class="page-link" href="#" @click.prevent="goToPage(page)">{{ page }}</a>
                          </li>
                          <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                            <a class="page-link" href="#" @click.prevent="nextPage">Next</a>
                          </li>
                        </ul>
                      </nav>
                      <div class="text-center mt-2">
                        <small class="text-muted">
                          Showing {{ (currentPage - 1) * itemsPerPage + 1 }} to 
                          {{ Math.min(currentPage * itemsPerPage, totalCustomers) }} of 
                          {{ totalCustomers }} customers
                        </small>
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
    <!-- END Main Page -->

    <!-- Add/Edit Customer Modal -->
    <div
      class="modal fade"
      id="customerModal"
      tabindex="-1"
      aria-labelledby="customerModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="customerModalLabel">
              {{ isEditMode ? "Edit Customer" : "Add New Customer" }}
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="saveCustomer">
              <div class="mb-3">
                <label for="customerName" class="form-label">Customer Name</label>
                <input
                  type="text"
                  class="form-control"
                  id="customerName"
                  v-model="customerForm.name"
                  required
                  placeholder="Masukkan nama customer"
                />
              </div>
              <div class="mb-3">
                <label for="company" class="form-label">Company</label>
                <input
                  type="text"
                  class="form-control"
                  id="company"
                  v-model="customerForm.company"
                  required
                  placeholder="Masukkan nama perusahaan"
                />
              </div>
              <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input
                  type="email"
                  class="form-control"
                  id="email"
                  v-model="customerForm.email"
                  required
                  placeholder="Masukkan email customer"
                />
              </div>
              <div class="mb-3">
                <label for="phone" class="form-label">Phone</label>
                <input
                  type="tel"
                  class="form-control"
                  id="phone"
                  v-model="customerForm.phone"
                  required
                  placeholder="Masukkan nomor telepon"
                  minlength="9"
                  maxlength="13"
                  pattern="[0-9]+"
                  @input="onPhoneInput"
                />
              </div>
              <div class="mb-3">
                <label for="area" class="form-label">Area</label>
                <select class="form-select" v-model="customerForm.area_id" required>
                  <option value="">Pilih Area</option>
                  <option v-for="area in areas" :key="area.id" :value="area.id">
                    {{ area.name }}
                  </option>
                </select>
              </div>
                <div class="mb-3">
                <label for="address" class="form-label">Address</label>
                <input
                  type="text"
                  class="form-control"
                  id="address"
                  v-model="customerForm.address"
                  required
                  placeholder="Masukkan alamat customer"
                />
                </div>
                <div class="mb-3">
                <label for="tipe" class="form-label">Tipe</label>
                <input
                  type="text"
                  class="form-control"
                  id="tipe"
                  v-model="customerForm.tipe"
                  required
                  placeholder="Masukkan tipe customer"
                />
                </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                  Cancel
                </button>
                <button type="submit" class="btn btn-primary">
                  {{ isEditMode ? "Update" : "Add" }} Customer
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import axios from "axios";
import { flashMessage, getDataIsLogin } from "../config/functions";

export default {
  name: "CustomerListView",
  data() {
    return {
      customers: [],
      areas: [],
      searchQuery: "",
      selectedArea: "",
      currentPage: 1,
      itemsPerPage: 20,
      totalCustomers: 0,
      totalPages: 0,
      customerForm: {
        id: null,
        name: "",
        company: "",
        email: "",
        phone: "",
        area_id: "",
        address: "",
        tipe: ""

      },
      isEditMode: false,
      nama: "",
      role: "",
      isLoading: false,
      searchTimeout: null,
    };
  },
  computed: {
    isAuthenticated() {
      return localStorage.getItem("admin") !== null;
    },
    visiblePages() {
      const pages = [];
      const startPage = Math.max(1, this.currentPage - 2);
      const endPage = Math.min(this.totalPages, this.currentPage + 2);
      
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
      
      return pages;
    },
  },
  watch: {
    currentPage() {
      this.fetchCustomers();
    },
  },
  mounted() {
    this.fetchCustomers();
    this.fetchAreas();
    const user = JSON.parse(localStorage.getItem("admin"));
    this.nama = user?.data?.name || "";
    this.role = user?.data?.role || "";
  },
  methods: {
    async fetchCustomers() {
      try {
        this.isLoading = true;
        if (getDataIsLogin()) {
          const token = getDataIsLogin().token;
          const response = await axios.get(
            "https://backend.qqltech.com:7021/operation/m_customer",
            {
              headers: {
                authorization: `${getDataIsLogin().token_type} ${token}`,
              },
              params: {
                page: this.currentPage,
                paginate: this.itemsPerPage,
                search: this.searchQuery,
                where: this.selectedArea ? `area='${this.selectedArea}'` : undefined,
              },
            }
          );
          
          this.customers = response.data.data;
          this.totalCustomers = response.data.total;
          this.totalPages = response.data.last_page;
          this.currentPage = response.data.current_page;
        }
      } catch (error) {
        flashMessage("error", "ERROR", error);
      } finally {
        this.isLoading = false;
      }
    },
    async fetchAreas() {
      try {
        if (getDataIsLogin()) {
          const token = getDataIsLogin().token;
          const response = await axios.get(
            "https://backend.qqltech.com:7021/operation/m_area",
            {
              headers: {
                authorization: `${getDataIsLogin().token_type} ${token}`,
              },
              params: {
                paginate: 9999,
              },
            }
          );
          this.areas = response.data.data;
        }
      } catch (error) {
        flashMessage("error", "ERROR", error);
      }
    },
    // getStatusClass(status) {
    //   return status === "ACTIVE" ? "badge bg-success" : "badge bg-danger";
    // },
    formatAddress(address) {
      if (!address) return "";
      const maxLength = 40;
      return address.length > maxLength ? address.substring(0, maxLength) + "..." : address;
    },
    editCustomer(customer) {
      this.isEditMode = true;
      const areaName = customer["m_area.name"] || customer.area_name;
      const area = this.areas.find(a => a.name === areaName);
      const areaId = area ? area.id : '';
      this.customerForm = {
        id: customer.id,
        name: customer.name,
        company: customer.company,
        email: customer.email,
        phone: customer.phone,
        area_id: areaId,
        address: customer.address,
        tipe: customer.tipe || ""
      };
    },
    async saveCustomer() {
      try {
        const token = getDataIsLogin().token;
        const url = this.isEditMode
          ? `https://backend.qqltech.com:7021/operation/m_customer/${this.customerForm.id}`
          : "https://backend.qqltech.com:7021/operation/m_customer";

        const method = this.isEditMode ? "put" : "post";

        const response = await axios[method](url, this.customerForm, {
          headers: {
            authorization: `${getDataIsLogin().token_type} ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (response.data.success) {
          flashMessage("success", "Success!", "Customer saved successfully!");
          this.resetForm();
          this.fetchCustomers();
          document.querySelector('[data-bs-dismiss="modal"]').click();
        }
      } catch (error) {
        flashMessage("error", "ERROR", error);
      }
    },
    async deleteCustomer(id) {
      if (!confirm("Apakah Anda yakin ingin menghapus customer ini?")) {
      return;
      }
      try {
      const token = getDataIsLogin().token;
      const response = await axios.post(
        `https://backend.qqltech.com:7021/operation/m_customer/delete_cust`,
        { id }, 
        {
        headers: {
          authorization: `${getDataIsLogin().token_type} ${token}`,
          "Content-Type": "application/json",
        },
        }
      );
      if (response.data.message === "success") {
        flashMessage("success", "Success!", "Customer deleted successfully!");
        this.fetchCustomers();
      }
      } catch (error) {
      if (
        error.response &&
        error.response.status === 422 &&
        error.response.data?.message?.includes("tidak dapat dihapus")
      ) {
        flashMessage("error", "Customer sudah memiliki data transaksi, anda tidak dapat menghapusnya");
      } else {
        flashMessage("error", "ERROR", error);
      }
      }
    },
    resetForm() {
      this.customerForm = {
        id: null,
        name: "",
        company: "",
        email: "",
        phone: "",
        area_id: "",
        address: "",
        tipe: ""
      };
      this.isEditMode = false;
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    goToPage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
      }
    },
    onSearchInput() {
      clearTimeout(this.searchTimeout);
      this.searchTimeout = setTimeout(() => {
        this.currentPage = 1;
        this.fetchCustomers();
      }, 300);
    },
    onFilterChange() {
      this.currentPage = 1;
      this.fetchCustomers();
    },
    onPhoneInput(e) {
      // Hanya izinkan angka
      const val = e.target.value.replace(/[^0-9]/g, "");
      this.customerForm.phone = val;
    },
  },
};
</script>

<style scoped>
.badge {
  font-size: 0.75em;
}
.table-responsive {
  overflow-x: auto;
}
.pagination {
  margin-bottom: 0;
}
.page-link {
  cursor: pointer;
}
.page-item.disabled .page-link {
  cursor: not-allowed;
}

/* Full width table styles */
.wrapper {
  width: 100%;
  max-width: 100%;
  padding: 0;
  margin: 0;
}

.main {
  width: 100%;
  max-width: 100%;
  padding: 0;
  margin: 0;
}

.card-5 {
  width: 100%;
  max-width: 100%;
  border-radius: 10px;
}

.table {
  width: 100%;
  max-width: 100%;
}

/* Search input styling */
.form-control:focus {
  border-color: #4154f1;
  box-shadow: 0 0 0 0.2rem rgba(65, 84, 241, 0.25);
}
</style>
