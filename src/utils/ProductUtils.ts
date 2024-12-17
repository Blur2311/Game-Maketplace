import apiClient from "../config/apiClient";

export const getImage = (item: any, type: string) => {
    let image = item.media.find(
        (media: any) => media.mediaName === type,
    )?.mediaUrl;
    return image;
};

export const getGameURL = (slug: string) => {
    return `/product?game=${slug}`;
};

export const fetchTop = async (field: string, size: number) => {
    let requestParams = {
        page: 0,
        size: size,
        field: field,
    };
    const result = await apiClient
        .get("/api/games/p/sort", { params: requestParams })
        .then((response) => {
            return response.data.data;
        })
        .catch((error) => {
            console.error(error);
        });
    const newItems = result.map((item: any) => {
        let thumbnail = getImage(item, "thumbnail");
        let firstFeatureLine = item.features ? item.features.split('\n')[0] : "New released game";
        return {
            name: item.gameName,
            type: firstFeatureLine,
            price: item.price,
            sale: item.discountPercent,
            image: thumbnail ?? "/image1.2.jpg",
            url: `/product?game=${item.slug}`
        };
    });
    return newItems;
};