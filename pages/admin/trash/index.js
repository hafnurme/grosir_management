import RestoreBtn from "@/components/TableComponents/Trash/RestoreBtn";
import TrashPanel from "@/components/TableComponents/Trash/TrashPanel";
import { Input, Typography } from "@material-tailwind/react";

export default function index() {

    return (
        <>
            <div>
                <div className="flex justify-between items-center py-4 px-2">
                    <div className="mx-2">
                        <Typography variant="h4">Trash</Typography>
                    </div>
                </div>
                <div className="px-2 sm:px-0">
                    <TrashPanel />
                </div>
            </div>
        </>
    );
}
