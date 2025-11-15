import React, {
  useState,
  useMemo,
  useCallback,
  useEffect,
  useRef,
} from "react";
import {
  ChevronLeft,
  ChevronRight,
  X,
  ShoppingCart,
  Instagram,
  Plus,
  Minus,
  Trash2,
  Tag,
  Wrench,
  Calculator,
  Package,
  HelpCircle,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Zap,
  Wind,
  Thermometer,
  Sparkles,
  Search,
  Sun,
  Moon,
  Menu,
  ChevronDown,
  AirVentIcon,
} from "lucide-react";
// A biblioteca framer-motion é usada para as animações.
// Em um projeto real, ela precisaria ser instalada com `npm install framer-motion`
import { motion, AnimatePresence } from "framer-motion";
import { products } from "../../data/products";
import { services } from "../../data/services";
import { carousselImagesData } from "../../data/carouselImagesData";
// --- Ícone do WhatsApp como SVG (Versão Corrigida) ---
const WhatsAppIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    {...props}
  >
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.894 11.892-1.99 0-3.903-.52-5.586-1.456l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.886-.001 2.267.655 4.398 1.803 6.12l-1.34 4.885 4.885-1.34z" />
  </svg>
);

// --- CONFIGURAÇÃO CENTRAL DE INFORMAÇÕES ---
const CONTACT_INFO = {
  phone: "(61) 99665-4539",
  whatsappNumber: "5561996654539",
  instagramUser: "estacaoclima2104",
  email: "",
  address: "Formosa, GO",
  mapSrc:
    "https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3844.0237294315043!2d-47.29407772487529!3d-15.536858585068146!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTXCsDMyJzEyLjciUyA0N8KwMTcnMjkuNCJX!5e0!3m2!1spt-BR!2sbr!4v1743957220589!5m2!1spt-BR!2sbr",
};

const PROMOTIONS_CONFIG = {
  50: { active: true, discount: 6 },
};

//cart

// --- FUNÇÃO PARA PROCESSAR OS DADOS DOS PRODUTOS ---
const processRawProductData = (rawData, promotions) => {
  const groupedByCategory = rawData.reduce((acc, product) => {
    const category = product.type[0];
    if (!acc[category]) {
      acc[category] = [];
    }
    const promotion =
      promotions[product.id] && promotions[product.id].active
        ? promotions[product.id]
        : null;
    const variants = product.info.map((variantInfo, index) => {
      const infoText = variantInfo.item;
      const match =
        infoText.match(/(.+) - R\$ ([\d,]+)(\/m)?/i) ||
        infoText.match(/(.+) - \(R\$ ([\d,]+) o Metro\)/i) ||
        infoText.match(/Rolo com (.+) - R\$ ([\d,]+)/i);
      let name,
        originalPrice,
        byMeter = false;
      if (match) {
        if (infoText.includes("o Metro")) {
          name = `4 Vias Bitola 1.5MM`;
          originalPrice = parseFloat(match[2].replace(",", "."));
          byMeter = true;
        } else if (infoText.includes("Rolo com")) {
          name = `Rolo com ${match[1]}`;
          originalPrice = parseFloat(match[2].replace(",", "."));
        } else {
          name = match[1].trim();
          originalPrice = parseFloat(match[2].replace(",", "."));
          byMeter =
            (match[3] && match[3].toLowerCase() === "/m") ||
            infoText.toLowerCase().includes("/m");
        }
      } else {
        const parts = infoText.split(" - R$ ");
        name = parts[0];
        originalPrice = parseFloat(parts[1].replace(",", "."));
      }
      const variantData = {
        id: `${product.id}-${index}`,
        name,
        price: originalPrice,
        originalPrice: originalPrice,
        byMeter,
        isOnSale: false,
        discountPercentage: 0,
      };
      if (promotion) {
        variantData.isOnSale = true;
        variantData.discountPercentage = promotion.discount;
        variantData.price = originalPrice * (1 - promotion.discount / 100);
      }
      return variantData;
    });
    acc[category].push({
      id: product.id,
      name: product.name,
      image: product.image,
      variants,
    });
    return acc;
  }, {});
  return Object.keys(groupedByCategory).map((category) => ({
    category,
    items: groupedByCategory[category],
  }));
};

// --- DADOS ---
const rawProductData = products;
const productData = processRawProductData(rawProductData, PROMOTIONS_CONFIG);
const servicesData = services;
const carouselImages = carousselImagesData;
const faqData = [
  {
    q: "Como escolher o ar condicionado ideal?",
    a: "Utilize nossa calculadora de BTUs! Ela considera o tamanho do ambiente, incidência solar, número de pessoas e aparelhos eletrônicos para recomendar a potência correta e garantir seu conforto e economia.",
  },
  {
    q: "O que é a tecnologia Inverter?",
    a: "A tecnologia Inverter ajusta a velocidade do compressor para manter a temperatura desejada sem desligar, evitando picos de energia. Isso resulta em uma economia de até 60% na conta de luz e um funcionamento mais silencioso.",
  },
  {
    q: "Qual a importância da instalação profissional?",
    a: "Uma instalação correta garante a eficiência do aparelho, previne vazamentos de gás e aumenta a vida útil do seu ar condicionado. Conte com nossos técnicos certificados.",
  },
  {
    q: "De quanto em quanto tempo devo fazer a limpeza?",
    a: "Recomendamos a limpeza dos filtros mensalmente e uma manutenção profissional completa anualmente. Isso garante a qualidade do ar que você respira e a eficiência energética do equipamento.",
  },
];

