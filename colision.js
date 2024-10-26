/*const canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

const window_height = window.innerHeight;
const window_width = window.innerWidth;
canvas.height = window_height;
canvas.width = window_width;
canvas.style.background = "#ff8";

class Circle {
  constructor(x, y, radius, color, text, speed) {
    this.posX = x;
    this.posY = y;
    this.radius = radius;
    this.color = color;
    this.originalColor = color;  // Guardar el color original
    this.text = text;
    this.speed = speed;
    this.dx = 1 * this.speed;
    this.dy = 1 * this.speed;
  }

  draw(context) {
    context.beginPath();
    context.strokeStyle = this.color;
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.font = "20px Arial";
    context.fillText(this.text, this.posX, this.posY);
    context.lineWidth = 2;
    context.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2, false);
    context.stroke();
    context.closePath();
  }

  update(context) {
    this.draw(context);
    this.posX += this.dx;
    if (this.posX + this.radius > window_width || this.posX - this.radius < 0) {
      this.dx = -this.dx;
    }
    this.posY += this.dy;
    if (this.posY + this.radius > window_height || this.posY - this.radius < 0) {
      this.dy = -this.dy;
    }
  }

  resetColor() {
    this.color = this.originalColor;  // Restaurar el color original
  }
}

let circles = [];

function generateCircles(n) {
  for (let i = 0; i < n; i++) {
    let radius = Math.random() * 30 + 20;
    let x = Math.random() * (window_width - radius * 2) + radius;
    let y = Math.random() * (window_height - radius * 2) + radius;
    let color = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    let speed = Math.random() * 1 + 5; // cambio de velocidad 
    let text = `C${i + 1}`;
    circles.push(new Circle(x, y, radius, color, text, speed));
  }
}

function detectCollision(circle1, circle2) {
  const dx = circle1.posX - circle2.posX;
  const dy = circle1.posY - circle2.posY;
  const distance = Math.sqrt(dx * dx + dy * dy);
  return distance < circle1.radius + circle2.radius;
}

function checkCollisions(circles) {
  circles.forEach(circle => circle.resetColor()); // Restaurar colores antes de verificar colisiones

  for (let i = 0; i < circles.length; i++) {
    for (let j = i + 1; j < circles.length; j++) {
      if (detectCollision(circles[i], circles[j])) {
        circles[i].color = "#0000FF"; // Cambia solo un círculo a azul
        return; // Solo cambia un círculo y sale de la función
      }
    }
  }
}

function animate() {
  ctx.clearRect(0, 0, window_width, window_height);
  circles.forEach(circle => circle.update(ctx));
  checkCollisions(circles);
  requestAnimationFrame(animate);
}

generateCircles(10); // Genera los circulos 
animate();


*/
/*mque rebotan 
const canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

const window_height = window.innerHeight;
const window_width = window.innerWidth;
canvas.height = window_height;
canvas.width = window_width;
canvas.style.background = "#ff8";

class Circle {
  constructor(x, y, radius, color, text, speed) {
    this.posX = x;
    this.posY = y;
    this.radius = radius;
    this.color = color;
    this.originalColor = color;  // Guardar el color original
    this.text = text;
    this.speed = speed;
    this.dx = (Math.random() * 2 - 1) * speed; // Velocidad aleatoria en X
    this.dy = (Math.random() * 2 - 1) * speed; // Velocidad aleatoria en Y
  }

  draw(context) {
    context.beginPath();
    context.strokeStyle = this.color;
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.font = "20px Arial";
    context.fillText(this.text, this.posX, this.posY);
    context.lineWidth = 2;
    context.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2, false);
    context.stroke();
    context.closePath();
  }

  update(context) {
    this.draw(context);
    this.posX += this.dx;
    if (this.posX + this.radius > window_width || this.posX - this.radius < 0) {
      this.dx = -this.dx;
    }
    this.posY += this.dy;
    if (this.posY + this.radius > window_height || this.posY - this.radius < 0) {
      this.dy = -this.dy;
    }
  }

  resetColor() {
    this.color = this.originalColor;  // Restaurar el color original
  }
}

let circles = [];

function generateCircles(n) {
  for (let i = 0; i < n; i++) {
    let radius = Math.random() * 30 + 20;
    let x = Math.random() * (window_width - radius * 2) + radius;
    let y = Math.random() * (window_height - radius * 2) + radius;
    let color = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    let speed = Math.random() * 1 + 5; // Velocidad
    let text = `C${i + 1}`;
    circles.push(new Circle(x, y, radius, color, text, speed));
  }
}

// Detectar colisión entre dos círculos
function detectCollision(circle1, circle2) {
  const dx = circle1.posX - circle2.posX;
  const dy = circle1.posY - circle2.posY;
  const distance = Math.sqrt(dx * dx + dy * dy);
  return distance < circle1.radius + circle2.radius;
}

// Gestionar colisión entre dos círculos
function handleCollision(circle1, circle2) {
  const dx = circle1.posX - circle2.posX;
  const dy = circle1.posY - circle2.posY;

  // Calcula la distancia mínima requerida para que no colisionen
  const distance = Math.sqrt(dx * dx + dy * dy);
  const overlap = (circle1.radius + circle2.radius) - distance;

  // Ajustar las posiciones para evitar la superposición
  const adjustmentX = (dx / distance) * overlap / 2;
  const adjustmentY = (dy / distance) * overlap / 2;

  circle1.posX += adjustmentX;
  circle2.posX -= adjustmentX;
  circle1.posY += adjustmentY;
  circle2.posY -= adjustmentY;

  // Intercambiar las velocidades (colisión elástica)
  const tempDx = circle1.dx;
  const tempDy = circle1.dy;
  circle1.dx = circle2.dx;
  circle1.dy = circle2.dy;
  circle2.dx = tempDx;
  circle2.dy = tempDy;
}

function checkCollisions(circles) {
  for (let i = 0; i < circles.length; i++) {
    for (let j = i + 1; j < circles.length; j++) {
      if (detectCollision(circles[i], circles[j])) {
        handleCollision(circles[i], circles[j]);
      }
    }
  }
}

function animate() {
  ctx.clearRect(0, 0, window_width, window_height);
  circles.forEach(circle => circle.update(ctx));
  checkCollisions(circles);
  requestAnimationFrame(animate);
}

generateCircles(10); // Generar los círculos
animate();
*/

