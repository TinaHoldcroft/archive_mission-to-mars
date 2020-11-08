var countDownDate = new Date("Feb 18, 2021 00:00:00").getTime(); // Countdown date

var x = setInterval(function() {
    var now = new Date().getTime();   // Today's date and time
    var distance = countDownDate - now;   // Now - Countdown date
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("countdown").innerHTML = days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
    console.log ('Countdown update interval = 1s')

    // After launch text
    if (distance < 0) {
        clearInterval(x);
        document.getElementById("countdown").innerHTML = "The mission has been launched!";
        console.log ('Countdown date has passed')
    }
}, 1000) //Update every second