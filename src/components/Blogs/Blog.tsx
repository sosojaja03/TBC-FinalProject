import { Input } from "@/components/ui/input";
import CreateBlogForm from "../CreateBlog/CreateBlog";
import { supabase } from "@/supabase";
import { useQuery, useQueryClient } from "@tanstack/react-query";
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
  description_en: string | null;
  description_ka: string | null;
  image_url: string | null;
  title_en: string | null;
  title_ka: string | null;
  user_id: string | null;
};

type BlogsFilterFormValues = {
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

const fetchBlogs = async (searchText?: string): Promise<SingleBlog[]> => {
  // If no search text, fetch all blogs
  if (!searchText || searchText.trim() === "") {
    const { data, error } = await supabase
      .from("blogs")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data as SingleBlog[];
  }

  // If search text is provided, filter blogs
  const { data, error } = await supabase
    .from("blogs")
    .select("*")
    .or(`title_en.ilike.%${searchText}%, description_en.ilike.%${searchText}%`)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data as SingleBlog[];
};

const BlogView = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryClient = useQueryClient();

  const initialParams = useMemo(
    () => qs.parse(searchParams.toString()) as { searchText?: string },
    [searchParams],
  );

  const { control, watch, setValue } = useForm<BlogsFilterFormValues>({
    defaultValues: {
      searchText: initialParams.searchText || "",
    },
  });

  const watchedSearchText = watch("searchText");
  const debouncedSearchText = useDebounce(watchedSearchText, 500);

  // Use React Query to manage blog fetching
  const {
    data: blogs = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["blogs", { debouncedSearchText }],
    queryFn: () => fetchBlogs(debouncedSearchText),
    staleTime: Infinity,
    // enabled: true,
  });

  // Update URL search params when debounced search text changes
  useEffect(() => {
    if (debouncedSearchText && debouncedSearchText.length > 0) {
      const queryString = qs.stringify(
        {
          searchText: debouncedSearchText,
        },
        {
          addQueryPrefix: true,
        },
      );

      window.history.replaceState(null, "", queryString);
    } else {
      window.history.replaceState(null, "", window.location.pathname);
    }
  }, [debouncedSearchText]);

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
        {isLoading && <p className="text-center">Loading blogs...</p>}
        {error && (
          <p className="text-center text-red-500">
            Error loading blogs: {error.message}
          </p>
        )}
        {blogs.map((blog) => {
          const blogImageUrl = blog?.image_url
            ? `${import.meta.env.VITE_SUPABASE_BLOG_IMAGES_STORAGE_URL}/${blog?.image_url}`
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
                    alt={blog?.title_en || "Blog image"}
                  />
                </div>
              )}
              <div className="text-xl font-bold">{blog?.title_en}</div>
              <div className="text-gray-700">{blog?.description_en}</div>
              <div className="text-sm text-gray-500">
                {formatBlogDate(blog.created_at)}
              </div>
            </div>
          );
        })}
        {blogs.length === 0 && !isLoading && (
          <p className="text-center text-gray-500">No blogs found</p>
        )}
      </div>
    </div>
  );
};

export default BlogView;
