"use strict";

document.addEventListener("DOMContentLoaded", function () {
  // Activate sidebar nav
  var elems = document.querySelectorAll(".sidenav");
  M.Sidenav.init(elems);
  loadNav();

  function loadNav() {
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
      if (this.readyState === 4) {
        if (this.status !== 200) return; // Muat daftar tautan menu

        document.querySelectorAll(".desktopnav, .sidenav").forEach(function (elm) {
          elm.innerHTML = xhttp.responseText;
        }); //MENDAFTARKAN EVENTlISTENER UNTUK SEETIAP TAUTAN MENU

        document.querySelectorAll(".sidenav a, .desktopnav a").forEach(function (elm) {
          elm.addEventListener("click", function (event) {
            // Tutup sidenav
            var sidenav = document.querySelector(".sidenav");
            M.Sidenav.getInstance(sidenav).close(); // Muat konten halaman yang dipanggil

            page = event.target.getAttribute("href").substr(1);
            loadPage(page);
          });
        });
      }
    };

    xhttp.open("GET", "content/nav-content.html", true);
    xhttp.send();
  } // Load page content


  var page = window.location.hash.substr(1);
  if (page === "") page = "Home";
  loadPage(page);

  function loadPage(page) {
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
      if (this.readyState === 4) {
        var content = document.querySelector("#content");

        if (this.status === 200) {
          content.innerHTML = xhttp.responseText;
        } else if (this.status === 404) {
          content.innerHTML = "<p>Halaman tidak ditemukan.</p>";
        } else {
          content.innerHTML = "<p>Ups.. halaman tidak dapat diakses.</p>";
        }
      }
    };

    xhttp.open("GET", "pages/".concat(page, ".html"), true);
    xhttp.send();
  }
});