// --- COMPONENTES ---

// Componente para animações de scroll
const AnimateOnScroll = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.9, ease: "easeOut" }}
  >
    {children}
  </motion.div>
);

const Header = ({
  onCartClick,
  cartItemCount,
  onSearchClick,
  onToggleTheme,
  theme,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg shadow-md sticky top-0 z-40 transition-colors">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <img
            src="/logo.png"
            className="w-40 bg-purple-950 dark:bg-transparent rounded-full p-1"
            alt="logo"
          />
          <nav className="hidden md:flex items-center space-x-6">
            <a
              href="#produtos"
              className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-500 transition-colors"
            >
              <Package size={18} />
              <span>Produtos</span>
            </a>
            <a
              href="#servicos"
              className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-500 transition-colors"
            >
              <Wrench size={18} />
              <span>Serviços</span>
            </a>
            <a
              href="#calculadora"
              className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-500 transition-colors"
            >
              <Calculator size={18} />
              <span>Calculadora</span>
            </a>
            <a
              href="#faq"
              className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-500 transition-colors"
            >
              <HelpCircle size={18} />
              <span>FAQ</span>
            </a>
          </nav>
          <div className="flex items-center space-x-2">
            <button
              onClick={onSearchClick}
              className="hidden md:block p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              <Search className="text-gray-700 dark:text-gray-300" />
            </button>
            <button
              onClick={onCartClick}
              className="relative p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              <ShoppingCart className="text-gray-700 dark:text-gray-300" />
              {cartItemCount > 0 && (
                <span className="absolute top-0 right-0 block h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setIsMenuOpen(true)}
              className="md:hidden p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              <Menu className="text-gray-700 dark:text-gray-300" />
            </button>
          </div>
        </div>
      </header>
      <MobileMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onSearchClick={onSearchClick}
      />
    </>
  );
};

// MENU NAVBAR
const MobileMenu = ({ isOpen, onClose, onSearchClick }) => {
  const menuVariants = {
    hidden: { x: "100%" },
    visible: { x: 0, transition: { duration: 0.3, ease: "easeInOut" } },
    exit: { x: "100%", transition: { duration: 0.3, ease: "easeInOut" } },
  };

  const handleSearchClick = () => {
    onClose();
    onSearchClick();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/50 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed top-0 right-0 h-full w-4/5 max-w-sm bg-white dark:bg-gray-900 shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 flex justify-end">
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                <X className="text-gray-700 dark:text-gray-300" />
              </button>
            </div>
            <nav className="flex flex-col p-6 space-y-6">
              <a
                href="#produtos"
                onClick={onClose}
                className="flex items-center space-x-4 text-lg text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-500"
              >
                <Package />
                <span>Produtos</span>
              </a>
              <a
                href="#servicos"
                onClick={onClose}
                className="flex items-center space-x-4 text-lg text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-500"
              >
                <Wrench />
                <span>Serviços</span>
              </a>
              <a
                href="#calculadora"
                onClick={onClose}
                className="flex items-center space-x-4 text-lg text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-500"
              >
                <Calculator />
                <span>Calculadora</span>
              </a>
              <a
                href="#faq"
                onClick={onClose}
                className="flex items-center space-x-4 text-lg text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-500"
              >
                <HelpCircle />
                <span>FAQ</span>
              </a>
              <button
                onClick={handleSearchClick}
                className="flex items-center space-x-4 text-lg text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-500"
              >
                <Search />
                <span>Pesquisar</span>
              </button>
            </nav>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
//####################

// CAROUSEL DE IMAGENS
const ImageCarousel = ({ images, onImageClick }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const handleNext = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  }, [images.length]);
  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX || e.touches[0].pageX);
    e.preventDefault();
  };
  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const x = e.pageX || e.touches[0].pageX;
    setTranslateX(x - startX);
  };
  const handleMouseUp = () => {
    setIsDragging(false);
    if (translateX < -50) {
      handleNext();
    } else if (translateX > 50) {
      handlePrev();
    }
    setTranslateX(0);
  };
  useEffect(() => {
    const interval = setInterval(handleNext, 5000);
    return () => clearInterval(interval);
  }, [handleNext]);
  return (
    <AnimateOnScroll>
      <div className="w-full items-center justify-center flex flex-col lg:bg-gray-800 rounded-md">
        <div
          className="items-center justify-center flex flex-col relative w-full overflow-hidden rounded-lg my-8  lg:mx-auto"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleMouseDown}
          onTouchMove={handleMouseMove}
          onTouchEnd={handleMouseUp}
        >
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(calc(-${
                currentIndex * 100
              }% + ${translateX}px))`,
            }}
          >
            {images.map((img) => (
              <div
                key={img.id}
                className="w-full flex-shrink-0"
                onClick={() =>
                  !isDragging && translateX === 0 && onImageClick(img.src)
                }
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-164 md:h-96 object-cover lg:object-contain cursor-pointer"
                />
                <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/60 to-transparent p-6">
                  <h2 className="text-white text-2xl md:text-4xl font-bold">
                    {img.alt}
                  </h2>
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={handlePrev}
            className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/50 hover:bg-white p-2 rounded-full shadow-md transition-all z-10"
          >
            <ChevronLeft />
          </button>
          <button
            onClick={handleNext}
            className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/50 hover:bg-white p-2 rounded-full shadow-md transition-all z-10"
          >
            <ChevronRight />
          </button>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
            {images.map((_, index) => (
              <div
                key={index}
                className={`h-2 w-2 rounded-full ${
                  currentIndex === index ? "bg-white" : "bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </AnimateOnScroll>
  );
};
//#####################

