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
        <div class="row">
          <div class="col-sm-2">
            <img class="img-profile" src="https://www.shareicon.net/data/512x512/2016/07/26/802001_man_512x512.png"
              alt="" />
          </div>
          <div class="col-sm-5">
            <div class="row">
              <h6>Salesman Name</h6>
              <h6>Last Visited</h6>
            </div>
          </div>
          <div class="col-sm-5">
            <h6>: Isa Iman Muhammad</h6>
            <h6>: 03/04/2023</h6>
          </div>
        </div>
        <div class="offcanvas-body-inside mt-4">
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

              <hr class="garis-sidebar" style=" margin-top: 20px" />
            </div>
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
          </div>
        </div>

      </div>
    </div>
    <!-- END Sidebar -->
    <!-- Main Page  -->
    <div class="container body">
      <div class="main_container">
        <div class="right_col" role="main">
          <nav class="navbar">

            <div class="col-sm-1 navbar-brand">
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="button-closed bi bi-list" viewBox="0 0 16 16"
                data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample">
                <path fill-rule="evenodd"
                  d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
              </svg>
  
            </div>
            <div class="col-sm-2">
              <img class="header-img-logo" src="/assets/image/logo-panjang.png" alt="Logo Mepoly-Industry" height="50px" width="auto" />
  
            </div>
            <div class="col-sm-5">
              <div class="row">
                <div class="col-sm-6">
                  <button class="button button-primary">Export to PDF</button>
                </div>
                <div class="col-sm-6">
                  <button class="button button-primary">Export to CSV</button>

                </div>
              </div>
            </div>
            <div class="col-sm-4">
              
            </div>
          </nav>
         
        </div>
      </div>
    </div>
    <!-- END Main Page -->

  </main>
</template>
