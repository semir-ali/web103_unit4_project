import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAllCars, deleteCar } from '../services/CarsAPI'
import '../App.css'

const ViewCars = ({ title }) => {
    const [cars, setCars] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        document.title = title
        fetchCars()
    }, [])

    const fetchCars = async () => {
        const data = await getAllCars()
        setCars(Array.isArray(data) ? data : [])
    }

    const handleDelete = async (id) => {
        await deleteCar(id)
        setCars(cars.filter(car => car.id !== id))
    }

    return (
        <div className="page">
            <h2>Custom Cars</h2>
            {cars.length === 0 ? (
                <p>No cars yet. <a href='/'>Create one!</a></p>
            ) : (
                <div className="cars-grid">
                    {cars.map(car => (
                        <div key={car.id} className="car-card">
                            <h3>{car.year} {car.make} {car.model}</h3>
                            <p>Color: {car.color}</p>
                            <p>Wheels: {car.wheels}</p>
                            <p>Interior: {car.interior}</p>
                            <p className="car-price">${Number(car.price).toLocaleString()}</p>
                            <div className="card-actions">
                                <button className="card-btn btn-view"    onClick={() => navigate(`/customcars/${car.id}`)}>View</button>
                                <button className="card-btn btn-primary" onClick={() => navigate(`/edit/${car.id}`)}>Edit</button>
                                <button className="card-btn btn-danger"  onClick={() => handleDelete(car.id)}>Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default ViewCars
