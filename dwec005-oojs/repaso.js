o2 = Object.create(o1);

// o2.__proto__= o1

o3 = Object.create(o2);

// o3.__proto__ = o2


// Si hay create no hay funcion constructora, es un clonado
// el __proto__ del objeto clonado, apunta al objeto del que
// ha sido clonado


// Herencia en modo clásico

// (B extends A)