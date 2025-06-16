# Agrinho-p5.js-O-jardim-Secreto-
Desenvolvimento de um jardim secreto feito no p5.js para o concurso agrinho.


Nome do projeto: O Jardim Secreto

Objetivo do projeto: O objetivo do jogo e incentivar a olhar suas plantas para evitar pragas e passaros para que eles não destruam suas plantas e a natureza.

Justificativa do projeto: Eu criei "O Jardim Secreto" pensando em uma coisa só: pura diversão e relaxamento!
Sabe, a vida já é corrida. Eu queria um jogo leve, fácil de pegar, que sirva como um respiro gostoso para qualquer pessoa, de qualquer idade.

Desenvolvimento do projeto: "O Jardim Secreto" foi concebido e desenvolvido individualmente, seguindo uma abordagem que priorizou a simplicidade na criação, mas com foco na experiência do jogador. O processo pode ser dividido nas seguintes etapas principais:

Concepção e Design Inicial: Ideia Central: A premissa inicial foi criar um jogo casual e divertido, focado na coleta e plantio, com um toque de desafio para manter o interesse. A temática de "jardim" foi escolhida por seu apelo visual e pela simplicidade das interações (plantar, colher, evitar pragas).
Mecânicas Básicas: Definimos as ações primárias do jogador (mover, coletar sementes, plantar flores) e os elementos de desafio (pragas, lagartas e pássaros). A ideia de níveis de dificuldade progressiva foi incorporada desde o início para garantir a longevidade do jogo.

Estilo Visual: Optou-se por um estilo visual simples, baseado em emojis e formas geométricas básicas, o que facilitou o desenvolvimento rápido e garantiu um visual limpo e amigável.

Estrutura do Jogo: O código foi organizado em classes (como Jardineiro, Semente, Flor, Praga, LagartaPerseguidor, Passaro) para representar cada entidade do jogo, facilitando a manipulação de suas propriedades (posição, tamanho, velocidade) e comportamentos (movimento, display).

Lógica de Jogo: Funções principais como setup() (inicialização do ambiente), draw() (loop principal de atualização e desenho) e mousePressed() (interação com o mouse) foram implementadas para controlar o fluxo do jogo, o movimento dos personagens, as colisões e a atualização da pontuação e do tempo.

Gerenciamento de Estados: Um sistema de gameState foi crucial para gerenciar as diferentes telas do jogo (menu, jogando, próximo nível, tutorial, fim de jogo, nível especial), permitindo transições suaves e lógicas entre elas.

Implementação de Dificuldade: A dificuldade progressiva foi construída aumentando o número e a velocidade dos inimigos a cada nível. A introdução do "Nível Especial" com tremor de tela adicionou um elemento surpresa e um desafio extra.

Testes e Ajustes: Ao longo do desenvolvimento, foram realizados testes contínuos para identificar e corrigir bugs, refinar a jogabilidade, ajustar o balanceamento da dificuldade e garantir que todas as mecânicas funcionassem conforme o esperado.
Ajustes na velocidade dos personagens, frequência de surgimento de inimigos.

Em resumo, "O Jardim Secreto" foi construído passo a passo, utilizando a flexibilidade do P5.js para transformar uma ideia simples em uma experiência interativa e divertida, com foco na acessibilidade e no prazer de jogar.


Como jogar:Seu objetivo é simples: cultivar o máximo de flores possível e manter seu jardim seguro contra as pragas.

1. O Objetivo Principal:Plante o maior número de Flores (🌻) que conseguir antes que o tempo se esgote!
Avance de Nível ao atingir a meta de flores plantadas.

2. Controles: Use as SETAS do teclado (↑ ↓ ← →) para mover o seu Jardineiro (👨‍🌾) pelo cenário.

3. Personagens e Itens:
Jardineiro (👨‍🌾): É você! Mova-o para interagir com o ambiente e evitar os inimigos.

Semente (🌱): Colete as sementes espalhadas pelo jardim. Ao coletar uma, ela se transforma imediatamente em uma Flor (🌻) no mesmo local. Cada flor plantada aumenta sua pontuação.

Flor (🌻): Sua principal fonte de pontos! Mantenha-as seguras no jardim.

Praga (🕷️): Cuidado! Se uma Praga te tocar, você perde uma Flor (🌻). Elas se movem aleatoriamente pelo jardim.

Lagarta (🐛): Fique atento(a)! A Lagarta te persegue! Se ela te alcançar, você perde duas Flores (🌻).

Pássaro (🐦): Observe o céu! Pássaros voam pela tela e tentarão comer suas Flores (🌻). Se um Pássaro tocar uma flor, ela sumirá e você perderá um ponto.

4. O Jogo: Início: Ao começar, você terá um tempo limite para plantar flores.

Pontuação: Sua pontuação é o número de Flores (🌻) que você tem no jardim. Se perder flores, sua pontuação diminui.

Avançando de Nível: Atingindo a quantidade de flores necessárias, você avança para o próximo nível. Novos inimigos e desafios aparecem, e às vezes, um "Nível Especial" surpresa pode surgir!

Fim de Jogo: O jogo termina quando o tempo acaba. Sua pontuação final será o número de flores que você conseguiu manter.

Dica: Priorize coletar sementes e ficar de olho nos inimigos.

Referências: Usei de referência a IA do google, Gemini, usei ela para modificar algumas coisas, também usei para arrumar alguns erros nos codigos.
 Mas claro que também teve mão minha no projeto, eu adicionei os emojis para ser os personagens, digitei o tutorial, mudei o estilo do titulo do menu e a ideia de adicionar um nivel raro que pode acontecer aleatoriamente,

