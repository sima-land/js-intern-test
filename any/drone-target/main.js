const args = process.argv;
let aCoord;
for (let a of args) {
  aCoord = a;
}

function isPrimeNumber(number) {
  if (number <= 1) return false;
  const n = Math.sqrt(number);
  for (let i = 2; i <= n; i++) {
    if (number % i == 0) return false;
  }
  return true;
}

//console.log(isPrimeNumber(aCoord));
function antionToModern(antionNumber) {
  if (isPrimeNumber(antionNumber)) {
    throw new TypeError("Bad argument");
  }
  let x = 0;
  let y = 0;

  let lengthVerticaleLine = 1;
  let lengthHorizontalLine = 1;

  let currenVerticalStep = 0;
  let currentHorizontalStep = 0;

  let direction = "UP";

  for (let i = 0; i < antionNumber; i++) {
    if (isPrimeNumber(i)) continue;

    switch (direction) {
      case "UP": {
        currenVerticalStep++;
        y++;
        if (currenVerticalStep == lengthVerticaleLine) {
          lengthVerticaleLine++;
          direction = "RIGHT";
          currenVerticalStep = 0;
        }
        break;
      }
      case "RIGHT": {
        currentHorizontalStep++;
        x++;
        if (currentHorizontalStep == lengthHorizontalLine) {
          lengthHorizontalLine++;
          direction = "DOWN";
          currentHorizontalStep = 0;
        }
        break;
      }
      case "DOWN": {
        currenVerticalStep++;
        y--;
        if (currenVerticalStep == lengthVerticaleLine) {
          lengthVerticaleLine++;
          direction = "LEFT";
          currenVerticalStep = 0;
        }
        break;
      }
      case "LEFT": {
        currentHorizontalStep++;
        x--;
        if (currentHorizontalStep == lengthHorizontalLine) {
          lengthHorizontalLine++;
          direction = "UP";
          currentHorizontalStep = 0;
        }
        break;
      }
    }
  }
  return { x, y };
}

const customTest = (func, arg, actual) => {
  try {
    const expected = func(arg);

    if (expected.x === actual.x && expected.y === actual.y) {
      console.log(`Expected and actual is ${JSON.stringify(expected)}`);
    } else {
      console.log(
        `Expected: ${JSON.stringify(expected)},`,
        `but actual: ${JSON.stringify(actual)}`
      );
    }
  } catch (e) {
    console.log(
      `${e.message} in "${func.prototype.constructor.name}"`,
      `with argument: ${arg}`
    );
  }
};

customTest(antionToModern, 0, { x: 0, y: 0 });
customTest(antionToModern, 27, { x: 0, y: -2 });
customTest(antionToModern, 3, { x: 1, y: 0 });
customTest(antionToModern, 6, { x: 1, y: 0 });
