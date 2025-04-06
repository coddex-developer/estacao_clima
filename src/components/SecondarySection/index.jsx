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

        <div className="w-full flex justify-center flex-col items-center pt-12 h-[400px] rounded-xl overflow-hidden">
          <h3 className='titleAddres'>Nosso endereço</h3>
          <iframe src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3844.0237294315043!2d-47.29407772487529!3d-15.536858585068146!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTXCsDMyJzEyLjciUyA0N8KwMTcnMjkuNCJX!5e0!3m2!1spt-BR!2sbr!4v1743957220589!5m2!1spt-BR!2sbr" 
         className='w-[98%] h-full'
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"></iframe>
        </div>
      </div>
    </>
  )
}

export default SecondarySection
