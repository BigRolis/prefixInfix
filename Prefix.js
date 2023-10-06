function infixToPostfix(infix) {
    let postfix = ''; // Creamos una cadena para la notación posfija
    const stack = []; // Creamos un array para los operadores

    // Función para obtener la precedencia de un operador
    const precedence = (operator) => {
        switch (operator) {
            case '+':
            case '-':
                return 1; // Operadores de suma y resta tienen menor precedencia
            case '*':
            case '/':
                return 2; // Operadores de multiplicación y división tienen mayor precedencia
        }
        return 0; // Consideramos cualquier otro caracter (incluyendo '(') como de menor precedencia
    };

    // Recorremos la expresión infija caracter por caracter
    for (let i = 0; i < infix.length; i++) {
        const c = infix.charAt(i);
        if (!isNaN(c)) {
            postfix += c; // Si es un dígito, lo agregamos directamente a la notación posfija
        } else if (c === '(') {
            stack.push(c); // Si es un paréntesis de apertura, lo apilamos en el array
        } else if (c === ')') {
            // Si es un paréntesis de cierre, desapilamos operadores hasta encontrar el paréntesis de apertura correspondiente
            while (stack.length > 0 && stack[stack.length - 1] !== '(') {
                postfix += stack.pop();
            }
            stack.pop(); // Quitamos el '(' del array
        } else {
            // Si es un operador, desapilamos operadores de mayor o igual precedencia antes de apilarlo
            while (stack.length > 0 && precedence(c) <= precedence(stack[stack.length - 1])) {
                postfix += stack.pop();
            }
            stack.push(c); // Apilamos el operador actual
        }
    }

    // Desapilamos los operadores restantes en el array y los agregamos a la notación posfija
    while (stack.length > 0) {
        postfix += stack.pop();
    }

    return postfix; // Devolvemos la notación posfija como una cadena
}

function infixToPrefix(infix) {
    // Función para invertir una cadena
    const reverseString = (str) => {
        return str.split('').reverse().join('');
    };

    let infixReversed = reverseString(infix); // Invertimos la expresión infija
    for (let i = 0; i < infixReversed.length; i++) {
        if (infixReversed.charAt(i) === '(') {
            infixReversed = infixReversed.substring(0, i) + ')' + infixReversed.substring(i + 1); // Cambiamos '(' por ')' y viceversa
            i++;
        } else if (infixReversed.charAt(i) === ')') {
            infixReversed = infixReversed.substring(0, i) + '(' + infixReversed.substring(i + 1);
            i++;
        }
    }
    const postfixReversed = infixToPostfix(infixReversed); // Convertimos la expresión infija invertida a posfija
    return reverseString(postfixReversed); // Invertimos la notación posfija para obtener la prefija
}

const infixExpression = "3+4*(2-1)/(2-4)*4"; // Expresión infija de ejemplo
const postfixExpression = infixToPostfix(infixExpression);
const prefixExpression = infixToPrefix(infixExpression);

console.log("Notación Infija: " + infixExpression);
console.log("Notación Posfija: " + postfixExpression);
console.log("Notación Prefija: " + prefixExpression);
