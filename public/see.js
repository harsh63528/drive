document.addEventListener("DOMContentLoaded", () => {
  fetch("/see").then((response) => {
    console.log(response);
  })
});