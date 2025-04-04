import { Brain, Calendar } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { getAllPosts } from '@/lib/notion';

export const revalidate = 3600; // Revalidate every hour

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm fixed w-full z-50">
        <nav className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center">
              <Brain className="h-8 w-8 text-emerald-500" />
              <span className="ml-2 text-2xl font-bold text-gray-800">Cognitia</span>
            </Link>
            <div className="hidden md:flex space-x-8">
              <Link href="/" className="text-gray-600 hover:text-emerald-500 transition-colors">
                Home
              </Link>
              <Link href="/blog" className="text-emerald-500">
                Blog
              </Link>
            </div>
          </div>
        </nav>
      </header>

      {/* Blog Posts */}
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl font-bold text-gray-800 mb-12">Blog</h1>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post: any) => {
              const properties = post.properties;
              const coverImage = post.cover?.external?.url || post.cover?.file?.url;
              const publishDate = properties.Published?.date?.start;
              
              return (
                <Link 
                  href={`/blog/${properties.Slug.rich_text[0]?.plain_text}`} 
                  key={post.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
                >
                  {coverImage && (
                    <div className="relative h-48 w-full">
                      <Image
                        src={coverImage}
                        alt={properties.Title.title[0]?.plain_text || ''}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex items-center text-sm text-gray-500 mb-2">
                      <Calendar className="h-4 w-4 mr-2" />
                      {publishDate && format(new Date(publishDate), "d 'de' MMMM 'de' yyyy", { locale: ptBR })}
                    </div>
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">
                      {properties.Title.title[0]?.plain_text}
                    </h2>
                    <p className="text-gray-600">
                      {properties.Description?.rich_text[0]?.plain_text}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}