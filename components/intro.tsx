const Intro = () => {
  return (
    <section className="flex-col md:flex-row flex items-center md:justify-between mt-16 mb-16 md:mb-12">
      <div className="flex-1">
        <h1 className="text-5xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8 bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent">
          Barış Güler
        </h1>
        <div className="mt-6 md:mt-8">
          <h4 className="text-center md:text-left text-xl md:text-2xl font-medium text-gray-700 dark:text-gray-300 tracking-wide">
            Engineering Leader
          </h4>
        </div>
      </div>
      {/* <h4 className="text-center italic md:text-left text-lg mt-5 md:pl-8">
        <a href="https://www.deliveryhero.com/" target="_blank">Delivery Hero</a>,{' '}
        <a href="https://www.blacklane.com/en/" target="_blank">Blacklane</a>,{' '}
        <a href="https://www.intel.com/content/www/us/en/homepage.html" target="_blank">Intel</a>,{' '}
        <a href="https://netas.com.tr/" target="_blank">Netaş</a>{' '},{' '}Markafoni{' '}&{' '}WCS
      </h4> */}
    </section>
  )
}

export default Intro
