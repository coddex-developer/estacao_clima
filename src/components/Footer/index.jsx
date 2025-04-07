function Footer() {

  return (
    <>
      <footer className="bg-gray-50 dark:bg-gray-900">
        <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
          <div className="md:flex md:justify-between">
            <div className="mb-6 md:mb-0">
              <a href="#" className="flex items-center">
                <img src="https://i.imgur.com/An2oFPn.png" className="h-10 me-3" alt="logo" />
              </a>
            </div>
            <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
              <div>
                <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">CONTATO</h2>
                <ul className="text-gray-500 dark:text-gray-400 font-medium">
                  <li className="mb-4">
                    <a href="#" className="hover:underline">Whatsapp</a>
                  </li>
                  <li>
                    <a href="#" className="hover:underline">Instagram</a>
                  </li>
                </ul>
              </div>
              <div>
                <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">REDES-SOCIAIS</h2>
                <ul className="text-gray-500 dark:text-gray-400 font-medium">
                  <li className="mb-4">
                    <a href="#" className="hover:underline ">Facebook</a>
                  </li>
                  <li>
                    <a href="#" className="hover:underline">Youtube</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
          <div className="sm:flex sm:items-center sm:justify-between">
            <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2025 <a href="#" className="hover:underline">Estação Clima</a>. Todos os direitos reservados.
            </span>
            <div className="flex mt-4 sm:justify-center sm:mt-0">
          </div>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer