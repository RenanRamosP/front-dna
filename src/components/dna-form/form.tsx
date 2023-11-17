"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { DNA, saveDNA } from "@/providers/DNA";
import { zodResolver } from "@hookform/resolvers/zod";
import { Microscope } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ResultBadge from "./result-badge";
import { FormSchema, FormSchemaType } from "./schema";

type State = {
  type: DNA["humanType"]["type"] | "N/C";
  loading: boolean;
};

export function DnaForm() {
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      dna: "",
    },
  });

  const [state, setState] = useState<State>({ loading: false, type: "N/C" });

  useEffect(() => {
    console.log("🚀 ~ file: dna-form.tsx:53 ~ DnaForm ~ state:", state);
  }, [state]);

  function onSubmit(data: FormSchemaType) {
    setState({ ...state, loading: true });
    saveDNA(data.dna.toUpperCase())
      .then((res) => {
        setState({ loading: false, type: res.humanType.type });
        toast({
          title: "DNA analisado:",
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              <span className="text-white">
                {JSON.stringify(res.humanType.type)}
              </span>
            </pre>
          ),
        });
      })
      .catch((err) => {
        setState({ ...state, loading: false });
        toast({
          title: "Falha ao analisar DNA:",
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              <code className="text-white">{JSON.stringify(err)}</code>
            </pre>
          ),
        });
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
                <Input
                  placeholder="Insira a sequência de DNA"
                  className="uppercase"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={state.loading} type="submit" className="w-full py-6 ">
          <Microscope /> Analisar
        </Button>
      </form>
      <ResultBadge type={state.type} />
    </Form>
  );
}
