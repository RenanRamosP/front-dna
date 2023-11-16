"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";

const FormSchema = z.object({
  dna: z
    .string()
    .refine((val) => val.search(/[^TGCAtgca]/) === -1, {
      message: "Somente T, G, C e A são permitidos ",
    })
    .refine(
      (val) => {
        const square = Math.sqrt(val.length);
        return square % 1 === 0;
      },
      { message: "O DNA deve ser uma matriz quadrada" }
    ),
});

export function DnaForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      dna: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="dna"
          render={({ field }) => (
            <FormItem>
              <FormLabel>DNA</FormLabel>
              <FormControl>
                <Input placeholder="T|G|C|A" className="uppercase" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Analisar</Button>
      </form>
    </Form>
  );
}
