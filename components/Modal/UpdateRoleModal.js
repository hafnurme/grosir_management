import { PencilSquareIcon } from "@heroicons/react/20/solid";
import {
    Button,
    Checkbox,
    Dialog,
    DialogBody,
    DialogFooter,
    DialogHeader,
    Input,
} from "@material-tailwind/react";
import axios from "axios";
import { Fragment, useEffect, useRef, useState } from "react";

export default function UpdateModal({
    item,
    itemHead,
    updateUrl,
    refreshData,
    itemIndex,
    size,
    data
}) {
    const [open, setOpen] = useState(false);
    const [itemUpdate, setItemUpdate] = useState();
    const [permisionList, setPermisionList] = useState([])
    const [errPermision, setErrPermision] = useState()
    const [name, setName] = useState()
    const [errName, setErrName] = useState()


    useEffect(() => {
        setItemUpdate(item);
        fetchRoleId(item.role_id)
    }, []);

    const fetchRoleId = async (id) => {
        const res = await axios.get('/api/Permision/' + id).then(res => res.data)
        Object.keys(res.permision).forEach(e => {
            res.permision[e].forEach(el => {
                setPermisionList(prev => [...prev, el.permision_id])
            })
        })

        setPermisionList(prev => prev.filter(function (item, pos, self) {
            return self.indexOf(item) == pos;
        }))
    }

    const handleOpen = () => setOpen(!open)

    const handleSubmit = async (e) => {
        e.preventDefault()
        const res = await axios.put(`/api/Role/${item.role_id}`, {
            data: { name, permision: permisionList.toString() }
        })
            .then(e => {
                refreshData()
                setOpen(false)
            })
            .catch(err => {
                // setErrPermision(err.response.data.permision)
                console.log(err)
            })
    }

    const handleChange = (element) => {
        if (element.target.checked) {
            setPermisionList([...permisionList, element.target.value])
        } else {
            setPermisionList(permisionList.filter((e) => e !== element.target.value))
        }
    }


    return (
        <Fragment>
            <Button variant="text" className="p-1 shadow-md" onClick={handleOpen}>
                <PencilSquareIcon className="h-6 text-c" />
            </Button>
            <Dialog className="p-5" open={open} handler={handleOpen} size="lg">
                <DialogHeader>Edit Role</DialogHeader>
                <DialogBody>
                    <div className="w-full flex justify-start gap-x-5 mb-5">
                        <div className="w-72">
                            <Input label="Username" onChange={(e) => setName(e.target.value)} required />
                        </div>
                        <Button type="submit" variant="gradient" color="blue" onClick={handleSubmit}>
                            <span>Submit</span>
                        </Button>
                    </div>
                    <div className=" flex gap-x-4">
                        {errName && (
                            <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                                {errName.toString()}
                            </div>
                        )}
                        {errPermision && (
                            <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                                {errPermision.toString()}
                            </div>
                        )}
                    </div>
                    <div className="max-h-96 py-4 overflow-y-auto text-gray-800 mb-5">
                        {data && (
                            Object.keys(data).map((e, i) => {
                                return (
                                    <div key={i} className="mb-4">
                                        <h1 className="text-base font-bold ">{e}</h1>
                                        <div className="grid grid-cols-3 font-semibold text-sm">
                                            {data[e].map((el, idx) => {
                                                if (permisionList.includes(el.permision_id)) {
                                                    return <Checkbox defaultChecked={true} key={idx} id={el.name} value={el.permision_id} label={el.label} ripple={true} onChange={handleChange} />
                                                } else {
                                                    return <Checkbox defaultChecked={false} key={idx} id={el.name} value={el.permision_id} label={el.label} ripple={true} onChange={handleChange} />
                                                }
                                            })}
                                        </div>
                                    </div>
                                )
                            })
                        )}
                    </div>
                </DialogBody>
            </Dialog>
        </Fragment>
    );
}
