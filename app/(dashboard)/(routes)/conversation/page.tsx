"use client";
import { MessageSquare } from "lucide-react";
import axios from "axios";
import React, { useState } from "react";

import Heading from "@/components/heading";
import { useForm } from "react-hook-form";

import * as z from "zod";

import { formSchema } from "./constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ChatCompletionRequestMessage } from "openai";
import Empty from "@/components/empty";
import Loader from "@/components/loader";
import { cn } from "@/lib/utils";
import UserAvatar from "@/components/user-avatar";
import BotAvatar from "@/components/bot-avatar";

const Convesation = () => {
  const router = useRouter();
  const [messages, setMessages] = useState<ChatCompletionRequestMessage[]>([]);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });
  //this is used for validation
  // zodresolver is used for connecting form with zod

  const isLoading = form.formState.isSubmitting;

  /// isloading is extracted from the form.useState, we can also use useState hook
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const userMessage: ChatCompletionRequestMessage = {
        role: "user",
        content: values.prompt,
      };
      // setting the role
      // setting the content of the user message

      const newMessages = [...messages, userMessage];
      // adding the user message to the messages

      const response = await axios.post("/api/conversation", {
        messages: newMessages,
      });
      // this is the post request to the backend

      setMessages([...newMessages, response.data]);
      // setting the messages to the new messages
      form.reset();
      // resetting the form
    } catch (error: any) {
      // tode open pro model
      console.log(error);
    } finally {
      router.refresh();
    }
  };

  // this is onsubmit method to submit the form content to the backend. the values are the content of the form.

  return (
    <div>
      <Heading
        title="Convesation"
        description="Convesation description"
        icon={MessageSquare}
        iconColor="text-violet-500"
        bgColor="bg-violet-500/10"
      />
      <div className=" px-4 lg:px-8">
        <div>
          <Form {...form}>
            {/* {...form} by we are passing all the contents of the form */}
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="
              rounded-lg 
              border 
              w-full 
              p-4 
              px-3 
              md:px-6 
              focus-within:shadow-sm
              grid
              grid-cols-12
              gap-2
            "
            >
              <FormField
                name="prompt"
                render={({ field }) => (
                  <FormItem className=" col-span-12 lg:col-span-10">
                    <FormControl className=" p-0 m-0">
                      <Input
                        {...field}
                        disabled={isLoading}
                        placeholder="eg: How can I solve my real life problem!!"
                        className=" border-0 outline-none focus-visible: ring-0 focus-visible: ring-transparent"
                      />
                      {/*  {...field} is used instead of manually wrting onBlur and so on*/}
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button
                className=" col-span-12 lg:col-span-2 w-full"
                disabled={isLoading}
              >
                Generate
              </Button>
            </form>
          </Form>
        </div>
        <div className=" space-y-4 mt-4">
          {messages.length === 0 && !isLoading && (
            <Empty label="No conversation found" />
          )}
          {/* empty component */}
          <div className=" flex flex-col-reverse gap-y-4">
            {isLoading && (
              <div className=" p-8 rounded-lg w-full flex items-center justify-center">
                <Loader />
              </div>
            )}
            {messages.map((message) => (
              <div
                key={message.content}
                className={cn(
                  " p-8 w-full flex items-start gap-x-8 rounded-lg",
                  message.role === "user"
                    ? "bg-violet-500/10 justify-end"
                    : "bg-violet-500/20 justify-start"
                )}
              >
                {message.role === "user" ? <UserAvatar /> : <BotAvatar />}
                {message.content}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Convesation;
