import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getCar, updateCar } from '../services/CarsAPI'
import { calculateTotalPrice } from '../utilities/calcPrice'
import { validateCar, VALID_MODELS } from '../utilities/validation'
import CarPreview from '../components/CarPreview'
import '../App.css'

const MAKES     = ['Ford', 'Toyota', 'BMW', 'Tesla', 'Chevrolet', 'Honda']
const COLORS    = ['Red', 'Blue', 'Black', 'White', 'Silver', 'Yellow', 'Orange', 'Matte Black', 'Pearl White']
const WHEELS    = ['Standard', 'Sport', 'Off-Road', 'Luxury']
const INTERIORS = ['Cloth', 'Leather', 'Premium Leather', 'Carbon Fiber']
const YEARS     = Array.from({ length: 10 }, (_, i) => 2025 - i)

const EditCar = ({ title }) => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [form, setForm] = useState(null)
    const [errors, setErrors] = useState([])

    useEffect(() => {
        document.title = title
        getCar(id).then(car => setForm({
            make:     car.make,
            model:    car.model,
            year:     Number(car.year),
            color:    car.color,
            wheels:   car.wheels   || 'Standard',
            interior: car.interior || 'Cloth',
            price:    Number(car.price)
        }))
    }, [id])

    useEffect(() => {
        if (!form) return
        setForm(f => ({ ...f, price: calculateTotalPrice(f) }))
    }, [form?.make, form?.color, form?.wheels, form?.interior])

    const set = (field, value) => setForm(f => ({ ...f, [field]: value }))

    const handleMakeChange = (e) => {
        const make = e.target.value
        setForm(f => ({ ...f, make, model: VALID_MODELS[make]?.[0] || '' }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const errs = validateCar(form)
        if (errs.length > 0) { setErrors(errs); return }
        setErrors([])
        await updateCar(id, form)
        navigate(`/customcars/${id}`)
    }

    if (!form) return <p style={{ color: 'white', padding: '2rem' }}>Loading...</p>

    return (
        <div className="page">
            <h2>Edit Car</h2>
            <div className="two-col">

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <Field label="Make">
                        <select value={form.make} onChange={handleMakeChange} className="select-input">
                            {MAKES.map(m => <option key={m} value={m}>{m}</option>)}
                        </select>
                    </Field>

                    <Field label="Model">
                        <select value={form.model} onChange={e => set('model', e.target.value)} className="select-input">
                            {(VALID_MODELS[form.make] || []).map(m => <option key={m} value={m}>{m}</option>)}
                        </select>
                    </Field>

                    <Field label="Year">
                        <select value={form.year} onChange={e => set('year', Number(e.target.value))} className="select-input">
                            {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
                        </select>
                    </Field>

                    <Field label="Exterior Color">
                        <select value={form.color} onChange={e => set('color', e.target.value)} className="select-input">
                            {COLORS.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                    </Field>

                    <Field label="Wheels">
                        <select value={form.wheels} onChange={e => set('wheels', e.target.value)} className="select-input">
                            {WHEELS.map(w => <option key={w} value={w}>{w}</option>)}
                        </select>
                    </Field>

                    <Field label="Interior">
                        <select value={form.interior} onChange={e => set('interior', e.target.value)} className="select-input">
                            {INTERIORS.map(i => <option key={i} value={i}>{i}</option>)}
                        </select>
                    </Field>

                    {errors.length > 0 && (
                        <div className="error-box">
                            {errors.map((e, i) => <p key={i}>⚠ {e}</p>)}
                        </div>
                    )}

                    <div className="btn-row" style={{ marginTop: 0 }}>
                        <button type="submit"   className="btn btn-primary">Save Changes</button>
                        <button type="button"   className="btn btn-ghost" onClick={() => navigate(`/customcars/${id}`)}>Cancel</button>
                    </div>
                </form>

                <div className="sticky-col">
                    <div className="card-center">
                        <CarPreview color={form.color} wheels={form.wheels} interior={form.interior} />
                        <p style={{ marginTop: '1rem', opacity: 0.85 }}>{form.year} {form.make} {form.model}</p>
                        <p style={{ fontSize: '1.4rem', fontWeight: 'bold', margin: '0.25rem 0 0' }}>
                            ${Number(form.price).toLocaleString()}
                        </p>
                    </div>
                </div>

            </div>
        </div>
    )
}

const Field = ({ label, children }) => (
    <label style={{ display: 'block' }}>
        <span className="field-label">{label}</span>
        {children}
    </label>
)

export default EditCar
