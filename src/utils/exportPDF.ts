import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const exportPDF = async () => {
    const element = document.querySelector('.ck-content') as HTMLElement;
    if (!element) return;

    // --- GIẢI PHÁP ĐẶC TRỊ CHO LỖI OKLCH ---
    // Chúng ta tạm thời ghi đè phương thức Console.error để bắt lỗi parser
    // hoặc can thiệp trực tiếp vào dữ liệu đầu vào.

    try {
        const canvas = await html2canvas(element, {
            useCORS: true,
            scale: 2,
            backgroundColor: '#ffffff',
            onclone: (clonedDoc) => {
                const clonedElement = clonedDoc.querySelector('.ck-content') as HTMLElement;

                // Loại bỏ tận gốc các thuộc tính dùng oklch trong bản clone
                const allElements = clonedElement.querySelectorAll('*');
                allElements.forEach((el) => {
                    const htmlEl = el as HTMLElement;
                    const style = window.getComputedStyle(htmlEl);

                    // Nếu thuộc tính nào chứa oklch, ép nó về mã màu HEX
                    if (style.color.includes('oklch')) htmlEl.style.color = '#000000';
                    if (style.backgroundColor.includes('oklch'))
                        htmlEl.style.backgroundColor = '#ffffff';
                    if (style.borderColor.includes('oklch')) htmlEl.style.borderColor = '#000000';

                    // Xóa bỏ các biến CSS của Tailwind v4 (thủ phạm chính)
                    htmlEl.style.setProperty('--tw-bg-opacity', '1');
                });
            },
        });

        const data = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const imgProps = pdf.getImageProperties(data);
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        pdf.addImage(data, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save('cv-cua-ong-chu.pdf');
    } catch (error: any) {
        if (error.message?.includes('oklch')) {
            console.warn('Phát hiện lỗi oklch, đang chuyển hướng sang chế độ in trình duyệt...');
            alert(
                "Thưa ông chủ, thư viện PDF không hỗ trợ hệ màu mới. Tôi sẽ mở hộp thoại in, ông chủ hãy chọn 'Save as PDF' nhé!"
            );
            window.print();
        } else {
            console.error('Lỗi xuất PDF:', error);
        }
    }
    window.print();
};

export default exportPDF;
