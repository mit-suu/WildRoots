import React from "react";

function ImgCard({ image }) {
  return (
    <div className="relative w-full max-w-sm rounded-xl overflow-hidden group">
      {/* Hiển thị ảnh */}
      <img
        src={image.urls.small}  // Đảm bảo sử dụng đúng URL
        alt={image.alt_description || "No description available"}  // Nếu không có alt_description, hiển thị mô tả mặc định
        className="w-full h-auto"
      />
      
      {/* Overlay on hover */}
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
      
      {/* Description */}
      <div className="absolute bottom-0 left-0 w-full p-5 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
        <p className="text-sm whitespace-nowrap overflow-hidden text-ellipsis">
          {image.alt_description || "No description available"}
        </p>
      </div>
    </div>
  );
}

export default ImgCard;
