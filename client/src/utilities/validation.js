const VALID_MODELS = {
    Ford:      ['Mustang', 'F-150', 'Explorer', 'Bronco', 'Maverick'],
    Toyota:    ['Camry', 'Corolla', 'RAV4', 'Tacoma', 'Highlander'],
    Honda:     ['Civic', 'Accord', 'CR-V', 'Pilot', 'HR-V'],
    BMW:       ['3 Series', '5 Series', 'X3', 'X5', 'M3', 'M5'],
    Tesla:     ['Model S', 'Model 3', 'Model X', 'Model Y', 'Cybertruck'],
    Chevrolet: ['Silverado', 'Equinox', 'Malibu', 'Camaro', 'Blazer']
}

// Sports cars and sedans — Off-Road wheels don't fit these
const NO_OFFROAD_MODELS = [
    'Mustang', 'Camaro',
    'Camry', 'Corolla',
    'Civic', 'Accord',
    'Malibu',
    'Model S', 'Model 3',
    '3 Series', '5 Series', 'M3', 'M5'
]

// Carbon Fiber interior is only available on 2020+ models
const CARBON_FIBER_MIN_YEAR = 2020

// Returns an array of error strings; empty array means valid
const validateCar = ({ make, model, year, color, wheels, interior }) => {
    const errors = []

    if (!make)     errors.push('Please select a make.')
    if (!model)    errors.push('Please select a model.')
    if (!year)     errors.push('Please select a year.')
    if (!color)    errors.push('Please select a color.')
    if (!wheels)   errors.push('Please select a wheel package.')
    if (!interior) errors.push('Please select an interior.')

    if (make && model) {
        const validModels = VALID_MODELS[make]
        if (validModels && !validModels.includes(model)) {
            errors.push(`"${model}" is not a valid model for ${make}.`)
        }
    }

    if (wheels === 'Off-Road' && NO_OFFROAD_MODELS.includes(model)) {
        errors.push(`Off-Road wheels are not compatible with the ${model}.`)
    }

    if (interior === 'Carbon Fiber' && year < CARBON_FIBER_MIN_YEAR) {
        errors.push(`Carbon Fiber interior is only available on ${CARBON_FIBER_MIN_YEAR} or newer models.`)
    }

    return errors
}

export { validateCar, VALID_MODELS }
