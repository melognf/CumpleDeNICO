// main.js
import { db } from "./firebase-config.js";
import {
  collection, addDoc, onSnapshot, query, orderBy,
  deleteDoc, getDocs, doc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const inputNombre = document.getElementById("nombreAsistente");
const btnAgregar = document.getElementById("agregarAsistente");
const mural = document.getElementById("muralAsistentes");

const q = query(collection(db, "asistentes"), orderBy("timestamp", "asc"));

onSnapshot(q, (snapshot) => {
  mural.innerHTML = "";
  snapshot.forEach(docSnap => {
    const asistente = docSnap.data();
    const div = document.createElement("div");
    div.className = "asistente animate__animated animate__fadeInUp";
div.style.animationDelay = `${Math.random() * 0.5}s`;

    div.textContent = asistente.nombre;
    mural.appendChild(div);
  });
});

btnAgregar.addEventListener("click", async () => {
  const nombre = inputNombre.value.trim();
  if (nombre !== "") {
    try {
      await addDoc(collection(db, "asistentes"), {
        nombre,
        timestamp: Date.now()
      });
      inputNombre.value = "";
      document.getElementById("sonidoZeldaFanfare").play();

    } catch (e) {
      alert("Error al agregar asistente.");
      console.error(e);
    }
  } else {
    alert("Por favor escribí tu nombre.");
  }
});

// Configurar cuenta regresiva
simplyCountdown('#cuenta', {
  year: 2025,
  month: 8,
  day: 25,
  hours: 0,
  minutes: 0,
  seconds: 0,
  words: {
    days: { singular: 'día', plural: 'días' },
    hours: { singular: 'hora', plural: 'horas' },
    minutes: { singular: 'min', plural: 'min' },
    seconds: { singular: 'seg', plural: 'seg' }
  },
  plural: true,
  inline: false,
  enableUtc: false,
  onEnd: function () {
    const mensaje = document.getElementById('dia');
    mensaje.classList.add('aparecer', 'animate__animated', 'animate__pulse');
  },
  refresh: 1000,
  sectionClass: 'simply-section',
  amountClass: 'simply-amount',
  wordClass: 'simply-word',
  zeroPad: false,
  countUp: false
});

// Fondo dinámico según el día
const cuenta = document.getElementById("cuenta");
const diaSemana = new Date().getDay();
let fondo = "multimedia/fondo1.png";
if (diaSemana === 6 || diaSemana === 0) fondo = "multimedia/fondo2.png";
cuenta.style.backgroundImage = `url('${fondo}')`;



const btnBorrarTodos = document.getElementById("borrarTodos");

btnBorrarTodos.addEventListener("click", async () => {
  const confirmacion = confirm("¿Estás seguro de que querés borrar todos los asistentes?");
  if (!confirmacion) return;

  try {
    const snapshot = await getDocs(collection(db, "asistentes"));
    const promesas = [];

    snapshot.forEach((docu) => {
      promesas.push(deleteDoc(doc(db, "asistentes", docu.id)));
    });

    await Promise.all(promesas);
    alert("Todos los asistentes fueron eliminados.");
  } catch (error) {
    console.error("Error al borrar los asistentes:", error);
    alert("Ocurrió un error al intentar borrar los asistentes.");
  }
});

document.addEventListener("keydown", (e) => {
  if (e.ctrlKey && e.altKey && e.key.toLowerCase() === "b") {
    const boton = document.getElementById("borrarTodos");
    boton.style.display = "inline-block"; // o "block" si querés que ocupe toda la línea
    boton.classList.add("animate__animated", "animate__fadeIn");
  }
});

let yaMostrado = false;

function escribirConSonido(texto, contenedorId, velocidad = 40) {
  const cont = document.getElementById(contenedorId);
  const audio = document.getElementById("sonidoTipeo");
  cont.textContent = "";
  let i = 0;

  // ▶️ Iniciar audio una sola vez y cortarlo después
  audio.currentTime = 0;
  audio.play();
  setTimeout(() => {
    audio.pause();
    audio.currentTime = 0;
  }, 15000); // Acorta a 2 segundos

  function escribir() {
    if (i < texto.length) {
      const char = texto[i];
      cont.textContent += char;
      i++;
      setTimeout(escribir, velocidad);
    }
  }

  escribir();
}


const textoUrna = "Si querés dejarle un regalo a Nico, habrá una urna mágica en la entrada del castillo. El reino acepta toda clase de tesoros, pero lo más valioso es tu presencia. 💛";
const mensajeElemento = document.getElementById("mensajeUrna");

// 👁️ Detectar si entra en pantalla
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !yaMostrado) {
  escribirConSonido(textoUrna, "mensajeUrna");  // ← Esta SÍ reproduce el sonido tipeo
  yaMostrado = true;
}


  });
}, {
  threshold: 0.5 // al menos el 50% visible
});

if (mensajeElemento) {
  observer.observe(mensajeElemento);
}




