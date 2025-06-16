// ==========================
// Variáveis Globais do Jogo
// ==========================
let jardineiro;
let sementes = [];
let flores = [];
let pragas = [];
let lagartas = [];
let passaros = [];

let pontuacao = 0;
let nivel = 1;
let floresParaProximoNivel = 5;

let tempoRestante = 45;
let tempoInicial;

let numSementesIniciais = 8;
let numPragasIniciais = 3;
let numLagartasIniciais = 1;
let numPassarosAtuais = 0;
let limitePassarosNormal = 3;

let velocidadeBasePragas = 1;
let velocidadeBaseLagartas = 0.8;
let velocidadeBasePassaros = 1;

let gameState = 'menu';

let isSpecialLevel = false;
let specialLevelMultiplier = 2;
let numSpecialLevelPragas = 6;
let numSpecialLevelLagartas = 3;
let numSpecialLevelPassaros = 5;

let shakeMagnitude = 8;
let noiseOffset = 0;

// ================
// Classes do Jogo 
// ================

class Jardineiro {
  constructor() {
    this.x = width / 2;
    this.y = height - 50;
    this.size = 30;
    this.speed = 5;
    this.emoji = "👨‍🌾";
  }

  display() {
    textSize(this.size * 1.5);
    textAlign(CENTER, CENTER);
    text(this.emoji, this.x, this.y);
  }

  move() {
    if (keyIsDown(LEFT_ARROW)) {
      this.x -= this.speed;
    }
    if (keyIsDown(RIGHT_ARROW)) {
      this.x += this.speed;
    }
    if (keyIsDown(UP_ARROW)) {
      this.y -= this.speed;
    }
    if (keyIsDown(DOWN_ARROW)) {
      this.y += this.speed;
    }
    this.x = constrain(this.x, this.size / 2, width - this.size / 2);
    this.y = constrain(this.y, this.size / 2, height - this.size / 2);
  }
}

class Semente {
  constructor() {
    this.x = random(width);
    this.y = random(height * 0.2, height * 0.8);
    this.size = 15;
    this.coletada = false;
  }

  display() {
    if (!this.coletada) {
      textSize(this.size * 1.8);
      textAlign(CENTER, CENTER);
      text("🌱", this.x, this.y);
      textAlign(LEFT, TOP);
    }
  }
}

class Flor {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 25;
  }

  display() {
    textSize(this.size * 1.5);
    textAlign(CENTER, CENTER);
    text('🌻', this.x, this.y);
    textAlign(LEFT, TOP);
  }
}

class Praga {
  constructor() {
    this.x = random(width);
    this.y = random(height * 0.2, height * 0.8);
    this.size = 20;
    this.speed = random(velocidadeBasePragas * 0.8, velocidadeBasePragas * 1.2);
    if (isSpecialLevel) {
      this.speed *= specialLevelMultiplier;
    }
    this.angle = random(TWO_PI);
  }

  display() {
    textSize(this.size * 1.5);
    textAlign(CENTER, CENTER);
    text("🕷️", this.x, this.y);
    textAlign(LEFT, TOP);
  }

  move() {
    this.x += cos(this.angle) * this.speed;
    this.y += sin(this.angle) * this.speed;

    if (this.x < this.size / 2 || this.x > width - this.size / 2) {
      this.angle = PI - this.angle;
      this.x = constrain(this.x, this.size / 2, width - this.size / 2);
    }
    if (this.y < this.size / 2 || this.y > height - this.size / 2) {
      this.angle = TWO_PI - this.angle;
      this.y = constrain(this.y, this.size / 2, height - this.size / 2);
    }
  }
}

class LagartaPerseguidor {
  constructor() {
    this.x = random(width);
    this.y = random(height * 0.2, height * 0.8);
    this.size = 25;
    this.speed = random(velocidadeBaseLagartas * 0.8, velocidadeBaseLagartas * 1.2);
    if (isSpecialLevel) {
      this.speed *= specialLevelMultiplier;
    }
    this.emoji = '🐛';
  }

  display() {
    textSize(this.size * 1.5);
    textAlign(CENTER, CENTER);
    text(this.emoji, this.x, this.y);
    textAlign(LEFT, TOP);
  }

  move(targetX, targetY) {
    let angle = atan2(targetY - this.y, targetX - this.x);
    this.x += cos(angle) * this.speed;
    this.y += sin(angle) * this.speed;

    this.x = constrain(this.x, this.size / 2, width - this.size / 2);
    this.y = constrain(this.y, this.size / 2, height - this.size / 2);
  }
}

