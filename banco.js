let contas = {}; // Objeto para armazenar as contas
let opcao; // Variável para armazenar a opção escolhida pelo usuário

function criarConta() {
  let nome = prompt('Qual é o seu nome?');
  let sobrenome = prompt('Qual é o seu sobrenome?');
  
  // Criar um objeto para representar a conta
  let novaConta = {
    nome: nome,
    sobrenome: sobrenome,
    saldo: 0, // Definir um saldo inicial
    historico: [] // Inicializar o histórico como um array vazio
  };

  // Adicionar a nova conta ao objeto de contas
  contas[nome] = novaConta;
  
  alert('Conta criada com sucesso: ' + nome + " " + sobrenome);

  if (novaConta.saldo === 0) {
    let confirmacao = confirm("Seu saldo está zerado. Deseja realizar um depósito?");
    if (confirmacao) {
      let valorDepositado = parseFloat(prompt("Digite o valor que deseja depositar R$: "));
      novaConta.saldo += valorDepositado;
      novaConta.historico.push("Depósito de R$" + valorDepositado);
      alert("Depósito realizado com sucesso. Saldo atual : " + novaConta.saldo);
    }
  }
}

function depositar() {
  let nomeConta = prompt("Digite o nome da conta para o qual deseja depositar : ");
  let deposito;

  if (contas[nomeConta]) {
    alert("Saldo atual da conta do " + nomeConta + " " + contas[nomeConta].sobrenome + " R$ : " + contas[nomeConta].saldo);
       
    deposito = parseFloat(prompt("Digite o valor que deseja depositar R$:  "));
    contas[nomeConta].saldo += deposito;
    contas[nomeConta].historico.push("Depósito de R$" + deposito);
    alert("O novo saldo da " + nomeConta  + " " + contas[nomeConta].sobrenome + " : " + contas[nomeConta].saldo);
  } else {
    alert("Conta não encontrada.");
  }
}

function sacar() {
  let nomeConta = prompt("Digite o nome da conta para o qual deseja sacar : ");
  let sacar;

  if (contas[nomeConta]) {
    alert("Saldo atual da conta do " + nomeConta + " " + contas[nomeConta].sobrenome + " R$ : " + contas[nomeConta].saldo);
       
    sacar = parseFloat(prompt("Digite o valor que deseja sacar R$:  "));
    if (sacar <= contas[nomeConta].saldo) {
      contas[nomeConta].saldo -= sacar;
      contas[nomeConta].historico.push("Saque de R$" + sacar);
      alert("O novo saldo da " + nomeConta  + " " + contas[nomeConta].sobrenome + " : " + contas[nomeConta].saldo);
    } else {
      alert("Saldo insuficiente para realizar o saque.");
    }
  } else {
    alert("Conta não encontrada.");
  }
}

function transferir() {
  let nomeContaOrigem = prompt("Digite o nome da sua conta: ");
  let nomeContaDestino;

  if (contas[nomeContaOrigem]) {
    alert("Saldo atual da conta do " + nomeContaOrigem + " " + contas[nomeContaOrigem].sobrenome + " R$ : " + contas[nomeContaOrigem].saldo);
    nomeContaDestino = prompt("Digite o nome da conta para a qual deseja transferir o dinheiro: ");

    if (contas[nomeContaDestino]) {
      let valorTransferencia = parseFloat(prompt("Digite o valor que deseja transferir R$: "));

      if (valorTransferencia <= contas[nomeContaOrigem].saldo) {
        let confirmacao = confirm("Deseja transferir R$ " + valorTransferencia + " da conta de " + nomeContaOrigem + " " + contas[nomeContaOrigem].sobrenome + " para a conta de " + nomeContaDestino + " " + contas[nomeContaDestino].sobrenome + "?");

        if (confirmacao) {
          // Transferir os fundos
          contas[nomeContaOrigem].saldo -= valorTransferencia;
          contas[nomeContaOrigem].historico.push("Transferência de R$" + valorTransferencia + " para " + nomeContaDestino);
          contas[nomeContaDestino].saldo += valorTransferencia;
          contas[nomeContaDestino].historico.push("Recebimento de R$" + valorTransferencia + " de " + nomeContaOrigem);
          alert("Transferência realizada com sucesso.");
        } else {
          alert("Transferência cancelada.");
        }
      } else {
        alert("Saldo insuficiente para realizar a transferência.");
      }
    } else {
      alert("Conta de destino não encontrada.");
    }
  } else {
    alert("Conta de origem não encontrada.");
  }
}

function exibirHistorico(nomeConta) {
  let historico = contas[nomeConta].historico;
  if (historico.length === 0) {
    alert("Nenhuma transação registrada para esta conta.");
  } else {
    alert("Histórico de transações para a conta " + nomeConta + " " + contas[nomeConta].sobrenome + ":\n" + historico.join("\n"));
  }
}

do {
  opcao = parseInt(prompt(
    "\nDigite a opção que deseja seguir:\n" +
    "[1] - Criar conta\n" +
    "[2] - Verificar Saldo\n" +
    "[3] - Depositar\n" +
    "[4] - Sacar\n" +
    "[5] - Transferir\n" +
    "[6] - Exibir Histórico\n" +
    "[7] - Sair"
  ));

  switch (opcao) {
    case 1:
      criarConta();
      break;
    case 2:
      let nomeConta = prompt("Digite o nome da conta que deseja buscar : ");
      if (contas[nomeConta]) {
        alert("Saldo atual da conta " + nomeConta + " " +  contas[nomeConta].sobrenome +  " R$ : " + contas[nomeConta].saldo);
      } else {
        alert("Conta não encontrada.");
        let confirmation = confirm("Deseja criar uma nova conta?");
        if (confirmation) {
          criarConta();
        } else {
          alert("Saindo");
        }
      }
      break;
    case 3:
      depositar();
      break;
    case 4:
      sacar();
      break;
    case 5:
      transferir();
      break;
    case 6:
      let nomeContaHistorico = prompt("Digite o nome da conta para a qual deseja exibir o histórico: ");
      if (contas[nomeContaHistorico]) {
        exibirHistorico(nomeContaHistorico);
      } else {
        alert("Conta não encontrada.");
      }
      break;
    case 7:
      // Saindo do loop
      break;
    default:
      alert("Opção inválida. Escolha uma opção de 1 a 7.");
  }
} while (opcao !== 7);
