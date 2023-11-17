import * as z from "zod";

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

export type FormSchemaType = z.infer<typeof FormSchema>;

export { FormSchema };