class Passaro {
  constructor() {
    this.size = 30;
    this.speed = random(velocidadeBasePassaros * 0.8, velocidadeBasePassaros * 1.2);
    if (isSpecialLevel) {
      this.speed *= specialLevelMultiplier;
    }
    this.active = true;
    this.emoji = '🐦';

    let startEdge = floor(random(4));
    let margin = this.size * 1.5;

    if (startEdge === 0) {
      this.x = random(width);
      this.y = -margin;
      this.angle = random(PI * 0.4, PI * 0.6);
    } else if (startEdge === 1) {
      this.x = width + margin;
      this.y = random(height);
      this.angle = random(PI * 0.9, PI * 1.1);
    } else if (startEdge === 2) {
      this.x = random(width);
      this.y = height + margin;
      this.angle = random(PI * 1.4, PI * 1.6);
    } else {
      this.x = -margin;
      this.y = random(height);
      this.angle = random(-PI * 0.1, PI * 0.1);
    }
  }

  display() {
    push();
    translate(this.x, this.y);
    rotate(this.angle + HALF_PI);

    fill(0);
    textSize(this.size * 1.2);
    textAlign(CENTER, CENTER);

    text(this.emoji, 0, 0);

    pop();
  }

  move() {
    this.x += cos(this.angle) * this.speed;
    this.y += sin(this.angle) * this.speed;

    let exitMargin = this.size * 3;
    if (this.x < -exitMargin || this.x > width + exitMargin ||
        this.y < -exitMargin || this.y > height + exitMargin) {
      this.active = false;
    }
  }
}

// =======================================================
// Funções Essenciais do P5.js (setup, draw, mousePressed)
// =======================================================

function setup() {
  createCanvas(800, 600);
  ellipseMode(CENTER);
  rectMode(CENTER);
  textAlign(LEFT, TOP);
}

function draw() {
  if (gameState === 'menu') {
    drawMenu();
  } else if (gameState === 'jogando') {
    drawGameContent();
  } else if (gameState === 'proximoNivel') {
    drawProximoNivelTela();
  } else if (gameState === 'fimDeJogo') {
    drawGameOver();
  } else if (gameState === 'tutorial') {
    drawTutorial();
  } else if (gameState === 'nivelEspecial') {
    drawSpecialLevelIntro();
  }
}

function mousePressed() {
  if (gameState === 'menu') {
    let buttonWidth = 150;
    let buttonHeight = 50;

    // Posições dos botões (o X é sempre width / 2 para centralizar)
    let playButtonY = height / 2 - 20;
    let tutorialButtonY = height / 2 + 50;
    let exitButtonY = height / 2 + 120;

    // Calcula as coordenadas do canto superior esquerdo para verificação de clique
    let buttonX_left = width / 2 - buttonWidth / 2;

    // Botão Jogar
    if (mouseX > buttonX_left && mouseX < buttonX_left + buttonWidth &&
        mouseY > playButtonY - buttonHeight / 2 && mouseY < playButtonY + buttonHeight / 2) {
      startGame();
    }

    // Botão Tutorial
    if (mouseX > buttonX_left && mouseX < buttonX_left + buttonWidth &&
        mouseY > tutorialButtonY - buttonHeight / 2 && mouseY < tutorialButtonY + buttonHeight / 2) {
      gameState = 'tutorial';
    }

    // Botão Sair
    if (mouseX > buttonX_left && mouseX < buttonX_left + buttonWidth &&
        mouseY > exitButtonY - buttonHeight / 2 && mouseY < exitButtonY + buttonHeight / 2) {
        alert("Obrigado por jogar!");
        // Em um ambiente de navegador real, você poderia tentar:
        // window.location.reload();
    }

  } else if (gameState === 'proximoNivel') {
    if (random() < 0.2) {
        isSpecialLevel = true;
        gameState = 'nivelEspecial';
    } else {
        isSpecialLevel = false;
        gameState = 'jogando';
        tempoInicial = millis();
        resetLevelEntities();
    }
  } else if (gameState === 'tutorial') {
    gameState = 'menu';
  } else if (gameState === 'nivelEspecial') {
    gameState = 'jogando';
    tempoInicial = millis();
    resetLevelEntities();
  }
}

// ==================================
// Funções de Gerenciamento do Jogo 
// ==================================

