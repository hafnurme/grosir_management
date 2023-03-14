import { ArrowPathIcon } from "@heroicons/react/20/solid"
import { IconButton } from "@material-tailwind/react"
import axios from "axios"

export default function RestoreBtn({ url, refreshUrl }) {

    const restore = async () => {
        await axios.get(url)
            .then(res => alert(res.data))
            .catch(err => alert("restore Failed"))
    }

    return <IconButton
        onClick={restore}
    >
        <ArrowPathIcon className="h-6" />
    </IconButton>
}

export function BtnRestore({ url, id }) {

    const restore = async () => {
        await axios.post(url, {
            data: id
        })
            .then(res => alert(res.data))
            .catch(err => console.log(err))
    }

    return <>
        <IconButton
            size="sm"
            onClick={restore}
        >
            <ArrowPathIcon className="h-6" />
        </IconButton>
    </>
}
