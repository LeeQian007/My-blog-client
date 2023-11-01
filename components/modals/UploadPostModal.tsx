import { useModal } from "@/hooks/use-modal-store";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import axiosInstance from "@/lib/axios-config";
import { Textarea } from "../ui/textarea";
import { useRouter } from "next/navigation";

const MAX_FILE_SIZE = 5000000;

const formSchema = z.object({
  postTitle: z.string().min(6, {
    message: "The minimum characters for post title is 6.",
  }),
  // TODO: post tags
  // uploadFile: z.any().refine((file) => {
  //   return file?.size <= MAX_FILE_SIZE, "Your file should be less than 50MB.";
  // }),
  postContent: z.string().min(1),
});

const UploadPostModal = () => {
  const { isOpen, onClose, type } = useModal();
  const [fileError, setFileError] = useState(false);

  const isModalOpen = isOpen && type === "uploadPost";

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      postTitle: "",
      postContent: "",
    },
  });

  const router = useRouter();
  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axiosInstance.post("/api/post", values);

      if (response.data.code == 200) {
        form.reset();
        router.refresh();
        onClose("uploadPost");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Dialog open={isModalOpen} onOpenChange={() => onClose("loginModal")}>
        <DialogContent>
          {/* Dialog Header */}
          <DialogHeader>
            <DialogTitle>Upload Your Post!</DialogTitle>
            <DialogDescription>
              Please enter your post title and description. Currently only
              &quot;.md&quot; file is acceptable.
            </DialogDescription>
          </DialogHeader>

          {/* Form */}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="space-y-4 ">
                {/* 标题 */}
                <FormField
                  name="postTitle"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input {...field} placeholder="POST TITLE" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* 标签 -- 列表 */}
                {/* <FormField
                  control={form.control}
                  name="postTags"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <FancyMultiSelect />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                /> */}
                {/* 上传文件 */}
                {/* <FormField
                  control={form.control}
                  name="uploadFile"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormControl>
                          <div className="w-full flex items-center justify-center border p-6 rounded-lg relative">
                            <Input
                              type="file"
                              className="w-full h-full absolute opacity-0"
                              accept=".md"
                              id="file"
                              {...field}
                            />
                            {field.value != "" ? (
                              <div className="text-sm text-white uppercase">
                                {field.value}
                              </div>
                            ) : (
                              <p className="text-sm text-muted-foreground uppercase">
                                Click to upload
                              </p>
                            )}
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                /> */}

                <FormField
                  control={form.control}
                  name="postContent"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder="POST CONTENT"
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        version 1.0, upload feature is on the way.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {fileError && (
                  <DialogDescription className="text-red-700 text-sm">
                    Please choose a markdown file to upload.
                  </DialogDescription>
                )}

                <DialogFooter>
                  <Button
                    //   disabled={isLoading}
                    variant={"outline"}
                    className="w-full"
                  >
                    Upload
                  </Button>
                </DialogFooter>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UploadPostModal;
