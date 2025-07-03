import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css"; // Import SimpleBar CSS
import { useState } from "react";
import ImgList from "../components/ImgList";
import SearchBar from "../components/SearchBar";
function HomePage() {
  const [query, setQuery] = useState(""); // Quản lý từ khóa tìm kiếm

  // Hàm gọi từ SearchBar để cập nhật từ khóa tìm kiếm
  const handleSearch = (newQuery) => {
    setQuery(newQuery);
  };
  return (
    <div className="bg-[#a3b68a] w-screen h-screen overflow-hidden p-20 font-poppins">
      {/* Sidebar */}
      <div className="fixed top-0 left-0 w-[500px] h-full  text-white p-5 flex flex-col justify-center items-center ">
        <div>
          <div className="mb-10">

          <h1 className="text-6xl font-bold text-[#354a2f] mb-2">Wildroots</h1>
          <h2 className="">Design by Tuan Hiep</h2>
          </div>
          <div>
            <SearchBar onSearch={handleSearch} />
          </div>
        </div>
      </div>

      {/* Content with SimpleBar for custom scrollbar */}
      <div className="ml-96 h-full">
        <SimpleBar
          style={{ maxHeight: "100%" }}
          autoHide={false} // Không ẩn thanh cuộn tự động
          scrollbarMinSize={30} // Đặt kích thước tối thiểu của thanh cuộn

        >
          {/* Nội dung */}

          <ImgList query={query} />
        </SimpleBar>
      </div>
    </div>
  );
}

export default HomePage;
