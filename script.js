
const navToggleButton = document.getElementById("navToggleBtn");

navToggleButton.addEventListener("click", toggleNavbar);

function toggleNavbar() {

    const navToggle = document.getElementById("to-be-toggled");

    navToggle.classList.toggle("nav-toggle");
    navToggleButton.classList.toggle("nav-turn-logo")
    console.log("done")
}


// dark mode activation

const activateOverlayBtn = document.getElementById("activate-overlay-btn");
activateOverlayBtn.addEventListener("click", () => {
    const overlay = document.querySelector('[data-overlay-darkmode]');

    if (!overlay.classList.contains("activate-overlay")) {
        overlay.classList.add("activate-overlay")
    }
});


const closeOverlayBtn = document.querySelector('[data-close-overlay]');

function closeOverlayFunc() {
    const overlay = document.querySelector('[data-overlay-darkmode]')
    if (overlay.classList.contains("activate-overlay")) {
        overlay.classList.remove("activate-overlay")
    }
}
closeOverlayBtn.addEventListener("click", closeOverlayFunc);




const activateDarkmode = document.getElementById("dark_mode_toggle");
activateDarkmode.addEventListener("click", () => {
    const body = document.body;
    if (!body.classList.contains("darkmode")) {
        body.classList.add("darkmode");
    } else {
        body.classList.remove("darkmode")
    }


    const isDarkMode = document.body.classList.contains("darkmode");
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");

    console.log("Dark mode toggled:", isDarkMode ? "on" : "off");

});







document.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
        document.body.classList.add("darkmode");
    } else {
        document.body.classList.remove("darkmode");
    }
});




// text animation 

let TxtRotate = function (el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = "";
    this.tick();
    this.isDeleting = false;
};

TxtRotate.prototype.tick = function () {
    let i = this.loopNum % this.toRotate.length;
    let fullTxt = this.toRotate[i];

    if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">' + this.txt + "</span>";

    let that = this;
    let delta = 300 - Math.random() * 100;

    if (this.isDeleting) {
        delta /= 2;
    }

    if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
    } else if (this.isDeleting && this.txt === "") {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
    }

    setTimeout(function () {
        that.tick();
    }, delta);
};

window.onload = function () {
    let elements = document.getElementsByClassName("txt-rotate");
    for (let i = 0; i < elements.length; i++) {
        let toRotate = elements[i].getAttribute("data-rotate");
        let period = elements[i].getAttribute("data-period");
        if (toRotate) {
            new TxtRotate(elements[i], JSON.parse(toRotate), period);
        }
    }
};
