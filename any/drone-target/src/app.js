const isPrime = (n) => {
  if (n < 2) {
    return false
  }

  const q = Math.floor(Math.sqrt(n))

  for (let i = 2; i <= q; i++) {
    if (n % i === 0) {
      return false
    }
  }

  return true
}

const ancientToModern = (num) => {
  if (num === 0) {
    return [0, 0]
  }

  if (isPrime(num)) {
    return false
  }

  let index = 0

  for (let i = 1; i <= num; i++) {
    if (!isPrime(i)) {
      index++
    }
  }

  let fieldSize = 8
  let level = 1

  while (fieldSize < index) {
    level++
    fieldSize += level * 8
  }

  let coords = []

  for (let i = 1; i <= level; i++) {
    const sideSize = 1 + i * 2
    const maxCoord = Math.floor(sideSize / 2)

    for (let x = -maxCoord + 1; x <= maxCoord; x++) {
      coords.push([x, maxCoord])
    }

    for (let y = maxCoord - 1; y >= -maxCoord; y--) {
      coords.push([maxCoord, y])
    }

    for (let x = maxCoord - 1; x >= -maxCoord; x--) {
      coords.push([x, -maxCoord])
    }

    for (let y = -maxCoord + 1; y <= maxCoord; y++) {
      coords.push([-maxCoord, y])
    }
  }

  return coords[index - 1] || 'lol'
}

module.exports = ancientToModern