// CARDE DE PRODUTOS
const ProductCard = React.forwardRef(({ product, onAddToCart }, ref) => {
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const selectedVariant = product.variants[selectedVariantIndex];
  const handleAddToCartClick = () => {
    onAddToCart(product, selectedVariant, quantity);
    setQuantity(1);
  };

  return (
    <div
      ref={ref}
      className="w-full lg:items-center gap-5 lg:hover:scale-105 lg:rounded-xl mx-auto cardProducts bg-blue-50 dark:bg-gray-800 rounded-2xl shadow-lg shadow-blue-900/10 dark:shadow-gray-900/10 hover:shadow-blue-950/40 dark:hover:shadow-gray-950/40 overflow-hidden flex flex-col lg:grid lg:grid-cols-2 lg:gap-3 lg:min-w-[400px] transition-transform relative scroll-mt-20"
    >
      {selectedVariant.isOnSale && (
        <div className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center space-x-1 z-10 animate-pulse duration-500 ease-in-out">
          <Tag size={14} />
          <span>{selectedVariant.discountPercentage}% OFF</span>
        </div>
      )}
      <img
        src={product.image}
        alt={product.name}
        className="w-full lg:bg-cover lg:bg-center lg:max-h-[300px] lg:h-full bg-white h-52 object-contain transition-all ease-in-out  duration-300"
      />
      <div className="py-5 px-4 flex flex-col lg:h-full flex-grow">
        <h3 className="text-xl font-bold text-gray-800 text-center dark:text-gray-200 mb-2 flex-grow">
          {product.name}
        </h3>
        {product.variants.length > 1 && (
          <div className="mb-4 relative">
            <label
              htmlFor={`variant-${product.id}`}
              className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1"
            >
              Opção:
            </label>
            <select
              id={`variant-${product.id}`}
              value={selectedVariantIndex}
              onChange={(e) => setSelectedVariantIndex(e.target.value)}
              className="w-full cursor-pointer appearance-none pl-3 pr-10 py-2 border border-gray-300 dark:border-gray-600 bg-purple-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200 rounded-2xl shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
            >
              {product.variants.map((variant, index) => (
                <option key={variant.id} value={index}>
                  {variant.name}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 top-7 flex items-center px-2 text-gray-700 dark:text-gray-300">
              <ChevronDown size={20} />
            </div>
          </div>
        )}
        <div className="mt-auto">
          <div className="mb-4 h-14 justify-center flex lg:items-center lg:justify-center gap-1">
            {selectedVariant.isOnSale ? (
              <div>
                <p className="text-base text-gray-400 dark:text-gray-500 line-through">
                  R${" "}
                  {selectedVariant.originalPrice.toFixed(2).replace(".", ",")}
                </p>
                <p className="text-3xl font-bold text-red-600">
                  R$ {selectedVariant.price.toFixed(2).replace(".", ",")}
                </p>
              </div>
            ) : (
              <p className="text-3xl lg:text-xl font-bold lg:font-extrabold text-blue-600 dark:text-blue-500">
                R$ {selectedVariant.price.toFixed(2).replace(".", ",")}
              </p>
            )}
            {selectedVariant.byMeter && !selectedVariant.isOnSale && (
              <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                {" "}
                / metro
              </span>
            )}
            {selectedVariant.byMeter && selectedVariant.isOnSale && (
              <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                {" "}
                / metro (promo)
              </span>
            )}
          </div>
          {selectedVariant.byMeter && (
            <div className="flex items-center space-x-2 mb-4">
              <label
                htmlFor={`quantity-${product.id}`}
                className="text-sm font-medium text-gray-800 dark:text-gray-400"
              >
                Metragem:
              </label>
              <input
                type="number"
                id={`quantity-${product.id}`}
                value={quantity}
                onChange={(e) =>
                  setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                }
                className="w-20 border-gray-300 px-2 py-1 text-center text-lg font-bold dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          )}
          <button
            onClick={handleAddToCartClick}
            className="w-ful mx-auto lg:p-2 lg:text-xs bg-blue-700 hover:bg-blue-600 dark:hover:bg-blue-900 dark:bg-blue-800  text-white font-bold py-2 px-4 rounded-2xl transition-all flex items-center justify-center space-x-2"
          >
            <ShoppingCart className="lg:w-[17px] lg:h-[17px]" size={25} />
            <span>Adicionar ao Carrinho</span>
          </button>
        </div>
      </div>
    </div>
  );
});
//########################

// LISTÁGEM DE PRODUTOS E TAGS
const ProductList = ({ products, onAddToCart, categoryRefs, productRefs }) => {
  const handleFilterClick = (category) => {
    categoryRefs.current[category].scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <section id="produtos" className="py-12">
      <AnimateOnScroll>
        <div className="mb-8">
          <h3 className="text-xl font-bold text-gray-700 dark:text-gray-300 mb-4">
            Navegue por Categorias
          </h3>
          <div className="flex flex-wrap gap-2">
            {products.map(({ category }) => (
              <button
                key={category}
                onClick={() => handleFilterClick(category)}
                className="px-4 py-2 bg-blue-50 shadow-lg hover:shadow-blue-950/40 dark:bg-gray-700  dark:text-gray-300 rounded-full hover:bg-blue-900 dark:hover:bg-blue-950 hover:text-white dark:hover:text-white transition-colors"
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </AnimateOnScroll>
      {products.map(({ category, items }) => (
        <div
          key={category}
          ref={(el) => (categoryRefs.current[category] = el)}
          className="px-6 lg:px-0 justify-center items-center mb-12 mt-24 scroll-mt-20"
        >
          <AnimateOnScroll>
            <h2 className="flex gap-3 text-xl lg:text-4xl font-bold text-gray-800 dark:text-gray-200 mb-10 dark:border-blue-500 justify-center md:pl-4 bg-blue-300/40 p-2 rounded-full">
              <AirVentIcon
                className="text-blue-500 flex items-center justify-center"
                size={33}
              />{" "}
              {category}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {items.map((product) => (
                <ProductCard
                  key={product.id}
                  ref={(el) => (productRefs.current[product.id] = el)}
                  product={product}
                  onAddToCart={onAddToCart}
                />
              ))}
            </div>
          </AnimateOnScroll>
        </div>
      ))}
    </section>
  );
};
//#####################

// CARD DE DETALHES DE SERVIÇOS
const DetailedServices = () => (
  <section
    id="servicos"
    className="py-16 bg-gray-100 dark:bg-gray-800 rounded-lg"
  >
    <AnimateOnScroll>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200">
            Nossos Diferenciais em Serviços
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Qualidade e confiança em cada detalhe, da instalação à manutenção.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-lg">
            <div className="flex items-center mb-4">
              <div className="bg-blue-100 text-blue-600 p-3 rounded-full mr-4">
                <Wrench size={24} />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                Instalação Profissional
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Garantimos uma instalação segura e eficiente, seguindo todas as
              normas técnicas para maximizar o desempenho e a vida útil do seu
              equipamento.
            </p>
            <ul className="space-y-4 text-gray-700 dark:text-gray-300">
              <li className="flex items-start">
                <ShieldCheck className="text-green-500 mt-1 mr-3 flex-shrink-0" />
                <span>
                  <strong>Técnicos Certificados:</strong> Equipe qualificada e
                  experiente para todos os modelos de ar condicionado.
                </span>
              </li>
              <li className="flex items-start">
                <Zap className="text-green-500 mt-1 mr-3 flex-shrink-0" />
                <span>
                  <strong>Máxima Eficiência:</strong> Posicionamento estratégico
                  e vácuo no sistema para garantir o melhor rendimento
                  energético.
                </span>
              </li>
              <li className="flex items-start">
                <Sparkles className="text-green-500 mt-1 mr-3 flex-shrink-0" />
                <span>
                  <strong>Acabamento Impecável:</strong> Cuidado com a estética
                  do ambiente, com furações precisas e limpeza total após o
                  serviço.
                </span>
              </li>
            </ul>
          </div>
          <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-lg">
            <div className="flex items-center mb-4">
              <div className="bg-blue-100 text-blue-600 p-3 rounded-full mr-4">
                <Wind size={24} />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                Manutenção e Limpeza
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              A manutenção preventiva é essencial para a qualidade do ar que
              você respira e para evitar gastos inesperados com consertos e alto
              consumo de energia.
            </p>
            <ul className="space-y-4 text-gray-700 dark:text-gray-300">
              <li className="flex items-start">
                <ShieldCheck className="text-green-500 mt-1 mr-3 flex-shrink-0" />
                <span>
                  <strong>Saúde em Primeiro Lugar:</strong> Higienização
                  completa que elimina 99% de ácaros, fungos e bactérias.
                </span>
              </li>
              <li className="flex items-start">
                <Thermometer className="text-green-500 mt-1 mr-3 flex-shrink-0" />
                <span>
                  <strong>Verificação Completa:</strong> Análise de pressão do
                  gás, componentes elétricos e funcionamento geral do aparelho.
                </span>
              </li>
              <li className="flex items-start">
                <Zap className="text-green-500 mt-1 mr-3 flex-shrink-0" />
                <span>
                  <strong>Redução de Custos:</strong> Um aparelho limpo e bem
                  regulado consome menos energia e tem menos chances de quebrar.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </AnimateOnScroll>
  </section>
);

const ServicesCarousel = ({ services }) => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    const { current } = scrollRef;
    if (current) {
      const scrollAmount =
        direction === "left" ? -current.offsetWidth : current.offsetWidth;
      current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section
      id="servicos-realizados"
      className="py-16 bg-white dark:bg-gray-900"
    >
      <AnimateOnScroll>
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200 border-l-4 border-blue-600 dark:border-blue-500 pl-4">
              Serviços Realizados
            </h2>
            <div className="hidden md:flex space-x-2">
              <button
                onClick={() => scroll("left")}
                className="bg-gray-200 dark:bg-gray-700 p-2 rounded-full shadow hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                <ChevronLeft className="text-gray-700 dark:text-gray-300" />
              </button>
              <button
                onClick={() => scroll("right")}
                className="bg-gray-200 dark:bg-gray-700 p-2 rounded-full shadow hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                <ChevronRight className="text-gray-700 dark:text-gray-300" />
              </button>
            </div>
          </div>
          <div
            ref={scrollRef}
            className="flex space-x-6 overflow-x-auto pb-4 scroll-smooth scrollbar-hide"
          >
            {services.map((service) => (
              <div
                key={service.id}
                className="flex-shrink-0 w-72 bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden group"
              >
                <div className="relative">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-96 h-96 object-cover lg:object-contain transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 flex items-center space-x-2">
                    <Wrench
                      className="text-white bg-black/50 shadow-md shadow-black p-1 size-8 rounded-full"
                      size={20}
                    />
                    <h3 className="text-white text-lg font-semibold">
                      {service.title}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </AnimateOnScroll>
    </section>
  );
};
//###########

// CALCULADORA DE BTUS
const BTUCalculator = ({ onCalculate }) => {
  const [areaMode, setAreaMode] = useState("m2");
  const [formData, setFormData] = useState({
    area: "",
    width: "",
    length: "",
    people: "",
    devices: "",
    sun: "manha",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const { area, width, length, people, devices, sun } = formData;
    let calculatedArea = 0;
    if (areaMode === "m2") {
      if (!area) {
        alert("Por favor, preencha a área.");
        return;
      }
      calculatedArea = parseFloat(area);
    } else {
      if (!width || !length) {
        alert("Por favor, preencha a largura e o comprimento.");
        return;
      }
      calculatedArea = parseFloat(width) * parseFloat(length);
    }
    if (!people || !devices) {
      alert("Por favor, preencha todos os campos para calcular.");
      return;
    }
    const peopleNum = parseInt(people, 10);
    const devicesNum = parseInt(devices, 10);
    let btuResult =
      calculatedArea * 600 +
      (peopleNum > 0 ? (peopleNum - 1) * 600 : 0) +
      devicesNum * 600;
    if (sun === "tarde") {
      btuResult += calculatedArea * 200;
    }
    onCalculate(Math.ceil(btuResult));
  };
  return (
    <section id="calculadora" className="py-16">
      <AnimateOnScroll>
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200">
            Calculadora de BTUs Eficaz
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Preencha os dados e encontre a potência ideal para o seu ambiente.
          </p>
        </div>
        <form
          onSubmit={handleSubmit}
          className="max-w-xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg space-y-6"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Como deseja informar a área?
            </label>
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={() => setAreaMode("m2")}
                className={`w-full py-2 rounded-lg transition-colors ${
                  areaMode === "m2"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                }`}
              >
                Metros Quadrados (m²)
              </button>
              <button
                type="button"
                onClick={() => setAreaMode("dimensions")}
                className={`w-full py-2 rounded-lg transition-colors ${
                  areaMode === "dimensions"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                }`}
              >
                Largura x Comprimento
              </button>
            </div>
          </div>
          {areaMode === "m2" ? (
            <div>
              <label
                htmlFor="area"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Área do Ambiente (m²)
              </label>
              <input
                type="number"
                name="area"
                id="area"
                value={formData.area}
                onChange={handleChange}
                placeholder="Ex: 25"
                className="py-2 px-1 w-full border-gray-300 dark:border-gray-600 bg-blue-100 dark:bg-gray-700 text-gray-900 dark:text-gray-200 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                required={areaMode === "m2"}
              />
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="width"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Largura (m)
                </label>
                <input
                  type="number"
                  name="width"
                  id="width"
                  value={formData.width}
                  onChange={handleChange}
                  placeholder="Ex: 5"
                  className="px-1 py-2 w-full border-gray-300 dark:border-gray-600 bg-blue-100 dark:bg-gray-700 text-gray-900 dark:text-gray-200 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  required={areaMode === "dimensions"}
                />
              </div>
              <div>
                <label
                  htmlFor="length"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Comprimento (m)
                </label>
                <input
                  type="number"
                  name="length"
                  id="length"
                  value={formData.length}
                  onChange={handleChange}
                  placeholder="Ex: 5"
                  className="px-1 py-2 w-full border-gray-300 dark:border-gray-600 bg-blue-100 dark:bg-gray-700 text-gray-900 dark:text-gray-200 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  required={areaMode === "dimensions"}
                />
              </div>
            </div>
          )}
          <div>
            <label
              htmlFor="people"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Número de Pessoas
            </label>
            <input
              type="number"
              name="people"
              id="people"
              value={formData.people}
              onChange={handleChange}
              placeholder="Ex: 2"
              className="py-2 px-1 w-full border-gray-300 dark:border-gray-600 bg-blue-100 dark:bg-gray-700 text-gray-900 dark:text-gray-200 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="devices"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Aparelhos Eletrônicos (TV, PC, etc.)
            </label>
            <input
              type="number"
              name="devices"
              id="devices"
              value={formData.devices}
              onChange={handleChange}
              placeholder="Ex: 3"
              className="py-2 px-1 w-full border-gray-300 dark:border-gray-600 bg-blue-100 dark:bg-gray-700 text-gray-900 dark:text-gray-200 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Incidência de Sol no Ambiente
            </label>
            <div className="flex space-x-4 mt-2">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, sun: "manha" })}
                className={`w-full py-2 rounded-lg transition-colors ${
                  formData.sun === "manha"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                }`}
              >
                Sol da Manhã
              </button>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, sun: "tarde" })}
                className={`w-full py-2 rounded-lg transition-colors ${
                  formData.sun === "tarde"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                }`}
              >
                Sol da Tarde
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition-all flex items-center justify-center space-x-2"
          >
            <Calculator size={20} />
            <span>Calcular BTUs</span>
          </button>
        </form>
      </AnimateOnScroll>
    </section>
  );
};
//###############


// MODAL DA CALCULADORA DE BTUS
const BTUResultModal = ({ isOpen, onClose, btuResult }) => {
  if (!isOpen) return null;
  const handleContact = () => {
    const message = `Olá! Calculei a potência para meu ambiente e o resultado foi ${btuResult.toLocaleString(
      "pt-BR"
    )} BTUs. Gostaria de falar com um especialista.`;
    window.open(
      `https://wa.me/${CONTACT_INFO.whatsappNumber}?text=${encodeURIComponent(
        message
      )}`,
      "_blank"
    );
  };
  return (
    <div
      className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl w-full max-w-md p-8 text-center relative animate-fade-in-up"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
        >
          <X size={24} />
        </button>
        <div className="bg-blue-100 text-blue-600 p-4 rounded-full inline-block mb-4">
          <Calculator size={40} />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">
          Cálculo Realizado!
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          A potência necessária para seu ambiente é de aproximadamente:
        </p>
        <p className="text-5xl font-extrabold text-blue-600 dark:text-blue-500 my-4">
          {btuResult.toLocaleString("pt-BR")} BTUs
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 p-3 rounded-md">
          Recomendamos escolher um aparelho com a capacidade comercial{" "}
          <strong>imediatamente superior</strong> a este valor para garantir a
          eficiência.
        </p>
        <button
          onClick={handleContact}
          className="mt-6 w-full bg-green-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-600 transition-all flex items-center justify-center space-x-2"
        >
          <WhatsAppIcon className="w-6 h-6" />
          <span>Fale com um Especialista</span>
        </button>
      </div>
    </div>
  );
};

const FaqItem = ({ q, a }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b dark:border-gray-700">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left py-4 flex justify-between items-center text-gray-800 dark:text-gray-200"
      >
        <span className="font-semibold">{q}</span>
        <ChevronRight
          className={`transform transition-transform ${
            isOpen ? "rotate-90" : ""
          }`}
        />
      </button>
      {isOpen && (
        <div className="pb-4 text-gray-600 dark:text-gray-400">{a}</div>
      )}
    </div>
  );
};

const Faq = ({ data }) => (
  <section id="faq" className="py-16 bg-gray-100 dark:bg-gray-800 rounded-lg">
    <AnimateOnScroll>
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200">
          Perguntas Frequentes
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Tire suas dúvidas sobre climatização.
        </p>
      </div>
      <div className="max-w-3xl mx-auto px-4">
        {data.map((item, index) => (
          <FaqItem key={index} q={item.q} a={item.a} />
        ))}
      </div>
    </AnimateOnScroll>
  </section>
);

const LocationMap = () => (
  <section id="localizacao" className="py-16 mb-16 bg-white dark:bg-gray-900">
    <AnimateOnScroll>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200">
            Onde nos Encontrar
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Venha nos visitar e conhecer nossas soluções de perto!
          </p>
        </div>
        <div className="rounded-lg shadow-xl overflow-hidden">
          <iframe
            src={CONTACT_INFO.mapSrc}
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </AnimateOnScroll>
  </section>
);
//##############

// RESULTADO DO CARRINHO PARA WHATSAPP
const Cart = ({ isOpen, onClose, cart, updateCart, clearCart }) => {
  const total = useMemo(
    () => cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cart]
  );
  const handleFinalize = () => {
    let message =
      "Olá, Estação Clima! Gostaria de fazer o seguinte pedido:\n\n";
    cart.forEach((item) => {
      const quantityText = item.byMeter
        ? `${item.quantity} metro(s)`
        : `${item.quantity} un`;
      message += `*Item:* ${
        item.fullName
      }\n*Qtd:* ${quantityText}\n*Subtotal:* R$ ${(item.price * item.quantity)
        .toFixed(2)
        .replace(".", ",")}\n\n`;
    });
    message += `*TOTAL DO PEDIDO: R$ ${total.toFixed(2).replace(".", ",")}*`;
    window.open(
      `https://wa.me/${CONTACT_INFO.whatsappNumber}?text=${encodeURIComponent(
        message
      )}`,
      "_blank"
    );
  };

  const handleQuantityChange = (cartItem, newQuantity) => {
    if (newQuantity < 1) {
      updateCart(cart.filter((item) => item.id !== cartItem.id));
    } else {
      updateCart(
        cart.map((item) =>
          item.id === cartItem.id ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };


  const handleRemoveItem = (cartItemId) => {
    updateCart(cart.filter((item) => item.id !== cartItemId));
  };
  if (!isOpen) return null;
  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex justify-end"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md h-full bg-blue-100 dark:bg-gray-800 shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 flex justify-between items-center border-b dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
            Seu Carrinho
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <X className="text-gray-700 dark:text-gray-300" />
          </button>
        </div>
        {cart.length === 0 ? (
          <div className="flex-grow flex flex-col items-center justify-center text-center p-4">
            <ShoppingCart
              size={64}
              className="text-gray-300 dark:text-gray-600 mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300">
              Seu carrinho está vazio.
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mt-2">
              Adicione produtos para vê-los aqui.
            </p>
          </div>
        ) : (
          <>
            <div className="flex-grow overflow-y-auto p-4 space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex bg-blue-50 items-start space-x-4 p-2 rounded-lg border dark:border-gray-700"
                >
                  <img
                    src={item.image}
                    alt={item.fullName}
                    className="w-20 h-20 object-cover rounded-md"
                  />
                  <div className="flex-grow">
                    <p className="font-semibold text-gray-800 dark:text-gray-200">
                      {item.fullName}
                    </p>
                    <p className="text-sm text-blue-600 dark:text-blue-500 font-bold">
                      R$ {item.price.toFixed(2).replace(".", ",")}
                    </p>
                    <div className="flex items-center space-x-2 mt-2 text-gray-800 dark:text-gray-200">
                      <button
                        onClick={() =>
                          handleQuantityChange(item, item.quantity - 1)
                        }
                        className="p-1 border dark:border-gray-600 rounded-full"
                      >
                        <Minus size={14} />
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() =>
                          handleQuantityChange(item, item.quantity + 1)
                        }
                        className="p-1 border dark:border-gray-600 rounded-full"
                      >
                        <Plus size={14} />
                      </button>
                      {item.byMeter && (
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          metro(s)
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="text-right text-gray-800 dark:text-gray-200">
                    <p className="font-bold">
                      R${" "}
                      {(item.price * item.quantity)
                        .toFixed(2)
                        .replace(".", ",")}
                    </p>
                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      className="text-red-500 hover:text-red-700 mt-2"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 border-t dark:border-gray-700 space-y-4">
              <div className="flex justify-between text-xl font-bold text-gray-800 dark:text-gray-200">
                <span>Total</span>
                <span>R$ {total.toFixed(2).replace(".", ",")}</span>
              </div>
              <button
                onClick={handleFinalize}
                className="w-full bg-green-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-600 transition-all flex items-center justify-center space-x-2"
              >
                <WhatsAppIcon className="w-6 h-6" />
                <span>Finalizar Pedido</span>
              </button>
              <button
                onClick={clearCart}
                className="w-full text-center text-sm text-red-500 hover:underline"
              >
                Esvaziar carrinho
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

//##################

// FOOTER DA PÁGINA
const Footer = () => (
  <footer id="contato" className="bg-gray-800 text-white">
    <div className="container mx-auto px-4 py-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        <div>
          <h3 className="text-xl font-bold mb-4">Estação Clima</h3>
          <p className="text-gray-400">
            Sua solução completa em climatização. Qualidade, confiança e o
            melhor atendimento.
          </p>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-4">Links Rápidos</h3>
          <ul className="space-y-2">
            <li>
              <a
                href="#produtos"
                className="flex items-center justify-center md:justify-start space-x-2 text-gray-400 hover:text-white"
              >
                <Package size={16} />
                <span>Produtos</span>
              </a>
            </li>
            <li>
              <a
                href="#servicos"
                className="flex items-center justify-center md:justify-start space-x-2 text-gray-400 hover:text-white"
              >
                <Wrench size={16} />
                <span>Serviços</span>
              </a>
            </li>
            <li>
              <a
                href="#calculadora"
                className="flex items-center justify-center md:justify-start space-x-2 text-gray-400 hover:text-white"
              >
                <Calculator size={16} />
                <span>Calculadora</span>
              </a>
            </li>
            <li>
              <a
                href="#faq"
                className="flex items-center justify-center md:justify-start space-x-2 text-gray-400 hover:text-white"
              >
                <HelpCircle size={16} />
                <span>FAQ</span>
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-4">Contato</h3>
          <ul className="space-y-2">
            <li className="flex items-center justify-center md:justify-start space-x-2 text-gray-400">
              <MapPin size={16} />
              <span>{CONTACT_INFO.address}</span>
            </li>
            <li className="flex items-center justify-center md:justify-start space-x-2 text-gray-400">
              <Phone size={16} />
              <span>{CONTACT_INFO.phone}</span>
            </li>
            <li className="flex items-center justify-center md:justify-start space-x-2 text-gray-400">
              <Mail size={16} />
              <span>{CONTACT_INFO.email}</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="mt-8 pt-6 border-t border-gray-700 text-center text-gray-500 text-sm">
        <p>
          &copy; {new Date().getFullYear()} Estação Clima. Todos os direitos
          reservados.
        </p>
      </div>
    </div>
  </footer>
);

const FloatingActionButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const WHATSAPP_LINK = `https://wa.me/${CONTACT_INFO.whatsappNumber}`;
  const INSTAGRAM_LINK = `https://instagram.com/${CONTACT_INFO.instagramUser}`;
  return (
    <div className="fixed bottom-6 right-6 z-40">
      <div className="relative flex flex-col items-center space-y-3">
        {isOpen && (
          <>
            <a
              href={INSTAGRAM_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-br from-purple-500 to-pink-500 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg transform transition-all hover:scale-110"
            >
              <Instagram size={28} />
            </a>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg transform transition-all hover:scale-110"
            >
              <WhatsAppIcon className="w-8 h-8" />
            </a>
          </>
        )}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`bg-gray-950/80 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-xl transform transition-transform duration-300 ${
            isOpen ? "rotate-45 bg-gray-950/60" : ""
          }`}
        >
          <Plus size={35} />
        </button>
      </div>
    </div>
  );
};

const FullScreenImageModal = ({ src, onClose }) => {
  if (!src) return null;
  return (
    <div
      className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      <img
        src={src}
        alt="Visualização em tela cheia"
        className="max-w-[90vw] max-h-[90vh] rounded-lg shadow-2xl"
      />
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white bg-black/50 p-2 rounded-full"
      >
        <X size={24} />
      </button>
    </div>
  );
};

const SearchModal = ({ isOpen, onClose, products, onSelect }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const filteredProducts = useMemo(() => {
    if (!searchTerm.trim()) return [];
    const lowerCaseSearch = searchTerm.toLowerCase();
    return products
      .flatMap((category) => category.items)
      .filter((product) =>
        product.name.toLowerCase().includes(lowerCaseSearch)
      );
  }, [searchTerm, products]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/60 z-50 flex items-start justify-center p-4 pt-[10vh]"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl w-full max-w-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 border-b dark:border-gray-700">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              ref={inputRef}
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Digite o nome do produto..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
        <div className="max-h-[60vh] overflow-y-auto">
          {filteredProducts.length > 0 ? (
            <ul>
              {filteredProducts.map((product) => (
                <li key={product.id}>
                  <button
                    onClick={() => onSelect(product.id)}
                    className="w-full text-left flex items-center space-x-4 p-4 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-12 h-12 object-cover rounded-md"
                    />
                    <span className="text-gray-800 dark:text-gray-200">
                      {product.name}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            searchTerm.trim() && (
              <p className="p-4 text-gray-500 dark:text-gray-400">
                Nenhum produto encontrado.
              </p>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem("cart");
      if (savedCart) {
        return JSON.parse(savedCart);
      }
    } catch (error) {
      console.error("Erro ao tentar salvar no LocalStorage - ", error);
    }
    return [];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [fullScreenImage, setFullScreenImage] = useState(null);
  const [isBtuModalOpen, setIsBtuModalOpen] = useState(false);
  const [btuResult, setBtuResult] = useState(0);
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    try {
      localStorage.setItem("cart", JSON.stringify(cart));
    } catch (error) {
      console.error("Erro ao salvar o carrinho no localStorage:", error);
    }
  }, [cart]);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const userPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    if (savedTheme) {
      setTheme(savedTheme);
    } else if (userPrefersDark) {
      setTheme("dark");
    }
  }, []);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const categoryRefs = useRef({});
  const productRefs = useRef({});

  const handleAddToCart = (product, selectedVariant, quantity) => {
    setCart((prevCart) => {
      const cartItemId = selectedVariant.id;
      const existingItem = prevCart.find((item) => item.id === cartItemId);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === cartItemId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      const newItem = {
        id: cartItemId,
        productId: product.id,
        fullName: `${product.name} (${selectedVariant.name})`,
        price: selectedVariant.price,
        byMeter: selectedVariant.byMeter,
        image: product.image,
        quantity: quantity,
      };
      return [...prevCart, newItem];
    });
    setIsCartOpen(true);
  };

  const handleCalculateBtu = (result) => {
    setBtuResult(result);
    setIsBtuModalOpen(true);
  };

  const handleSearchSelect = (productId) => {
    setIsSearchModalOpen(false);
    const productElement = productRefs.current[productId];
    if (productElement) {
      productElement.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const clearCart = () => {
    setCart([]);
  };
  const cartItemCount = useMemo(
    () => cart.reduce((count, item) => count + item.quantity, 0),
    [cart]
  );

  return (
    <div className="bg-blue-100 dark:bg-gray-900 text-gray-900 transition-colors">
      <style>{`
                html { scroll-behavior: smooth; }
            `}</style>
      <Header
        onCartClick={() => setIsCartOpen(true)}
        cartItemCount={cartItemCount}
        onSearchClick={() => setIsSearchModalOpen(true)}
        onToggleTheme={toggleTheme}
        theme={theme}
      />
      <main className="container mx-auto px-4">
        <ImageCarousel
          images={carouselImages}
          onImageClick={setFullScreenImage}
        />
        <ProductList
          products={productData}
          onAddToCart={handleAddToCart}
          categoryRefs={categoryRefs}
          productRefs={productRefs}
        />
        <DetailedServices />
        <BTUCalculator onCalculate={handleCalculateBtu} />
        <Faq data={faqData} />
        <ServicesCarousel services={servicesData} />
        <LocationMap />
      </main>
      <Footer />
      <FloatingActionButton />
      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        updateCart={setCart}
        clearCart={clearCart}
      />
      <FullScreenImageModal
        src={fullScreenImage}
        onClose={() => setFullScreenImage(null)}
      />
      <BTUResultModal
        isOpen={isBtuModalOpen}
        onClose={() => setIsBtuModalOpen(false)}
        btuResult={btuResult}
      />
      <SearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        products={productData}
        onSelect={handleSearchSelect}
      />
    </div>
  );
}
