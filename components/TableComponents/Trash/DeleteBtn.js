import { ArrowPathIcon, TrashIcon } from "@heroicons/react/20/solid"
import { IconButton } from "@material-tailwind/react"
import axios from "axios"

export default function DeleteBtn({ url, id }) {

    const del = async () => {
        await axios.post(url, {
            data: id
        })
            .then(res => res.data)
            .catch(err => console.log(err))
    }

    return <IconButton
        color="red"
        size="sm"
        onClick={del}
    >
        <TrashIcon className="h-6" />
    </IconButton>
}