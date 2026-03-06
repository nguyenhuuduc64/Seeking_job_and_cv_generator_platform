import { toPng } from 'html-to-image';
import instance from '../config/axios';
import { puter } from "@heyputer/puter.js";
import React, { useState, useRef } from 'react';
// @ts-ignore
import html2pdf from 'html2pdf.js';
export const getTechsFromRepo = async (repoUrl: string): Promise<string> => {
    const request = {
        message: repoUrl,
    };
    const response = await instance.post('/api/ai/analyze-tech', request);
    console.log(response.data);
    return response.data;
};

//hàm lấy link repo github
export const getGitHubLink = (input: string) => {
    const githubRegex = /https?:\/\/github\.com\/[a-zA-Z0-9-]+\/[a-zA-Z0-9._-]+/g;
    //https://github.com/abinth11/TutorTrek.git
    // Xử lý loại bỏ thẻ HTML nếu chuỗi truyền vào là một đoạn mã HTML
    const cleanText = input.replace(/<[^>]*>/g, ' ');

    const matches = cleanText.match(githubRegex);
    return matches ? matches[0] : '';
};

export const handlePasteGitHub = (text: string) => {
    // Lấy nội dung thô từ clipboard khi người dùng nhấn Ctrl+V
    console.log('goi ham handle paste');
    const pastedData = text || '';

    // Sử dụng hàm arrow function đã viết ở trên để lọc link
    const newLink = getGitHubLink(pastedData);

    if (newLink) {
        console.log('Link vừa dán:', newLink);
        // Gọi API cho duy nhất link này
        getTechsFromRepo(newLink);
    }
};

export const generateContent = async (content: string) => {
    console.log(content);
    const response = await instance.post('/ai/generate-content', {
        message: content,
        stream: true,
    });
    return response.data.result.responseMessage;
};


// export const generateContent = async (content: string, onChunk: (chunk: string) => void) => {
//     console.log("Đang gửi yêu cầu AI:", content);

//     // Tạo một biến để gom tất cả các mảnh lại
//     let fullText = "";

//     try {
//         await instance.post('/ai/generate-content',
//             { message: content, stream: true },
//             {
//                 onDownloadProgress: (progressEvent) => {
//                     const responseText = progressEvent.event.target.responseText;

//                     // Giả sử server trả về text thuần dồn vào nhau
//                     // Logic bóc tách mảnh mới nhất:
//                     const newChunk = responseText.slice(fullText.length);

//                     if (newChunk) {
//                         fullText += newChunk; // Tích lũy vào biến tổng
//                         if (onChunk) onChunk(newChunk); // Gửi mảnh lẻ ra ngoài để hiển thị lạch cạch
//                     }
//                 }
//             }
//         );

//         console.log("--- HOÀN THÀNH STREAM ---");

//         // TRẢ VỀ DỮ LIỆU Ở ĐÂY THƯA ÔNG CHỦ!
//         return fullText;

//     } catch (error) {
//         console.error("Lỗi Axios Stream:", error);
//         throw error;
//     }
// };


export const getmarkCv = async () => {
    try {
        // Lấy danh sách tất cả các mô hình AI từ Puter
        const models = await puter.ai.listModels("gemini");

        if (models && models.length > 0) {
            // Cách sửa lỗi TypeScript: Gộp nội dung vào 1 tham số duy nhất
            puter.print(`First model: ${JSON.stringify(models[0], null, 2)}`);

            // Hoặc in ra bảng cho đẹp thưa ông chủ (nếu Puter hỗ trợ console)
            console.table(models);
        }

        return models;
    } catch (error) {
        console.error("Không thể lấy danh sách model:", error);
        return [];
    }
}

export const handleAIReview = async (componentRef: React.RefObject<any>) => {
    if (!componentRef.current) return;

    try {
        console.log("📄 Đang khởi tạo quá trình đóng gói PDF...");

        const options = {
            margin: 0,
            filename: 'cv_temp.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2, useCORS: true },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };

        // Tạo Blob để lưu vào state hoặc gửi đi
        const pdfBlob = await html2pdf()
            .from(componentRef.current)
            .set(options)
            .output('blob');

        console.log("✅ Đã tạo PDF Blob thành công:", pdfBlob);

        // Trả về để ông chủ lưu vào State ở Component
        return pdfBlob;

    } catch (error) {
        console.error("Lỗi khi tạo PDF:", error);
    }
};