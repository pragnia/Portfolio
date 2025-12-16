// NAVBAR SCROLL EFFECT
window.addEventListener("scroll", () => {
  document
    .querySelector(".navbar")
    .classList.toggle("scrolled", window.scrollY > 50);
});

// CONTACT MODAL LOGIC
const contactBtn = document.getElementById("contactBtn");
const contactModal = document.getElementById("contactModal");
const closeContact = document.getElementById("closeContact");

let lastFocusedElement;
const focusableSelectors =
  'a[href], button:not([disabled]), [tabindex="0"]';

function openModal() {
  lastFocusedElement = document.activeElement;
  contactModal.classList.add("active");

  const focusableElements =
    contactModal.querySelectorAll(focusableSelectors);
  focusableElements[0].focus();

  contactModal.addEventListener("keydown", trapFocus);
}

function closeModal() {
  contactModal.classList.remove("active");
  contactModal.removeEventListener("keydown", trapFocus);
  lastFocusedElement.focus();
}

function trapFocus(e) {
  if (e.key !== "Tab") return;

  const focusableElements =
    contactModal.querySelectorAll(focusableSelectors);
  const first = focusableElements[0];
  const last = focusableElements[focusableElements.length - 1];

  if (e.shiftKey && document.activeElement === first) {
    e.preventDefault();
    last.focus();
  } else if (!e.shiftKey && document.activeElement === last) {
    e.preventDefault();
    first.focus();
  }
}

contactBtn.addEventListener("click", (e) => {
  e.preventDefault();
  openModal();
});

closeContact.addEventListener("click", closeModal);

contactModal.addEventListener("click", (e) => {
  if (e.target === contactModal) closeModal();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});
