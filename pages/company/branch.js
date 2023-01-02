import { useEffect, useState } from "react"
import TableShow from "../../components/TableComponents/TableShow"
import { PlusCircleIcon } from "@heroicons/react/20/solid";
import { Button, Card, Input, Option, Select, Textarea } from "@material-tailwind/react"


export default function Branch() {
    const [branch, setBranch] = useState()

    useEffect(() => {
        setBranch(['Name', 'Leader', 'Address', 'Contact'])

        return () => {

        }
    }, [])
    return (
        <>
            <div className="flex mb-5">
                <Card className="flex-1 h-min bg-white p-5">
                    <div className="">
                        <div className=" flex gap-3 mb-3">
                            <Input color="deep-orange" label="Name" tabIndex="1" />
                            <Input color="deep-orange" label="Leader" tabIndex="5" />
                            <Input color="deep-orange" label="Address" tabIndex="7" />
                            <Input color="deep-orange" label="Contact" tabIndex="2" />
                        </div>

                        <div className="flex justify-end">
                            <Button
                                className="flex w-40 items-center justify-center"
                                color="deep-orange"
                            >
                                <div className="text-md">Add</div>
                                <div className="h-5 w-5 inline-block ml-2">
                                    <PlusCircleIcon />
                                </div>
                            </Button>
                        </div>
                    </div>
                </Card>
            </div>
            <div className="my-3">
                <TableShow head={branch} />
            </div>
        </>
    )
}