function startGame() {
  jardineiro = new Jardineiro();
  sementes = [];
  flores = [];
  pragas = [];
  lagartas = [];
  passaros = [];

  pontuacao = 0;
  nivel = 1;
  floresParaProximoNivel = 5;

  tempoRestante = 45;
  tempoInicial = millis();

  numSementesIniciais = 8;
  numPragasIniciais = 3;
  numLagartasIniciais = 1;
  numPassarosAtuais = 0;
  velocidadeBasePragas = 1;
  velocidadeBaseLagartas = 0.8;
  velocidadeBasePassaros = 1;

  isSpecialLevel = false;
  noiseOffset = 0;

  resetLevelEntities();

  gameState = 'jogando';
}

function resetLevelEntities() {
    pragas = [];
    lagartas = [];
    passaros = [];
    flores = [];
    sementes = [];

    let currentNumPragas = isSpecialLevel ? numSpecialLevelPragas : numPragasIniciais;
    let currentNumLagartas = isSpecialLevel ? numSpecialLevelLagartas : numLagartasIniciais;
    let currentNumPassaros = isSpecialLevel ? numSpecialLevelPassaros : numPassarosAtuais;

    for (let i = 0; i < currentNumPragas; i++) {
        pragas.push(new Praga());
    }
    for (let i = 0; i < currentNumLagartas; i++) {
        lagartas.push(new LagartaPerseguidor());
    }
    for (let i = 0; i < currentNumPassaros; i++) {
        passaros.push(new Passaro());
    }
    for (let i = 0; i < numSementesIniciais; i++) {
        sementes.push(new Semente());
    }
}

// ==================================================================================
// Funções de Tela (Menu, Jogo, Próximo Nível, Fim de Jogo, Tutorial, Nível Especial)
// ==================================================================================

function drawMenu() {
  background(50, 100, 150);

  // Título do Jogo Mais Atraente
  fill(255, 255, 0);
  textSize(70);
  textFont('Georgia');
  textAlign(CENTER, CENTER); // Centraliza o título
  text("O JARDIM SECRETO", width / 2, height / 2 - 140);

  // Ícones decorativos no menu
  textSize(40);
  fill(255);
  text("🌱", width / 2 - 180, height / 2 - 140);
  text("🌻", width / 2 + 180, height / 2 - 140);

  // --- POSIÇÕES DOS BOTÕES ---
  let buttonWidth = 150;
  let buttonHeight = 50;
  let textOffset = 5; // Pequeno ajuste vertical para o texto dentro do botão (metade da altura do texto)

  // Botão Jogar
  let playButtonY = height / 2 - 20;
  fill(50, 200, 50);
  rect(width / 2, playButtonY, buttonWidth, buttonHeight, 10);
  fill(255);
  textSize(30);
  textFont('Arial');
  textAlign(CENTER, CENTER); // Mantenha centralizado para o texto do botão
  text("Jogar", width / 2, playButtonY + textOffset); // Ajusta a posição Y do texto

  // Botão Tutorial
  let tutorialButtonY = height / 2 + 50;
  fill(50, 150, 200);
  rect(width / 2, tutorialButtonY, buttonWidth, buttonHeight, 10);
  fill(255);
  textSize(30);
  text("Tutorial", width / 2, tutorialButtonY + textOffset); // Ajusta a posição Y do texto

  // Botão Sair
  let exitButtonY = height / 2 + 120;
  fill(200, 50, 50);
  rect(width / 2, exitButtonY, buttonWidth, buttonHeight, 10);
  fill(255);
  textSize(30);
  text("Sair", width / 2, exitButtonY + textOffset); // Ajusta a posição Y do texto

  // Instruções básicas no menu
  textSize(20);
  fill(200);
  // Garante que o alinhamento para estas instruções está correto
  textAlign(CENTER, CENTER);
  text("Use as SETAS para mover o jardineiro (👨‍🌾).", width / 2, height / 2 + 200);
  text("Colete as SEMENTES (🌱) para plantar FLORES (🌻).", width / 2, height / 2 + 230);
  text("Evite as PRAGAS (🕷️), LAGARTAS (🐛) e PÁSSAROS (🐦)!", width / 2, height / 2 + 260);

  // Créditos/Versão
  textSize(14);
  fill(150);
  textAlign(RIGHT, BOTTOM); // Para o canto inferior direito
  text("Versão 1.0 | Desenvolvido por [Nicoly Gabrielly]", width - 10, height - 10);
  textAlign(LEFT, TOP); // Volta ao padrão para outras funções (importante!)
}

