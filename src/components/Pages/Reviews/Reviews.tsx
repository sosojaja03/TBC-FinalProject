import { Input } from "@/components/ui/input";
import CreateReviewForm from "../CreateReview/CreateReview";
import { supabase } from "@/supabase";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm, Controller } from "react-hook-form";
import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import qs from "qs";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { t } from "i18next";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { BookOpen, Clock, Search } from "lucide-react";
import { User } from "@supabase/supabase-js";

dayjs.extend(relativeTime);

type SingleReview = {
  created_at: string;
  id: number;
  description: string | null;
  description_ka: string | null;
  image_url: string | null;
  title: string | null;
  title_ka: string | null;
  user_id: string | null;
};

type BooksFilterFormValues = {
  searchText: string;
};

// Custom hook for debouncing
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

const formatbookDate = (dateString: string) => {
  const bookDate = dayjs(dateString);
  const now = dayjs();

  if (now.diff(bookDate, "day") < 1) {
    return bookDate.fromNow();
  }

  return bookDate.format("HH:mm - DD/MM/YYYY");
};

const fetchBooks = async (searchText?: string): Promise<SingleReview[]> => {
  // If no search text, fetch all Books
  if (!searchText || searchText.trim() === "") {
    const { data, error } = await supabase
      .from("Books")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data as SingleReview[];
  }

  // If search text is provided, filter Books
  const { data, error } = await supabase
    .from("Books")
    .select("*")
    .or(`title.ilike.%${searchText}%, description.ilike.%${searchText}%`)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data as SingleReview[];
};

const ReviewView = () => {
  const queryClient = useQueryClient();
  const [searchParams, setSearchParams] = useSearchParams();
  const [editingBook, setEditingBook] = useState<SingleReview | null>(null);
  const [user, setUser] = useState<User | null>(null);

  // Add this useEffect to get the current user
  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };
    fetchUser();
  }, []);

  const initialParams = useMemo(
    () => qs.parse(searchParams.toString()) as { searchText?: string },
    [searchParams],
  );

  const { control, watch } = useForm<BooksFilterFormValues>({
    defaultValues: {
      searchText: initialParams.searchText || "",
    },
  });

  const watchedSearchText = watch("searchText");
  const debouncedSearchText = useDebounce(watchedSearchText, 500);

  // Mutation for deleting a book
  const deleteBookMutation = useMutation({
    mutationFn: async (bookId: number) => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      const { data, error } = await supabase
        .from("Books")
        .delete()
        .eq("id", bookId)
        .eq("user_id", user?.id || ""); // Ensure only the creator can delete

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Books"] });
    },
  });

  // Mutation for updating a book
  const updateBookMutation = useMutation({
    mutationFn: async (updatedBook: Partial<SingleReview>) => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      const { error } = await supabase
        .from("Books")
        .update(updatedBook)
        .eq("id", updatedBook.id!)
        .eq("user_id", user?.id || ""); // Ensure only the creator can update

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Books"] });
      setEditingBook(null);
    },
  });

  // Use React Query to manage book fetching
  const {
    data: Books = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["Books", { debouncedSearchText }],
    queryFn: () => fetchBooks(debouncedSearchText),
    staleTime: Infinity,
  });

  // Update URL search params when debounced search text changes
  useEffect(() => {
    if (debouncedSearchText && debouncedSearchText.length > 0) {
      const queryString = qs.stringify(
        { searchText: debouncedSearchText },
        { addQueryPrefix: true },
      );

      setSearchParams(queryString);
    } else {
      setSearchParams({});
    }
  }, [debouncedSearchText, setSearchParams]);

  // Handle book deletion
  const handleDeleteBook = (bookId: number) => {
    if (window.confirm("Are you sure you want to delete this book review?")) {
      deleteBookMutation.mutate(bookId);
    }
  };

  // Handle book editing
  const handleEditBook = (book: SingleReview) => {
    setEditingBook(book);
  };

  // Handle update form submission
  const handleUpdateBook = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBook) return;

    updateBookMutation.mutate({
      id: editingBook.id,
      title: editingBook.title,
      description: editingBook.description,
    });
  };

  return (
    <div className="flex h-full w-full flex-col gap-y-10">
      <div className="flex flex-col items-center">
        <div className="mt-10 text-center">
          <h1 className="font-serif text-4xl font-bold text-amber-900 dark:text-amber-600">
            <BookOpen className="mr-2 inline-block h-8 w-8" />
            {t("Review-Translation.BookReviews")}
          </h1>
        </div>
        <CreateReviewForm />
        {/* Edit Dialog */}
        {editingBook && (
          <Dialog
            open={!!editingBook}
            onOpenChange={() => setEditingBook(null)}
          >
            <DialogContent className="rounded-xl bg-white shadow-lg dark:bg-amber-950">
              <DialogHeader>
                <DialogTitle className="text-xl font-bold text-gray-800 dark:text-white">
                  {t("Review-Translation.EditBookReview")}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleUpdateBook} className="space-y-4">
                <Input
                  value={editingBook.title || ""}
                  onChange={(e) =>
                    setEditingBook({
                      ...editingBook,
                      title: e.target.value,
                    })
                  }
                  placeholder="Book Title"
                  className="border-amber-200 bg-gray-50 text-gray-800 placeholder-gray-400 focus:ring-amber-500 dark:border-none dark:bg-amber-900 dark:text-white"
                />
                <Input
                  value={editingBook.description || ""}
                  onChange={(e) =>
                    setEditingBook({
                      ...editingBook,
                      description: e.target.value,
                    })
                  }
                  placeholder="Book Description"
                  className="border-amber-200 bg-gray-50 text-gray-800 placeholder-gray-400 focus:ring-amber-500 dark:border-none dark:bg-amber-900 dark:text-white"
                />
                <Button
                  type="submit"
                  className="w-full bg-amber-500 text-white hover:bg-amber-600 dark:bg-amber-100"
                >
                  {t("Review-Translation.UpdateReview")}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        )}
        <div className="relative w-full rounded-xl border border-amber-200 bg-white/80 p-4 shadow-lg backdrop-blur-sm dark:border-none dark:bg-amber-900 sm:max-w-[60%] md:max-w-[70%] lg:max-w-[80%]">
          <Search className="absolute left-6 top-7 h-5 w-5 text-amber-600" />
          <Controller
            control={control}
            name="searchText"
            render={({ field: { onChange, value } }) => (
              <Input
                onChange={onChange}
                value={value}
                placeholder={t("Review-Translation.EnterSearchText")}
                className="border-amber-200 bg-amber-50 pl-10 focus:border-amber-400 focus:ring-amber-400 dark:border-amber-800 dark:bg-amber-950 dark:focus:border-amber-600 dark:focus:ring-amber-700"
              />
            )}
          />
        </div>
      </div>
      <div className="flex h-full w-full flex-col gap-y-10 px-4 sm:px-16 md:px-32">
        {isLoading && (
          <p className="text-center text-gray-500">Loading Books...</p>
        )}
        {error && (
          <p className="text-center text-red-500">
            Error loading Books: {error.message}
          </p>
        )}
        {Books.map((book) => {
          const bookImageUrl = book?.image_url
            ? `${import.meta.env.VITE_SUPABASE_BOOKS_IMAGES_STORAGE_URL}/${book?.image_url}`
            : "";

          return (
            <div
              key={book.id}
              className="flex w-full max-w-[100%] flex-col gap-y-2 rounded-lg border border-amber-200 bg-card p-4 shadow-md transition-shadow duration-300 hover:shadow-lg dark:border-none dark:bg-amber-950 sm:max-w-[90%] sm:p-6 md:max-w-[80%] lg:max-w-[100%]"
            >
              {bookImageUrl && (
                <div className="overflow-hidden rounded-lg">
                  <img
                    className="max-h-72 w-full object-cover"
                    src={bookImageUrl}
                    alt={book?.title || "book image"}
                  />
                </div>
              )}
              <h3 className="mb-4 line-clamp-2 font-serif text-xl font-bold text-amber-700">
                {book?.title}
              </h3>
              <p className="mb-4 line-clamp-3 text-amber-700">
                {book?.description}
              </p>
              <div className="mb-3 flex items-center gap-2 text-sm text-amber-600">
                <Clock className="h-4 w-4" />
                <span>{formatbookDate(book.created_at)}</span>
              </div>
              {user?.id === book.user_id && (
                <div className="flex flex-col gap-2 sm:flex-row">
                  <Button
                    variant="outline"
                    className="w-full border-amber-200 text-amber-800 hover:bg-amber-100 dark:border-none dark:bg-amber-200 dark:text-gray-900 dark:hover:bg-amber-200 dark:hover:text-gray-800 sm:w-auto"
                    onClick={() => handleEditBook(book)}
                  >
                    {t("Review-Translation.Edit")}
                  </Button>
                  <Button
                    variant="destructive"
                    className="w-full bg-red-500 text-white hover:bg-red-600 dark:bg-red-700 dark:hover:bg-red-800 sm:w-auto"
                    onClick={() => handleDeleteBook(book.id)}
                  >
                    {t("Review-Translation.Delete")}
                  </Button>
                </div>
              )}
            </div>
          );
        })}
        {Books.length === 0 && !isLoading && (
          <p className="text-c text-gray-500 dark:text-white">
            {t("Review-Translation.NoBooksFound")}
          </p>
        )}
      </div>
    </div>
  );
};

export default ReviewView;
