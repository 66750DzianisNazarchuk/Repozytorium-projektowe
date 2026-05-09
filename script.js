document.addEventListener("DOMContentLoaded", function() {
    
    const btnTheme = document.getElementById("btn-theme");
    let isDefaultRed = true; 

    if (btnTheme) {
        btnTheme.addEventListener("click", function() {
            if (isDefaultRed) {
                document.body.style.backgroundColor = "darkgreen";
                document.body.style.color = "black";
                isDefaultRed = false;
            } else {
                document.body.style.backgroundColor = "darkred";
                document.body.style.color = "black";
                isDefaultRed = true;
            }
        });
    }

    const btnToggle = document.getElementById("btn-toggle");
    const sekcjaProjekty = document.getElementById("sekcja-projekty");

    if (btnToggle && sekcjaProjekty) {
        btnToggle.addEventListener("click", function() {
            if (sekcjaProjekty.style.display === "none") {
                sekcjaProjekty.style.display = "block"; 
            } else {
                sekcjaProjekty.style.display = "none";  
            }
        });
    }

    const form = document.getElementById("contact-form");

    if (form) {
        form.addEventListener("submit", function(event) {
            event.preventDefault(); 

            let isValid = true;

            const imie = document.getElementById("imie").value.trim();
            const nazwisko = document.getElementById("nazwisko").value.trim();
            const email = document.getElementById("email").value.trim();
            const wiadomosc = document.getElementById("wiadomosc").value.trim();

            document.querySelectorAll(".error-msg").forEach(el => el.textContent = "");
            document.getElementById("success-msg").style.display = "none";

            const hasDigits = /\d/;
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (imie === "") {
                document.getElementById("error-imie").textContent = "Pole imię jest wymagane.";
                isValid = false;
            } else if (hasDigits.test(imie)) {
                document.getElementById("error-imie").textContent = "Imię nie może zawierać cyfr.";
                isValid = false;
            }

            if (nazwisko === "") {
                document.getElementById("error-nazwisko").textContent = "Pole nazwisko jest wymagane.";
                isValid = false;
            } else if (hasDigits.test(nazwisko)) {
                document.getElementById("error-nazwisko").textContent = "Nazwisko nie może zawierać cyfr.";
                isValid = false;
            }

            if (email === "") {
                document.getElementById("error-email").textContent = "Pole e-mail jest wymagane.";
                isValid = false;
            } else if (!emailRegex.test(email)) {
                document.getElementById("error-email").textContent = "Podaj poprawny adres e-mail.";
                isValid = false;
            }

            if (wiadomosc === "") {
                document.getElementById("error-wiadomosc").textContent = "Pole wiadomość nie może być puste.";
                isValid = false;
            }

            if (isValid) {
                const formData = {
                    imie: imie,
                    nazwisko: nazwisko,
                    email: email,
                    wiadomosc: wiadomosc
                };

               fetch("https://webhook.site/fae5a525-da90-4e69-97ed-fd0152deeacc", {
                    method: "POST",
                    mode: "no-cors",
                    body: JSON.stringify(formData)
                })
                .then(() => {
                    document.getElementById("success-msg").style.display = "block";
                    form.reset();
                })
                .catch(error => {
                    console.error("Wystąpił błąd:", error);
                });
            }
        });
    }

    fetch('data.json')
        .then(response => {
            if (!response.ok) {
                throw new Error("Błąd");
            }
            return response.json();
        })
        .then(data => {
            const listaUmiejetnosci = document.getElementById('lista-umiejetnosci');
            const listaZainteresowania = document.getElementById('lista-zainteresowania');

            if (listaUmiejetnosci) {
                data.umiejetnosci.forEach(item => {
                    const li = document.createElement('li');
                    li.textContent = item;
                    listaUmiejetnosci.appendChild(li);
                });
            }

            if (listaZainteresowania) {
                data.zainteresowania.forEach(item => {
                    const li = document.createElement('li');
                    li.textContent = item;
                    listaZainteresowania.appendChild(li);
                });
            }
        })
        .catch(error => {
            console.error(error);
        });

    const inputNotatka = document.getElementById("nowa-notatka");
    const btnDodajNotatke = document.getElementById("btn-dodaj-notatke");
    const listaNotatek = document.getElementById("lista-notatek");

    if (inputNotatka && btnDodajNotatke && listaNotatek) {
        function pobierzNotatki() {
            const notatki = localStorage.getItem("mojeNotatki");
            return notatki ? JSON.parse(notatki) : [];
        }

        function zapiszNotatki(notatki) {
            localStorage.setItem("mojeNotatki", JSON.stringify(notatki));
        }

        function wyswietlNotatki() {
            listaNotatek.innerHTML = "";
            const notatki = pobierzNotatki();

            notatki.forEach((notatka, index) => {
                const li = document.createElement("li");
                li.style.marginBottom = "5px";
                li.textContent = notatka + " ";

                const btnUsun = document.createElement("button");
                btnUsun.textContent = "Usuń";
                btnUsun.style.marginLeft = "10px";
                btnUsun.style.cursor = "pointer";
                btnUsun.onclick = function() {
                    usunNotatke(index);
                };

                li.appendChild(btnUsun);
                listaNotatek.appendChild(li);
            });
        }

        btnDodajNotatke.addEventListener("click", function() {
            const tekst = inputNotatka.value.trim();
            if (tekst !== "") {
                const notatki = pobierzNotatki();
                notatki.push(tekst);
                zapiszNotatki(notatki);
                inputNotatka.value = "";
                wyswietlNotatki();
            }
        });

        function usunNotatke(index) {
            const notatki = pobierzNotatki();
            notatki.splice(index, 1);
            zapiszNotatki(notatki);
            wyswietlNotatki();
        }

        wyswietlNotatki();
    }

});
