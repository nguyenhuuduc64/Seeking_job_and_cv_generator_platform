export default function About() {
    return (
        <div className="w-full min-h-screen bg-white text-black font-sans antialiased">
            {/* PHẦN 1: TUYÊN NGÔN CỦA FOUNDER (HERO CONTENT) */}
            <section className="w-full py-20 px-6 md:px-12 bg-gray-50 border-b border-black">
                <div className="w-full max-w-none">
                    <h1 className="text-5xl md:text-7xl font-black uppercase leading-none mb-8 tracking-tighter">
                        Định Nghĩa Lại <br />Giá Trị Kết Nối.
                    </h1>
                    <div className="max-w-3xl border-l-8 border-black pl-6">
                        <p className="text-xl md:text-2xl font-medium leading-relaxed">
                            Tôi xây dựng nền tảng này không chỉ để đăng tin tuyển dụng.
                            Mục tiêu của tôi là tạo ra một hệ sinh thái dữ liệu minh bạch,
                            nơi năng lực thực tế của ứng viên được tôn trọng và nhu cầu
                            của doanh nghiệp được đáp ứng chính xác nhất.
                        </p>
                    </div>
                </div>
            </section>

            {/* PHẦN 2: TẠI SAO CHÚNG TÔI TỒN TẠI? (THE WHY) */}
            <section className="w-full py-16 px-6 md:px-12 border-b border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div>
                        <h2 className="text-3xl font-bold uppercase mb-6">Sứ mệnh & Tầm nhìn</h2>
                        <div className="space-y-6 text-lg text-gray-700">
                            <p>
                                Thị trường việc làm hiện nay đang bị bủa vây bởi sự thiếu minh bạch và quy trình rườm rà.
                                Ứng viên mất hàng tuần để chờ đợi phản hồi, trong khi nhà tuyển dụng chìm nghỉm giữa hàng ngàn CV không phù hợp.
                            </p>
                            <p>
                                <strong>Sứ mệnh của chúng tôi:</strong> Số hóa hoàn toàn quy trình khớp lệnh nhân sự.
                                Chúng tôi tin rằng "Việc tìm người phải đúng, người tìm việc phải nhanh".
                                Không có vị trí nào là tầm thường, chỉ có vị trí chưa tìm đúng người tài.
                            </p>
                        </div>
                    </div>
                    <div className="bg-black text-white p-10 flex flex-col justify-center">
                        <h3 className="text-2xl font-bold mb-4 uppercase">Cam kết từ Founder</h3>
                        <p className="italic text-gray-300">
                            "Mọi thuật toán gợi ý việc làm trên trang web này đều được thiết kế dựa trên
                            sự công bằng. Chúng tôi ưu tiên kỹ năng thực tế hơn là những dòng tiêu đề bóng bẩy trên bằng cấp."
                        </p>
                    </div>
                </div>
            </section>

            {/* PHẦN 3: GIẢI PHÁP CỐT LÕI (DETAILED CONTENT) */}
            <section className="w-full py-16 px-6 md:px-12 bg-white">
                <h2 className="text-3xl font-bold uppercase mb-12 border-b-4 border-black inline-block">Vấn đề chúng tôi giải quyết</h2>

                <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-0 border-t border-l border-black">
                    {/* Mục 1 */}
                    <div className="border-r border-b border-black p-10">
                        <h4 className="text-xl font-bold mb-4 uppercase">01. Minh bạch hóa thu nhập</h4>
                        <p className="text-gray-600 leading-relaxed">
                            Chúng tôi khuyến khích và hướng tới việc công khai dải lương thực tế.
                            Ứng viên có quyền biết giá trị công việc trước khi dành thời gian ứng tuyển,
                            giúp tiết kiệm nguồn lực cho cả hai bên.
                        </p>
                    </div>
                    {/* Mục 2 */}
                    <div className="border-r border-b border-black p-10">
                        <h4 className="text-xl font-bold mb-4 uppercase">02. Tương tác hai chiều tức thì</h4>
                        <p className="text-gray-600 leading-relaxed">
                            Hệ thống thông báo thông minh đảm bảo nhà tuyển dụng phản hồi hồ sơ trong vòng 48h.
                            Chúng tôi loại bỏ khái niệm "CV rơi vào im lặng".
                        </p>
                    </div>
                    {/* Mục 3 */}
                    <div className="border-r border-b border-black p-10">
                        <h4 className="text-xl font-bold mb-4 uppercase">03. Kiểm duyệt tin tuyển dụng</h4>
                        <p className="text-gray-600 leading-relaxed">
                            Đội ngũ quản trị trực tiếp rà soát từng doanh nghiệp tham gia hệ thống.
                            Cam kết nói không với tin tuyển dụng rác, lừa đảo hoặc đa cấp biến tướng.
                        </p>
                    </div>
                    {/* Mục 4 */}
                    <div className="border-r border-b border-black p-10">
                        <h4 className="text-xl font-bold mb-4 uppercase">04. Hệ sinh thái dữ liệu nhân sự</h4>
                        <p className="text-gray-600 leading-relaxed">
                            Không chỉ là trang tìm việc, chúng tôi cung cấp các công cụ phân tích xu hướng
                            thị trường lao động, giúp ứng viên biết mình cần bổ sung kỹ năng gì để có mức lương cao hơn.
                        </p>
                    </div>
                </div>
            </section>

            {/* PHẦN 4: GIÁ TRỊ VĂN HÓA (CORE VALUES) */}
            <section className="w-full py-16 px-6 md:px-12 bg-gray-100 border-t border-black">
                <div className="max-w-4xl">
                    <h2 className="text-3xl font-bold uppercase mb-8">Giá trị cốt lõi</h2>
                    <ul className="space-y-10">
                        <li className="flex items-start">
                            <span className="text-4xl font-black mr-6">/01</span>
                            <div>
                                <h5 className="text-xl font-bold uppercase">Công bằng (Equity)</h5>
                                <p className="text-gray-600">Cơ hội tiếp cận việc làm chất lượng là như nhau đối với mọi người dùng, không phân biệt vùng miền hay xuất thân.</p>
                            </div>
                        </li>
                        <li className="flex items-start">
                            <span className="text-4xl font-black mr-6">/02</span>
                            <div>
                                <h5 className="text-xl font-bold uppercase">Sáng tạo (Innovation)</h5>
                                <p className="text-gray-600">Liên tục cập nhật công nghệ để tối ưu hóa việc phân tích hồ sơ và gợi ý việc làm thông minh.</p>
                            </div>
                        </li>
                        <li className="flex items-start">
                            <span className="text-4xl font-black mr-6">/03</span>
                            <div>
                                <h5 className="text-xl font-bold uppercase">Bền vững (Stability)</h5>
                                <p className="text-gray-600">Xây dựng mối quan hệ lâu dài với đối tác và hỗ trợ ứng viên ngay cả khi họ đã có việc làm.</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </section>

            {/* PHẦN 5: FOOTER (MINIMAL) */}
            <footer className="w-full py-10 px-6 md:px-12 border-t border-black bg-white flex flex-col md:flex-row justify-between items-center text-xs font-bold uppercase tracking-widest">
                <p>© 2026 VIEC-S SYSTEM — BỞI FOUNDER: ÔNG CHỦ</p>
                <div className="mt-4 md:mt-0 space-x-8">
                    <a href="#" className="hover:underline">Privacy Policy</a>
                    <a href="#" className="hover:underline">Terms of Use</a>
                    <a href="#" className="hover:underline">Contact</a>
                </div>
            </footer>
        </div>
    );
}