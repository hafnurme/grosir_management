import {
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
} from "@material-tailwind/react";
import axios from "axios";
import { useEffect, useState } from "react";
import TrashTable from "../TrashTable";
import RestoreBtn from "./RestoreBtn";

export default function TrashPanel() {

    const [user, setUser] = useState()
    const [role, setRole] = useState()
    const [branch, setBranch] = useState()
    const [product, setProduct] = useState()
    const [supplier, setSupplier] = useState()
    const [category, setCategory] = useState()
    const [warehouse, setWarehouse] = useState()
    const [user404, setUser404] = useState()
    const [role404, setRole404] = useState()
    const [branch404, setBranch404] = useState()
    const [product404, setProduct404] = useState()
    const [supplier404, setSupplier404] = useState()
    const [category404, setCategory404] = useState()
    const [warehouse404, setWarehouse404] = useState()


    const fetchUser = async () => {
        await axios.get('/api/user/trash')
            .then(res => setUser(res.data))
            .catch(err => setUser404(err.response.data.message))
    }

    const fetchRole = async () => {
        await axios.get('/api/Role/trash')
            .then(res => setRole(res.data))
            .catch(err => setRole404(err.response.data.message))
    }

    const fetchBranch = async () => {
        await axios.get('/api/branch/trash')
            .then(res => setBranch(res.data))
            .catch(err => setBranch404(err.response.data.message))
    }

    const fetchProduct = async () => {
        await axios.get('/api/product/trash')
            .then(res => setProduct(res.data))
            .catch(err => setProduct404(err.response.data.message))
    }

    const fetchSupplier = async () => {
        await axios.get('/api/supplier/trash')
            .then(res => setSupplier(res.data))
            .catch(err => setSupplier404(err.response.data.message))
    }

    const fetchCategory = async () => {
        await axios.get('/api/category/trash')
            .then(res => setCategory(res.data))
            .catch(err => setCategory404(err.response.data.message))
    }

    const fetchWarehouse = async () => {
        await axios.get('/api/warehouse/trash')
            .then(res => setWarehouse(res.data))
            .catch(err => setWarehouse404(err.response.data.message))
    }

    const tab = [
        {
            label: "User",
            value: "user",
            data: user ? <TrashTable data={user} head={['username', 'name']} refreshData={fetchUser} restoreURL={"/api/user/trash/restore"} deleteURL={'/api/user/trash'} id={'user_id'} /> : user404,
            url: "/api/user/trash/restore",
        },
        {
            label: "Role",
            value: "role",
            data: role ? <TrashTable data={role} head={['name']} refreshData={fetchRole} restoreURL={"/api/Role/trash/restore"} deleteURL={'/api/Role/trash'} id={'role_id'} /> : role404,
            url: "/api/Role/trash/restore",
        },
        {
            label: "Branch",
            value: "branch",
            data: branch ? <TrashTable head={["branch_name", "leader_name", "contact", "address"]} data={branch} refreshData={fetchBranch} restoreURL={"/api/branch/trash/restore"} deleteURL={'/api/branch/trash'} id={'branch_id'} /> : branch404,
            url: "/api/branch/trash/restore",
        },
        {
            label: "Product",
            value: "product",
            data: product ? <TrashTable head={["product_code", "name", "brand", "category_id"]} data={product} refreshData={fetchProduct} restoreURL={"/api/product/trash/restore"} deleteURL={'/api/product/trash'} id={'id'} /> : product404,
            url: "/api/product/trash/restore",
        },
        {
            label: "Supplier",
            value: "supplier",
            data: supplier ? <TrashTable head={["supplier_name", "contact", "address"]} data={supplier} refreshData={fetchSupplier} restoreURL={"/api/supplier/trash/restore"} deleteURL={'/api/supplier/trash'} id={'supplier_id'} /> : supplier404,
            url: "/api/supplier/trash/restore",
        },
        {
            label: "Category",
            value: "category",
            data: category ? <TrashTable head={["category_name", "category_type"]} data={category} refreshData={fetchCategory} restoreURL={"/api/category/trash/restore"} deleteURL={'/api/category/trash'} id={'category_id'} /> : category404,
            url: "/api/category/trash/restore",
        },
        {
            label: "Warehouse",
            value: "warehouse",
            data: warehouse ? <TrashTable head={["name", "adress", "contact"]} data={warehouse} refreshData={fetchWarehouse} restoreURL={"/api/warehouse/trash/restore"} deleteURL={'/api/warehouse/trash'} id={'id'} /> : warehouse404,
            url: "/api/warehouse/trash/restore",
        },
    ];

    useEffect(() => {
        fetchUser()
        fetchRole()
        fetchBranch()
        fetchProduct()
        fetchSupplier()
        fetchCategory()
        fetchWarehouse()
    }, [])


    return (
        <Tabs value="user">
            <TabsHeader>
                {tab.map(({ label, value }) => (
                    <Tab key={value} value={value}>
                        {label}
                    </Tab>
                ))}
            </TabsHeader>
            <TabsBody>
                {tab.map(({ label, value, data, url }) => (
                    <TabPanel key={value} value={value}>
                        {data}
                        {typeof data == 'string' ? "" : <RestoreBtn url={url} />}
                    </TabPanel>
                ))}
            </TabsBody>
        </Tabs>
    );
}
