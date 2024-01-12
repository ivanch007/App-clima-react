import { useState } from "react"

export const AppClima = () => {

    const urlBase = ('https://api.openweathermap.org/data/2.5/weather')
    const apiKey = 'b207f82113ce70e60b0e7d139e009733'
    const numKelvin = 273.15

    const [ciudad, setCiudad] = useState('')
    const [datosClima, setDatosClima] = useState(null)

    const cambioCiudad = (evento) => {
        setCiudad(evento.target.value)
    }

    const manejoSubmit = (evento) => {
        evento.preventDefault()
        if (ciudad.length > 0) fetchClima()
    }

    const fetchClima = async () => {
        try {
            const response = await fetch(`${urlBase}?q=${ciudad}&appid=${apiKey}`)
            const data = await response.json()
            setDatosClima(data)

        } catch (error) {
            console.error('Ha ocurrido un el siguiente error: ', error)
        }


    }

    return (
        <div className="container">
            <h1>App Clima</h1>
            <form onSubmit={manejoSubmit}>
                <input type="text"
                    placeholder="Escribe el nombre de la ciudad"
                    value={ciudad}
                    onChange={cambioCiudad} />
                <button type="submit">Buscar</button>
            </form>

            {
                datosClima && (
                    <div>
                        <h2>{datosClima.name}, {datosClima.sys.country}</h2>
                        <p>Temperatura: {parseInt(datosClima.main.temp - numKelvin)} °C </p>
                        <p>Sensación termica de : {parseInt(datosClima.main.feels_like - numKelvin)}</p>
                        <p>Condición metereologica: {datosClima.weather[0].description}</p>
                        <img src={`https://openweathermap.org/img/wn/${datosClima.weather[0].icon}@2x.png`}/>
                    </div>
                )
            }

        </div>
    )
}
