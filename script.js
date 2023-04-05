let minhaFila = new Fila(10);

function adicionarElemento() {
   const novoNome = document.getElementById("txtNovoNome");
   const novoCpf = document.getElementById("txtNovoCpf");

   if (novoNome.value == "" || novoCpf.value == "")
      alert("Preencha todos os campos!");
   else {
      const novoAtendimento = new Atendimento();
      novoAtendimento.nome = novoNome.value;
      novoAtendimento.cpf = novoCpf.value;
      novoAtendimento.data = obterDataAtual();
      novoAtendimento.hora = obterHoraAtual();

      if (minhaFila.enqueue(novoAtendimento)) {
         console.log(minhaFila.toString());
         alert(`${novoAtendimento.nome} entrou na fila às ${novoAtendimento.data} ${novoAtendimento.hora} \nSua posicao na fila é: ${minhaFila.itens.length}`);

         novoNome.value = "";
         novoCpf.value = ""
         novoNome.focus();
         mostrarFila();
      }
      else
         alert("Fila Cheia :(");
   }

}
//--------------------------------------------------------------------------------------------
// Função para remover o primeiro elemento da fila
function realizarAtendimento() {
   if (minhaFila.isEmpty())
      alert("Fila Vazia!");
   else {
      const remove = minhaFila.dequeue();
      const tempoAtendimento = calcularDiferencaHoras(remove.hora, obterHoraAtual(),);
      alert(remove.nome + " foi atendido depois de esperar por " + tempoAtendimento);
      console.log(minhaFila.toString());
      mostrarFila();
   }
   // verificar se não está vazia antes de atender
   // mostrar dados da pessoa atendida utilizando a funcao mostrarMensagemRemocao

}
//--------------------------------------------------------------------------------

function buscarCpf() {
   const cpf = document.getElementById("txtNovoCpf").value.trim(); // o trim retira os espaços em branco
   let atendimento = new Atendimento(); // vamos pesquisar só por CPF

   // Deve retornar a posição na fila e caso não seja encontrado avisar, crie um contador de posicões
   let cont = 0;

   for (let item of minhaFila.itens) { // para cada elemento da fila
      atendimento.cpf = cpf
      cont++;
      console.log(cont);
      if (item.equals(atendimento)) {   // para cada elemento da fila, verificar com o equals
         alert("Achou! Posição: " + cont);
         return;
      }
   }
   alert("CPF não encontrado!"); // se nao encontrar mostre mensagem
}
//--------------------------------------------------------------------------------------------
function mostrarMensagemRemocao(pessoaAtendida) {
   const lblMensagemRemocao = document.getElementById("lblMensagemRemocao");
   lblMensagemRemocao.innerHTML = "Próximo a ser atendido(a): " + pessoaAtendida.nome;
   lblMensagemRemocao.style.display = "block";
}
//--------------------------------------------------------------------------------------------
// Função para mostrar a  fila
function mostrarFila() {
   const filaElemento = document.getElementById("listPessoasFila");
   filaElemento.textContent = minhaFila.toString();
   filaElemento.innerHTML = "";

   let contador = 0;
   for (let item of minhaFila.itens) {
      contador++;
      const itemElement = document.createElement("ul");
      itemElement.classList.add("fila-item");
      itemElement.innerText = item.toString();
      filaElemento.appendChild(itemElement);

      // alterna as cores de fundo entre as linhas
      if (filaElemento.children.length % 2 == 0)
         itemElement.classList.add("fila-item-claro");
      else
         itemElement.classList.add("fila-item-escuro");
   }

   if (contador == 0) {
      pessoasFila.innerHTML = "Fila Vazia!"
      pessoasFila.style.display = "block";
   } else
      pessoasFila.innerHTML = "";


   if (minhaFila.itens[0] != null)
      mostrarMensagemRemocao(minhaFila.itens[0]);
   else {
      lblMensagemRemocao.innerHTML = "Próximo a ser atendido(a): Fila Vazia!";
      lblMensagemRemocao.style.display = "block";
   }

}
//--------------------------------------------------------------------------------------------
// funcao data
function obterDataAtual() {
   let dataAtual = new Date();
   let dia = dataAtual.getDate();
   let mes = dataAtual.getMonth() + 1; // Adiciona 1 porque o mês inicia do zero
   let ano = dataAtual.getFullYear();
   // Formata a data como "dd/mm/aaaa"
   let dataFormatada = `${dia.toString().padStart(2, '0')}/${mes.toString().padStart(2, '0')}/${ano}`;
   return dataFormatada;
}
//--------------------------------------------------------------------------------------------
function obterHoraAtual() {
   const data = new Date();
   const hora = data.getHours().toString().padStart(2, '0');
   const minuto = data.getMinutes().toString().padStart(2, '0');
   const segundo = data.getSeconds().toString().padStart(2, '0');
   return `${hora}:${minuto}:${segundo}`;
}
//--------------------------------------------------------------------------------------------
function calcularDiferencaHoras(hora1, hora2) {
   const [h1, m1, s1] = hora1.split(':').map(Number);
   const [h2, m2, s2] = hora2.split(':').map(Number);

   const diferencaSegundos = (h2 * 3600 + m2 * 60 + s2) - (h1 * 3600 + m1 * 60 + s1);

   const horas = Math.floor(diferencaSegundos / 3600);
   const minutos = Math.floor((diferencaSegundos % 3600) / 60);
   const segundos = diferencaSegundos % 60;

   return `${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;
}
