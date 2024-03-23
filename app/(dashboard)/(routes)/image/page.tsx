"use client";
import { Download, ImageIcon, MessageSquare } from "lucide-react";

import axios from "axios";
import React, { useState } from "react";

import Heading from "@/components/heading";
import { useForm } from "react-hook-form";

import * as z from "zod";

import { amountOptions, formSchema, resolutionOptions } from "./constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Empty from "@/components/empty";
import Loader from "@/components/loader";
import { cn } from "@/lib/utils";
import UserAvatar from "@/components/user-avatar";
import BotAvatar from "@/components/bot-avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { SelectValue } from "@radix-ui/react-select";
import { Card, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import LoadingWidget from "@/components/LoadingWidgets";

const ImagePage = () => {
  const router = useRouter();
  const [images, setImages] = useState<string[]>([]);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
      amount: "1",
      resolution: "512x512",
    },
  });
  //this is used for validation
  // zodresolver is used for connecting form with zod

  const isLoading = form.formState.isSubmitting;

  /// isloading is extracted from the form.useState, we can also use useState hook
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setImages([]);
      // setting the role
      // setting the content of the user message

      // adding the user message to the messages

      const response = await axios.post("/api/image", values);

      // this is the post request to the backend and passing values to the server
      console.log(values);
      const urls = response.data.map((image: { url: string }) => image.url);

      /// mapping the response data to get the urls

      setImages(urls);
      //urls are the array of string and images are array of string

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
        title="Image"
        description="Image description"
        icon={ImageIcon}
        iconColor="text-pink-500"
        bgColor="bg-pink-700/10"
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
                  <FormItem className=" col-span-12 lg:col-span-6">
                    <FormControl className=" p-0 m-0">
                      <Input
                        {...field}
                        disabled={isLoading}
                        placeholder="eg: Geneate a image of a cat"
                        className=" border-0 outline-none focus-visible: ring-0 focus-visible: ring-transparent"
                      />
                      {/*  {...field} is used instead of manually wrting onBlur and so on*/}
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-2">
                    <Select
                      disabled={isLoading}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue defaultValue={field.value} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {amountOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="resolution"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-2">
                    <Select
                      disabled={isLoading}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue defaultValue={field.value} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {resolutionOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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
          {images.length === 0 && !isLoading && (
            <Empty label="No Images Found" />
          )}
          {/* empty component */}
          {isLoading && <LoadingWidget />}
          <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8">
            {images.map((src) => (
              <Card key={src} className=" rounded-lg overflow-hidden">
                <div className=" relative aspect-square">
                  <Image alt="image" fill src={src} />
                </div>
                <CardFooter className=" p-2">
                  <Button
                    variant="ghost"
                    className=" w-full"
                    onClick={() => window.open(src)}
                  >
                    <Download className=" h-4 w-4 mr-2" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImagePage;