function drawTutorial() {
  background(70, 120, 180);
  fill(255);
  textSize(40);
  textAlign(CENTER, TOP);
  text("COMO JOGAR O JARDIM SECRETO", width / 2, 30);

  textAlign(LEFT, TOP);
  textSize(22);
  let startX = 50;
  let currentY = 100;
  let lineHeight = 30;
  let sectionSpacing = 30;
  let emojiOffset = 40;

  text("OBJETIVO:", startX, currentY);
  currentY += lineHeight;
  text("  Plante o máximo de FLORES (🌻) possível antes que o tempo acabe!", startX, currentY);
  currentY += lineHeight;
  text("  Avance de Nível plantando a quantidade necessária de flores.", startX, currentY);

  currentY += sectionSpacing * 2;
  text("CONTROLES:", startX, currentY);
  currentY += lineHeight;
  text("  Setas do Teclado: Mover o jardineiro.", startX, currentY);

  currentY += sectionSpacing * 2;
  text("PERSONAGENS E ITENS:", startX, currentY);
  currentY += lineHeight;

  // Jardineiro
  textSize(30);
  text("👨‍🌾", startX + emojiOffset, currentY);
  textSize(22);
  text("  Jardineiro (👨‍🌾): Você! Mova-o para coletar e evitar inimigos.", startX + emojiOffset + 30, currentY);
  currentY += lineHeight * 1.5;

  // Semente
  textSize(25);
  text("🌱", startX + emojiOffset, currentY);
  textSize(22);
  text("  Semente (🌱): Colete para plantar uma flor e ganhar pontos.", startX + emojiOffset + 30, currentY);
  currentY += lineHeight * 1.5;

  // Flor
  textSize(30);
  text("🌻", startX + emojiOffset, currentY);
  textSize(22);
  text("  Flor (🌻): Plantada após coletar uma semente. Aumenta sua pontuação.", startX + emojiOffset + 30, currentY);
  currentY += lineHeight * 1.5;

  // Praga
  textSize(25);
  text("🕷️", startX + emojiOffset, currentY);
  textSize(22);
  text("  Praga (🕷️): Evite! Se tocar, você perde 1 flor.", startX + emojiOffset + 30, currentY);
  currentY += lineHeight * 1.5;

  // Lagarta
  textSize(30);
  text("🐛", startX + emojiOffset, currentY);
  textSize(22);
  text("  Lagarta (🐛): Inimigo que te persegue! Perde 2 flores se tocar.", startX + emojiOffset + 30, currentY);
  currentY += lineHeight * 1.5;

  // Pássaro
  textSize(30);
  text("🐦", startX + emojiOffset, currentY);
  textSize(22);
  text("  Pássaro: Voa pela tela! Se tocar uma flor (🌻), ela some e você perde pontos.", startX + emojiOffset + 30, currentY);
  currentY += lineHeight * 1.5;


  textAlign(CENTER, CENTER);
  textSize(25);
  fill(255, 255, 0);
  text("Clique em qualquer lugar para voltar ao Menu", width / 2, height - 40);
}


