const cube = document.getElementById("cube");
const cback = document.querySelector(".back");
const ctop = document.querySelector(".topcrate");
const cleft = document.querySelector(".leftcrate");
const cright = document.querySelector(".rightcrate");
const glow = document.querySelector(".hexagon");
const powerup = document.querySelector(".powerup");
const transitionTime = "750ms";
let c = 0;

ctop.style.transition = `all ${transitionTime}`;
cleft.style.transition = `all ${transitionTime}`;
cright.style.transition = `all ${transitionTime}`;
cube.style.transition = `all ${transitionTime}`;
powerup.style.transition = `all ${transitionTime}`;
glow.style.transition = `all ${transitionTime}`;
cback.style.transition = `all ${transitionTime}`;

let isOpen = false;
cube.addEventListener("click", openCube);

function openCube() {
  if (!this.isOpen) {
    award();
    ctop.style.transform = "translateY(-3rem)";
    cleft.style.transform = "translateX(-3rem)";
    cright.style.transform = "translateX(3rem)";
    ctop.style.opacity = 0.2;
    cleft.style.opacity = 0.2;
    cright.style.opacity = 0.2;
    cback.style.opacity = 0.2;
    glow.style.opacity = 0.5;
    powerup.style.opacity = 1;
    this.isOpen = true;
    cube.style.animationPlayState = "paused";
    powerup.style.zIndex = 10;
    powerup.style.height = "240px";
    powerup.style.width = "240px";
  } else {
    ctop.style.transform = "translateY(0)";
    cleft.style.transform = "translateX(0)";
    cright.style.transform = "translateX(0)";
    cube.style.opacity = 1;
    this.isOpen = false;
    ctop.style.opacity = 1;
    cleft.style.opacity = 1;
    cright.style.opacity = 1;
    cback.style.opacity = 1;
    glow.style.opacity = 1;
    powerup.style.opacity = 0;
    powerup.style.zIndex = 0;
    cube.style.animationPlayState = "running";
    powerup.style.height = "48px";
    powerup.style.width = "48px";
    changeVar("rgba(192, 99, 111, 0.5)");
  }
}

function changeVar(glow) {
  document.documentElement.style.setProperty("--glow", glow);
}

function award() {
    powerup.style.backgroundImage = "url('images/9790.png')";
    changeVar("rgba(192, 99, 111, 0.5)");
}