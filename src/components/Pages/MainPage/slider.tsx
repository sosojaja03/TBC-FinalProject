import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import image1 from "../../../assets/1.png";
import image2 from "../../../assets/2.png";
import { useTranslation } from "react-i18next";

const Slider = () => {
  const { t } = useTranslation();

  const mockData = [
    {
      id: 1,
      title: t("MainPage-Translation.Books.GreatGatsby.Title"),
      image: image1,
      description: t("MainPage-Translation.Books.GreatGatsby.Description"),
    },
    {
      id: 2,
      title: t("MainPage-Translation.Books.ToKillAMockingbird.Title"),
      image: image2,
      description: t(
        "MainPage-Translation.Books.ToKillAMockingbird.Description",
      ),
    },

    {
      id: 3,
      title: t("MainPage-Translation.Books.1984.Title"),
      image: image1,
      description: t("MainPage-Translation.Books.1984.Description"),
    },
    {
      id: 4,
      title: t("MainPage-Translation.Books.PrideandPrejudice.Title"),
      image: image2,
      description: t(
        "MainPage-Translation.Books.PrideandPrejudice.Description",
      ),
    },
    {
      id: 5,
      title: t("MainPage-Translation.Books.MobyDick.Title"),
      image: image1,
      description: t("MainPage-Translation.Books.MobyDick.Description"),
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % mockData.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + mockData.length) % mockData.length,
    );
  };

  return (
    <div className="relative mx-auto w-full max-w-4xl px-4">
      {/* Bestsellers title */}
      <h1 className="mb-6 text-center text-3xl font-bold text-amber-900 dark:text-amber-300">
        {t("MainPage-Translation.BestSellers")}
      </h1>

      {/* Main slider container */}
      <div className="amber-border relative overflow-hidden rounded-xl border bg-white shadow-lg dark:border-amber-800 dark:bg-card">
        {/* Slide content */}
        <div className="flex min-h-[400px] flex-col items-center bg-amber-50 p-6 dark:bg-card">
          {mockData[currentIndex].image && (
            <img
              src={mockData[currentIndex].image}
              alt={mockData[currentIndex].title}
              className="mb-6 h-64 w-full max-w-md rounded-lg object-cover"
            />
          )}
          <h2 className="mb-4 text-2xl font-bold text-amber-950">
            {mockData[currentIndex].title}
          </h2>
          <p className="max-w-2xl text-center text-amber-700">
            {mockData[currentIndex].description}
          </p>
        </div>

        {/* Navigation buttons */}
        <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between">
          <button
            onClick={prevSlide}
            className="ml-4 rounded-full bg-amber-100 p-2 shadow-md transition-colors hover:bg-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-6 w-6 text-amber-900" />
          </button>
          <button
            onClick={nextSlide}
            className="mr-4 rounded-full bg-amber-100 p-2 shadow-md transition-colors hover:bg-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
            aria-label="Next slide"
          >
            <ChevronRight className="h-6 w-6 text-amber-900" />
          </button>
        </div>

        {/* Dots navigation */}
        <div className="absolute bottom-4 left-0 right-0">
          <div className="flex items-center justify-center gap-2">
            {mockData.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 w-2 rounded-full transition-all ${
                  currentIndex === index
                    ? "w-4 bg-amber-500"
                    : "bg-amber-200 hover:bg-amber-300"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slider;
