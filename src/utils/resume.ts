import instance from "../config/axios";

export const getTechsFromRepo = async (repoUrl: string): Promise<string> => {
    const request = {
        message: repoUrl
    }
    const response = await instance.post("/api/ai/analyze-tech", request)   
    console.log(response.data);
    return response.data;
};

//hàm lấy link repo github 
export const getGitHubLink = (input: string) => {
    const githubRegex = /https?:\/\/github\.com\/[a-zA-Z0-9-]+\/[a-zA-Z0-9._-]+(?:\.git)?/g;
    //https://github.com/abinth11/TutorTrek.git
    // Xử lý loại bỏ thẻ HTML nếu chuỗi truyền vào là một đoạn mã HTML
    const cleanText = input.replace(/<[^>]*>/g, ' ');
    
    const matches = cleanText.match(githubRegex);
    return matches ? matches[0] : "";
};

export const handlePasteGitHub = (text: string) => {
    // Lấy nội dung thô từ clipboard khi người dùng nhấn Ctrl+V
    console.log("goi ham handle paste")
    const pastedData = text || "";
    
    // Sử dụng hàm arrow function đã viết ở trên để lọc link
    const newLink = getGitHubLink(pastedData);

    if (newLink) {
        console.log("Link vừa dán:", newLink);
        // Gọi API cho duy nhất link này
        getTechsFromRepo(newLink);
    }
};