# Arquitetura da Solução

Mostraremos a seguir como o software é estruturado em termos dos componentes que fazem parte da solução e do ambiente de hospedagem da aplicação.

## Diagrama de Classes

O diagrama de classes da aplicação pode ser visto na imagem a seguir.

![Fluxogramas (1)](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e3-proj-mov-t7-roteiriza/assets/116499898/3b108cee-7480-4af0-9767-ba9c290ffa01)
_Diagrama de Classes_

## Modelo ER

O modelo ER da aplicação é representado nas imagens a seguir.

## Modelo Lógico

![lÓGICO](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e3-proj-mov-t7-roteiriza/assets/116499898/c3d36e12-42e5-40cd-af01-c04b663392a1)
_Modelo Lógico_

O Esquema Relacional corresponde à representação dos dados em tabelas juntamente com as restrições de integridade e chave primária.

## Modelo Conceitual

![Wireframe - 1](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e3-proj-mov-t7-roteiriza/assets/114627827/d0a18987-f4cb-4ee8-bcac-8effd7006a7a)
_Modelo Conceitual_

## Modelo Físico

O modelo físico do banco de dados pode ser visto nas imagens a seguir.

![BD-1](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e3-proj-mov-t7-roteiriza/assets/116499898/23e5bf58-12ac-4a04-80ff-d2a92c231e5a)

_Modelo Físico do Banco de Dados - Figura 1_

![BD-2](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e3-proj-mov-t7-roteiriza/assets/116499898/eaffc7f5-7f73-416e-9af8-b278eb80edfa)

_Modelo Físico do Banco de Dados - Figura 2_

## Tecnologias Utilizadas

- **Linguagens:** JavaScript;
- **Frameworks:** React Native;
- **IDE:** Visual Studio Code;
- **Banco de Dados Relacional:** SQLite;
- **Hospedagem:** Heroku;
- **Design de interface:** Figma;
- **Análise de Acessibilidade:** Lighthouse.

## Hospedagem

Explique como a hospedagem e o lançamento da plataforma foi feita.

> **Links Úteis**:
>
> - [Website com GitHub Pages](https://pages.github.com/)
> - [Programação colaborativa com Repl.it](https://repl.it/)
> - [Getting Started with Heroku](https://devcenter.heroku.com/start)
> - [Publicando Seu Site No Heroku](http://pythonclub.com.br/publicando-seu-hello-world-no-heroku.html)

## Qualidade de Software

Para fins de análise de qualidade da aplicação, utilizaremos como base os critérios da norma de Qualidade de Produto de Software - ISO/IEC 9126. Conforme a norma, levantamos 6 características de qualidade com 2 subcaracterísticas cada, elas são:

### 1. Funcionalidade
- **Adequação:** Será analisado se o software atende a todos os requisitos que foram propostos durante o planejamento do produto. A fim de garantir que todos os desejos do cliente foram atendidos de forma íntegra.
- **Acurácia:** Será analisado se o produto final gera os resultados previstos corretamente, para que não haja inconsistências durante o uso do software final.

### 2. Confiabilidade
- **Tolerância de Falhas:** Tendo em vista que o software é voltado à adição de informações pelo usuário, será analisado como ele se comportará em caso de falhas do sistema em relação a recuperabilidade dos dados preenchidos pelo usuário.
- **Maturidade:** Será analisado os diferentes cenários propícios à falhas do software, visando otimizar o sistema com o objetivo de obter o mínimo de falhas possíveis dentro das condições atuais.

### 3. Usabilidade
- **Apreensibilidade:** Será analisada a capacidade de aprendizado de utilização do software pelo usuário, com o objetivo de obter um produto final intuitivo e de fácil acesso às suas funcionalidades.
- **Atratividade:** Será analisado o índice de atratividade do software, visando direcionar a atenção do usuário a determinadas funções da aplicação, facilitando seu entendimento indicando o próximo passo a ser dado pelo usuário para concluir a ação desejada.

### 4. Eficiência:
- **Comportamento em relação ao tempo:** Será analisada a capacidade de resposta e apresentação de informações do aplicativo para o usuário, visando um sistema ágil e um desempenho otimizado.
- **Conformidade:** Será analisado como o software lida com os recursos disponibilizados e seu tempo de entrega de informações ao usuário, visando um equilíbrio aceitável entre a busca de dados pelo software e o tempo de resposta da aplicação.

### 5. Manutenibilidade:
- **Analisabilidade:** Visando facilitar o entendimento da aplicação para o time de desenvolvimento, será feita uma análise de código do software para identificar pontos de melhoria, problemas que precisam ser resolvidos, além de buscar implementar um código limpo e de fácil compreensão.
- **Modificabilidade:** Será analisada a capacidade do código em aceitar novas alterações para manutenção e correção de eventuais problemas de forma fácil e organizada. Visando manter um código limpo, semântico e bem identado.

### 6. Portabilidade:
- **Capacidade de ser instalado:** Será analisada as possíveis dificuldades enfrentadas durante a instalação do software, visando garantir uma instalação fácil e segura.
- **Adaptabilidade:** Será analisado como o software se comportará nos sistemas Android e IOS, para garantir seu bom funcionamento nesses dois ambientes.

