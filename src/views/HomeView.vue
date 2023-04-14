<script setup></script>

<template>
  <main>
    <!-- Sidebar -->
    <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
      <div class="offcanvas-header">
        <div class="row">

          <div class="col-md-3 .offset-md-3">
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
              <div class="col-sm-4" style="justify-content: center; justify-items: center;">
                <h6>User ID</h6>
                <h6>Position</h6>
              </div>
              <div class="col-sm-6">
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
                    Barang A
                  </label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                  <label class="form-check-label" for="flexCheckDefault">
                    Barang B
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
                    Store B
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
                    Store B
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
                  <h6>: Isa Iman Muhammad</h6>
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

          <label class="period-date"><b>Period </b></label>
          <div class="row input-date">
            <div class="col-sm-2">
              <label for="fromDate" class="label-date">From</label>

            </div>
            <div class="col-sm-4">
              <input type="date" class="period-bar1" id="fromDate">

            </div>
            <div class="col-sm-2">
              <label for="fromDate" class="label-date">From</label>

            </div>
            <div class="col-sm-4">
              <input type="date" class="period-bar1" id="fromDate">

            </div>
          </div>


        </div>
        <main class="content">
          <div class="container-fluid mt-0 p-0">
            <h1 class="h4"><b>Overview</b></h1>
          </div>
          <div class="row">
            <div class="col-sm-4">
              <div class="card ">
                <div class="card-body card-1">
                  <div class="row"> 
                    <div class="col mt-0">
                      <div class="row">
                        <div class="col-sm-2">
                          <div class="stat text-primary">
                            <img src="/assets/image/box.png" alt="">
                          </div>
                        </div>
                        <div class="col-sm-10" style="justify-content: center;">
                          <p class="card-title">Total Stock</p>
                        </div>


                      </div>


                    </div>

                  </div>
                  <h1 class="card-count mt-1 mb-3">2.382</h1>

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
                            <img src="/assets/image/money.png" alt="">
                          </div>
                        </div>
                        <div class="col-sm-10" style="justify-content: center;">
                          <p class="card-title">Total Omzet</p>
                        </div>


                      </div>


                    </div>

                  </div>
                  <h1 class="card-count mt-1 mb-3">2.382</h1>

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
                            <img src="/assets/image/maps.png" alt="">
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
          <!-- <div class="col-xl-6 col-xxl-5 d-flex">
              <div class="w-100">
                <div class="row">
                  <div class="col-sm-6">
                    <div class="card">
                      <div class="card-body">
                        <div class="row">
                          <div class="col mt-0">
                            <h5 class="card-title">Sales</h5>
                          </div>

                          <div class="col-auto">
                            <div class="stat text-primary">
                              <i class="align-middle" data-feather="truck"></i>
                            </div>
                          </div>
                        </div>
                        <h1 class="mt-1 mb-3">2.382</h1>
                        <div class="mb-0">
                          <span class="text-danger">
                            <i class="mdi mdi-arrow-bottom-right"></i> -3.65%
                          </span>
                          <span class="text-muted">Since last week</span>
                        </div>
                      </div>
                    </div>
                    <div class="card">
                      <div class="card-body">
                        <div class="row">
                          <div class="col mt-0">
                            <h5 class="card-title">Visitors</h5>
                          </div>

                          <div class="col-auto">
                            <div class="stat text-primary">
                              <i class="align-middle" data-feather="users"></i>
                            </div>
                          </div>
                        </div>
                        <h1 class="mt-1 mb-3">14.212</h1>
                        <div class="mb-0">
                          <span class="text-success">
                            <i class="mdi mdi-arrow-bottom-right"></i> 5.25%
                          </span>
                          <span class="text-muted">Since last week</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <div class="card">
                      <div class="card-body">
                        <div class="row">
                          <div class="col mt-0">
                            <h5 class="card-title">Earnings</h5>
                          </div>

                          <div class="col-auto">
                            <div class="stat text-primary">
                              <i class="align-middle" data-feather="dollar-sign"></i>
                            </div>
                          </div>
                        </div>
                        <h1 class="mt-1 mb-3">$21.300</h1>
                        <div class="mb-0">
                          <span class="text-success">
                            <i class="mdi mdi-arrow-bottom-right"></i> 6.65%
                          </span>
                          <span class="text-muted">Since last week</span>
                        </div>
                      </div>
                    </div>
                    <div class="card">
                      <div class="card-body">
                        <div class="row">
                          <div class="col mt-0">
                            <h5 class="card-title">Orders</h5>
                          </div>

                          <div class="col-auto">
                            <div class="stat text-primary">
                              <i class="align-middle" data-feather="shopping-cart"></i>
                            </div>
                          </div>
                        </div>
                        <h1 class="mt-1 mb-3">64</h1>
                        <div class="mb-0">
                          <span class="text-danger">
                            <i class="mdi mdi-arrow-bottom-right"></i> -2.25%
                          </span>
                          <span class="text-muted">Since last week</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                  </div>
                </div> -->
          </div>
        </main>
      </div>
    </div>
    <!-- END Main Page -->

  </main>
</template>
