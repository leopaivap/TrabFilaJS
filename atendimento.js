 class Atendimento{
 constructor() {
      this._nome = "";
      this._cpf = "";
      this._data = "";
      this._hora = "";
    }
  
    get nome() {
        return this._nome;
    }

    set nome(novoNome) {
        this._nome = novoNome;
    }

    get cpf() {
        return this._cpf;
    }

    set cpf(cpf) {
        this._cpf = cpf;
    }

    get data() {
        return this._data;
    }

    set data(data) {
        this._data = data;
    }

    get hora() {
        return this._hora;
    }

    set hora(hora) {
        this._hora = hora;
    }

    equals(outroAtendimento) {
      if (!(outroAtendimento instanceof Atendimento)) {
        return false;
      }
      return this._cpf === outroAtendimento.cpf;
    }

    toString() {
        return `Nome: ${this._nome} - CPF: ${this._cpf} - Data: ${this._data} - Hora: ${this._hora}`;
      }
}
  