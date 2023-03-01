import { Fragment, useEffect, useState } from "react";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";
import { InformationCircleIcon } from "@heroicons/react/20/solid";
import axios from "axios";

export default function DetailRoleModal({ item, size }) {
    const [open, setOpen] = useState(false);
    const [permisionList, setPermisionList] = useState([])
    const [items, setItems] = useState(item)

    const handleOpen = () => {
        setOpen(!open)
        items.permision = permisionList
    };

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

    useEffect(() => {
        fetchRoleId(item.role_id)
    }, []);

    return (
        <Fragment>
            <Button variant="gradient" className="p-1" onClick={handleOpen}>
                <InformationCircleIcon className="h-6" />
            </Button>
            <Dialog
                open={open}
                handler={handleOpen}
                size={size || "xxl"}
                className="flex flex-col"
            >
                <DialogHeader>Detail</DialogHeader>
                <DialogBody className="text-gray-800 bg-blue-gray-50 flex-1" divider>
                    <div className="grid grid-cols-3">
                        {permisionList &&
                            Object.keys(item).map((key, index) => {
                                if (key !== "created_at" && key !== "updated_at") {
                                    return (
                                        <div
                                            className=" border-b border-blue-gray-100 py-2"
                                            key={index}
                                        >
                                            <label className="uppercase block font-semibold">
                                                {key} :
                                            </label>
                                            <p className="block text-gray-900">{item[key]}</p>
                                        </div>
                                    );
                                }
                            })}
                    </div>
                </DialogBody>
                <DialogFooter>
                    <Button variant="gradient" onClick={handleOpen}>
                        <span>Close</span>
                    </Button>
                </DialogFooter>
            </Dialog>
        </Fragment>
    );
}
