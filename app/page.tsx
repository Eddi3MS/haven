import { listPostsFeatured } from "@/actions/posts/list-posts-featured"
import { poppins } from "@/app/fonts/fonts"
import { PostCard } from "@/components/post/post-card"
import PostsList from "@/components/post/posts-list"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import Image from "next/image"
import Link from "next/link"
import { IoLogoWhatsapp } from "react-icons/io"

import {
  FaBuilding,
  FaClock,
  FaEnvelope,
  FaFacebookF,
  FaHome,
  FaInstagram,
  FaLinkedinIn,
  FaMapMarkerAlt,
  FaPhone,
  FaSearch,
  FaShieldAlt,
  FaStar,
} from "react-icons/fa"
import HomeSearch from "@/components/home-search"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default async function Home() {
  const featured = await listPostsFeatured()
  return (
    <>
      <div
        className="w-full flex-1 flex flex-col  items-center justify-center gap-4 min-h-[calc(100vh-100px)]"
        style={{
          backgroundImage: "url(/haven.jpg)",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <div
          className="flex flex-col items-center justify-center p-6 rounded-md"
          style={{
            backdropFilter: "blur(5px)", // adds the blur effect behind the content
            WebkitBackdropFilter: "blur(5px)", // Safari support
            backgroundColor: "rgba(0, 0, 0, 0.6)", // semi-transparent background to make the blur visible
          }}
        >
          <h1
            className={`text-[clamp(2.2rem,5vw,80px)] leading-[clamp(3rem,5vw,80px)] text-white ${poppins.className}
           mb-4 text-center md:text-left`}
          >
            Encontre a casa <br />
            dos seus sonhos
          </h1>
          <h2
            className={`text-[clamp(1rem,5vw,1.5rem)] leading-[clamp(1.2rem,5vw,1.8rem)] text-white mb-8 ${poppins.className}`}
          >
            pra comprar ou alugar
          </h2>

          <HomeSearch />
        </div>
      </div>
      <div className="min-h-screen bg-white">
        {/* Featured Properties */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Imóveis em Destaque
            </h2>
            <PostsList posts={featured.data} keyExtractor={(post) => post.id}>
              {(item) => {
                return (
                  <Link key={item.id} href={`/havens/${item.id}`} passHref>
                    <PostCard post={item} />
                  </Link>
                )
              }}
            </PostsList>

            <div className="text-center mt-10">
              <Link href="/havens">
                <Button className="bg-white text-purple-600 border border-purple-600 hover:bg-purple-50">
                  Ver todos os imóveis
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-16" id="about">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="md:w-1/2">
                <h2 className="text-3xl font-bold mb-6">
                  Sobre a HAVEN Samonte
                </h2>
                <p className="text-gray-600 mb-4">
                  A HAVEN Samonte é uma corretora de imóveis especializada em
                  encontrar o lar perfeito para você e sua família. Com anos de
                  experiência no mercado imobiliário, nossa equipe de
                  profissionais qualificados está pronta para ajudar em todas as
                  etapas do processo.
                </p>
                <p className="text-gray-600 mb-6">
                  Seja para comprar, vender ou alugar, oferecemos um serviço
                  personalizado e de alta qualidade, garantindo a melhor
                  experiência possível para nossos clientes.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-start">
                    <div className="bg-purple-100 p-2 rounded-full mr-3">
                      <FaShieldAlt className="text-purple-600" size={16} />
                    </div>
                    <div>
                      <h3 className="font-bold mb-1">Segurança</h3>
                      <p className="text-sm text-gray-600">
                        Transações seguras e transparentes
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-purple-100 p-2 rounded-full mr-3">
                      <FaStar className="text-purple-600" size={16} />
                    </div>
                    <div>
                      <h3 className="font-bold mb-1">Qualidade</h3>
                      <p className="text-sm text-gray-600">
                        Imóveis selecionados e verificados
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-purple-100 p-2 rounded-full mr-3">
                      <FaClock className="text-purple-600" size={16} />
                    </div>
                    <div>
                      <h3 className="font-bold mb-1">Agilidade</h3>
                      <p className="text-sm text-gray-600">
                        Processos rápidos e eficientes
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-purple-100 p-2 rounded-full mr-3">
                      <FaMapMarkerAlt className="text-purple-600" size={16} />
                    </div>
                    <div>
                      <h3 className="font-bold mb-1">Localização</h3>
                      <p className="text-sm text-gray-600">
                        Imóveis nas melhores regiões
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-1/2">
                <div className="relative h-96 rounded-lg shadow-xl">
                  <Image
                    src="/haven.jpg"
                    alt="Equipe HAVEN Samonte"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 bg-gradient-to-r from-purple-500 to-pink-500 text-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Como Funciona
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg text-center">
                <div className="bg-white text-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaSearch size={28} />
                </div>
                <h3 className="text-xl font-bold mb-3">1. Busque Imóveis</h3>
                <p className="text-white/80">
                  Utilize nossos filtros avançados para encontrar o imóvel ideal
                  de acordo com suas necessidades e preferências.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg text-center">
                <div className="bg-white text-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaHome size={28} />
                </div>
                <h3 className="text-xl font-bold mb-3">2. Anuncie Imóveis</h3>
                <p className="text-white/80">
                  Cadastre seu imóvel de forma rápida e prática. Com poucos
                  passos, ele estará visível para milhares de interessados em
                  toda a cidade.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg text-center">
                <div className="bg-white text-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaBuilding size={28} />
                </div>
                <h3 className="text-xl font-bold mb-3">3. Feche o Negócio</h3>
                <p className="text-white/80">
                  Entre em contato diretamente com o anunciante e conclua a
                  negociação de forma simples, segura e sem intermediários.
                </p>
              </div>
            </div>
            <div className="text-center mt-12">
              <Link href="/havens">
                <Button className="bg-white text-purple-600 hover:bg-gray-100">
                  Comece sua busca agora
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              O que nossos clientes dizem
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-purple-200 rounded-full flex items-center justify-center mr-4">
                    <span className="text-purple-600 font-bold">MS</span>
                  </div>
                  <div>
                    <h3 className="font-bold">Maria Silva</h3>
                  </div>
                </div>
                <p className="text-gray-600 italic">
                  &quot;Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Aspernatur, accusantium numquam! Sequi ducimus assumenda dicta
                  quibusdam necessitatibus reprehenderit provident in!&quot;
                </p>
                <div className="flex mt-4">
                  <FaStar className="text-yellow-400" size={18} />
                  <FaStar className="text-yellow-400" size={18} />
                  <FaStar className="text-yellow-400" size={18} />
                  <FaStar className="text-yellow-400" size={18} />
                  <FaStar className="text-yellow-400" size={18} />
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-purple-200 rounded-full flex items-center justify-center mr-4">
                    <span className="text-purple-600 font-bold">JR</span>
                  </div>
                  <div>
                    <h3 className="font-bold">João Rodrigues</h3>
                  </div>
                </div>
                <p className="text-gray-600 italic">
                  &quot;Lorem ipsum dolor sit, amet consectetur adipisicing
                  elit. Facere accusantium excepturi ipsa tenetur! Consequatur,
                  suscipit? Dolore veniam neque blanditiis! Error aliquam
                  dolores, odio provident reiciendis pariatur laboriosam natus
                  illo a!&quot;
                </p>
                <div className="flex mt-4">
                  <FaStar className="text-yellow-400" size={18} />
                  <FaStar className="text-yellow-400" size={18} />
                  <FaStar className="text-yellow-400" size={18} />
                  <FaStar className="text-yellow-400" size={18} />
                  <FaStar className="text-yellow-400" size={18} />
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-purple-200 rounded-full flex items-center justify-center mr-4">
                    <span className="text-purple-600 font-bold">CA</span>
                  </div>
                  <div>
                    <h3 className="font-bold">Carla Almeida</h3>
                  </div>
                </div>
                <p className="text-gray-600 italic">
                  &quot;Lorem ipsum, dolor sit amet consectetur adipisicing
                  elit. Placeat provident optio, error soluta facere
                  sapiente?&quot;
                </p>
                <div className="flex mt-4">
                  <FaStar className="text-yellow-400" size={18} />
                  <FaStar className="text-yellow-400" size={18} />
                  <FaStar className="text-yellow-400" size={18} />
                  <FaStar className="text-yellow-400" size={18} />
                  <FaStar className="text-yellow-400" size={18} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-purple-500 to-pink-500 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">
              Pronto para encontrar seu imóvel ideal?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Comece sua busca agora ou anuncie seu imóvel na HAVEN Samonte e
              aproveite as melhores oportunidades do mercado.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/havens">
                <Button className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-6 text-lg">
                  Buscar Imóveis
                </Button>
              </Link>
              <Link href="/create">
                <Button className="bg-transparent border-2 border-white text-white hover:bg-white/10 px-8 py-6 text-lg">
                  Anunciar Imóvel
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16" id="contact">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Entre em Contato
            </h2>
            <div className="flex flex-col md:flex-row gap-12">
              <div className="md:w-1/2">
                <form className="space-y-4">
                  <div>
                    <Label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Nome
                    </Label>
                    <Input
                      type="text"
                      id="name"
                      placeholder="Seu nome completo"
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Email
                    </Label>
                    <Input
                      type="email"
                      id="email"
                      placeholder="seu.email@exemplo.com"
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Telefone
                    </Label>
                    <Input
                      type="tel"
                      id="phone"
                      placeholder="(00) 00000-0000"
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Mensagem
                    </Label>
                    <Textarea
                      id="message"
                      rows={4}
                      className="w-full"
                      placeholder="Como podemos ajudar?"
                    ></Textarea>
                  </div>
                  <Button
                    disabled
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600"
                  >
                    Enviar Mensagem
                  </Button>
                </form>
              </div>
              <div className="md:w-1/2">
                <div className="bg-gray-50 p-6 rounded-lg h-full">
                  <h3 className="text-xl font-bold mb-6">
                    Informações de Contato
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <FaMapMarkerAlt
                        className="text-purple-600 mr-3 mt-1"
                        size={18}
                      />
                      <div>
                        <h4 className="font-bold">Endereço</h4>
                        <p className="text-gray-600">
                          Av. 123, Centro, Samonte - MG, 35560-000
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <FaPhone
                        className="text-purple-600 mr-3 mt-1"
                        size={18}
                      />
                      <div>
                        <h4 className="font-bold">Telefone</h4>
                        <p className="text-gray-600">(37) 1234-5678</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <IoLogoWhatsapp
                        className="text-purple-600 mr-3 mt-1"
                        size={18}
                      />
                      <div>
                        <h4 className="font-bold">Whatsapp</h4>
                        <p className="text-gray-600">(37) 91234-5678</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <FaEnvelope
                        className="text-purple-600 mr-3 mt-1"
                        size={18}
                      />
                      <div>
                        <h4 className="font-bold">Email</h4>
                        <p className="text-gray-600">
                          contato@havensamonte.com.br
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-8">
                    <h3 className="text-xl font-bold mb-4">
                      Horário de Funcionamento
                    </h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Segunda a Sexta</span>
                        <span className="font-medium">9h às 18h</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Sábado</span>
                        <span className="font-medium">9h às 13h</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Domingo</span>
                        <span className="font-medium">Fechado</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4">HAVEN Samonte</h3>
                <p className="text-gray-400 mb-4">
                  Sua corretora de imóveis de confiança para encontrar o lar dos
                  seus sonhos.
                </p>
                <div className="flex space-x-4">
                  <a href="#" className="text-white hover:text-purple-400">
                    <FaFacebookF size={20} />
                  </a>
                  <a href="#" className="text-white hover:text-purple-400">
                    <FaInstagram size={20} />
                  </a>
                  <a href="#" className="text-white hover:text-purple-400">
                    <FaLinkedinIn size={20} />
                  </a>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-4">Links Rápidos</h3>
                <ul className="space-y-2">
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white">
                      Início
                    </a>
                  </li>
                  <li>
                    <Link
                      href="/havens"
                      className="text-gray-400 hover:text-white"
                    >
                      Imóveis
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/create"
                      className="text-gray-400 hover:text-white"
                    >
                      Anunciar
                    </Link>
                  </li>

                  <li>
                    <Link
                      href="/#about"
                      className="text-gray-400 hover:text-white"
                    >
                      Sobre Nós
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/#contact"
                      className="text-gray-400 hover:text-white"
                    >
                      Contato
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-4">Tipos de Imóveis</h3>
                <ul className="space-y-2">
                  <li>
                    <Link
                      href="/havens?category=SELL"
                      className="text-gray-400 hover:text-white"
                    >
                      Compra
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/havens?category=RENT"
                      className="text-gray-400 hover:text-white"
                    >
                      Aluguel
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-4">Newsletter</h3>
                <p className="text-gray-400 mb-4">
                  Receba as melhores ofertas de imóveis diretamente no seu
                  email.
                </p>
                <div className="flex">
                  <Input
                    type="email"
                    placeholder="Seu email"
                    className="p-2 w-full focus:outline-none rounded-r-none text-white"
                  />
                  <Button className="bg-purple-600 hover:bg-purple-700 rounded-l-none">
                    Assinar
                  </Button>
                </div>
              </div>
            </div>
            <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
              <p>
                &copy; {new Date().getFullYear()} HAVEN Samonte. Todos os
                direitos reservados.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}
