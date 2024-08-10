import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Navbar.css'
import { Link } from 'react-router-dom';
import logo from './assets/ggenesis.png';

export default function Navbar (){

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [logoText, setLogoText] = useState('');

    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/sheet-data');
            setData(response.data);
            setLoading(false);
            console.log(response)
        } catch (error) {
            console.error('Error fetching data', error);
            setLoading(false);
        }
        };

        fetchData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    const handleLogoClick = () => {
        setLogoText('Esos ⚙️⚙️⚙️ nos representan a todos');
        setTimeout(() => {
            setLogoText('');
        }, 3000);
    };

    return(
        <nav>
        <img
            className="logo"
            src={logo}
            alt="GGeneSiS logo"
            onClick={handleLogoClick}
        />

            {logoText && <span className="logo-text">{logoText}</span>} {}
            <ul>
                <li><Link to="/">Estadísticas</Link></li>
                <li><Link to="/Videos">Momentos Legendarios</Link></li>
            </ul>
            <h3>Partidas Jugadas: {data[1][1]}</h3>
        </nav>
    );
}
