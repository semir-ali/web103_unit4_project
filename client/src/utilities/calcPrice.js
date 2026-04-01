const BASE_PRICES = {
    Ford: 35000,
    Toyota: 32000,
    BMW: 55000,
    Tesla: 65000,
    Chevrolet: 33000,
    Honda: 28000,
    Other: 25000
}

const COLOR_PRICES = {
    Red: 0,
    Blue: 0,
    Black: 0,
    White: 0,
    Silver: 500,
    Yellow: 1200,
    Orange: 1200,
    'Matte Black': 2500,
    'Pearl White': 2000
}

const WHEEL_PRICES = {
    Standard: 0,
    Sport: 2000,
    'Off-Road': 3000,
    Luxury: 5000
}

const INTERIOR_PRICES = {
    Cloth: 0,
    Leather: 2500,
    'Premium Leather': 5000,
    'Carbon Fiber': 8000
}

const getBasePrice = (make) => BASE_PRICES[make] ?? BASE_PRICES.Other
const getColorPrice = (color) => COLOR_PRICES[color] ?? 0
const getWheelPrice = (wheels) => WHEEL_PRICES[wheels] ?? 0
const getInteriorPrice = (interior) => INTERIOR_PRICES[interior] ?? 0

const calculateTotalPrice = ({ make, color, wheels, interior }) =>
    getBasePrice(make) + getColorPrice(color) + getWheelPrice(wheels) + getInteriorPrice(interior)

export {
    BASE_PRICES, COLOR_PRICES, WHEEL_PRICES, INTERIOR_PRICES,
    getBasePrice, getColorPrice, getWheelPrice, getInteriorPrice,
    calculateTotalPrice
}
