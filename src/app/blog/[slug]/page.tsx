// app/blog/[slug]/page.tsx
"use client";

import { Brain, Calendar, ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import ReactMarkdown from "react-markdown";
import { useEffect, useState } from "react";

export default function BlogPost({ params }: { params: { slug: string } }) {
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/post/${params.slug}`)
      .then((res) => res.json())
      .then((data) => {
        setPost(data);
        setLoading(false);
      });
  }, [params.slug]);

  if (loading) return <div className="min-h-screen p-8">Carregando...</div>;
  if (!post)
    return <div className="min-h-screen p-8">Post não encontrado.</div>;

  const { page, markdown } = post;
  const publishDate = page?.createdAt;
  const coverImage = page?.files;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm fixed w-full z-50">
        <nav className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center">
              <Image src="/logo.svg" width={60} height={40} alt="logo padrao" />
              <span className="ml-2 text-2xl font-bold text-gray-800">
                Cognitia
              </span>
            </Link>
            <div className="hidden md:flex space-x-8">
              <Link
                href="/"
                className="text-gray-600 hover:text-emerald-500 transition-colors"
              >
                Home
              </Link>
              <Link href="/blog" className="text-emerald-500">
                Blog
              </Link>
            </div>
          </div>
        </nav>
      </header>

      {/* Blog Post Content */}
      <article className="pt-32 pb-20">
        <div className="container max-w-4xl mx-auto px-6">
          <Link
            href="/blog"
            className="inline-flex items-center text-emerald-500 hover:text-emerald-600 mb-8"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar para o blog
          </Link>

          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            {page.title}
          </h1>

          <div className="flex items-center text-sm text-gray-500 mb-8">
            <Calendar className="h-4 w-4 mr-2" />
            {publishDate &&
              format(new Date(publishDate), "d 'de' MMMM 'de' yyyy", {
                locale: ptBR,
              })}
          </div>

          {coverImage && (
            <div className="relative h-[400px] w-full mb-8 rounded-lg overflow-hidden">
              <Image
                src={coverImage.url}
                alt={coverImage.name || ""}
                fill
                className="object-cover"
              />
            </div>
          )}

          <div className="prose prose-emerald max-w-none">
            <ReactMarkdown>{markdown}</ReactMarkdown>
          </div>
        </div>
      </article>
    </div>
  );
}
