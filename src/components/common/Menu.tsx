import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export interface ItemType {
    name: string;
    onClick: () => void;
}
export default function Menu({
    defaultName,
    items,
    icon,
}: {
    defaultName?: string;
    items: ItemType[] | [];
    icon?: any;
}) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="border-0 cursor-pointer">
                    {defaultName}
                    <FontAwesomeIcon icon={icon} />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40" align="start">
                <DropdownMenuGroup>
                    {items?.map((item, index) => (
                        <DropdownMenuItem
                            key={index}
                            onClick={item.onClick}
                            className="cursor-pointer"
                        >
                            {item.name}
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
