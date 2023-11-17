import { DNA } from "@/providers/DNA";

export default function ResultBadge({
  type,
}: {
  type: DNA["humanType"]["type"] | "N/C";
}) {
  return (
    <div
      className={`${type === "Sigmano" ? "bg-green-600" : "bg-yellow-500"}  
  text-center px-4 py-8 rounded-md w-2/5 mt-8 text-white text-xl font-bold  `}
    >
      <span>Resultado: {type}</span>
    </div>
  );
}
