document.addEventListener("DOMContentLoaded", () => {
  // Small touch-friendly interaction for the compact About page.
  document.querySelectorAll(".btn").forEach((button) => {
    button.addEventListener("click", () => {
      button.classList.add("pressed");
      setTimeout(() => button.classList.remove("pressed"), 180);
    });
  });
});
