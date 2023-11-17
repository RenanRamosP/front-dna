import axios, { AxiosResponse } from "axios";

export type DNA = {
  id: number;
  content: string;
  humanType: { id: number; type: "Humano" | "Sigmano" };
};

type DNAData = { dna: string };
async function saveDNA(dna: string): Promise<DNA> {
  const postResponse = await axios.post<DNAData, AxiosResponse<DNA>>(
    `${process.env.apiUrl}/dna/`,
    {
      dna,
    }
  );

  return postResponse.data;
}

export { saveDNA };
