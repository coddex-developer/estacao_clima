import './styles.min.css'
import ContactButton from '../ContactButton'
import NotificationCard from '../NotificationCard'
import CardGoogleMaps from '../CardGoogleMaps'
function SecondarySection() {

  return (
    <>
      <div className="SecondarySection bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400">
        <div className="ContentSecondarySection w-full">
          <h3 className='showElements'>Nossos serviços</h3>
          <p className='showElements'>Trabalhamos com instalação de equipamentos, manutenção corretiva para solucionar problemas e manutenção preventiva para garantir que seu equipamento funcione perfeitamente, aumentando sua vida útil e reduzindo o consumo de energia.</p>
        </div>
        <div className="ContentSecondarySection py-9">
          <h3 className='showElements'>Por Que Escolher a Estação Clima?</h3>
          <ul className='listContainer'>
            < NotificationCard
              fade="fade-up"
              avatar="/images_avatar/relatorio-de-negocios.png"
              text='Profissional experientes e capacitado'

            />
            < NotificationCard
              fade="fade-up"
              avatar="/images_avatar/o-negocio.png"
              text='Atendimento rápido e eficiente'
            />
            < NotificationCard
              fade="fade-up"
              avatar="/images_avatar/apresentacao.png"
              text='Serviço com garantia e qualidade'
            />
            < NotificationCard
              fade="fade-up"
              avatar="/images_avatar/o-negocio-2.png"
              text='Manutenção preventiva evita gastos desnecessários'
            />
          </ul>
        </div>
        <div className="ContentSecondarySection">
          <h3 className='showElements'>Mantenha Seu Climatizador Sempre em Perfeito Estado</h3>
          <p className='showElements'>A manutenção preventiva evita falhas inesperadas e melhora a eficiência do seu ar-condicionado. Agende agora uma visita técnica e garanta um ambiente climatizado sem preocupações!</p>
        </div>

        < ContactButton
          contact="https://wa.me/+5561996654539"
          text="Solicitar Orçamento"
        />

        <CardGoogleMaps />
      </div>
    </>
  )
}

export default SecondarySection
