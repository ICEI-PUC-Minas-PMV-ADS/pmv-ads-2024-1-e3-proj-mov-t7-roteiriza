# Plano de Testes de Software

## Plano de Testes de Funcionalidades

| ID | Descrição do Teste | Requisito | Etapas do Teste | Resultado Esperado |
| -- | ------------------ | --------- | --------------- | ------------------ |
| 01 | Realizar cadastro  | RF-001    |  1. Acessar o aplicativo <br> 2. Acessar a página de cadastro <br> 3. Preencher o formulário de cadastro <br> 4. Clicar em "Cadastrar" | O resultado esperado é a conclusão do <br> cadastro do usuário e redirecionamento<br>para a página de criação de Viagens. |
| 02 | Realizar login     | RF-002    | 1. Acessar o aplicativo<br>2. Acessar a página de Login<br> 3. Preencher o formulário de Login<br> 4. Clicar em "Login"| O resultado esperado do teste é o login<br>realizado com sucesso pelo usuário, onde<br>é validado se o usuário realmente existe<br> na base de Dados. |
| 03 | Realizar Recuperação de Senha | RF-001 | 1. Acessar o aplicativo<br>2. Acessar a página de Login<br>3. Clicar em "Esqueci minha senha";<br>4. Inserir email para recuperação <br>de acordo com o que foi cadastrado;<br>5. Resgatar o código enviado no email;<br>6. Inserir Código no campo<br> especificado e adicionar nova senha;<br>7. Clicar em "Alterar senha" | O resultado esperado do teste é o<br> envio de um código de recuperação<br> no email do usuário, este código é<br> validado na redefinição de senha<br> para que constate que seja o<br> usuário real a fazer a solicitação; |
| 04 | Registrar uma viagem | RF-003 | 1. Logar-se no app<br>2. Na página inicial, clicar em<br> "Adicionar uma nova viagem"<br> 3. Preencher o formulário de nova viagem;<br>4. Clicar em Adicionar; | O resultado esperado do teste é o Registro de uma nova viagem |
| 05 | Editar uma viagem | RF-003 | 1. Logar-se no app<br> 2. Na página inicial, clicar em "Adicionar uma nova viagem"<br> 3. Preencher o formulário de nova viagem;<br>4. Clicar em Adicionar; | O resultado esperado deste teste é o usuário  conseguir editar uma viagem corretamente. |
| 06 | Apagar uma viagem | RF-003 | 1. Logar-se no app<br> 2. Na página inicial de viagens, clicar em "Apagar viagem" | O resultado esperado deste teste é o usuário  conseguir apagar uma viagem corretamente. |
| 07 | Visualizar Informações relacionadas a viagem | RF-004 | 1. Logar-se no app<br> 2. Ter uma viagem já cadastrada<br> 3. Entrar na viagem que deseja visualizar<br> 4. Quando entrar na viagem selecionada sera mostrado a bagagem, passagem, hospedagem, passeios, roteiro, emergência. | O resultado esperado deste teste é o usuário  visualizar informações relacionada a viagem corretamente. |
| 08 | Registrar uma hospedagem | RF-004 | 1. Logar-se no app<br> 2. Ter uma viagem já cadastrada<br> 3. Entrar na sessão Hospedagem<br> 4. Inserir Endereço<br> 5. Inserir Data do check-in<br> 6. Inserir Data do check-out<br> 7. Inserir Dias<br> 8. Inserir Valor<br> 9. Clicar em salvar para salvar sua hospedagem | O resultado esperado deste teste é o usuario conseguir registrar uma hospedagem corretamente |
| 09 | Registrar informações de emergência | RF-007 | 1. Logar-se no app<br> 2. Ter uma viagem já cadastrada<br> 3. Entrar na sessão Emergência<br> 4. Inserir Hospital ( não obrigatorio )<br> 5. Inserir Corpo de bombeiros ( não obrigatorio )<br> 6. Inserir Samu ( não obrigatorio )<br>7. Inserir Polícia ( não obrigatorio )<br>8. Clicar em salvar para adicionar as informações de emergência. | O resultado esperado deste teste é o usuario conseguir registrar informaçoes de emergência corretamente. |
| 10 | Registrar uma mala de viagem | RF-005 | 1. Logar-se no app<br> 2. Ter uma viagem já cadastrada<br> 3. Entrar na sessão de mala<br>4. Adicionar os itens<br>5. Clicar em salvar | O resultado esperado deste teste é o usuario conseguir registrar uma bagagem corretamente |
| 11 | Registrar uma alimentação | RF-004 | 1. Logar-se no app<br> 2. Ter uma viagem já cadastrada<br>3. Entrar na sessão Alimentação<br>4. Clicar em adiciona<br>5. Inserir Local<br>6. Inserir Endereço<br>7. Inserir Data<br>8. Inserir Horário<br> 9. Inserir Valor<br>10. Clicar em adicionar para adicionar a alimentação | O resultado esperado deste teste é o usuario conseguir registrar uma alimentação corretamente |
| 12 | Registrar uma passagem | RF-004 | 1. Logar-se no app<br>2. Ter uma viagem já cadastrada<br>3. Entrar na sessão Passagem<br>4. Inserir Datas<br> 5. Inserir Pessoas<br> 6. Inserir Valor<br>7. Inserir Transporte<br>8. Clicar em adicionar para adicionar a passagem | O resultado esperado deste teste é o usuario conseguir registrar uma passagem corretamente. |
| 13 | Registrar um Passeio  | RF-004| 1. Logar-se no app<br>2. Ter uma viagem já cadastrada<br>3. Entrar na sessão Passeios<br>4. Inserir Local <br> 5. Inserir Endereço<br>6. Inserir Data<br>7. Inserir Transporte<br>8. Inserir Valor<br>9. Clicar em adicionar para adicionar o passeio | O resultado esperado deste teste é o usuario conseguir registrar um passeio corretamente. |
| 14 | Visualização do roteiro de Viagem | RF-006| 1. Logar-se no app<br>2. Ter uma viagem já cadastrada<br>3. Entrar na sessão Roteiro<br>4. Clicar no calendário o dia desejado |  O resultado esperado deste teste é o usuario conseguir visualizar o seu roteiro corretamente. |






 
## Ferramentas de Testes (Opcional)

Comente sobre as ferramentas de testes utilizadas.
 
> **Links Úteis**:
> - [IBM - Criação e Geração de Planos de Teste](https://www.ibm.com/developerworks/br/local/rational/criacao_geracao_planos_testes_software/index.html)
> - [Práticas e Técnicas de Testes Ágeis](http://assiste.serpro.gov.br/serproagil/Apresenta/slides.pdf)
> -  [Teste de Software: Conceitos e tipos de testes](https://blog.onedaytesting.com.br/teste-de-software/)
> - [Criação e Geração de Planos de Teste de Software](https://www.ibm.com/developerworks/br/local/rational/criacao_geracao_planos_testes_software/index.html)
> - [Ferramentas de Test para Java Script](https://geekflare.com/javascript-unit-testing/)
> - [UX Tools](https://uxdesign.cc/ux-user-research-and-user-testing-tools-2d339d379dc7)
