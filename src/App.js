import { useState, useEffect, useRef } from "react";

function App() {
  const totalBox = 18;
  const products = Array.from({ length: totalBox }, (_, i) => i + 1);
  const [value, setValue] = useState(0);
  const [divWidth, setDivWidth] = useState(0);
  const absoluteDivRef = useRef(null);

  // mengatur jumlah card yang ditampilkan dalam lebar desktop yang berbeda2
  const getSlideWidth = () => {
    if (divWidth >= 1024) return divWidth / 5;
    if (divWidth >= 768) return divWidth / 4;
    if (divWidth >= 640) return divWidth / 3;
    return divWidth / 2;
  };

  // mengatur jumlah card slider dalam sekali slide (jumlah diatur sesuai dengan responsive)
  const getNumPerSlide = () => {
    if (divWidth >= 1024) return 5;
    if (divWidth >= 768) return 4;
    if (divWidth >= 640) return 3;
    return 2;
  };

  const handleNext = () => {
    const slideWidth = getSlideWidth();
    const numPerSlide = getNumPerSlide();
    const itemsToShow =
      divWidth >= 1024 ? 5 : divWidth >= 768 ? 4 : divWidth >= 640 ? 3 : 2;
    const maxSlideValue =
      slideWidth * products.length - itemsToShow * slideWidth;

    setValue((prevValue) =>
      prevValue < maxSlideValue
        ? Math.min(prevValue + slideWidth * numPerSlide, maxSlideValue)
        : 0
    );
  };

  const handlePrev = () => {
    const slideWidth = getSlideWidth();
    setValue((prevValue) => Math.max(prevValue - slideWidth, 0));
  };

  useEffect(() => {
    const updateDivWidth = () => {
      if (absoluteDivRef.current) {
        const { width } = absoluteDivRef.current.getBoundingClientRect();
        setDivWidth(width); // <-- Set lebar div yang diambil menyesuaikan dengan lebar container card
      }
    };

    updateDivWidth(); //<--  Update saat pertama kali dirender
    window.addEventListener("resize", updateDivWidth); // <-- Update saat ukuran jendela berubah

    return () => window.removeEventListener("resize", updateDivWidth); //<-- Hapus listener saat unmount
  }, []);

  useEffect(() => {
    setValue(0); //<-- Reset posisi slider saat lebar div berubah
  }, [divWidth]);

  return (
    <main className="overflow-hidden px-2">
      <section className="container mx-auto py-12 space-y-12">
        <div className="text-xl font-semibold uppercase">
          CARD SLIDER IMPLEMENTATION
        </div>

        <div className="space-y-2 h-[200px]">
          <div
            ref={absoluteDivRef} // <-- gunakan untuk mengambil lebar
            className="relative whitespace-nowrap h-[170px] overflow-x-hidden bg-red-500"
          >
            <div
              className="absolute  container transition-all duration-300"
              style={{
                left: `-${value}px`,
              }}
            >
              {products.map((item, index) => (
                <div
                  className="inline-block w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5"
                  key={index}
                >
                  <div className="py-2 px-2">
                    <div className="bg-cyan-500 h-[150px] rounded-md flex items-center justify-center uppercase text-xl">
                      {item}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-center gap-x-10 items-center">
            <button onClick={handlePrev} className="px-4 py-2 bg-red-500">
              PREV
            </button>
            <button onClick={handleNext} className="px-4 py-2 bg-red-500">
              NEXT
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

export default App;
