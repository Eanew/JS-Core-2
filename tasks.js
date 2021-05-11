const DEFAULT_ERROR_MESSAGE = `Ошибка!`

const makeObjectDeepCopy = original => Object.getOwnPropertyNames(original).reduce((copy, key) => {
    copy[key] = (original[key] && typeof original[key] === `object`)
        ? makeObjectDeepCopy(original[key])
        : original[key]
    
    return copy
}, Object.create(Object.getPrototypeOf(original)))


const selectFromInterval = (numbers, firstValue, secondValue) => {
    if (!Array.isArray(numbers) || typeof firstValue !== `number` || typeof secondValue !== `number`) {
        throw new Error(DEFAULT_ERROR_MESSAGE)
    }

    const from = Math.min(firstValue, secondValue)
    const to = Math.max(firstValue, secondValue)

    return numbers.filter(number => {
        if (typeof number !== `number`) throw new Error(DEFAULT_ERROR_MESSAGE)
        return number >= from && number <= to
    })
}


const myIterable = {
    [Symbol.iterator]() {
        let { from: value, to } = this
        
        if (typeof value !== `number` || typeof to !== `number` || value > to) throw new Error(DEFAULT_ERROR_MESSAGE)
        return { next: () => ({ value, done: value++ > to }) }
    },
}

module.exports = {
    makeObjectDeepCopy,
    selectFromInterval,
    myIterable,
}