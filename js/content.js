document.addEventListener("DOMContentLoaded", () => {
    // Activate sidebar nav
    const elems = document.querySelectorAll(".sidenav");
    M.Sidenav.init(elems);
    loadNav();

    function loadNav() {
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4) {
                if (this.status !== 200) return;

                // Muat daftar tautan menu
                document.querySelectorAll(".desktopnav, .sidenav").forEach( (elm) => {
                    elm.innerHTML = xhttp.responseText;
                });

                //MENDAFTARKAN EVENTlISTENER UNTUK SEETIAP TAUTAN MENU
                document.querySelectorAll(".sidenav a, .desktopnav a").forEach((elm) => {
                    elm.addEventListener("click", (event) => {
                      // Tutup sidenav
                      let sidenav = document.querySelector(".sidenav");
                      M.Sidenav.getInstance(sidenav).close();
             
                      // Muat konten halaman yang dipanggil
                      page = event.target.getAttribute("href").substr(1);
                      loadPage(page);
                    });
                  });
            }
        };
        xhttp.open("GET", "content/nav-content.html", true);
        xhttp.send();
    }

    // Load page content
    let page = window.location.hash.substr(1);
    if (page === "") page = "Home";
    loadPage(page);

    function loadPage(page) {
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4) {
                let content = document.querySelector("#content");
                if (this.status === 200) {
                    content.innerHTML = xhttp.responseText;
                } else if (this.status === 404) {
                    content.innerHTML = "<p>Halaman tidak ditemukan.</p>";
                } else {
                    content.innerHTML = "<p>Ups.. halaman tidak dapat diakses.</p>";
                }
            }
        };
        xhttp.open("GET", `pages/${page}.html`, true);
        xhttp.send();   
    }

});