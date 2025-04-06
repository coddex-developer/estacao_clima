import './styles.min.css'
import ContactButton from '../ContactButton'
import NotificationCard from '../NotificationCard'
function SecondarySection() {

  return (
    <>
      <div className="SecondarySection bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400">
        <div className="ContentSecondarySection">
          <h3>Nossos serviços</h3>
          <p>Trabalhamos com instalação de equipamentos, manutenção corretiva para solucionar problemas e manutenção preventiva para garantir que seu equipamento funcione perfeitamente, aumentando sua vida útil e reduzindo o consumo de energia.</p>
        </div>
        <div className="ContentSecondarySection py-9">
          <h3>Por Que Escolher a Estação Clima?</h3>
          <ul className='listContainer'>
            < NotificationCard
              text='Profissional experientes e capacitado'
            />
            < NotificationCard
              text='Atendimento rápido e eficiente'
            />
            < NotificationCard
              text='Serviço com garantia e qualidade'
            />
            < NotificationCard
              text='Manutenção preventiva para evitar gastos desnecessários'
            />
          </ul>
        </div>
        <div className="ContentSecondarySection">
          <h3>Mantenha Seu Climatizador Sempre em Perfeito Estado</h3>
          <p>A manutenção preventiva evita falhas inesperadas e melhora a eficiência do seu ar-condicionado. Agende agora uma visita técnica e garanta um ambiente climatizado sem preocupações!</p>
        </div>

        < ContactButton
          contact="https://wa.me/+5561981323772"
          text="Solicitar Orçamento"
        />

<div className="w-full pt-12 h-[400px] rounded-xl overflow-hidden shadow-lg">
  <h3 className='titleAddres'>Nosso endereço</h3>
  <iframe
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.019065254568!2d-122.41941568468148!3d37.77492977975895!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085808e0ef1b6e1%3A0x3d6e6c1b8a0d9364!2sSan+Francisco%2C+CA%2C+USA!5e0!3m2!1sen!2sbr!4v1616618459486!5m2!1sen!2sbr"
    width="100%"
    height="100%"
    allowFullScreen=""
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade">
  </iframe>
</div>
      </div>
    </>
  )
}

export default SecondarySection
