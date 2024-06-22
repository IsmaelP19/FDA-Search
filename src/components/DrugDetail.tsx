import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { getDrug } from '../services/drugs';

type Drug = {
    application_number: string;
    openfda: {
        generic_name: string;
        manufacturer_name: string | null;
    };
}

const DrugDetail: React.FC = () => {
    const { state } = useLocation()
    const navigator = useNavigate()
    const [drug, setDrug] = useState<Drug | null>(null)
    const { id } = useParams<string>()

    useEffect(() => {
        async function fetchData() {
            if (id) {
                const drug = await getDrug(id)
                console.log(drug)
                if (drug) {
                    setDrug(drug)
                }
            }
        }
        fetchData();
    }, [id])


    return (
        <div>
            Drug Detail for {id}

            <p>{drug?.openfda.generic_name}</p>
        </div>
    )
}

export default DrugDetail