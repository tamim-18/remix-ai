"use client";
import { MessageSquare, Music2 } from "lucide-react";

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
import Empty from "@/components/empty";
import Loader from "@/components/loader";
import LoadingWidget from "@/components/LoadingWidgets";

const MusicPage = () => {
  const router = useRouter();
  const [music, setMusic] = useState<string>();
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
      setMusic(undefined);
      const response = await axios.post("/api/music", values);
      // this is the post request to the backend

      // setting the messages to the new messages
      setMusic(response.data.audio);
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
        title="Music"
        description="Music description"
        icon={Music2}
        iconColor="text-emerald-500"
        bgColor="bg-violet-700/10"
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
                        placeholder="eg: Generate a song of Taylor Swift named Blank Space"
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
          {!music && !isLoading && <Empty label="No Music found" />}
          {/* empty component */}
          {isLoading && <LoadingWidget />}
          {music && (
            <audio controls className=" w-full mt-8">
              <source src={music} />
            </audio>
          )}
        </div>
      </div>
    </div>
  );
};

export default MusicPage;
