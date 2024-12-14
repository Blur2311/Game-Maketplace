import { Button } from "primereact/button";
import { Carousel } from "primereact/carousel";
import { useEffect, useState } from "react";
import { GoChevronRight } from "react-icons/go";
import { Item } from "../../../components/Item";
import apiClient from "../../../config/apiClient";
import { getImage } from "../../../utils/ProductUtils";

type CarouselHomeProps = {
  name: string;
  field: string;
};

export const CarouselHome: React.FC<CarouselHomeProps> = ({ name, field }) => {
  const [items, setItems] = useState<any[]>([
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
      breakpoint: "1224px",
      numVisible: 4,
      numScroll: 4,
    },
    {
      breakpoint: "768px",
      numVisible: 3,
      numScroll: 3,
    },
    {
      breakpoint: "640px",
      numVisible: 2,
      numScroll: 2,
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

  useEffect(() => {
    loadTop10MostRecent(field);
  }, []);

  const loadTop10MostRecent = async (field: string) => {
    let requestParams = {
      field: field,
      page: 0,
      size: 10,
    };
    const result = await apiClient
      .get(`/api/games/p/sort`, {
        params: requestParams,
      })
      .then((response) => {
        return response.data.data;
      })
      .catch((error) => {
        console.error(error);
      });
    const newItems = result.map((item: any) => {
      let thumbnail = getImage(item, "thumbnail");
      let firstFeatureLine = item.features
        ? item.features.split("\n")[0]
        : "New released game";
      return {
        name: item.gameName,
        type: firstFeatureLine,
        price: item.price,
        sale: item.discountPercent,
        image: thumbnail ?? "/image1.2.jpg",
        url: `/product?game=${item.slug}`,
      };
    });
    setItems(newItems);
  };

  const itemTemplate = (item: any) => {
    return (
      <Item
        name={item.name}
        image={item.image}
        type={item.type}
        price={item.price}
        sale={item.sale}
        wrapper={`flex h-[397px] w-full flex-col justify-start pr-4 `}
        url={item.url}
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
            className="mr-[10px] h-7 w-7 rounded-full bg-gray400 bg-opacity-50"
            onClick={prev}
            disabled={page === 0}
          />

          <Button
            icon="pi pi-chevron-right"
            className="h-7 w-7 rounded-full bg-gray400 bg-opacity-50"
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
