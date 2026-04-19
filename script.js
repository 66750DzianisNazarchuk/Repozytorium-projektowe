document.addEventListener("DOMContentLoaded", function() {
    const btnTheme = document.getElementById("btn-theme");
    let isDefaultRed = true; 

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

    const btnToggle = document.getElementById("btn-toggle");
    const sekcjaProjekty = document.getElementById("sekcja-projekty");

    btnToggle.addEventListener("click", function() {
        if (sekcjaProjekty.style.display === "none") {
            sekcjaProjekty.style.display = "block"; 
        } else {
            sekcjaProjekty.style.display = "none";  
        }
    });
});
