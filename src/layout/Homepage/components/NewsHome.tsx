import { Button } from "primereact/button";

export const NewsHome = () => {
  return (
    <>
      <div className="mt-16 overflow-scroll md:overflow-auto">
        <div className="flex min-w-[568px] items-stretch gap-6">
          <div className="flex flex-col items-start justify-between flex-1">
            <a
              href="#"
              className="transition duration-300 hover:brightness-125"
            >
              <img src="/image1.png" alt="" className="rounded-xl" />
            </a>
            <div className="mt-5 flex flex-col gap-[10px] pr-6 text-white">
              <p className="text-xl font-bold">Black Myth Wukong</p>
              <p className="text-sm font-light text-textType">
                Developer Adrian Chmielarz discusses what’s next for Witchfire,
                from reworking stats to injecting story.
              </p>
            </div>
            <Button
              label="Read More"
              className="px-4 py-3 mt-8 text-sm text-white rounded-lg hover:bg-gray200 bg-grayBorder hover:bg-opacity-50"
            />
          </div>
          <div className="flex flex-col items-start justify-between flex-1">
            <a
              href="#"
              className="transition duration-300 hover:brightness-125"
            >
              <img src="/image2.png" alt="" className="rounded-xl" />
            </a>
            <div className="mt-5 flex flex-col gap-[10px] pr-6 text-white">
              <p className="text-xl font-bold">Elden Ring</p>
              <p className="text-sm font-light text-textType">
                The Land of Shadow. A place obscured by the Erdtree. Where the
                goddess Marika first set foot.
              </p>
            </div>
            <Button
              label="Read More"
              className="px-4 py-3 mt-8 text-sm text-white rounded-lg hover:bg-gray200 bg-grayBorder hover:bg-opacity-50"
            />
          </div>
        </div>
      </div>
    </>
  );
};
