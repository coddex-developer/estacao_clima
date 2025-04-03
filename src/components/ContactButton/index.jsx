import './styles.min.css'

function ContactButton(props) {
  return (
    <>
      <div className="bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 text-center flex justify-center py-17">
        <a className="fancy dark:border-purple-800" href={props.contact}>
          <span className="top-key"></span>
          <span className="text">{props.text}</span>
          <span classNane="bottom-key-1"></span>
          <span className="bottom-key-2"></span>
        </a>
      </div>
    </>
  )
}
export default ContactButton