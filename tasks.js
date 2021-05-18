const DEFAULT_ERROR_MESSAGE = `Ошибка!`

const makeFunctionCover = original => function(...args) {
    return original.apply(this, args)
}

const makeObjectEmptyCopy = original => {
    if (original instanceof Date) return new Date(original.getTime())

    const copy = Array.isArray(original)
        ? []
        : typeof original === `function`
            ? makeFunctionCover(original)
            : new original.constructor()

    Object.getOwnPropertyNames(copy).forEach(key => delete copy[key])
    Object.setPrototypeOf(copy, Object.getPrototypeOf(original))

    return copy
}

const makeObjectDeepCopy = original => Object.getOwnPropertyNames(original).reduce((copy, key) => {
    copy[key] = (original[key] && (typeof original[key] === `object` || typeof original[key] === `function`))
        ? makeObjectDeepCopy(original[key])
        : original[key]
    
    return copy
}, makeObjectEmptyCopy(original))


const isValidNumber = number => Boolean(
    typeof number === `number` &&
    !isNaN(number) &&
    number !== number / 0
)

const selectFromInterval = (numbers, firstValue, secondValue) => {
    if (!Array.isArray(numbers) || !isValidNumber(firstValue) || !isValidNumber(secondValue)) {
        throw new Error(DEFAULT_ERROR_MESSAGE)
    }

    const from = Math.min(firstValue, secondValue)
    const to = Math.max(firstValue, secondValue)

    return numbers.filter(number => {
        if (!isValidNumber(number)) throw new Error(DEFAULT_ERROR_MESSAGE)
        return number >= from && number <= to
    })
}


const myIterable = {
    [Symbol.iterator]() {
        let { from: value, to } = this
        
        if (!isValidNumber(value) || !isValidNumber(to) || value > to) throw new Error(DEFAULT_ERROR_MESSAGE)
        return { next: () => ({ value, done: value++ > to }) }
    },
}

module.exports = {
    makeObjectDeepCopy,
    selectFromInterval,
    myIterable,
}
