/***
 * En este archivo se encuentra toda la lógica y programación de la aplicación:
 * movimiento de Arturito, controles del teclado, dibujo del laberinto,
 * instrucciones y recorrido de solución.
 * @author TiaraFernandez
*/

// Posiciones de Arturito
let posX, posY; 
// Colores de Arturito
let a, b, c, d, e, gris, colorCirculo;
// Tamaño de la pantalla
let ancho = window.screen.width, alto = window.screen.height; 
// variables para los tubos 
let distancia = 200, grosorTub = 60, largoTub = 400;
let tubY = 300; 
let Cx = (ancho/2)-(grosorTub/2); // El tubo C va en el centro
let Bx = Cx - (distancia + grosorTub);
let Ax = Bx - (distancia + grosorTub);  
let Dx = Cx + distancia + grosorTub; 
let Ex = Dx + distancia + grosorTub;


function setup() {
  createCanvas(ancho, alto); 
  configurarModalComandos();
  
  // Posición inicial por defecto de Arturito
  posX = 0; 
  posY = 0;

  // Inicializo los colores
  a = color(0, 230, 120);
  b = color(251, 86, 7);
  c = color(255, 0, 110);
  d = color(131, 56, 236);
  e = color(58, 134, 255);
  gris = color(240, 240, 240);
  colorCirculo = gris;  // Color default gris

  dibujarFondo();
}

function draw() {
  // LÓGICA DE MOVIMIENTO  Y DE COMANDOS
  if(keyIsPressed === true){
    if (keyCode === 38) { // Arriba
      posY -= 4;
    } else if (keyCode === 40) { // Abajo
      posY += 4;
    } else if (keyCode === 37) { // Izquierda
      posX -= 4;
    } else if (keyCode === 39) { // Derecha
      posX += 4;
    } else if (key === 'a' || key === 'A'){ // Tuberia A
      posX = Ax + 30; posY = tubY + 10; colorCirculo = a;
    } else if (key === 'b' || key === 'B'){ // Tuberia B
      posX = Bx + 30; posY = tubY + 10; colorCirculo = b;
    } else if (key === 'c' || key === 'C'){ // Tuberia C
      posX = Cx + 30; posY = tubY + 10; colorCirculo = c;
    } else if (key === 'd' || key === 'D'){ // Tuberia D
      posX = Dx + 30; posY = tubY + 10 ; colorCirculo = d;
    } else if (key === 'e' || key === 'E'){ // Tuberia E
      posX = Ex + 30; posY = tubY + 10 ; colorCirculo = e;
    } else if (key === 'Enter'){ // Reseteo la actividad
      posX = 0; posY = 0; colorCirculo = gris;
      dibujarFondo(); // re dibujo el fondo para borrar lo que haya hecho
    } else if (key === 'r' || key === 'R'){ // Mostrar Recorrida por la tuberia A
      dibujarRecorridoA();
    }
  }

  // DIBUJAR A ARTURITO
  fill(colorCirculo);
  circle(posX, posY, 28); 
}

/* FUNCION PARA DIBUJAR EL FONDO COMPLETO */
function dibujarFondo(){
  background(gris);

  // DIBUJAR PANELES DE INSTRUCCIONES
  dibujarInstrucciones();
  
  // DIBUJAR LABERINTO
  // PASADA 1: Bordes
  stroke(230, 150, 50);
  strokeWeight(6);
  dibujarLaberintoGeometria();
  
  // PASADA 2: Relleno
  noStroke();
  fill(250, 180, 80);
  dibujarLaberintoGeometria();
  
  // DIBUJAR ETIQUETAS (A, B, C, D, E) Y META
  dibujarEtiquetas();

}

function dibujarLaberintoGeometria() {
  // Tubos verticales
  rect(Ax, tubY, grosorTub, largoTub, 15); 
  rect(Bx, tubY, grosorTub, largoTub, 15); 
  rect(Cx, tubY, grosorTub, largoTub, 15); 
  rect(Dx, tubY, grosorTub, largoTub, 15); 
  rect(Ex, tubY, grosorTub, largoTub, 15); 

  // Túneles horizontales
  let grosorTunel = 35;
  
  // túneles A-B
  rect(Ax + grosorTub, tubY + 50, distancia, grosorTunel);
  rect(Ax + grosorTub, tubY + 160, distancia, grosorTunel);
  rect(Ax + grosorTub, tubY + 270, distancia, grosorTunel);
  // túnel B-C
  rect(Bx + grosorTub, tubY + 105, distancia, grosorTunel);
  // túneles C-D
  rect(Cx + grosorTub, tubY + 50, distancia, grosorTunel);
  rect(Cx + grosorTub, tubY + 160, distancia, grosorTunel);
  rect(Cx + grosorTub, tubY + 325, distancia, grosorTunel);
  // túneles D-E
  rect(Dx + grosorTub, tubY + 105, distancia, grosorTunel);
  rect(Dx + grosorTub, tubY + 215, distancia, grosorTunel);
  rect(Dx + grosorTub, tubY + 285, distancia, grosorTunel);
}

