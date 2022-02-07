o2 = Object.create(o1);

// o2.__proto__= o1

o3 = Object.create(o2);

// o3.__proto__ = o2


// Si hay create no hay función constructora, es un clonado
// el __proto__ del objeto clonado, apunta al objeto del que
// ha sido clonado


// Herencia en modo clásico

// (B extends A)

function A(){
  this.a=3;
}


function B() {
  this.a=3;
  this.b=8;
}

Esto no es herencia, aquí hemos copiado los datos a mano y ya está.

function B() {
  A.call(this);
  this.b=8;
}

ES&

class A {
  constructor() {
    this.a = 3;
    this.m1 = function(){}
  }
  m2(){

  }
}


class B extends A {
  constructor() {
    super()
  }

  m2 () {
    super()
  }
}
El super busca al padre y lo ejecuta en el contexto actual.


