// Marina Landing Page – Clean JS File

document.addEventListener("mousemove", (e) => {
  const landscape = document.querySelector(".landscape");
  const moveX = (e.clientX / window.innerWidth) * 10;
  const moveY = (e.clientY / window.innerHeight) * 10;
  landscape.style.transform = `translate(${moveX}px, ${moveY}px)`;
});
