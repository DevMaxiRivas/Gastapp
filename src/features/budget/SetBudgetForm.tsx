import { Button } from "@/components/ui/button";
import { useState } from "react";

export function SetBudgetForm() {
    const [isModifying, setIsModifying] = useState(false);

    return (
        <>
            {
                isModifying ? <div className="flex flex-col gap-4">
                    <form action="">

                        <Button onClick={() => setIsModifying(false)}>Cancel</Button>
                    </form>
                </div> : <div className="flex justify-between items-center " >
                    <div>
                        <p className="text-lg font-medium">Current limit</p>
                        <p className="text-2xl font-semibold">ARS 500.000</p>
                    </div>
                    <Button onClick={() => setIsModifying(true)}>Modify</Button>
                </div>
            }
        </>
    );
}