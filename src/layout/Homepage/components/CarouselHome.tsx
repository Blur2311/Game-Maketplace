import { Button } from "primereact/button";
import { Carousel } from "primereact/carousel";
import { useState } from "react";
import { GoChevronRight } from "react-icons/go";
import { Item } from "../../../components/Item";

type CarouselHomeProps = {
  name: string;
};

export const CarouselHome: React.FC<CarouselHomeProps> = ({ name }) => {
  const [items] = useState<any[]>([
    {
      name: "Black Myth Wukong",
      type: "Steam Game",
      price: 1200000,
      sale: 80,
      image: "/image1.2.jpg",
    },
    {
      name: "Elden Ring",
      type: "Steam Game",
      price: 1000000,
      sale: 10,
      image: "/image2.2.webp",
    },
    {
      name: "Dark Soul",
      type: "Steam Game",
      price: 1200000,
      image: "/darksoul.jpg",
    },
    {
      name: "Outlast",
      type: "Steam Game",
      price: 200000,
      sale: 80,
      image: "/outlast.jpeg",
    },
    {
      name: "Assasin Creed",
      type: "Steam Game",
      price: 200000,
      sale: 20,
      image: "/assasin.webp",
    },
    {
      name: "Dark Soul",
      type: "Steam Game",
      price: 1200000,
      image: "/darksoul.jpg",
    },
    {
      name: "Black Myth Wukong",
      type: "Steam Game",
      price: 1200000,
      sale: 80,
      image: "/image1.2.jpg",
    },
    {
      name: "Assasin Creed",
      type: "Steam Game",
      price: 200000,
      sale: 20,
      image: "/assasin.webp",
    },
    {
      name: "Elden Ring",
      type: "Steam Game",
      price: 1000000,
      sale: 10,
      image: "/image2.2.webp",
    },
    {
      name: "Outlast",
      type: "Steam Game",
      price: 200000,
      sale: 80,
      image: "/outlast.jpeg",
    },
  ]);

  const [page, setPage] = useState(0); // Trạng thái trang hiện tại
  // Điều chỉnh số lượng item hiển thị và cuộn dựa trên kích thước màn hình
  const responsiveOptions = [
    {
      breakpoint: "2280px",
      numVisible: 5,
      numScroll: 5,
    },
    {
      breakpoint: "1324px",
      numVisible: 4,
      numScroll: 4,
    },
    {
      breakpoint: "768px",
      numVisible: 3,
      numScroll: 3,
    },
    {
      breakpoint: "560px",
      numVisible: 2,
      numScroll: 2,
    },
    {
      breakpoint: "460px",
      numVisible: 1,
      numScroll: 1,
    },
  ];

  // Xác định số mục hiển thị dựa trên màn hình hiện tại
  const numVisible = window.innerWidth > 1280 ? 5 : 4; // Giữ 5 mục khi lớn hơn 1280px

  // Tổng số trang dựa trên số mục hiển thị và số lượng mục trong danh sách
  const totalPages = Math.ceil(items.length / numVisible);

  // Nút tiếp theo
  const next = () => {
    if (page < totalPages - 1) {
      setPage(page + 1);
    } else {
      setPage(0);
    }
  };

  const prev = () => {
    if (page > 0) {
      setPage(page - 1);
    } else {
      setPage(totalPages - 1);
    }
  };

  const itemTemplate = (item: any) => {
    return (
      <Item
        name={item.name}
        image={item.image}
        type={item.type}
        price={item.price}
        sale={item.sale}
        wrapper={`mr-4 flex h-[397px] min-w-[190px] flex-col justify-center font-inter text-white sm:max-w-[200px]`}
      />
    );
  };

  return (
    <div className="relative mt-16">
      <div className="flex items-start justify-between">
        <button className="group mb-4 flex items-center text-white">
          <span className="mr-2 text-xl font-bold">{name}</span>
          <GoChevronRight className="text-2xl transition-transform duration-300 group-hover:translate-x-2" />
        </button>
        <div className="hidden text-white sm:block">
          <Button
            icon="pi pi-chevron-left"
            className="bg-gray400 mr-[10px] h-7 w-7 rounded-full bg-opacity-50"
            onClick={prev}
            disabled={page === 0}
          />

          <Button
            icon="pi pi-chevron-right"
            className="bg-gray400 h-7 w-7 rounded-full bg-opacity-50"
            onClick={next}
            disabled={page === totalPages - 1}
          />
        </div>
      </div>

      <Carousel
        value={items} // Truyền danh sách items
        itemTemplate={itemTemplate}
        responsiveOptions={responsiveOptions}
        onPageChange={(e) => setPage(e.page)} // Cập nhật trang khi thay đổi
        showIndicators={false} // Không hiển thị chỉ số
        showNavigators={false} // Ẩn nút mặc định
        page={page} // Đồng bộ trạng thái trang
        circular={false}
        className=""
      />
    </div>
  );
};
