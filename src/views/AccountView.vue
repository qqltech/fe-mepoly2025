<script setup>
import axios from "axios";
import { flashMessage, format_date, getDataIsLogin } from "../config/functions";
import Swal from "sweetalert2";
import "bootstrap-icons/font/bootstrap-icons.css";
var tooltipTriggerList = [].slice.call(
  document.querySelectorAll('[data-bs-toggle="tooltip"]')
);
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new window.bootstrap.Tooltip(tooltipTriggerEl);
});
</script>
<script>
export default {
  data() {
    return {
      account: [],
      accounts: [],
      listAcc: [],
      areaCodes: [],
      area_ids: "",
      items: [],
      areaMap: {},
      headers: [
        { text: "Name", value: "name", filter: "format_date", sortable: true },
        { text: "Employee ID", value: "nip", sortable: true },
        {
          text: "Area",
          value: "area_list",
          sortable: true,
        },
        { text: "Email", value: "email", sortable: true },
        { text: "Username", value: "username", sortable: true },
        { text: "Phone", value: "phone", sortable: true },
        { text: "Role", value: "role", sortable: true },
        { text: "Status", value: "status", sortable: true },
        { text: "Action", value: "action" },
      ],
      userAccount: "",
      isLoading: true,
      status: "ACTIVE",
      selectedEdit: "",
      item: {
        id: "",
        value: "",
      },
      value: "",
      token: "",
      status_active: "",
      status_inactive: "",
      status_disabled: "",
      // filterTable: "",
      searchKeyword: "",
      accountForm: {
        id: null,
        name: "",
        email: "",
        username: "",
        phone: "",
        role: "",
        status: "",
        area_ids: []
      },
      areas: [],
      isEditMode: false,
      selectedAreas: [],
      areaSearch: "",
    };
  },
  mounted() {
    this.isLoading = true;
    this.fetchDataAccount();
    this.fetchAreas();
  },
  methods: {
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

          const account = response.data.data.map((dt) => {
            dt["area_list"] = dt.area.map((dArea) => dArea.code).join(",");
            return dt;
          });
          this.listAcc = account;
          this.accounts = response.data.data;
          // console.log(this.accounts);
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
          this.areas = response.data.data;
        }
      } catch (error) {
        flashMessage("error", "ERROR", error);
      }
    },

    async deleteFetch(id) {
      try {
        this.isLoading = true;
        if (getDataIsLogin()) {
          this.token = getDataIsLogin().token;
          const response = await fetch(
            `https://backend.qqltech.com:7021/operation/default_users/${id.id}`,
            {
              method: "DELETE",
              headers: {
                Authorization: `${getDataIsLogin().token_type} ${this.token}`,
                "Content-Type": "application/json",
              },
            }
          );
          // console.log(response);
          const result = await response.json();
          // console.log(result);
          if (result.success) {
            flashMessage("success", "Success!", "Data deleted!");
            this.isLoading = false;
            window.location.reload();
          } else {
            flashMessage("error", "Error", result.message);
            this.isLoading = false;
          }
        }
      } catch (error) {
        flashMessage("error", "Error", error);
        this.isLoading = false;
      }
    },

    async deleteAccount(id) {
      // const accounts = this.accounts;
      const data_byId = this.accounts.find((accounts) => accounts.id === id);
      console.log(data_byId);
      Swal.fire({
        icon: "question",
        title: `Delete ${data_byId.name}?`,
        showCancelButton: true,
        confirmButtonText: "Yes",
        iconColor: "#244065",
        confirmButtonColor: "#244065",
      }).then((result) => {
        if (result.isConfirmed) {
          this.deleteFetch(data_byId);
        }
      });
    },
    // filterTable() {
    //   const searchText = document
    //     .querySelector(".searchAcc")
    //     .value.toLowerCase();
    //   const filteredData = this.listAcc.filter((item) => {
    //     return item.name.toLowerCase().includes(searchText);
    //   });
    //   this.items = filteredData;
    // },
    async handleDeleteAccount(id) {
      await this.fetchDataAccount();
      this.deleteAccount(id);
    },
    logout() {
      if (confirm("Are you sure you want to exit?")) {
        localStorage.removeItem("admin");
        this.$router.push("/");
      }
    },

    editAccount(account) {
      this.isEditMode = true;
      this.accountForm = {
        id: account.id,
        name: account.name,
        email: account.email,
        username: account.username,
        phone: account.phone,
        role: account.role,
        status: account.status,
        area_ids: account.area_ids
      };
      this.selectedAreas = [...account.area_ids];
    },
    async saveAccount() {
      try {
        const token = getDataIsLogin().token;
        const response = await axios.put(
          `https://backend.qqltech.com:7021/operation/default_users/${this.accountForm.id}`,
          this.accountForm,
          {
            headers: {
              authorization: `${getDataIsLogin().token_type} ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.data.success) {
          flashMessage("success", "Success!", "Account updated successfully!");
          this.resetForm();
          this.fetchDataAccount();
          document.querySelector('[data-bs-dismiss="modal"]').click();
        }
      } catch (error) {
        flashMessage("error", "ERROR", error);
      }
    },
    resetForm() {
      this.accountForm = {
        id: null,
        name: "",
        email: "",
        username: "",
        phone: "",
        role: "",
        status: "",
        area_ids: []
      };
      this.isEditMode = false;
      this.selectedAreas = [];
      this.areaSearch = "";
    },

    saveAreaSelection() {
      this.accountForm.area_ids = [...this.selectedAreas];
      
      const areaModalEl = document.getElementById('areaModal');
      const areaModal = window.bootstrap.Modal.getInstance(areaModalEl);

      const accountModalEl = document.getElementById('accountModal');
      const accountModal = window.bootstrap.Modal.getInstance(accountModalEl);

      // When the area modal is hidden, show the account modal again.
      areaModalEl.addEventListener('hidden.bs.modal', () => {
        accountModal.show();
      }, { once: true }); // Use `once` to avoid adding multiple listeners

      areaModal.hide();
    },
  },
  computed: {
    isAuthenticated() {
      return localStorage.getItem("admin") !== null;
    },
    filteredItems() {
      if (this.searchKeyword) {
        const keyword = this.searchKeyword.toLowerCase();
        return this.listAcc.filter((item) => {
          for (const key in item) {
            if (
              item.hasOwnProperty(key) &&
              typeof item[key] === "string" &&
              item[key].toLowerCase().includes(keyword)
            ) {
              return true;
            }
          }
          return false;
        });
      }
      return this.listAcc;
    },
    filteredAreas() {
      if (this.areaSearch) {
        const search = this.areaSearch.toLowerCase();
        return this.areas.filter((area) =>
          area.name.toLowerCase().includes(search)
        );
      }
      return this.areas;
    },
  },
};
</script>

<template>
  <main v-if="isAuthenticated">
    <div class="wrapper">
      <div class="main">
        <div class="navbar navbar-expand">
          <router-link to="/home">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              fill="currentColor"
              class="button-backtohome bi bi-arrow-left"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
              /></svg
          ></router-link>
          <img
            class="header-img-logo"
            src="/assets/image/logo-panjang.png"
            alt="Logo Mepoly-Industry"
            height="50px"
            width="auto"
          />

          <p class="header-txt">Account Settings</p>

          <div class="header-kanan">
            <router-link
              to=""
              @click="logout"
              aria-expanded="true"
              tag="button"
              class="button4 btn-danger rtlink-btn4"
              style="position: absolute; right: 0; top: 15px; width: 200px"
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
        <hr class="garis-sidebar" style="margin-top: 0px !important" />

        <div class="row mt-4 mb-4">
          <div class="col-sm-12">
            <div class="card card-5">
              <div class="card-body">
                <div class="card-body">
                  <p class="card-title"><b>List Account</b></p>
                  <div class="col-sm-12 mt-2">
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
                      <form class="py-2 mb-3 right acc-form-search">
                        <input
                          type="search"
                          class="form-control searchAcc"
                          placeholder="Search Anything..."
                          autofocus="autofocus"
                          @keyup="filterTable"
                          v-model="searchKeyword"
                        />
                      </form>
                      <EasyDataTable
                        show-index
                        :loading="isLoading"
                        :headers="headers"
                        :items="filteredItems"
                        theme-color="#0068D4"
                        show-index-symbol="No."
                        header-text-direction="center"
                        table-class-name="customize-table"
                        :rows-per-page="10"
                      >
                        <template #item-action="item">
                          <div>
                            <div class="button-container">
                              <button
                                class="btn btn-sm btn-primary me-1"
                                data-bs-toggle="modal"
                                data-bs-target="#accountModal"
                                @click="editAccount(item)"
                                title="Edit"
                              >
                                <i class="bi bi-pencil"></i>
                              </button>
                              <button
                                class="btn btn-sm btn-danger"
                                @click="deleteAccount(item.id)"
                                title="Delete"
                              >
                                <i class="bi bi-trash"></i>
                              </button>
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
                        <li v-for="code in areaCodes" :key="code">
                          {{ code }}
                        </li>
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

    <!-- Edit Account Modal -->
    <div
      class="modal fade"
      id="accountModal"
      tabindex="-1"
      aria-labelledby="accountModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="accountModalLabel">Edit Account</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="saveAccount">
              <div class="mb-3">
                <label for="accountName" class="form-label">Name</label>
                <input
                  type="text"
                  class="form-control"
                  id="accountName"
                  v-model="accountForm.name"
                  required
                  placeholder="Enter account name"
                />
              </div>
              <div class="mb-3">
                <label for="accountEmail" class="form-label">Email</label>
                <input
                  type="email"
                  class="form-control"
                  id="accountEmail"
                  v-model="accountForm.email"
                  required
                  placeholder="Enter email"
                />
              </div>
              <div class="mb-3">
                <label for="accountUsername" class="form-label">Username</label>
                <input
                  type="text"
                  class="form-control"
                  id="accountUsername"
                  v-model="accountForm.username"
                  required
                  placeholder="Enter username"
                />
              </div>
              <div class="mb-3">
                <label for="accountPhone" class="form-label">Phone</label>
                <input
                  type="tel"
                  class="form-control"
                  id="accountPhone"
                  v-model="accountForm.phone"
                  required
                  placeholder="Enter phone number"
                />
              </div>
              <div class="mb-3">
                <label for="accountRole" class="form-label">Role</label>
                <select class="form-select" v-model="accountForm.role" required>
                  <option value="">Select Role</option>
                  <option value="Salesman">Salesman</option>
                  <option value="Supervisor">Supervisor</option>
                  <option value="Admin">Admin</option>
                  <option value="Manager">Manager</option>
                </select>
              </div>
              <div class="mb-3">
                <label for="accountStatus" class="form-label">Status</label>
                <select class="form-select" v-model="accountForm.status" required>
                  <option value="">Select Status</option>
                  <option value="ACTIVE">ACTIVE</option>
                  <option value="INACTIVE">INACTIVE</option>
                </select>
              </div>
              <div class="mb-3">
                <label for="accountAreas" class="form-label">Areas</label>
                <button
                  type="button"
                  class="btn btn-outline-primary w-100"
                  data-bs-toggle="modal"
                  data-bs-target="#areaModal"
                >
                  Select Areas ({{ selectedAreas.length }} selected)
                </button>
                <div class="mt-2">
                  <small class="text-muted">
                    Selected: {{ selectedAreas.map(id => areas.find(a => a.id === id)?.name).join(', ') }}
                  </small>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                  Cancel
                </button>
                <button type="submit" class="btn btn-primary">Update Account</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- Area Selection Modal -->
    <div
      class="modal fade"
      id="areaModal"
      tabindex="-1"
      aria-labelledby="areaModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="areaModalLabel">Select Areas</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <input
                type="text"
                class="form-control"
                placeholder="Search areas..."
                v-model="areaSearch"
              />
            </div>
            <div class="area-list" style="max-height: 400px; overflow-y: auto;">
              <div
                v-for="area in filteredAreas"
                :key="area.id"
                class="form-check"
              >
                <input
                  class="form-check-input"
                  type="checkbox"
                  :id="'area-' + area.id"
                  :value="area.id"
                  v-model="selectedAreas"
                />
                <label class="form-check-label" :for="'area-' + area.id">
                  {{ area.name }}
                </label>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
              Cancel
            </button>
            <button
              type="button"
              class="btn btn-primary"
              @click="saveAreaSelection"
            >
              Save Selection
            </button>
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