const canvas = document.getElementById("canvas"); 
let ctx = canvas.getContext("2d");

// Obtiene las dimensiones de la pantalla actual
const window_height = window.innerHeight;
const window_width = window.innerWidth;

canvas.height = window_height;
canvas.width = window_width;

canvas.style.background = "#FFFDD0"; // Fondo amarillo cremoso

// Función para generar un número aleatorio del 0 al 9
function getRandomNumber() {
  return Math.floor(Math.random() * 10); // Números de 0 a 9
}

class Circle {
  constructor(x, y, radius, color, speed) {
    this.posX = x;
    this.posY = y;
    this.radius = radius;
    this.color = color;
    this.originalColor = color; // Guardar el color original
    this.text = getRandomNumber(); // Generar un número aleatorio
    this.speed = speed;

    // Velocidad aleatoria entre 1 y 5 hacia arriba
    this.dy = -1 * (Math.random() * 4 + 1); // Movimiento hacia arriba
    this.dx = (Math.random() * 2 - 1) * 2; // Pequeño movimiento horizontal aleatorio
  }

  draw(context) {
    context.beginPath();
    context.strokeStyle = this.color;
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.font = "20px Arial";
    context.fillText(this.text, this.posX, this.posY);
    context.lineWidth = 2;
    context.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2, false);
    context.stroke();
    context.closePath();
  }

  update(context) {
    this.draw(context);

    // Actualizar la posición X (leve movimiento horizontal)
    this.posX += this.dx;
    // Si el círculo se sale del borde izquierdo o derecho, cambia de dirección
    if (this.posX + this.radius > window_width || this.posX - this.radius < 0) {
      this.dx = -this.dx;
    }

    // Actualizar la posición Y (solo hacia arriba)
    this.posY += this.dy;

    // Si el círculo se sale por la parte superior, lo reubica justo debajo del canvas
    if (this.posY + this.radius < 0) {
      this.posY = window_height + this.radius; // Reiniciar el círculo al fondo
    }
  }

  // Función para detectar colisiones y rebotar
  detectCollision(otherCircle) {
    const distX = this.posX - otherCircle.posX;
    const distY = this.posY - otherCircle.posY;
    const distance = Math.sqrt(distX * distX + distY * distY);

    // Si la distancia entre los dos círculos es menor a la suma de sus radios, hay colisión
    if (distance < this.radius + otherCircle.radius) {
      // Cambiar las velocidades en X y Y para simular el rebote
      const tempDx = this.dx;
      const tempDy = this.dy;

      this.dx = otherCircle.dx;
      this.dy = otherCircle.dy;

      otherCircle.dx = tempDx;
      otherCircle.dy = tempDy;

      return true;
    }
    return false;
  }

  // Detectar si el círculo fue clicado
  isClicked(mouseX, mouseY) {
    const distX = mouseX - this.posX;
    const distY = mouseY - this.posY;
    const distance = Math.sqrt(distX * distX + distY * distY);

    // Retorna true si el clic está dentro del radio del círculo
    return distance <= this.radius;
  }
}

// Crear un array para almacenar los círculos
let circles = [];

// Función para generar círculos aleatorios, ubicados justo debajo del canvas
function generateCircles(n) {
  for (let i = 0; i < n; i++) {
    let radius = Math.random() * 30 + 20; // Radio entre 20 y 50
    let x = Math.random() * (window_width - radius * 2) + radius;
    let y = window_height + radius; // Empieza justo debajo del canvas
    let color = `#${Math.floor(Math.random() * 16777215).toString(16)}`; // Color aleatorio
    let speed = Math.random() * 5 + 1; // Velocidad entre 1 y 5
    circles.push(new Circle(x, y, radius, color, speed));
  }
}

// Función para animar los círculos
function animate() {
  ctx.clearRect(0, 0, window_width, window_height); // Limpiar el canvas
  circles.forEach(circle => {
    circle.update(ctx); // Actualizar cada círculo
  });

  // Detectar colisiones entre círculos
  for (let i = 0; i < circles.length; i++) {
    for (let j = i + 1; j < circles.length; j++) {
      circles[i].detectCollision(circles[j]);
    }
  }

  requestAnimationFrame(animate); // Repetir la animación
}

// Función para eliminar un círculo al hacer clic
canvas.addEventListener("click", function(event) {
  const mouseX = event.clientX;
  const mouseY = event.clientY;

  // Buscar si el clic fue sobre algún círculo y eliminarlo si es así
  circles = circles.filter(circle => !circle.isClicked(mouseX, mouseY));
});

// Generar 10 círculos y comenzar la animación
generateCircles(10); 
animate();
