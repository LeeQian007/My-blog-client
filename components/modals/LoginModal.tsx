import { useModal } from "@/hooks/use-modal-store";
import React from "react";
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
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import axiosInstance from "@/lib/axios-config";
import { useRouter } from "next/navigation";
import { userStore } from "@/hooks/user-store";

type Props = {};

const formSchema = z.object({
  userEmail: z
    .string()
    .email()
    .min(1, {
      message: "Please enter your email",
    })
    .refine((username) => username !== "admin", {
      message: "Your username cannot be admin",
    }),
  userPassword: z.string().min(1, {
    message: "Please enter your password!",
  }),
});

const LoginModal = (props: Props) => {
  const { isOpen, onClose, type, onOpen } = useModal();
  const { user, setUser } = userStore();
  const router = useRouter();

  const isModalOpen = isOpen && type === "loginModal";

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userEmail: "",
      userPassword: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axiosInstance.post("/api/login", values);

      if (response.data.code == 200) {
        form.reset();
        router.refresh();
        onClose("loginModal");
        const { user, token } = response.data.data;
        setUser(user);

        // 存token到localStorage
        localStorage.setItem("token", token);
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
            <DialogTitle>Let&apos;s Login In!</DialogTitle>
            <DialogDescription>
              After login in you can publish some posts!
            </DialogDescription>
          </DialogHeader>

          {/* Form */}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="space-y-4">
                <FormField
                  name="userEmail"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input {...field} placeholder="EMAIL" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="userPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="PASSWORD"
                          type="password"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <DialogFooter>
                  <Button
                    //   disabled={isLoading}
                    variant={"outline"}
                    className="w-full"
                  >
                    Sign In
                  </Button>
                </DialogFooter>
              </div>
            </form>
          </Form>

          <DialogDescription>
            Don&apos;t have an account? Let us{" "}
            <button
              onClick={() => onOpen("registerModal")}
              className="cursor-pointer underline"
            >
              register
            </button>{" "}
            one!
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default LoginModal;
