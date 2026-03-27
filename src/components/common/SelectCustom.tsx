import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

interface SelectItemBase {
    id: string | number;
    name: string;
}

interface SelectCustomProps<T extends SelectItemBase> {
    classNames?: string;
    placeholder?: string;
    onValueChange?: (value: string) => void;
    items: T[];
    label?: string;
}

export function SelectCustom<T extends SelectItemBase>({
    classNames,
    placeholder,
    onValueChange,
    items,
    label
}: SelectCustomProps<T>) {
    return (
        <div className={classNames}>
            <Select onValueChange={onValueChange}>
                <SelectTrigger className="w-full">
                    <SelectValue placeholder={placeholder || "Chọn một mục..."} />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        {items.map((item) => (
                            <SelectItem key={item.id} value={item.id.toString()}>
                                {item.name}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    )
}