import { Button, Dialog, DialogBody, DialogFooter, DialogHeader } from "@material-tailwind/react";
import { useEffect, useState } from "react";

const UpdatedWhsStockModal = ({ head, data, openUpdated }) => {

    const [open, setOpen] = useState(false)

    const handleOpen = () => setOpen(!open)

    useEffect(() => {
        setOpen(openUpdated)
    }, [openUpdated])


    return <div>
        <Dialog
            open={open}
            size={"xl"}
            handler={handleOpen}
            className="flex flex-col"
        >
            <DialogHeader>Expired Product</DialogHeader>
            <DialogBody className="flex-1 bg-blue-gray-50" divider>
                <table className="w-full text-sm text-left text-gray-700">
                    <thead className="text-xs text-c uppercase bg-gray-100">
                        <tr>
                            <th scope="col" className="px-6 py-3"></th>
                            {head &&
                                head.map((elem, i) => {
                                    return (
                                        <th key={i} scope="col" className="px-6 py-3">
                                            {elem}
                                        </th>
                                    );
                                })}
                        </tr>
                    </thead>
                    <tbody>
                        {data &&
                            data.map((object, indexp) => {
                                return (
                                    <tr className="bg-white border-b" key={indexp}>
                                        <td className="px-2 w-8 text-center">{indexp + 1}</td>
                                        {head &&
                                            head.map((elem, i) => {
                                                if (elem === "warehouse_id") {
                                                    return (
                                                        <td className="sm:py-1" key={Math.random() * 100 * i}>
                                                            <span className="inline-block whitespace-nowrap">
                                                                {object[elem]}
                                                            </span>
                                                        </td>
                                                    );
                                                }
                                                return (
                                                    <td
                                                        className="px-6 sm:py-1"
                                                        key={Math.random() * 100 * i}
                                                    >
                                                        {object[elem]}
                                                    </td>
                                                );
                                            })}
                                    </tr>
                                );
                            })}
                    </tbody>
                </table>
            </DialogBody>
            <DialogFooter>
                <Button
                    variant="text"
                    color="red"
                    onClick={() => handleOpen()}
                    className="mr-1"
                >
                    <span>Cancel</span>
                </Button>
                <Button
                    variant="gradient"
                    color="green"
                    onClick={(e) => submitAddProduct(e)}
                >
                    <span>Confirm</span>
                </Button>
            </DialogFooter>
        </Dialog>
    </div>

}

export default UpdatedWhsStockModal