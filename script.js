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
                document.getElementById("success-msg").style.display = "block";
                form.reset();
            }
        });
    }
});
