import { useModal } from "@/hooks/use-modal-store";
import React, { useEffect, useState } from "react";
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
import { useRouter } from "next/navigation";
import axiosInstance from "@/lib/axios-config";

type Props = {};

const formSchema = z
  .object({
    userEmail: z.string().email().min(1, {
      message: "Please enter your email",
    }),
    code: z.string(),

    userName: z.string().min(1, {
      message: "Please enter your username",
    }),
    userPassword: z.string().min(1, {
      message: "Please enter your password",
    }),
    confirm: z.string(),
  })
  .refine((data) => data.userPassword === data.confirm, {
    message: "Passwords don't match",
    path: ["confirm"],
  });

const RegisterModal = (props: Props) => {
  const { isOpen, onClose, type, onOpen } = useModal();

  const isModalOpen = isOpen && type === "registerModal";

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [countdown, setCountdown] = useState(30);

  // 默认不显示 错误提醒
  const [responseState, setResponseState] = useState(false);
  const [response, setResponse] = useState("");

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userEmail: "",
      code: "",
      userName: "",
      userPassword: "",
      confirm: "",
    },
  });
  const router = useRouter();
  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axiosInstance.post("/api/register", values);

      if (response.data.code == 200) {
        form.reset();
        router.refresh();
        onClose("registerModal");
        setResponseState(false);
      }

      if (response.data.code == 201) {
        setResponseState(true);
        setResponse(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEmail = async () => {
    try {
      setIsButtonDisabled(true);

      setTimeout(() => {
        setIsButtonDisabled(false);
      }, 300000);

      const userEmail = form.getValues("userEmail");

      const response = await axiosInstance.post("/api/register/email", {
        userEmail,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isButtonDisabled) {
      const intervalId = setInterval(() => {
        if (countdown > 1) {
          setCountdown(countdown - 1);
        } else {
          setIsButtonDisabled(false);
          setCountdown(30);
          clearInterval(intervalId);
        }
      }, 1000);

      return () => {
        clearInterval(intervalId);
      };
    }
  }, [isButtonDisabled, countdown]);

  return (
    <>
      <Dialog open={isModalOpen} onOpenChange={() => onClose("registerModal")}>
        <DialogContent>
          {/* Dialog Header */}

          <DialogHeader>
            <DialogTitle>Welcome to CodeCrafters!</DialogTitle>
            <DialogDescription>
              Where you can share tech posts with others!
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
                <div className="flex w-full gap-6">
                  <FormField
                    name="code"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input {...field} placeholder="CODE" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    disabled={isButtonDisabled}
                    className="flex-1"
                    onClick={handleEmail}
                    type="button"
                    value="verify"
                  >
                    {isButtonDisabled
                      ? `Please wait ${countdown}s to resend 🌸`
                      : "Verify Email"}
                  </Button>
                </div>

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
                <FormField
                  control={form.control}
                  name="confirm"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="CONFIRM PASSWORD"
                          type="password"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  name="userName"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input {...field} placeholder="NICKNAME" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <DialogFooter>
                  <Button
                    disabled={isLoading}
                    variant={"outline"}
                    className="w-full"
                    type="submit"
                    value="register"
                  >
                    Register Now
                  </Button>
                </DialogFooter>
              </div>
            </form>
          </Form>

          {responseState && (
            <div className="text-red-500 text-sm">{response}</div>
          )}

          <DialogDescription>
            Already have an account? Let us{" "}
            <button
              disabled={isLoading}
              onClick={() => onOpen("loginModal")}
              className="cursor-pointer underline"
            >
              login
            </button>{" "}
            in!
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default RegisterModal;
