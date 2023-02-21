import axios from "axios"
import { getSession } from "next-auth/react"
import { useEffect, useState } from "react"
import UpdateModal from "@/components/Modal/UpdateUserModal";

export default function profile() {

    const [user, setUser] = useState()
    const [role, setRole] = useState()
    const [permision, setPermision] = useState()
    const [size, setSize] = useState()

    const fetchUser = async () => {
        const res = await axios.get("/api/user")
        const result = await res.data
        setUser(result)

        return result
    }

    const fetchRole = async () => {
        const res = await axios.get("/api/Role")
        const result = await res.data
        setRole(result)

        return result
    }

    const fetchPermision = async () => {
        const session = await getSession()
        setPermision(session.permission)
    }

    const handleUpdate = async () => {
        const res = await axios.get(`/api/user/${user.user_id}`)
    }

    useEffect(() => {
        fetchRole()
        fetchUser()
        fetchPermision()

        window.innerWidth >= 960 ? setSize("lg") : setSize("xxl")
        window.addEventListener('resize', () => window.innerWidth >= 960 ? setSize("lg") : setSize("xxl"))
    }, [])


    return (
        <>
            <div className="h-full bg-[url('/splash4.jpg')] bg-center bg-cover bg-fixed">
                <div className=" p-10  text-gray-600">
                    <div className="px-8 pt-10 bg-white">
                        <h1 className="text-2xl font-semibold">Profile</h1>
                        {user &&
                            <>
                                <table className="w-1/2 border-separate border-spacing-y-5 text-left">
                                    <tbody>
                                        <tr>
                                            <th className="w-28">Contact</th>
                                            <td>{user.contact}</td>
                                        </tr>
                                        <tr>
                                            <th className="w-28">Email</th>
                                            <td>{user.email}</td>
                                        </tr>
                                        <tr>
                                            <th className="w-28">Username</th>
                                            <td>{user.username}</td>
                                        </tr>
                                        <tr>
                                            <th className="w-28">Name</th>
                                            <td>{user.name}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </>
                        }
                    </div>
                    <div className="flex justify-between px-8 pb-10 bg-white items-end">
                        <div>
                            <h1 className="text-2xl font-semibold">Permission</h1>
                            {permision &&
                                permision.join(", ")
                            }
                        </div>
                        <div>

                            {user &&
                                <>
                                    <UpdateModal
                                        item={user}
                                        itemHead={[
                                            "email",
                                            "username",
                                            "name",
                                            "contact"
                                        ]}
                                        updateUrl="/api/user/"
                                        refreshData={fetchUser}
                                        itemIndex="user_id"
                                        size={size}
                                    />
                                </>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
