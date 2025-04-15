import './styles.min.css'

function ContactButton(props) {
  return (
    <>
      <div className="bg-gray-50 dark:bg-gray-800  text-center flex justify-center pt-8 pb-8">
        <a target='_blank' className="fancy dark:bg-gray-700 dark:text-gray-300 text-gray-800 border-gray-800 dark:border-gray-900 hover:border-gray-900" href={props.contact}>
          <span className="top-key"></span>
          <span className="text">{props.text}</span>
          <span className="bottom-key-1"></span>
          <span className="bottom-key-2"></span>
        </a>
      </div>
    </>
  )
}
export default ContactButton