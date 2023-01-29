export default class Estados {
  constructor(caracter) {
    this.estadoActual = 'Q0';
    this.caracter = caracter;
    this.letras = /^[a-zA-Z]*$/;
    this.numeros = /^[0-9]*$/;
    this.letrasYnumeros = /^[a-zA-Z0-9]$/;
    this.vacio = /\s/;
    this.otros = /[$#%/&*]/;
    this.todo = /^[a-zA-Z0-9$#%/&*]+$/
  }
  //    Validaciones
  validarEspacios(texto) {
    return this.vacio.test(texto);
  }

  validarLetras(texto) {
    return this.letras.test(texto);
  }

  validarNumeros(texto) {
    return this.numeros.test(parseInt(texto));
  }

  validarLetrasYNumeros(texto) {
    return this.letrasYnumeros.test(texto);
  }

  validarOtros(texto) {
    return this.otros.test(texto);
  }

  validarTodo(texto) {
    return this.todo.test(texto);
  }

  //    Estados
  estado_Q0(texto) {
    return this.validarLetras(texto);
  }

  estado_Q1(texto) {
    return this.validarLetrasYNumeros(texto);
  }

  estado_Q2(texto) {
    return this.validarOtros(texto)
  }
}
