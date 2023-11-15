import { ThemeToggle } from "./theme-toggle";

export default function Header() {
  return (
    <div className="border-b  flex flex-row  justify-between p-4">
      <h1 className="font-bold text-xl self-center">SIGMANO DETECTOR</h1>
      <ThemeToggle />
    </div>
  );
}
