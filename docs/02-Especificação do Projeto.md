# Especificações do Projeto

Abaixo é possível conferir as especificações do projeto Roteiriza, como as personas, histórias de usuários, requisitos funcionais e não funcionais, restrições do desenvolvimento, e o diagrama de casos de uso - levando em consideração o público-alvo, que foi definido anteriormente na documentação.

## Personas

Pedro Paulo tem 26 anos, é arquiteto recém-formado e autônomo. Pensa em se desenvolver profissionalmente através de um mestrado fora do país, pois adora viajar, é solteiro e sempre quis fazer um intercâmbio. Está buscando uma agência que o ajude a encontrar universidades na Europa que aceitem alunos estrangeiros.

Enumere e detalhe as personas da sua solução. Para tanto, baseie-se tanto nos documentos disponibilizados na disciplina e/ou nos seguintes links:

> **Links Úteis**:
> - [Rock Content](https://rockcontent.com/blog/personas/)
> - [Hotmart](https://blog.hotmart.com/pt-br/como-criar-persona-negocio/)
> - [O que é persona?](https://resultadosdigitais.com.br/blog/persona-o-que-e/)
> - [Persona x Público-alvo](https://flammo.com.br/blog/persona-e-publico-alvo-qual-a-diferenca/)
> - [Mapa de Empatia](https://resultadosdigitais.com.br/blog/mapa-da-empatia/)
> - [Mapa de Stalkeholders](https://www.racecomunicacao.com.br/blog/como-fazer-o-mapeamento-de-stakeholders/)
>
Lembre-se que você deve ser enumerar e descrever precisamente e personalizada todos os clientes ideais que sua solução almeja.

| **Olívia**  | **Informações** | **Aplicativos mais utilizados** |
| ----------- | --------------- | ------------------------------- |
| ![image](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e3-proj-mov-t7-roteiriza/assets/127251265/02d334e9-a051-4cb5-8b09-5b187bac4df2) | Idade: 31 anos <br><br> Ocupação: Olivia atua como <br> Analista de Marketing em uma agência de <br> publicidade. Ela é responsável por analisar <br> dados de desempenho e identificar oportunidades <br>para melhorar a visibilidade online das marcas. | • Hootsuit <br> • Google Analytics <br> • Trello |
| **Motivações** | **Frustrações** | **Hobbies** |
| Sua motivação principal é criar <br> experiências memoráveis, explorar <br> novos lugares e culturas. | Olivia fica frustrada quando encontra dificuldades <br> em organizar seus planos de viagem. Ela gostaria <br> de mais praticidade e soluções simples. |  Além de viajar, Olivia gosta de fotografia <br> e experimentar novas culinárias. |






## Histórias de Usuários

Com base na análise das personas forma identificadas as seguintes histórias de usuários:

|EU COMO... `PERSONA`| QUERO/PRECISO ... `FUNCIONALIDADE` |PARA ... `MOTIVO/VALOR`                 |
|--------------------|------------------------------------|----------------------------------------|
|Usuário do sistema  | Registrar minhas tarefas           | Não esquecer de fazê-las               |
|Administrador       | Alterar permissões                 | Permitir que possam administrar contas |

Apresente aqui as histórias de usuário que são relevantes para o projeto de sua solução. As Histórias de Usuário consistem em uma ferramenta poderosa para a compreensão e elicitação dos requisitos funcionais e não funcionais da sua aplicação. Se possível, agrupe as histórias de usuário por contexto, para facilitar consultas recorrentes à essa parte do documento.

> **Links Úteis**:
> - [Histórias de usuários com exemplos e template](https://www.atlassian.com/br/agile/project-management/user-stories)
> - [Como escrever boas histórias de usuário (User Stories)](https://medium.com/vertice/como-escrever-boas-users-stories-hist%C3%B3rias-de-usu%C3%A1rios-b29c75043fac)
> - [User Stories: requisitos que humanos entendem](https://www.luiztools.com.br/post/user-stories-descricao-de-requisitos-que-humanos-entendem/)
> - [Histórias de Usuários: mais exemplos](https://www.reqview.com/doc/user-stories-example.html)
> - [9 Common User Story Mistakes](https://airfocus.com/blog/user-story-mistakes/)

## Modelagem do Processo de Negócio 

### Análise da Situação Atual

Apresente aqui os problemas existentes que viabilizam sua proposta. Apresente o modelo do sistema como ele funciona hoje. Caso sua proposta seja inovadora e não existam processos claramente definidos, apresente como as tarefas que o seu sistema pretende implementar são executadas atualmente, mesmo que não se utilize tecnologia computacional. 

### Descrição Geral da Proposta

Apresente aqui uma descrição da sua proposta abordando seus limites e suas ligações com as estratégias e objetivos do negócio. Apresente aqui as oportunidades de melhorias.

### Processo 1 – NOME DO PROCESSO

Apresente aqui o nome e as oportunidades de melhorias para o processo 1. Em seguida, apresente o modelo do processo 1, descrito no padrão BPMN. 

![Processo 1](img/02-bpmn-proc1.png)

### Processo 2 – NOME DO PROCESSO

Apresente aqui o nome e as oportunidades de melhorias para o processo 2. Em seguida, apresente o modelo do processo 2, descrito no padrão BPMN.

![Processo 2](img/02-bpmn-proc2.png)

## Indicadores de Desempenho

Para os indicadores de desempenho, vamos usar o número de downloads, a quantidade de usuários cadastrados, a quantidade de viagens cadastradas por usuário, o número de desinstalações que ocorreram no período de 2 semanas e o número de artefatos entregues na sprint. A tabela para visualização da métrica é detalhada na imagem a seguir.

![image](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e3-proj-mov-t7-roteiriza/assets/116499898/21f50e9b-a7c9-43a1-aff1-3d32d76de6c1)


## Requisitos

As tabelas que se seguem apresentam os requisitos funcionais e não funcionais que detalham o escopo do projeto.

### Requisitos Funcionais

|ID    | Descrição do Requisito  | Prioridade |
|------|-----------------------------------------|----|
|RF-001| A aplicação deve incluir uma página de cadastro para novos usuários | ALTA | 
|RF-002| A aplicação deve incluir uma página de login para usuários cadastrados | ALTA |
|RF-003| A aplicação deve incluir uma página de cadastro de uma nova viagem | ALTA |
|RF-004| A aplicação deve incluir tópicos das principais informações referentes à viagens | ALTA |
|RF-005| A aplicação deve incluir um checklist da mala de viagem | ALTA |
|RF-006| A aplicação deve incluir um calendário para visualização do roteiro | MÉDIA |
|RF-007| A aplicação deve incluir uma seção com informações de emergência | BAIXA |
|RF-008| A aplicação deve incluir um valor final de todos os gastos relacionados a viagem | BAIXA |


### Requisitos não Funcionais

|ID     | Descrição do Requisito  | Prioridade |
|-------|-----------------------------------------|----|
|RNF-001| A aplicação deve conter bom nível de contraste entre os elementos, facilitando a acessibilidade | ALTA |
|RNF-002| A aplicação deve funcionar de forma consistente em celulares iOS e Android | ALTA |
|RNF-003| A aplicação deve ser responsiva, permitindo a visualização em diferentes tamanhos de telas | ALTA |
|RNF-004| A aplicação deve fornecer uma experiência de uso rápida e fluida | ALTA |
|RNF-005| A aplicação deve funcionar em sua totalidade, mesmo offline | BAIXA |

## Restrições

O projeto está restrito aos itens apresentados na tabela a seguir.

|ID| Restrição                                             |
|--|-------------------------------------------------------|
|RE-001| O projeto deverá ser entregue até o final do semestre, na data de 23/06/24 |
|RE-002| É proibida a terceirização de desenvolvimento do sistema em sua totalidade ou de módulos isolados |
|RE-003| O código de desenvolvimento da aplicação não pode ser obtido através de sistemas de Inteligência Artificial |
|RE-004| A aplicação deve ser desenvolvida em JavaScript |
|RE-005| A aplicação deve utilizar a biblioteca de JavaScript React Native |

## Diagrama de Casos de Uso

A seguir, é possível visualizar o Diagrama de Casos de Uso de acordo com os requisitos estabelecidos.

![Diagrama de caso de uso](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e3-proj-mov-t7-roteiriza/assets/107009327/5136afd8-43fe-4308-bcb0-10381fb8837e)
_Diagrama de Casos de Uso_


# Matriz de Rastreabilidade

A matriz de rastreabilidade foi desenhada para identificarmos quais requisitos estão conectados e como é a interação entre eles. A matriz foi dividida em duas tabelas, a primeira referenciando as ligações entre os requisitos e personas; na segunda, buscamos evidenciar as relações entre os requisitos, personas e o plano de teste. A seguir é apresentado o planejamento da matriz.

![image](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e3-proj-mov-t7-roteiriza/assets/116499898/b524ac3f-a345-45c3-96ab-89fc87feefef)
_Matriz de Rastreabilidade por requisitos_

![image](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e3-proj-mov-t7-roteiriza/assets/116499898/a8570e5f-1376-48c5-b22b-fc903e09a6a7)
_Matriz de Rastreabilidade por testes_


# Gerenciamento de Projeto

O gerenciamento de projetos é uma ferramenta crucial para o controle eficiente do andamento de qualquer empreendimento. Por meio dele, é possível analisar e identificar possíveis vulnerabilidades no planejamento, garantindo uma gestão mais eficaz e assertiva.

Nosso objetivo é desenvolver um método de gerenciamento que combine facilidade de visualização com informações abrangentes. Dessa forma, torna-se mais acessível compreender o progresso do projeto e tomar decisões embasadas.

A seguir, apresentamos uma sequência de tópicos que compõem nosso sistema de gerenciamento.

## Gerenciamento de Tempo

Para o gerenciamento do tempo, foi construído uma tabela com o cronograma por telas dentro da aplicação. Levamos em consideração desde a construção dos Wireframes até o Deploy da aplicação.

![image](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e3-proj-mov-t7-roteiriza/assets/116499898/3cfd7790-f218-417f-84c1-c8a97431b5ae)
_Cronograma do Projeto_

## Gerenciamento de Equipe

A seguir é apresentado os colaboradores que vão atuar no projeto.

| Nome           | Função        |
|----------------|---------------|
| Luana Pina     | Scrum Master  |
| Bruna          | Product Owner |
| Tayane Milagres| Desenvolvedor |
| João           | Desenvolvedor |
| Gabriel        | Design        |
| André Guilherme| Design        |


## Gestão de Orçamento

O gerenciamento do projeto pode ser visualizado na tabela a seguir, onde apresentamos as despesas esperadas do projeto.

![image](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e3-proj-mov-t7-roteiriza/assets/116499898/c4c25a81-dfde-44b8-b103-abc8bf70166c)
_Gestão de orçamento_
