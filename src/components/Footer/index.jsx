function Footer() {

  return (
    <>
      <footer class="bg-white dark:bg-gray-900">
        <div class="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
          <div class="md:flex md:justify-between">
            <div class="mb-6 md:mb-0">
              <a href="#" class="flex items-center">
                <img src="https://i.imgur.com/An2oFPn.png" class="h-10 me-3" alt="logo" />
              </a>
            </div>
            <div class="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
              <div>
                <h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">CONTATO</h2>
                <ul class="text-gray-500 dark:text-gray-400 font-medium">
                  <li class="mb-4">
                    <a href="#" class="hover:underline">Whatsapp</a>
                  </li>
                  <li>
                    <a href="#" class="hover:underline">Instagram</a>
                  </li>
                </ul>
              </div>
              <div>
                <h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">REDES-SOCIAIS</h2>
                <ul class="text-gray-500 dark:text-gray-400 font-medium">
                  <li class="mb-4">
                    <a href="#" class="hover:underline ">Facebook</a>
                  </li>
                  <li>
                    <a href="#" class="hover:underline">Youtube</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
          <div class="sm:flex sm:items-center sm:justify-between">
            <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2025 <a href="#" class="hover:underline">Estação Clima</a>. Todos os direitos reservados.
            </span>
            <div class="flex mt-4 sm:justify-center sm:mt-0">
          </div>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer