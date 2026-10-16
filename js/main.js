const envelope = document.querySelector("#envelope");
const openBtn = document.querySelector("#open-invite");
const invite = document.querySelector("#invite");

function abrirInvitacion() {
  if (!envelope || envelope.hidden) return;
  envelope.classList.add("is-open");
  invite.hidden = false;
  setTimeout(() => {
    envelope.hidden = true;
    envelope.setAttribute("aria-hidden", "true");
  }, 450);
}

openBtn?.addEventListener("click", abrirInvitacion);
envelope?.addEventListener("click", (event) => {
  if (event.target.closest("#open-invite") || event.target.closest(".envelope-card")) {
    abrirInvitacion();
  }
});

const target = new Date(document.querySelector("#countdown").dataset.fecha).getTime();
const pad = (n) => String(n).padStart(2, "0");

function tick() {
  const diff = Math.max(0, target - Date.now());
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff / 3600000) % 24);
  const m = Math.floor((diff / 60000) % 60);
  const s = Math.floor((diff / 1000) % 60);
  document.querySelector("#d").textContent = pad(d);
  document.querySelector("#h").textContent = pad(h);
  document.querySelector("#m").textContent = pad(m);
  document.querySelector("#s").textContent = pad(s);
}
tick();
setInterval(tick, 1000);

const lightbox = document.querySelector("#lightbox");
const lightboxImg = document.querySelector("#lightbox-img");
document.querySelectorAll(".shot").forEach((btn) => {
  btn.addEventListener("click", () => {
    lightboxImg.src = btn.dataset.src;
    lightbox.hidden = false;
  });
});
document.querySelector("#lightbox-close")?.addEventListener("click", () => {
  lightbox.hidden = true;
  lightboxImg.src = "";
});
lightbox?.addEventListener("click", (e) => {
  if (e.target === lightbox) {
    lightbox.hidden = true;
    lightboxImg.src = "";
  }
});

const form = document.querySelector("#rsvp-form");
const status = document.querySelector(".form-status");
form?.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(form));
  const lista = JSON.parse(localStorage.getItem("rsvp-mateo") || "[]");
  lista.push({ ...data, fecha: new Date().toISOString() });
  localStorage.setItem("rsvp-mateo", JSON.stringify(lista));
  status.hidden = false;
  status.textContent =
    data.asistencia === "si"
      ? "¡Gracias! Ya quedó tu lugar reservado."
      : "Gracias por avisarnos. Te extrañaremos.";
  form.reset();
});
