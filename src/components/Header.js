import Link from "next/link";

export function Header() {
  return (
    <header>
      <h1>Home</h1>
      <button>Administrador</button>
      <Link href="/login">Login</Link>
    </header>
  );
}
