import { Input } from "@/components/ui/input";
import CreateBlogForm from "../CreateBlog/CreateBlog";
import { supabase } from "@/supabase";
import { useQuery } from "@tanstack/react-query";
import { useForm, Controller } from "react-hook-form";
import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import qs from "qs";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

type SingleBlog = {
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

const formatBlogDate = (dateString: string) => {
  const blogDate = dayjs(dateString);
  const now = dayjs();

  if (now.diff(blogDate, "day") < 1) {
    return blogDate.fromNow();
  }

  return blogDate.format("HH:mm - DD/MM/YYYY");
};

const fetchBooks = async (searchText?: string): Promise<SingleBlog[]> => {
  // If no search text, fetch all Books
  if (!searchText || searchText.trim() === "") {
    const { data, error } = await supabase
      .from("Books")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data as SingleBlog[];
  }

  // If search text is provided, filter Books
  const { data, error } = await supabase
    .from("Books")
    .select("*")
    .or(`title.ilike.%${searchText}%, description.ilike.%${searchText}%`)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data as SingleBlog[];
};

const BlogView = () => {
  const [searchParams, setSearchParams] = useSearchParams();

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

  // Use React Query to manage blog fetching
  const {
    data: Books = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["Books", { debouncedSearchText }],
    queryFn: () => fetchBooks(debouncedSearchText),
    staleTime: Infinity,
    // enabled: true,
  });

  // Update URL search params when debounced search text changes
  useEffect(() => {
    if (debouncedSearchText && debouncedSearchText.length > 0) {
      const queryString = qs.stringify(
        { searchText: debouncedSearchText },
        { addQueryPrefix: true },
      );

      setSearchParams(queryString); // Update the URL using useSearchParams
      // window.history.replaceState(null, "", queryString);
    } else {
      setSearchParams({}); // Clear the search params
      // window.history.replaceState(null, "", window.location.pathname);
    }
  }, [debouncedSearchText, setSearchParams]);

  return (
    <div className="flex flex-col gap-y-10">
      <CreateBlogForm />
      <div className="flex items-center justify-center gap-x-4 px-44">
        <Controller
          control={control}
          name="searchText"
          render={({ field: { onChange, value } }) => (
            <Input
              onChange={onChange}
              value={value}
              placeholder="Enter Search Text..."
            />
          )}
        />
      </div>
      <div className="flex flex-col gap-y-10 px-32">
        {isLoading && <p className="text-center">Loading Books...</p>}
        {error && (
          <p className="text-center text-red-500">
            Error loading Books: {error.message}
          </p>
        )}
        {Books.map((blog) => {
          const blogImageUrl = blog?.image_url
            ? `${import.meta.env.VITE_SUPABASE_BOOKS_IMAGES_STORAGE_URL}/${blog?.image_url}`
            : "";

          return (
            <div
              key={blog.id}
              className="flex flex-col gap-y-4 border border-gray-400 p-6"
            >
              {blogImageUrl && (
                <div>
                  <img
                    className="max-h-96 w-full border border-black object-cover"
                    src={blogImageUrl}
                    alt={blog?.title || "Blog image"}
                  />
                </div>
              )}
              <div className="text-xl font-bold">{blog?.title}</div>
              <div className="text-gray-700">{blog?.description}</div>
              <div className="text-sm text-gray-500">
                {formatBlogDate(blog.created_at)}
              </div>
            </div>
          );
        })}
        {Books.length === 0 && !isLoading && (
          <p className="text-center text-gray-500">No Books found</p>
        )}
      </div>
    </div>
  );
};

export default BlogView;
