import { Button } from '@/components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTrigger, DialogTitle } from '@/components/ui/dialog'
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp'
import { ArrowUpRightSquare } from 'lucide-react'
import { useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import { toast } from 'sonner'

const ResetProducts = ({clearProducts}:{clearProducts:()=> void}) => {
    const [confirm, setConfirm] = useState(false);
    const [open, setOpen] = useState(false);
    const [error, setError] = useState<string | null >(null);
    const [pin, setPin] = useState("");
    const isMobile = useMediaQuery({maxWidth: 450 });

    const checkPin = () => {
        if (pin === "2007") {
            toast.success("Correct Pin");
            clearProducts()
            setOpen(false);
            setPin("");
            setConfirm(false);
            setError(null);
        } else {
            setError("Incorrrect Pin, Try again!")
            setPin("");
        }
    }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
            <Button variant="outline"> <ArrowUpRightSquare /> {!isMobile && "Reset Products"}</Button>
        </DialogTrigger>
        <DialogContent>
        <DialogHeader>
<DialogTitle className="headFont text-xl">Are You Sure You Want To Clear All Products?
</DialogTitle>
        <DialogDescription>Doing this deletes all your products</DialogDescription>
</DialogHeader>
        {!confirm ?
        <div>
            <Button onClick={()=> setConfirm(true)} className='w-full mt-4' variant='destructive'>Yes, Clear All Products</Button>
            <DialogClose asChild>
                <Button className='w-full mt-4' variant='outline'>Cancel</Button>
            </DialogClose>
        </div>
        :
        <div>
            <InputOTP className="space-y-2" maxLength={4} value={pin} onChange={(value)=> setPin(value)}>
    <InputOTPGroup>
        {[1,2,3,4,].map((_,index)=>(
            <InputOTPSlot index={index}/>        
        ))}
    </InputOTPGroup>    
</InputOTP>
            {error && <p className="text-sm text-red-400">{error}</p>}
            <Button onClick={checkPin} variant="default" className='w-full mt-4'>
                Submit Pin
            </Button>
        </div>
        }
        </DialogContent>
    </Dialog>
  )
}

export default ResetProducts
