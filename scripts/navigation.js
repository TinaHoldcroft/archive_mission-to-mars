function myFunction() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("searchInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("searchTable");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
                var element = document.getElementById("searchTable");
                element.classList.add("--show");
                element.classList.remove("--hide"); 
            } 
            else {
                tr[i].style.display = "none"; 
            } 
        } 
    } 
}

$('.search-icon').click(function() {
    if($('#searchTable').hasClass("--show")) {
        $('#searchTable').removeClass('--show');
        $('#searchTable').addClass('--hide'); 
    } 
});

const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
const links = document.querySelectorAll(".nav-links li");

hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("open");
    links.forEach(link => {
        link.classList.toggle("fade"); 
    }); 
});