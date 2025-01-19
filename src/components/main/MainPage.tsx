import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Card } from "../ui/card";
import { Trans, useTranslation } from "react-i18next";
import { Search, X, ShoppingCart, Plus, Minus, Trash2 } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useSearchParams } from "react-router-dom";
import qs from "qs";
import { Controller, useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import Slider from "./slider";

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

export const MainPage: React.FC = () => {
  const parentRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  const [fetchedBooks, setFetchedBooks] = useState<Book[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [cart, setCart] = useState<{
    [id: string]: { book: Book; quantity: number };
  }>(() => {
    const userId = localStorage.getItem("userId");
    const savedCart = localStorage.getItem(`cart_${userId}`);
    return savedCart ? JSON.parse(savedCart) : {};
  });

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

  // Cart functions
  const addToCart = (book: Book) => {
    setCart((prev: { [id: string]: { book: Book; quantity: number } }) => {
      const updatedCart = {
        ...prev,
        [book.id]: {
          book,
          quantity: (prev[book.id]?.quantity || 0) + 1,
        },
      };
      const userId = localStorage.getItem("userId");
      localStorage.setItem(`cart_${userId}`, JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const updateCartQuantity = (id: string, quantity: number) => {
    setCart((prev) => {
      if (quantity === 0) {
        const updatedCart = { ...prev };
        delete updatedCart[id];
        const userId = localStorage.getItem("userId");
        localStorage.setItem(`cart_${userId}`, JSON.stringify(updatedCart));
        return updatedCart;
      }

      const updatedCart = {
        ...prev,
        [id]: {
          ...prev[id],
          quantity,
        },
      };
      const userId = localStorage.getItem("userId");
      localStorage.setItem(`cart_${userId}`, JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const clearCart = () => {
    setCart({});
    const userId = localStorage.getItem("userId");
    localStorage.removeItem(`cart_${userId}`);
  };

  useEffect(() => {
    const initialSearchText = initialParams.searchText || "";
    const initialCategory = initialParams.category || "";

    if (initialSearchText) {
      fetchBooks(initialSearchText);
    } else {
      fetchBooks();
    }

    if (initialCategory) {
      setSelectedCategory(initialCategory);
    }
  }, [initialParams.searchText, initialParams.category]);

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

  const rowVirtualizer = useVirtualizer({
    count: Math.ceil(filteredBooks.length / 2),
    getScrollElement: () => parentRef.current,
    estimateSize: () => 500,
    overscan: 5,
  });

  const handleCategorySelect = (category: string) => {
    const newCategory = category === selectedCategory ? "" : category;
    setSelectedCategory(newCategory);
  };

  const clearCategory = () => {
    setSelectedCategory("");
  };

  return (
    <main className="container mx-auto flex flex-col gap-6 px-2 py-8 lg:flex-row">
      <div className="flex-1">
        <Slider />
        <div className="space-y-6 bg-background text-foreground">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
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
                      onChange(e);
                      fetchBooks(e.target.value);
                    }}
                  />
                )}
              />
            </div>
            {categories.length > 0 && (
              <div className="flex items-center gap-2">
                <div className="w-48">
                  <Select
                    value={selectedCategory}
                    onValueChange={handleCategorySelect}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {selectedCategory && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={clearCategory}
                    className="h-10 w-10"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
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
                  const startBookIndex = virtualRow.index * 2;
                  const booksInRow = filteredBooks.slice(
                    startBookIndex,
                    startBookIndex + 2,
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
                        display: "flex",
                        gap: "1rem",
                      }}
                    >
                      {booksInRow.map((book, index) => (
                        <div
                          key={index}
                          className="m-6 flex-1 rounded-lg border border-gray-200 bg-card p-4 shadow-lg transition-all duration-200 hover:scale-[1.02] hover:shadow-xl dark:border-neutral-800"
                          style={{
                            flexBasis: "calc(50% - 0.5rem)",
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

                            <div className="mt-auto">
                              <div className="mb-4 flex flex-wrap gap-2">
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
                              <Button
                                className="w-full"
                                onClick={() => addToCart(book)}
                              >
                                <ShoppingCart className="mr-2 h-4 w-4" />
                                Add to Cart
                              </Button>
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
          <h3 className="mb-4 text-lg font-semibold">
            <ShoppingCart className="mr-2 inline-block h-5 w-5" />
            Cart
          </h3>
          {Object.keys(cart).length === 0 ? (
            <p className="text-gray-500">Your cart is empty</p>
          ) : (
            <div className="space-y-4">
              {Object.values(cart).map(({ book, quantity }) => (
                <div
                  key={book.id}
                  className="flex items-start space-x-4 rounded-lg border p-2"
                >
                  <img
                    src={
                      book.volumeInfo.imageLinks?.thumbnail ||
                      "/api/placeholder/100/150"
                    }
                    alt={book.volumeInfo.title}
                    className="h-24 w-16 rounded object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="line-clamp-2 font-medium">
                      {book.volumeInfo.title}
                    </h4>
                    <p className="text-sm text-gray-500">
                      {book.volumeInfo.authors?.[0]}
                    </p>
                    <div className="mt-2 flex items-center space-x-2">
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() =>
                          updateCartQuantity(book.id, quantity - 1)
                        }
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-8 text-center">{quantity}</span>
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() =>
                          updateCartQuantity(book.id, quantity + 1)
                        }
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="destructive"
                        onClick={() => updateCartQuantity(book.id, 0)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
              <Button
                className="mt-4 w-full"
                variant="destructive"
                onClick={clearCart}
              >
                Clear Cart
              </Button>
            </div>
          )}
        </Card>

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
