import { useState, useEffect } from "react"
import TableShow from "../../components/TableComponents/TableShow"

export default function Order() {
    const [order, setOrder] = useState()

    useEffect(() => {
        setOrder(['Supplier', 'Amount', 'Date', 'Status'])

        return () => {

        }
    }, [])
    return (
        <>
            <div className="my-3">
                <TableShow head={order} />
            </div>
        </>
    )
}
