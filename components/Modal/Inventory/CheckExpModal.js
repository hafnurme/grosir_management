import { PlusCircleIcon } from "@heroicons/react/20/solid";
import {
    Button,
    Dialog,
    DialogBody,
    DialogFooter,
    DialogHeader,
    IconButton,
    Input,
} from "@material-tailwind/react";
import axios from "axios";
import { Fragment, useEffect, useRef, useState } from "react";
import SelectProductModal from "./SelectProductModal";
import UpdatedWhsStockModal from "./UpdatedWhsStockModal";

const InventoryAddModal = ({ data, refreshData }) => {
    const [open, setOpen] = useState(false);
    const [openUpdated, setOpenUpdated] = useState(false);
    const [productSelected, setProductSelected] = useState();
    const [selectProductModalOpen, setSelectProductModalOpen] = useState(false);
    const [updatedWhsStock, setUpdatedWhsStock] = useState(null)

    const handleOpen = () => setOpen(!open);
    const refForm = useRef(null);

    const submitAddProduct = () => {
        refForm.current.requestSubmit();
    };

    const updateWhsStock = async () => {
        const res = await axios.put('/api/warehouse/stock').then(res => res.data)
        setUpdatedWhsStock(res)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(refForm.current);

        const dataTemp = {};

        formData.forEach((value, key) => {
            dataTemp[key] = value;
        });

        dataTemp["product_code"] = productSelected.product_code;

        await axios.put("/api/warehouse/batch", { data: dataTemp }).then((res) => {
            handleOpen();
            updateWhsStock()
            setOpenUpdated(true)
        });
    };

    return (
        <div>
            <IconButton
                className="w-20"
                onClick={handleOpen}
                color="orange"
                variant="filled"
            >
                <PlusCircleIcon className={"h-6"} />
            </IconButton>
            <Dialog
                open={open}
                size={"xl"}
                handler={handleOpen}
                className="flex flex-col"
            >
                <DialogHeader>Add Produk</DialogHeader>
                <DialogBody className="flex-1 bg-blue-gray-50" divider>
                    <form
                        ref={refForm}
                        onSubmit={(e) => {
                            handleSubmit(e);
                        }}
                    >
                        <div className="grid gap-2 grid-cols-1">
                            <Input
                                color="orange"
                                label="product_code"
                                type="text"
                                readOnly={true}
                                value={productSelected ? productSelected.name : ""}
                                onClick={() => {
                                    setSelectProductModalOpen(!selectProductModalOpen);
                                }}
                                name="product_code"
                            />
                            <Input color="orange" label="stock" type="number" name="stock" />
                            <Input
                                color="orange"
                                label="exp_date"
                                type="date"
                                name="location"
                            />
                        </div>
                    </form>
                    <div className="grid grid-cols-2 gap-4">
                        <SelectProductModal
                            open={selectProductModalOpen}
                            handleOpenMod={setSelectProductModalOpen}
                            setSelectedProduct={setProductSelected}
                            url="/api/warehouse"
                        />
                    </div>
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
            <UpdatedWhsStockModal head={['product_code', 'stock', 'status']} data={updatedWhsStock} openUpdated={openUpdated} />
        </div>
    );
};

export default InventoryAddModal;
