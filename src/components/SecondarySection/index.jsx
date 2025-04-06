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
        <div className="ContentSecondarySection">
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
      </div>
    </>
  )
}

export default SecondarySection
