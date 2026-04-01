import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createCar } from '../services/CarsAPI'
import { BASE_PRICES, COLOR_PRICES, WHEEL_PRICES, INTERIOR_PRICES, calculateTotalPrice } from '../utilities/calcPrice'
import { validateCar, VALID_MODELS } from '../utilities/validation'
import CarPreview from '../components/CarPreview'
import '../App.css'

const MAKES = ['Ford', 'Toyota', 'BMW', 'Tesla', 'Chevrolet', 'Honda']

const COLOR_OPTIONS = [
    { name: 'Red',         hex: '#e53e3e' },
    { name: 'Blue',        hex: '#3182ce' },
    { name: 'Black',       hex: '#1a1a1a' },
    { name: 'White',       hex: '#f0f0f0' },
    { name: 'Silver',      hex: '#a0aec0' },
    { name: 'Yellow',      hex: '#ecc94b' },
    { name: 'Orange',      hex: '#ed8936' },
    { name: 'Matte Black', hex: '#2d3748' },
    { name: 'Pearl White', hex: '#e8eef4' },
]

const WHEELS    = ['Standard', 'Sport', 'Off-Road', 'Luxury']
const INTERIORS = ['Cloth', 'Leather', 'Premium Leather', 'Carbon Fiber']
const YEARS     = Array.from({ length: 10 }, (_, i) => 2025 - i)

const DEFAULT = { make: 'Ford', model: 'Mustang', year: 2025, color: 'Red', wheels: 'Standard', interior: 'Cloth' }

const CreateCar = ({ title }) => {
    const navigate = useNavigate()
    const [form, setForm] = useState({ ...DEFAULT, price: calculateTotalPrice(DEFAULT) })
    const [errors, setErrors] = useState([])

    useEffect(() => { document.title = title }, [])

    useEffect(() => {
        setForm(f => ({ ...f, price: calculateTotalPrice(f) }))
    }, [form.make, form.color, form.wheels, form.interior])

    const set = (field, value) => setForm(f => ({ ...f, [field]: value }))

    const handleMakeChange = (make) => {
        const model = VALID_MODELS[make]?.[0] || ''
        setForm(f => ({ ...f, make, model }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const errs = validateCar(form)
        if (errs.length > 0) { setErrors(errs); return }
        setErrors([])
        await createCar(form)
        navigate('/customcars')
    }

    const base        = BASE_PRICES[form.make]         ?? 25000
    const colorAdj    = COLOR_PRICES[form.color]       ?? 0
    const wheelAdj    = WHEEL_PRICES[form.wheels]      ?? 0
    const interiorAdj = INTERIOR_PRICES[form.interior] ?? 0

    return (
        <div className="page-wide">
            <h2>Customize Your Ride</h2>
            <div className="two-col">

                {/* ── Left: option selectors ── */}
                <form onSubmit={handleSubmit}>

                    <Section label="Make">
                        <Chips items={MAKES} selected={form.make} onSelect={handleMakeChange} />
                    </Section>

                    <Section label="Model">
                        <Chips items={VALID_MODELS[form.make] || []} selected={form.model} onSelect={v => set('model', v)} />
                    </Section>

                    <Section label="Year">
                        <Chips items={YEARS.map(String)} selected={String(form.year)} onSelect={v => set('year', Number(v))} />
                    </Section>

                    <Section label="Exterior Color">
                        <div className="chips">
                            {COLOR_OPTIONS.map(c => (
                                <button key={c.name} type="button" onClick={() => set('color', c.name)}
                                    className={`chip${form.color === c.name ? ' active' : ''}`}>
                                    <span className="color-dot" style={{ background: c.hex }} />
                                    {c.name}
                                </button>
                            ))}
                        </div>
                    </Section>

                    <Section label="Wheels">
                        <Chips items={WHEELS} selected={form.wheels} onSelect={v => set('wheels', v)} />
                    </Section>

                    <Section label="Interior">
                        <Chips items={INTERIORS} selected={form.interior} onSelect={v => set('interior', v)} />
                    </Section>

                    {errors.length > 0 && (
                        <div className="error-box">
                            {errors.map((e, i) => <p key={i}>⚠ {e}</p>)}
                        </div>
                    )}

                    <button type="submit" className="btn-full">Save Car</button>
                </form>

                {/* ── Right: live preview + price ── */}
                <div className="sticky-col">
                    <div className="card">
                        <CarPreview color={form.color} wheels={form.wheels} interior={form.interior} />
                        <h3 style={{ margin: '1rem 0 0.75rem' }}>{form.year} {form.make} {form.model}</h3>
                        <PriceLine label="Base price" value={`$${base.toLocaleString()}`} />
                        {colorAdj    > 0 && <PriceLine label="Color"    value={`+$${colorAdj.toLocaleString()}`} />}
                        {wheelAdj    > 0 && <PriceLine label="Wheels"   value={`+$${wheelAdj.toLocaleString()}`} />}
                        {interiorAdj > 0 && <PriceLine label="Interior" value={`+$${interiorAdj.toLocaleString()}`} />}
                        <div className="price-total">
                            <span>Total</span>
                            <span>${Number(form.price).toLocaleString()}</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

const Section = ({ label, children }) => (
    <div className="section">
        <p className="section-label">{label}</p>
        {children}
    </div>
)

const Chips = ({ items, selected, onSelect }) => (
    <div className="chips">
        {items.map(item => (
            <button key={item} type="button" onClick={() => onSelect(item)}
                className={`chip${selected === item ? ' active' : ''}`}>
                {item}
            </button>
        ))}
    </div>
)

const PriceLine = ({ label, value }) => (
    <div className="price-line">
        <span>{label}</span><span>{value}</span>
    </div>
)

export default CreateCar
