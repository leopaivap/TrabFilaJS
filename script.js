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
   const atendimento = new Atendimento(null, cpf); // vamos pesquisar só por CPF
   // para cada elemento da fila, verificar com o equals
   // Deve retornar a posição na fila e caso não seja encontrado avisar, crie um contador de posicões
   for (let item of minhaFila.items) { // para cada elemento da fila
      if (item.equals(atendimento))
         alert("Achou! Posição: ");
   }
   // se nao encontrar mostre mensagem
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
