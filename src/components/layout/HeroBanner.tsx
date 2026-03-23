import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faFire, faMagicWandSparkles } from '@fortawesome/free-solid-svg-icons';
import signContractImg from '../../assets/ky_hop_dong.jpg';
import Button from '../common/Button';
import Search from '../common/Search';
import { useNavigate } from 'react-router-dom';
import { SalaryChart } from '../common/SalaryChart';
const HeroBanner = () => {
    const navigate = useNavigate();
    const handleSearchJob = (value: string) => console.log('Tìm việc:', value);
    const handleSearchLocation = (value: string) => console.log('Địa điểm:', value);
    const hotTechs = ['ReactJS', 'Node.js', 'Spring Boot', 'Python', 'DevOps', 'AWS'];

    return (
        <div className="relative w-full h-[550px] bg-[#0f172a] overflow-hidden font-sans">

            {/* =========================================================================
                PHẦN THAY THẾ ẢNH NỀN (BACKGROUND REPLACEMENT) - KHÔNG DÙNG ẢNH TRUYỀN THỐNG
            ============================================================================ */}
            <div className="absolute inset-0 z-0">
                {/* Lớp màu nền chính với Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#1e293b] via-[#0f172a] to-[#1e293b]"></div>

                {/* Luồng sáng xanh (Blue Glow) tạo điểm nhấn phía sau Sidebar */}
                <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[70%] bg-blue-600/20 blur-[120px] rounded-full"></div>

                {/* Luồng sáng cam (Orange Glow) tạo điểm nhấn phía sau Search Bar */}
                <div className="absolute bottom-[-10%] right-[5%] w-[35%] h-[60%] bg-orange-500/10 blur-[100px] rounded-full"></div>

                {/* Họa tiết lưới (Grid) tinh tế để tăng chiều sâu công nghệ */}
                <div className="absolute inset-0 opacity-[0.05]"
                    style={{ backgroundImage: 'radial-gradient(#ffffff 0.5px, transparent 0.5px)', backgroundSize: '30px 30px' }}>
                </div>
            </div>
            {/* ========================================================================= */}

            <h1 className="pl-40 text-white text-3xl font-black drop-shadow-lg pt-10 uppercase tracking-tight">
                Tìm kiếm <span className="text-blue-400">việc làm</span> ngay hôm nay
            </h1>

            <div className="px-40 relative z-10 mx-auto pt-8 flex flex-row justify-between container gap-5">
                <div className="flex">
                    <div className="bg-white rounded-sm shadow-2xl p-8 w-80 shrink-0">
                        <ul className="space-y-5">
                            {[
                                'Kỹ thuật phần mềm',
                                'Khoa học máy tính và AI',
                                'Mạng máy tính',
                                'Đồ họa',
                                'Robotics',
                                'IoT',
                            ].map((category, index) => (
                                <li
                                    key={index}
                                    className="flex items-center justify-between text-gray-700 font-bold text-sm hover:text-blue-600 cursor-pointer group transition-colors"
                                >
                                    {category}
                                    <FontAwesomeIcon
                                        icon={faArrowRight}
                                        className="text-[10px] text-gray-400 group-hover:text-blue-600 transition-transform group-hover:translate-x-1"
                                    />
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="flex flex-col w-full">
                    <div className="flex items-center bg-white rounded-sm shadow-2xl p-1.5 w-full max-w-5xl mx-auto mb-10 border-2 border-white/10">
                        <div className="flex-1 flex items-center">
                            <Search
                                onSearchJob={handleSearchJob}
                                onSearchLocation={handleSearchLocation}
                                placeholderJob="Vị trí ông chủ đang tìm kiếm?"
                                className="border-none shadow-none !max-w-none w-full font-medium"
                            />
                        </div>

                        <Button
                            name="Tạo CV Ngay"
                            variant="orange"
                            icon={faMagicWandSparkles}
                            onClick={() => navigate('/profile')}
                        />
                    </div>

                    <div className="flex items-center justify-center gap-3 mb-10 max-w-5xl mx-auto overflow-x-auto pb-2 scrollbar-hide">
                        <div className="flex items-center gap-1.5 text-white font-black text-[10px] uppercase bg-orange-500 px-3 py-1 rounded-sm shadow-sm shrink-0 tracking-widest">
                            <FontAwesomeIcon icon={faFire} />
                            Hot Tech:
                        </div>
                        {hotTechs.map((tech) => (
                            <button
                                key={tech}
                                className="text-white/80 text-xs font-bold hover:text-white hover:bg-white/10 px-4 py-1.5 rounded-sm border border-white/20 transition-all backdrop-blur-md"
                                onClick={() => handleSearchJob(tech)}
                            >
                                #{tech}
                            </button>
                        ))}
                    </div>
                    <SalaryChart />
                </div>
            </div>
        </div>
    );
};

export default HeroBanner;