const cookieBox = document.getElementById("cookieBox");
const cookieModal = document.getElementById("cookieModal");
const cookieAccept = document.getElementById("cookieAccept");
const cookieSettings = document.getElementById("cookieSettings");
const modalClose = document.getElementById("modalClose");
const saveCookieSettings = document.getElementById("saveCookieSettings");

function closeCookieBanner() {
  cookieBox.style.display = "none";
  localStorage.setItem("cleverCookieConsent", "saved");
}

if (localStorage.getItem("cleverCookieConsent")) {
  cookieBox.style.display = "none";
}

cookieAccept.addEventListener("click", closeCookieBanner);

cookieSettings.addEventListener("click", () => {
  cookieModal.classList.add("show");
  cookieModal.setAttribute("aria-hidden", "false");
});

function closeModal() {
  cookieModal.classList.remove("show");
  cookieModal.setAttribute("aria-hidden", "true");
}

modalClose.addEventListener("click", closeModal);
saveCookieSettings.addEventListener("click", () => {
  localStorage.setItem("cleverCookieConsent", "saved");
  closeModal();
  closeCookieBanner();
});

cookieModal.addEventListener("click", (e) => {
  if (e.target === cookieModal) closeModal();
});
