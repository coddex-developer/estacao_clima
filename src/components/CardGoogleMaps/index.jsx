function CardGoogleMaps(params) {
    return (
        <>
            <div className="showElements w-full flex justify-center flex-col items-center pt-12 pb-12 h-[400px] rounded-xl overflow-hidden">
                <h3 className='titleAddres'>Nosso endereço</h3>
                <iframe src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3844.0237294315043!2d-47.29407772487529!3d-15.536858585068146!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTXCsDMyJzEyLjciUyA0N8KwMTcnMjkuNCJX!5e0!3m2!1spt-BR!2sbr!4v1743957220589!5m2!1spt-BR!2sbr"
                    className='w-[98%] h-full'
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"></iframe>
            </div>
        </>
    )
}

export default CardGoogleMaps