function dibujarEtiquetas() {
  fill(0); 
  noStroke();
  textFont('IBM Plex Mono');
  textSize(26);
  textAlign(CENTER, CENTER);
  textStyle(BOLD);
  
  // Etiquetas de los tubos (justo sobre la entrada)
  text("A", Ax + 30, tubY - 20);
  text("B", Bx + 30, tubY - 20);
  text("C", Cx + 30, tubY - 20);
  text("D", Dx + 30, tubY - 20);
  text("E", Ex + 30, tubY - 20);
  
  // Meta: Halcón Milenario
  fill(80);
  textSize(20);
  text("Halcón Milenario", Ex + 30, (tubY + largoTub + 30));
  rect(Ex - 20, (tubY + largoTub + 50), 100, 30, 8); 
}

function dibujarInstrucciones() {
  let anchoRect = 650, altoRect = 125;
  let instrucX = (ancho/2)-(anchoRect/2), instrucY = 15, espaciado = 20;
  // Rectangulo
  fill(255);
  stroke(0);
  strokeWeight(2);
  rect(instrucX, instrucY, anchoRect, altoRect, 12);
  
  // Muestro el titulo de la actividad
  instrucX += 20;

  fill(0);
  noStroke();
  textFont('IBM Plex Mono');
  textAlign(LEFT, TOP);
  textSize(18);
  textStyle(BOLD);
  instrucY += 15;
  text("Algoritmo Actual (Actividad 1):", instrucX, instrucY);

  // Muestro las instrucciones
  const instrucciones = ["1. Bajá por el tubo hasta que aparezca un túnel nuevo o encuentres la nave.","2. Cada vez que te encuentres con un túnel nuevo, debés atravesarlo.","3. Volvé a la instrucción 1."];
  
  instrucY += 10; //espacio entre titulo e instrucciones
  textStyle(NORMAL);
  textSize(18);
  for (let index = 0; index < instrucciones.length; index++) {
    const texto = instrucciones[index];
    instrucY += espaciado;
    text(texto,instrucX, instrucY);
  }
}

//Funcion para dibujar la solución de la actividad 1
function dibujarRecorridoA() {
  // Coordenadas X del centro de cada tubo
  let xA = Ax + 30;
  let xB = Bx + 30;
  let xC = Cx + 30;
  let xD = Dx + 30;
  let xE = Ex + 30;

  // Alturas Y del centro de los túneles
  let grosorTunel = 35;
  let y_AB1 = tubY + 50 + grosorTunel / 2;   // 1. Primer túnel A-B
  let y_BC1 = tubY + 105 + grosorTunel / 2;  // 2. Túnel B-C
  let y_CD2 = tubY + 160 + grosorTunel / 2;  // 3. Segundo túnel C-D
  let y_DE2 = tubY + 215 + grosorTunel / 2;  // 4. Segundo túnel D-E
  let y_DE3 = tubY + 285 + grosorTunel / 2;  // 5. Tercer túnel D-E
  let y_CD3 = tubY + 325 + grosorTunel / 2;  // 6. Tercer túnel C-D
  let yFinal = tubY + 380;                   // Fondo del tubo C

  // Estilo de la línea del recorrido
  stroke(255, 30, 30); // Rojo fluorescente
  strokeWeight(5);
  noFill();

  // Trazado del camino paso a paso
  beginShape();
  vertex(xA, tubY - 5);
  vertex(xA, y_AB1); 
  vertex(xB, y_AB1);     
  vertex(xB, y_BC1);  
  vertex(xC, y_BC1);    
  vertex(xC, y_CD2);    
  vertex(xD, y_CD2);    
  vertex(xD, y_DE2);    
  vertex(xE, y_DE2);    
  vertex(xE, y_DE3);  
  vertex(xD, y_DE3);
  vertex(xD, y_CD3);
  vertex(xC, y_CD3);
  vertex(xC, yFinal);
  endShape();

  // Marcar con un punto rojo el destino final (donde queda atrapado)
  fill(255, 30, 30);
  noStroke();
  circle(xC, yFinal - 10, 14);
}

/* FUNCION DEL BOTON DE INFO */
function configurarModalComandos() {
  const infoButton = document.getElementById('info-button');
  const closeButton = document.getElementById('close-modal');
  const modal = document.getElementById('commands-modal');

  function abrirModal() {
    modal.hidden = false;
    infoButton.setAttribute('aria-expanded', 'true');
    closeButton.focus();
  }

  function cerrarModal() {
    modal.hidden = true;
    infoButton.setAttribute('aria-expanded', 'false');
    infoButton.focus();
  }

  infoButton.addEventListener('click', abrirModal);
  closeButton.addEventListener('click', cerrarModal);
  modal.addEventListener('click', (event) => {
    if (event.target === modal) {
      cerrarModal();
    }
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !modal.hidden) {
      cerrarModal();
    }
  });
}
