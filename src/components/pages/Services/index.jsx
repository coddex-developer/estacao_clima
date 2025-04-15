import { HiOutlineCog, HiOutlineLightningBolt, HiOutlineSparkles } from "react-icons/hi";
import ContactButton from "../../ContactButton";
import Footer from "../../Footer";
import Navbar from "../../Navbar";
import ScrollTop from "../../EfectsPage/ScrollTop";
import PageWrapper from "../../EfectsPage/PageWrapper";

function Services() {
    const services = [
        {
            title: "Instalação de Ar-Condicionado",
            description: "Realizamos instalação profissional de sistemas split e multisplit com garantia de segurança e eficiência.",
            icon: <HiOutlineCog className="w-10 h-10 text-blue-400" />,
        },
        {
            title: "Manutenção e Higienização",
            description: "Limpeza completa, troca de filtros e verificação de gás para preservar a qualidade do ar e o bom funcionamento dos equipamentos.",
            icon: <HiOutlineSparkles className="w-10 h-10 text-green-400" />,
        },
        {
            title: "Venda e Consultoria Técnica",
            description: "Oferecemos orientação especializada para compra e dimensionamento ideal de climatizadores e ar-condicionados.",
            icon: <HiOutlineLightningBolt className="w-10 h-10 text-yellow-400" />,
        },
    ];

    return (
        <>
            <ScrollTop />
            <Navbar />
            <PageWrapper>

                <section className="bg-gray-50 dark:bg-gray-800 py-16 px-4">
                    <h1 className=" mt-[35px] text-3xl font-bold mt-20 mb-6 text-center text-gray-800 dark:text-gray-300">Nossos Serviços</h1>
                    <div className="grid gap-8 max-w-6xl mx-auto md:grid-cols-3 mt-10">
                        {services.map((service, index) => (
                            <div
                                key={index}
                                className="bg-gray-800 dark:bg-gray-700 rounded-lg p-2 border-gray-600 shadow-lg hover:shadow-xl transition duration-300"
                            >
                                <div className="flex flex-col items-center text-center space-y-4">
                                    {service.icon}
                                    <h3 className="text-xl font-semibold text-white">{service.title}</h3>
                                    <p className="text-gray-400">{service.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-12 flex justify-center">
                        <ContactButton
                            contact="https://wa.me/+5561996654539"
                            text="Solicitar Orçamento"
                        />
                    </div>
                </section>

            </PageWrapper>
            <Footer />
        </>
    );
}

export default Services;
