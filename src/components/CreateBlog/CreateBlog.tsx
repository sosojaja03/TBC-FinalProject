import { Button } from "../ui/button";
import { Input } from "@/components/ui/input";
// import { userAtom } from "@/store/auth";
import { supabase } from "@/supabase";
// import { useAtom } from "jotai";
import { Controller, useForm } from "react-hook-form";
import { UseAuthContext } from "../context/hooks/AuthContextHook";

type BlogsListCreateValues = {
  title_ka: string;
  title_en: string;
  description_ka: string;
  description_en: string;
  image_file: null | File;
};

const BlogsListFilterFormDefaultValues = {
  title_ka: "",
  description_ka: "",
  title_en: "",
  description_en: "",
  image_file: null,
};

const CreateBlogForm = () => {
  // const [user] = useAtom(userAtom);
  const { handleSetUser } = UseAuthContext();

  const { control, handleSubmit } = useForm<BlogsListCreateValues>({
    defaultValues: BlogsListFilterFormDefaultValues,
  });

  // const onSubmit = (formValues: BlogsListCreateValues) => {
  //   console.log(formValues);
  //   if (formValues?.image_file) {
  //     supabase.storage
  //       .from("blog_images")
  //       .upload(formValues?.image_file?.name, formValues?.image_file)
  //       .then((res) => {
  //         if (res.error) {
  //           console.error("Upload error:", res.error);
  //         } else {
  //           console.log("Upload successful:", res.data);
  //         }
  //         return supabase.from("blogs").insert({
  //           title_en: formValues.title_en,
  //           description_en: formValues.description_en,
  //           image_url: res.data?.fullPath,
  //           user_id: handleSetUser?.user?.id,
  //         });
  //       })
  //       .then((res) => {
  //         console.log("Successfully Created Blog: ", res);
  //       });
  //   }
  // };
  const onSubmit = async (formValues: BlogsListCreateValues) => {
    console.log(formValues);

    if (formValues?.image_file) {
      try {
        const { error, data } = await supabase.storage
          .from("blog_images")
          .upload(formValues?.image_file?.name, formValues?.image_file);

        if (error) {
          console.error("Upload error:", error);
          // Display an error message to the user
          alert("Error uploading image. Please try again.");
          return;
        }

        console.log("Upload successful:", data);

        const { error: insertError, data: insertData } = await supabase
          .from("blogs")
          .insert({
            title_en: formValues.title_en,
            description_en: formValues.description_en,
            image_url: data?.fullPath,
            user_id: handleSetUser?.user?.id,
          });

        if (insertError) {
          console.error("Insert error:", insertError);
          // Display an error message to the user
          alert("Error creating the blog post. Please try again.");
          return;
        }

        console.log("Successfully Created Blog: ", insertData);
      } catch (error) {
        console.error("An unexpected error occurred:", error);
        // Display a generic error message to the user
        alert("An unexpected error occurred. Please try again later.");
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-y-4">
      <div className="flex w-96 flex-col items-center justify-center gap-y-4">
        <Controller
          control={control}
          name="title_en"
          render={({ field: { onChange, value } }) => {
            return (
              <Input onChange={onChange} value={value} placeholder="Title" />
            );
          }}
        />
        <Controller
          control={control}
          name="description_en"
          render={({ field: { onChange, value } }) => {
            return (
              <Input
                onChange={onChange}
                value={value}
                placeholder="Description"
              />
            );
          }}
        />
        <Controller
          control={control}
          name="image_file"
          render={({ field: { onChange } }) => {
            return (
              <Input
                type="file"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  onChange(file);
                }}
                placeholder="File"
              />
            );
          }}
        />
        <Button onClick={handleSubmit(onSubmit)}>Create Blog</Button>
      </div>
    </div>
  );
};

export default CreateBlogForm;
