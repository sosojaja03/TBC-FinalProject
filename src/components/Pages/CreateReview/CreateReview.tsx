import { Button } from "../../ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/supabase";
import { Controller, useForm } from "react-hook-form";
// import { UseAuthContext } from "../../Contexts/hooks/AuthContextHook";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { t } from "i18next";

type BooksListCreateValues = {
  title_ka: string;
  title: string;
  description_ka: string;
  description: string;
  image_file: null | File;
};

const BooksListFilterFormDefaultValues = {
  title_ka: "",
  description_ka: "",
  title: "",
  description: "",
  image_file: null,
};

const CreateReviewForm = () => {
  // const { user } = UseAuthContext();
  const queryClient = useQueryClient();

  const { control, handleSubmit, reset } = useForm<BooksListCreateValues>({
    defaultValues: BooksListFilterFormDefaultValues,
  });

  const { mutate: addReview } = useMutation({
    mutationFn: async (formValues: BooksListCreateValues) => {
      if (formValues?.image_file) {
        try {
          const { error, data } = await supabase.storage
            .from("books_images")
            .upload(formValues?.image_file?.name, formValues?.image_file);

          if (error) {
            console.error("Upload error:", error);
            // Display an error message to the user
            alert("Error uploading image. Please try again.");
            return;
          }

          const {
            data: { user },
          } = await supabase.auth.getUser();

          const { error: insertError, data: insertData } = await supabase
            .from("Books")
            .insert({
              title: formValues.title,
              description: formValues.description,
              image_url: data?.fullPath,
              user_id: user?.id,
            });

          if (insertError) {
            console.error("Insert error:", insertError);
            // Display an error message to the user
            alert("Error creating the  review post. Please try again.");
            return;
          }

          console.log("Successfully Created Review: ", insertData);
        } catch (error) {
          console.error("An unexpected error occurred:", error);
          // Display a generic error message to the user
          alert("An unexpected error occurred. Please try again later.");
        }
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Books"] });
    },
  });

  const onSubmit = (data: BooksListCreateValues) => {
    addReview(data);
    reset();
  };

  return (
    <div className="flex flex-col items-center justify-center py-10">
      <div className="flex w-96 flex-col items-center justify-center gap-y-6 rounded-lg border border-amber-200 bg-card p-6 shadow-lg dark:border-none dark:bg-amber-950">
        <Controller
          control={control}
          name="title"
          rules={{ required: "Title is required" }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <div className="w-full">
              <label
                htmlFor="title"
                className="mb-2 block text-sm font-medium text-gray-600 dark:text-amber-200"
              >
                {t("Review-Translation.BookTitle")}
              </label>
              <Input
                id="title"
                onChange={onChange}
                value={value}
                placeholder={t("Review-Translation.BookTitlePlaceholder")}
                className="w-full rounded-lg border border-amber-200 bg-gray-50 p-2 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 dark:border-amber-700 dark:bg-amber-900 dark:text-white dark:placeholder-amber-300"
              />
              {error && (
                <p className="mt-1 text-sm text-red-500">{error.message}</p>
              )}
            </div>
          )}
        />
        <Controller
          control={control}
          name="description"
          rules={{ required: "Description is required" }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <div className="w-full">
              <label
                htmlFor="description"
                className="mb-2 block text-sm font-medium text-gray-600 dark:text-amber-200"
              >
                {t("Review-Translation.Description")}
              </label>
              <Input
                id="description"
                onChange={onChange}
                value={value}
                placeholder={t("Review-Translation.DescriptionPlaceholder")}
                className="w-full rounded-lg border border-amber-200 bg-gray-50 p-2 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 dark:border-amber-700 dark:bg-amber-900 dark:text-white dark:placeholder-amber-300"
              />
              {error && (
                <p className="mt-1 text-sm text-red-500">{error.message}</p>
              )}
            </div>
          )}
        />
        <Controller
          control={control}
          name="image_file"
          render={({ field: { onChange } }) => (
            <div className="w-full">
              <label
                htmlFor="image_file"
                className="mb-2 block text-sm font-medium text-gray-600 dark:text-amber-200"
              >
                {t("Review-Translation.Image")}
              </label>
              <Input
                id="image_file"
                type="file"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  onChange(file);
                }}
                className="w-full rounded-lg border border-amber-200 bg-gray-50 p-2 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 dark:border-amber-700 dark:bg-amber-900 dark:text-white dark:placeholder-amber-300 dark:file:text-white"
              />
            </div>
          )}
        />
        <Button
          className="w-full rounded-lg bg-amber-500 py-2 font-medium text-amber-100 hover:bg-amber-600 dark:bg-amber-600 dark:text-white dark:hover:bg-amber-700"
          onClick={handleSubmit(onSubmit)}
        >
          {t("Review-Translation.LeaveFeedback")}
        </Button>
      </div>
    </div>
  );
};

export default CreateReviewForm;
