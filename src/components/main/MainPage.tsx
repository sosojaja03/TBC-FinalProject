import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Card } from "../ui/card";
import { Trans, useTranslation } from "react-i18next";
import { Search } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useSearchParams } from "react-router-dom";
import qs from "qs";
import { Controller, useForm } from "react-hook-form";

const API_KEY = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY;

const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

export const MainPage: React.FC = () => {
  const parentRef = useRef<HTMLDivElement>(null);

  const { t } = useTranslation();
  interface Book {
    id: string;
    volumeInfo: {
      title: string;
      authors?: string[];
      publishedDate?: string;
      description?: string;
      categories?: string[];
      imageLinks?: {
        thumbnail?: string;
      };
    };
  }

  const [fetchedBooks, setFetchedBooks] = useState<Book[]>([]);
  const [, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const initialParams = useMemo(
    () =>
      qs.parse(searchParams.toString()) as {
        searchText?: string;
        category?: string;
      },
    [searchParams],
  );

  const { control, watch } = useForm({
    defaultValues: {
      searchText: initialParams.searchText || "",
    },
  });

  const watchedSearchText = watch("searchText");
  const debouncedSearchText = useDebounce(watchedSearchText, 500);

  const fetchBooks = async (query: string = "") => {
    setIsLoading(true);
    try {
      const searchQuery = query || "subject:general";
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(searchQuery)}&maxResults=40&key=${API_KEY}`,
      );
      if (!response.ok) {
        throw new Error("Failed to fetch books");
      }
      const data = await response.json();

      const uniqueCategories: string[] = Array.from(
        new Set(
          data.items
            ?.flatMap(
              (book: { volumeInfo: { categories?: string[] } }) =>
                book.volumeInfo.categories || [],
            )
            .filter((category: string) => typeof category === "string"),
        ),
      );

      setFetchedBooks(data.items || []);
      setFilteredBooks(data.items || []);
      setCategories(uniqueCategories);
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch books based on initial search params when the page loads
  useEffect(() => {
    const initialSearchText = initialParams.searchText || "";
    const initialCategory = initialParams.category || "";

    if (initialSearchText) {
      fetchBooks(initialSearchText);
      setSearchTerm(initialSearchText);
    } else {
      fetchBooks();
    }

    if (initialCategory) {
      setSelectedCategory(initialCategory);
    }
  }, [initialParams.searchText, initialParams.category]);

  // Filter books whenever fetchedBooks, debouncedSearchText, or selectedCategory changes
  useEffect(() => {
    const filtered = fetchedBooks.filter((book) => {
      const titleMatch = book.volumeInfo.title
        ?.toLowerCase()
        .includes(debouncedSearchText.toLowerCase());
      const categoryMatch =
        selectedCategory === "" ||
        book.volumeInfo.categories?.some((category: string) =>
          category.toLowerCase().includes(selectedCategory.toLowerCase()),
        );

      return titleMatch && categoryMatch;
    });

    setFilteredBooks(filtered);
  }, [debouncedSearchText, selectedCategory, fetchedBooks]);

  useEffect(() => {
    const params: { searchText?: string; category?: string } = {};

    if (debouncedSearchText) {
      params.searchText = debouncedSearchText;
    }

    if (selectedCategory) {
      params.category = selectedCategory;
    }

    const queryString = Object.keys(params).length
      ? qs.stringify(params, { addQueryPrefix: true })
      : "";

    setSearchParams(queryString || {});
  }, [debouncedSearchText, selectedCategory, setSearchParams]);

  const featuredAuthors = [
    { id: "1", name: "J.K. Rowling", role: "Fiction Author" },
    { id: "2", name: "Stephen King", role: "Horror & Thriller Author" },
    { id: "3", name: "Malcolm Gladwell", role: "Non-fiction Author" },
  ];

  // const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setSearchTerm(e.target.value);
  //   if (e.target.value.length > 2) {
  //     fetchBooks(e.target.value);
  //   }
  // };

  const handleCategorySelect = (category: string) => {
    const newCategory = category === selectedCategory ? "" : category;
    setSelectedCategory(newCategory);
  };

  // Virtualizer configuration
  const rowVirtualizer = useVirtualizer({
    // count: filteredBooks.length, // Total posts count
    count: Math.ceil(filteredBooks.length / 2), // Number of rows needed for two books per row
    getScrollElement: () => parentRef.current,
    estimateSize: () => 500, // Estimated height for each post card
    overscan: 5,
  });

  return (
    <main className="container mx-auto flex flex-col gap-6 px-2 py-8 lg:flex-row">
      <div className="flex-1">
        <div className="space-y-6 bg-background text-foreground">
          <div className="mb-6">
            <div className="relative mb-4">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Controller
                control={control}
                name="searchText"
                render={({ field: { onChange, value } }) => (
                  <Input
                    type="text"
                    placeholder="Search any books..."
                    className="pl-10"
                    value={value}
                    onChange={(e) => {
                      onChange(e); // Update the form state
                      fetchBooks(e.target.value); // Fetch books on input change
                    }}
                  />
                )}
              />
            </div>
            {categories.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={
                      selectedCategory === category ? "default" : "outline"
                    }
                    onClick={() => handleCategorySelect(category)}
                    className="text-sm"
                  >
                    {category}
                  </Button>
                ))}
              </div>
            )}
          </div>

          {isLoading ? (
            <p className="text-center text-gray-500">Loading books...</p>
          ) : filteredBooks.length > 0 ? (
            <div
              ref={parentRef}
              className="bg-white-50 h-[500px] overflow-auto rounded-lg bg-card p-2"
            >
              <div
                style={{
                  height: `${rowVirtualizer.getTotalSize()}px`,
                  position: "relative",
                }}
              >
                {rowVirtualizer.getVirtualItems().map((virtualRow) => {
                  const startBookIndex = virtualRow.index * 2; // Start index for two books per row
                  const booksInRow = filteredBooks.slice(
                    startBookIndex,
                    startBookIndex + 2, // Get two books per virtual row
                  );

                  return (
                    <div
                      key={virtualRow.key}
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: `${virtualRow.size}px`,
                        transform: `translateY(${virtualRow.start}px)`,
                        display: "flex", // Use flexbox for two-column layout
                        gap: "1rem", // Space between book cards
                      }}
                    >
                      {booksInRow.map((book, index) => (
                        <div
                          key={index}
                          className="m-6 flex-1 rounded-lg border border-gray-200 bg-card p-4 shadow-lg transition-all duration-200 hover:scale-[1.02] hover:shadow-xl dark:border-neutral-800"
                          style={{
                            flexBasis: "calc(50% - 0.5rem)",
                            // Each card takes half the widt
                            // mh
                          }}
                        >
                          <div className="flex h-full flex-col bg-card">
                            <div className="group relative mb-4 flex h-48 items-center justify-center overflow-hidden rounded-lg bg-gray-100">
                              <img
                                src={
                                  book.volumeInfo.imageLinks?.thumbnail ||
                                  "/api/placeholder/200/300"
                                }
                                alt={book.volumeInfo.title || "Book cover"}
                                className="h-full max-h-48 w-auto object-contain transition-transform duration-300 group-hover:scale-110"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                            </div>

                            <h2 className="mb-2 line-clamp-2 text-lg font-bold text-gray-800">
                              {book.volumeInfo.title}
                            </h2>

                            <div className="mb-4 flex items-center text-sm text-gray-500">
                              <span>
                                {book.volumeInfo.authors?.join(", ") ||
                                  "Unknown Author"}
                              </span>
                              <span className="mx-2">•</span>
                              <span>
                                {book.volumeInfo.publishedDate?.split("-")[0] ||
                                  "N/A"}
                              </span>
                            </div>

                            <p className="mb-4 line-clamp-3 text-sm text-gray-600">
                              {book.volumeInfo.description ||
                                "No description available"}
                            </p>

                            <div className="mt-auto flex flex-wrap gap-2">
                              {book.volumeInfo.categories?.map(
                                (category, i) => (
                                  <span
                                    key={i}
                                    className="rounded-full bg-blue-100 px-3 py-1 text-xs text-blue-700"
                                  >
                                    {category}
                                  </span>
                                ),
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <p className="text-center text-gray-500">
              No books found matching your search criteria
            </p>
          )}
        </div>
      </div>

      <div className="w-full space-y-6 lg:w-96">
        <Card className="border-gray-800 bg-card p-4">
          <h3 className="mb-4 font-semibold">
            <Trans>Popular Categories</Trans>
          </h3>
          <div className="flex flex-wrap gap-2">
            {categories.slice(0, 10).map((category, index) => (
              <span
                key={index}
                className="rounded-lg bg-blue-500 px-3 py-1 text-sm text-white"
              >
                {t(`category.${category}`, {
                  defaultValue: category,
                })}
              </span>
            ))}
          </div>
        </Card>
        <Card className="border-gray-800 bg-card p-4">
          <h3 className="mb-4 font-semibold">
            <Trans>Featured Authors</Trans>
          </h3>
          <div className="space-y-4">
            {featuredAuthors.map((author) => (
              <Link
                key={author.id}
                to={`/author/${author.id}`}
                className="flex items-center space-x-3 rounded-md p-2 transition hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700" />
                <div>
                  <div className="font-medium">{author.name}</div>
                  <div className="text-sm text-gray-500">{author.role}</div>
                </div>
              </Link>
            ))}
          </div>
        </Card>
      </div>
    </main>
  );
};

export default MainPage;
