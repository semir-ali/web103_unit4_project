import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getCar, deleteCar } from '../services/CarsAPI'
import CarPreview from '../components/CarPreview'
import '../App.css'

const CarDetails = ({ title }) => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [car, setCar] = useState(null)

    useEffect(() => {
        document.title = title
        getCar(id).then(setCar)
    }, [id])

    const handleDelete = async () => {
        await deleteCar(id)
        navigate('/customcars')
    }

    if (!car) return <p style={{ color: 'white', padding: '2rem' }}>Loading...</p>

    return (
        <div className="page">
            <h2>{car.year} {car.make} {car.model}</h2>
            <div className="two-col">

                <div className="card">
                    <CarPreview color={car.color} wheels={car.wheels} interior={car.interior} />
                </div>

                <div className="card-sm">
                    <Detail label="Make"           value={car.make} />
                    <Detail label="Model"          value={car.model} />
                    <Detail label="Year"           value={car.year} />
                    <Detail label="Exterior Color" value={car.color} />
                    <Detail label="Wheels"         value={car.wheels} />
                    <Detail label="Interior"       value={car.interior} />
                    <div className="price-divider">
                        <Detail label="Total Price" value={`$${Number(car.price).toLocaleString()}`} bold />
                    </div>
                    <div className="btn-row">
                        <button className="btn btn-primary" onClick={() => navigate(`/edit/${car.id}`)}>Edit</button>
                        <button className="btn btn-danger"  onClick={handleDelete}>Delete</button>
                        <button className="btn btn-ghost"   onClick={() => navigate('/customcars')}>Back</button>
                    </div>
                </div>

            </div>
        </div>
    )
}

const Detail = ({ label, value, bold }) => (
    <div className="detail-row">
        <span className="detail-label">{label}</span>
        <span className={`detail-value${bold ? ' bold' : ''}`}>{value}</span>
    </div>
)

export default CarDetails
