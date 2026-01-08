import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faMagicWandSparkles} from '@fortawesome/free-solid-svg-icons';
import bannerImg from '../../assets/banner.jpg';
import signContractImg from '../../assets/ky_hop_dong.jpg';
import Button from '../common/Button';
import Search from '../common/Search';
import { useNavigate } from 'react-router-dom';
const HeroBanner = () => {
  const navigate = useNavigate();
  const handleSearchJob = (value: string) => console.log("Tìm việc:", value);
  const handleSearchLocation = (value: string) => console.log("Địa điểm:", value);

  return (
    <div className="relative w-full h-[550px] bg-[#58b0f0] overflow-hidden font-sans">
      {/* Background họa tiết hình khối (như trong ảnh) */}
      <div className="absolute inset-0 opacity-40 z-0">
        <img src={bannerImg} className="w-full h-full object-cover" alt="" />
      </div>
      
      <div className="relative z-10 container mx-auto pt-8">
        <h1 className="text-white text-3xl font-bold drop-shadow-lg text-center mb-8">
          Tìm kiếm việc làm ngay hôm nay
        </h1>
        {/* 1. Thanh Search Bar nằm trên cùng (Bo tròn cực đại) */}
        <div className="flex items-center bg-white rounded-full shadow-lg p-1.5 w-full max-w-5xl mx-auto mb-10">
          <div className="flex-1 flex items-center">
            <Search 
              onSearchJob={handleSearchJob} 
              onSearchLocation={handleSearchLocation}
              placeholderJob="Tìm việc ngay" 
              className="border-none shadow-none !max-w-none w-full"
            />
          </div>
          
          
          {/* Nút Tạo CV lấp lánh */}
          <Button 
            name="Tạo CV" 
            variant="secondary"
            icon={faMagicWandSparkles}
            onClick={() => navigate("/resume")}
            />
        </div>

        {/* 2. Phần thân dưới: Sidebar + Ảnh + Title */}
        <div className="flex gap-8 items-start max-w-6xl mx-auto">
          
          {/* Sidebar Categories */}
          <div className="bg-white rounded-[2rem] shadow-xl p-8 w-80 shrink-0">
            <ul className="space-y-5">
              {['Kỹ thuật phần mềm', 'Khoa học máy tính và AI', 'Mạng máy tính', 'Đồ họa', 'Robotics', 'IoT'].map((category, index) => (
                <li 
                  key={index} 
                  className="flex items-center justify-between text-gray-700 font-medium hover:text-blue-600 cursor-pointer group transition-colors"
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

          {/* Cụm Bên Phải: Ảnh minh họa & Tiêu đề */}
          <div className="flex-1 flex flex-col">
            <div className="w-full h-[280px] rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white/10 mb-6">
              <img 
                src={signContractImg} 
                alt="Working Illustration" 
                className="w-full h-full object-cover" 
              />
            </div>
            
          </div>

        </div>
      </div>
    </div>
  );
};

export default HeroBanner;