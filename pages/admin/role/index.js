import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Dialog, DialogHeader, DialogBody, Input, Checkbox, Typography, Alert, Chip } from "@material-tailwind/react";

const Produk = () => {
    const [permision, setPermision] = useState();
    const [role, setRole] = useState();
    const [openDialog, setOpenDialog] = useState(false)
    const [name, setName] = useState()
    const [permisionList, setPermisionList] = useState([])
    const [errName, setErrName] = useState()
    const [errPermision, setErrPermision] = useState()

    const fetchPermision = async () => {
        const res = await axios.get("/api/Permision").then(res => res.data);
        setPermision(res)
    };

    const fetchRole = async () => {
        const res = await axios.get('/api/Role').then(res => res.data)
        setRole(res)
    }

    const handleOpen = () => {
        setOpenDialog(!openDialog)
        setPermisionList([])
        setName(null)
        setErrName(null)
        setErrPermision(null)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const res = await axios.post("/api/Role", {
            data: { name, permision: permisionList.toString() }
        }).catch(err => {
            setErrName(err.response.data.name)
            setErrPermision(err.response.data.permision)
        })

    }

    const handleChange = (e) => {
        if (e.target.checked) {
            setPermisionList([...permisionList, e.target.value])
        } else {
            permisionList.filter((el) => el !== e.target.value).map(el => setPermisionList([el]))
        }

    }

    useEffect(() => {
        fetchPermision();
        fetchRole()
    }, []);

    return (
        <div>
            <Button
                onClick={handleOpen}
            >
                Tambah
            </Button>

            <div className="flex flex-col">
                <div className="overflow-x-auto">
                    <div className="py-2 inline-block min-w-1/2 ">
                        <div className="overflow-hidden">
                            <table className="min-w-full">
                                <thead className="border-b bg-white">
                                    <tr>
                                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-2">
                                            <Typography variant="h3" className="my-4">Daftar Role</Typography>

                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {role && (
                                        role.map((e, i) => {
                                            return <tr className="bg-white border-b" key={i}><td className="text-md text-gray-900 px-6 py-2 whitespace-nowrap">{e.name}</td> </tr>
                                        })
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <Dialog className="p-5" open={openDialog} handler={handleOpen} size="lg">
                <DialogHeader>Tambah Role</DialogHeader>
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
                    <div className="max-h-96 py-4 overflow-y-auto text-gray-800 mt-5">
                        {permision && (
                            Object.keys(permision).map((e, i) => {
                                return (
                                    <div key={i} className="mb-4">
                                        <h1 className="text-base font-bold ">{e}</h1>
                                        <div className="grid grid-cols-3 font-semibold text-sm">
                                            {permision[e].map((el, idx) => {
                                                return <Checkbox key={idx} id={el.name} value={el.permision_id} label={el.name} ripple={true} onChange={handleChange} />
                                            })}
                                        </div>
                                    </div>
                                )
                            })
                        )}
                    </div>
                </DialogBody>
            </Dialog>
        </div >
    );
};

export default Produk;
