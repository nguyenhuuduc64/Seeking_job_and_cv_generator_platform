import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';

interface AlertProps {
    message: string;
    onSubmit?: () => void;
    buttonName: string;
    className?: string;
}

export function AlertDialogDemo({ message, buttonName, onSubmit, className }: AlertProps) {
    return (
        <div className={className}>
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button variant={'destructive'} className="cursor-pointer text-white">
                        {buttonName}
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>{message}</AlertDialogTitle>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}
