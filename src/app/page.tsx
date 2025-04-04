import {
  Send,
  Code,
  Phone,
  Mail,
  MapPin,
  Github,
  Linkedin,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm fixed w-full z-50">
        <nav className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Image src="/logo.png" width={40} height={40} alt="logo padrao" />
              <span className="ml-2 text-2xl font-bold text-gray-800">
                Cognitia
              </span>
            </div>
            <div className="hidden md:flex space-x-8">
              <a
                href="#sobre"
                className="text-gray-600 hover:text-emerald-500 transition-colors"
              >
                Sobre
              </a>
              <a
                href="#projetos"
                className="text-gray-600 hover:text-emerald-500 transition-colors"
              >
                Projetos
              </a>
              <Link
                href="/blog"
                className="text-gray-600 hover:text-emerald-500 transition-colors"
              >
                Blog
              </Link>
              <a
                href="#contato"
                className="text-gray-600 hover:text-emerald-500 transition-colors"
              >
                Contato
              </a>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="pt-24 pb-12 md:pt-32 md:pb-20 bg-gradient-to-br from-emerald-50 to-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
                Transformando ideias em soluções tecnológicas
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Desenvolvemos soluções inovadoras para impulsionar seu negócio
                no mundo digital.
              </p>
              <a
                href="#contato"
                className="inline-flex items-center bg-emerald-500 text-white px-8 py-3 rounded-lg hover:bg-emerald-600 transition-colors"
              >
                Fale Conosco
                <Send className="ml-2 h-5 w-5" />
              </a>
            </div>
            <div className="md:w-1/2 relative aspect-video w-full max-w-2xl">
              <Image
                src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80"
                alt="Technology Team"
                fill
                className="rounded-lg shadow-xl object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Sobre Section */}
      <section id="sobre" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Sobre Nós
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-lg hover:bg-gray-50 transition-colors">
              <Code className="h-12 w-12 text-emerald-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-4">Desenvolvimento</h3>
              <p className="text-gray-600">
                Criamos soluções personalizadas com as mais recentes tecnologias
                do mercado.
              </p>
            </div>
            <div className="text-center p-6 rounded-lg hover:bg-gray-50 transition-colors">
              <Image src="/logo.png" width={40} height={40} alt="logo padrao" />
              <h3 className="text-xl font-semibold mb-4">Inovação</h3>
              <p className="text-gray-600">
                Buscamos constantemente novas formas de resolver desafios
                tecnológicos.
              </p>
            </div>
            <div className="text-center p-6 rounded-lg hover:bg-gray-50 transition-colors">
              <Send className="h-12 w-12 text-emerald-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-4">Entrega</h3>
              <p className="text-gray-600">
                Comprometimento com prazos e qualidade em todos os projetos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Projetos Section */}
      <section id="projetos" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Nossos Projetos
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Sistema de Gestão",
                description:
                  "Plataforma completa para gestão empresarial com dashboards e relatórios.",
                image:
                  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
              },
              {
                title: "E-commerce",
                description:
                  "Loja virtual moderna com integração de pagamentos e gestão de estoque.",
                image:
                  "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
              },
              {
                title: "App Mobile",
                description:
                  "Aplicativo multiplataforma com sincronização em tempo real.",
                image:
                  "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
              },
            ].map((projeto, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md overflow-hidden group hover:shadow-xl transition-shadow"
              >
                <div className="relative h-48 w-full">
                  <Image
                    src={projeto.image}
                    alt={projeto.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">
                    {projeto.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{projeto.description}</p>
                  <a
                    href="#"
                    className="text-emerald-500 hover:text-emerald-600 inline-flex items-center"
                  >
                    Saiba mais
                    <svg
                      className="w-4 h-4 ml-2"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contato Section */}
      <section id="contato" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Entre em Contato
          </h2>
          <div className="max-w-3xl mx-auto">
            <form className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Nome
                </label>
                <input
                  type="text"
                  id="name"
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring focus:ring-emerald-200 transition-colors"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring focus:ring-emerald-200 transition-colors"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700"
                >
                  Mensagem
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring focus:ring-emerald-200 transition-colors"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-emerald-500 text-white px-6 py-3 rounded-lg hover:bg-emerald-600 transition-colors flex items-center justify-center"
              >
                Enviar Mensagem
                <Send className="ml-2 h-5 w-5" />
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <Image
                  src="/logo-full2-smal.png"
                  width={60}
                  height={40}
                  alt="logo padrao"
                />
              </div>
              <p className="text-gray-400">
                Transformando o futuro através da tecnologia.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contato</h3>
              <div className="space-y-2">
                <div className="flex items-center group">
                  <Phone className="h-5 w-5 mr-2 text-emerald-500 group-hover:text-emerald-400 transition-colors" />
                  <span className="group-hover:text-emerald-400 transition-colors">
                    (11) 9999-9999
                  </span>
                </div>
                <div className="flex items-center group">
                  <Mail className="h-5 w-5 mr-2 text-emerald-500 group-hover:text-emerald-400 transition-colors" />
                  <span className="group-hover:text-emerald-400 transition-colors">
                    contato@cognitia.com.br
                  </span>
                </div>
                <div className="flex items-center group">
                  <MapPin className="h-5 w-5 mr-2 text-emerald-500 group-hover:text-emerald-400 transition-colors" />
                  <span className="group-hover:text-emerald-400 transition-colors">
                    São Paulo, SP
                  </span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Redes Sociais</h3>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-gray-400 hover:text-emerald-500 transition-colors"
                >
                  <Github className="h-6 w-6" />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-emerald-500 transition-colors"
                >
                  <Linkedin className="h-6 w-6" />
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>
              © {new Date().getFullYear()} Cognitia Tecnologia. Todos os
              direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
