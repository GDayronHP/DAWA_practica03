'use client';
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col justify-between items-center bg-gray-50">
      {/* Barra superior con botón de login */}
      <header className="w-full flex justify-end items-center py-4 px-8 bg-white shadow">
        <button
          onClick={() => router.push('/login')}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md font-medium transition"
        >
          Login
        </button>
      </header>
      {/* Contenido principal */}
      <main className="flex flex-col flex-1 justify-center items-center gap-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4 text-center">
          Sistema de Gestión
        </h1>
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <p className="text-xl text-gray-700 mt-8 text-center">
          Joseph Dyron Huayra Puma
        </p>
      </main>
      <footer className="py-4"></footer>
    </div>
  );
}