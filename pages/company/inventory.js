import React, { useEffect, useState } from 'react'
import TableShow from '../../components/TableComponents/TableShow'

export default function inventory() {
    const [inventory, setInventory] = useState()

    useEffect(() => {
        setInventory(['Code', 'Brand', 'Name', 'Category', 'Buy Price', 'Price Recomendation', 'Margin', 'Desc', 'Property', 'Supplier'])

        return () => {

        }
    }, [])


    return (
        <>
            <div className="my-3">
                <TableShow head={inventory} />
            </div>
        </>
    )
}