function drawGameContent() {
  if (isSpecialLevel) {
    background(139, 0, 0);
    fill(178, 34, 34);
  } else {
    background(135, 206, 235);
    fill(124, 252, 0);
  }
  rect(width / 2, height / 2, width, height * 0.9);

  push();
  if (isSpecialLevel) {
    let offsetX = map(noise(noiseOffset), 0, 1, -shakeMagnitude, shakeMagnitude);
    let offsetY = map(noise(noiseOffset + 1000), 0, 1, -shakeMagnitude, shakeMagnitude);
    translate(offsetX, offsetY);
    noiseOffset += 0.1;
  }

  jardineiro.move();
  jardineiro.display();

  let tempoDecorrido = (millis() - tempoInicial) / 1000;
  tempoRestante = max(0, floor(45 - tempoDecorrido));

  if (pontuacao >= floresParaProximoNivel) {
    nivel++;
    floresParaProximoNivel += 10;

    isSpecialLevel = false;
    noiseOffset = 0;

    velocidadeBasePragas += 0.5;
    velocidadeBaseLagartas += 0.2;

    if (nivel >= 2 && numPassarosAtuais < limitePassarosNormal) {
      numPassarosAtuais++;
    }

    gameState = 'proximoNivel';
  }

  for (let i = sementes.length - 1; i >= 0; i--) {
    let semente = sementes[i];
    semente.display();

    let d = dist(jardineiro.x, jardineiro.y, semente.x, semente.y);
    if (d < jardineiro.size / 2 + semente.size / 2 && !semente.coletada) {
      semente.coletada = true;
      pontuacao++;
      flores.push(new Flor(semente.x, semente.y));
      sementes.splice(i, 1);
      sementes.push(new Semente());
    }
  }

  for (let i = pragas.length - 1; i >= 0; i--) {
    let praga = pragas[i];
    praga.move();
    praga.display();

    let d = dist(jardineiro.x, jardineiro.y, praga.x, praga.y);
    if (d < jardineiro.size / 2 + praga.size / 2) {
      pontuacao = max(0, pontuacao - 1);
      pragas.splice(i, 1);
      let maxPragas = isSpecialLevel ? numSpecialLevelPragas : numPragasIniciais;
      if (pragas.length < maxPragas) {
          pragas.push(new Praga());
      }
    }
  }

  for (let i = lagartas.length - 1; i >= 0; i--) {
    let lagarta = lagartas[i];
    lagarta.move(jardineiro.x, jardineiro.y);
    lagarta.display();

    let d = dist(jardineiro.x, jardineiro.y, lagarta.x, lagarta.y);
    if (d < jardineiro.size / 2 + lagarta.size / 2) {
      pontuacao = max(0, pontuacao - 2);
      lagartas.splice(i, 1);
      let maxLagartas = isSpecialLevel ? numSpecialLevelLagartas : numLagartasIniciais;
      if (lagartas.length < maxLagartas) {
          lagartas.push(new LagartaPerseguidor());
      }
    }
  }

  for (let i = passaros.length - 1; i >= 0; i--) {
    let passaro = passaros[i];
    passaro.move();

    if (passaro.active) {
      passaro.display();
    }

    if (!passaro.active) {
        passaros.splice(i, 1);
        let maxPassaros = isSpecialLevel ? numSpecialLevelPassaros : numPassarosAtuais;
        if (passaros.length < maxPassaros) {
            passaros.push(new Passaro());
        }
        continue;
    }

    for (let j = flores.length - 1; j >= 0; j--) {
      let flor = flores[j];
      let d = dist(passaro.x, passaro.y, flor.x, flor.y);
      if (d < passaro.size / 2 + flor.size / 2) {
        flores.splice(j, 1);
        pontuacao = max(0, pontuacao - 1);
        passaro.active = false;
        break;
      }
    }

    let dJardineiro = dist(passaro.x, passaro.y, jardineiro.x, jardineiro.y);
    if (dJardineiro < passaro.size / 2 + jardineiro.size / 2) {
        passaro.active = false;
    }
  }

  for (let flor of flores) {
    flor.display();
  }

  fill(0);
  textSize(24);
  text("Flores Plantadas: " + pontuacao, 10, 10);
  text("Nível: " + nivel, 10, 40);
  text("Tempo: " + tempoRestante + "s", width - 150, 10);

  fill(255, 0, 0);
  text("Pássaros: " + passaros.length, width - 150, 40);

  if (isSpecialLevel) {
    fill(255, 255, 0);
    textSize(36);
    textAlign(CENTER, TOP);
    text("NOITE ESCARLATE!", width / 2, 70);
    textAlign(LEFT, TOP);
  }

  if (tempoRestante <= 0) {
    gameState = 'fimDeJogo';
  }

  pop();
}


function drawProximoNivelTela() {
  background(100, 150, 200);
  fill(255);
  textSize(50);
  textAlign(CENTER, CENTER);
  text("PARABÉNS!", width / 2, height / 2 - 80);
  textSize(40);
  text("Você alcançou o Nível " + nivel + "!", width / 2, height / 2 - 20);
  textSize(25);
  text("Clique para continuar...", width / 2, height / 2 + 70);

  textSize(20);
  fill(200, 255, 200);
  text("Flores: " + pontuacao, width / 2, height / 2 + 120);
}

function drawSpecialLevelIntro() {
  background(139, 0, 0);
  fill(255, 255, 0);
  textSize(60);
  textAlign(CENTER, CENTER);
  text("NOITE ESCARLATE!", width / 2, height / 2 - 50);
  fill(255);
  textSize(30);
  text("Prepare-se para o desafio!", width / 2, height / 2 + 20);
  textSize(25);
  text("Clique para começar...", width / 2, height / 2 + 80);
}

function drawGameOver() {
  background(50, 50, 100);
  fill(255);
  textSize(50);
  textAlign(CENTER, CENTER);
  text("O JARDIM ADOROU!", width / 2, height / 2 - 40);
  textSize(30);
  text("Você plantou " + pontuacao + " flores e atingiu o Nível " + nivel + "!", width / 2, height / 2 + 20);
}