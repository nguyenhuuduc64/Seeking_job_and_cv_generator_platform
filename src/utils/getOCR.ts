import instance from "@/config/axios";

function extractPublicId(url: string): string {
    const fileName = url.split("/").pop() || "";
    return fileName.split(".")[0];
}

export async function getOCR(url: string): Promise<string> {

    const publicId = extractPublicId(url);

    console.log("****bat dau gui OCR****");

    const res = await instance.post("/ocr?publicId=" + publicId);

    const data = res.data.data;

    console.log("OCR response:", data);

    return data;
}