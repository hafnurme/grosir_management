import { useEffect, useState } from "react"
import TableShow from "../../components/TableComponents/TableShow"

export default function Branch() {
    const [branch, setBranch] = useState()

    useEffect(() => {
        setBranch(['Name', 'Leader', 'Address', 'Contact'])

        return () => {

        }
    }, [])
    return (
        <>
            <div className="my-3">
                <TableShow head={branch} />
            </div>
        </>
    )
}
