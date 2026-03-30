import * as React from 'react';

import { Calendar } from '@/components/ui/calendar';

export default function CalendarCustom() {
    const [date, setDate] = React.useState<Date | undefined>(new Date());

    return (
        <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-lg border"
            captionLayout="label" // Đổi từ dropdown thành label thưa ông chủ
        />
    );
}
