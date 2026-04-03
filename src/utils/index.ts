export const getRemainingDays = (expirationDate: string): string => {
    if (!expirationDate) return 'Đang cập nhật';

    const now = new Date();
    const exp = new Date(expirationDate);

    now.setHours(0, 0, 0, 0);
    exp.setHours(0, 0, 0, 0);

    const diffTime = exp.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays > 0) return `Còn ${diffDays} ngày`;
    if (diffDays === 0) return 'Hết hạn hôm nay';
    return 'Đã hết hạn';
};
