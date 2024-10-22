import { Button } from "primereact/button";

export const NewsHome = () => {
  return (
    <>
      <div className="mt-16 overflow-scroll">
        <div className="flex min-w-[568px] items-stretch gap-6">
          <div className="flex flex-1 flex-col items-start justify-between">
            <a
              href="#"
              className="transition duration-300 hover:brightness-125"
            >
              <img src="/image1.png" alt="" className="rounded-xl" />
            </a>
            <div className="mt-5 flex flex-col gap-[10px] pr-6 text-white">
              <p className="text-xl font-bold">Black Myth Wukong</p>
              <p className="text-textType text-sm font-light">
                Developer Adrian Chmielarz discusses what’s next for Witchfire,
                from reworking stats to injecting story.
              </p>
            </div>
            <Button
              label="Read More"
              className="hover:bg-gray200 bg-grayBorder mt-8 rounded-lg px-4 py-3 text-sm text-white hover:bg-opacity-50"
            />
          </div>
          <div className="flex flex-1 flex-col items-start justify-between">
            <a
              href="#"
              className="transition duration-300 hover:brightness-125"
            >
              <img src="/image2.png" alt="" className="rounded-xl" />
            </a>
            <div className="mt-5 flex flex-col gap-[10px] pr-6 text-white">
              <p className="text-xl font-bold">Elden Ring</p>
              <p className="text-textType text-sm font-light">
                The Land of Shadow. A place obscured by the Erdtree. Where the
                goddess Marika first set foot.
              </p>
            </div>
            <Button
              label="Read More"
              className="hover:bg-gray200 bg-grayBorder mt-8 rounded-lg px-4 py-3 text-sm text-white hover:bg-opacity-50"
            />
          </div>
        </div>
      </div>
    </>
  );
};
