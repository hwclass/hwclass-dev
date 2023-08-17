import { CMS_NAME } from '../lib/constants'

const Intro = () => {
  return (
    <section className="flex-col md:flex-row flex items-center md:justify-between mt-16 mb-16 md:mb-12">
      <h1 className="text-5xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8">
        Barış Güler
      </h1>
      <h4 className="text-center md:text-left text-lg mt-5 md:pl-8">
        Tech Lead, Engineering Manager, (wanna-be) Architect,<br/> the Mentor of his Mantees 🤩
      </h4>
      <h4 className="text-center italic md:text-left text-lg mt-5 md:pl-8">
        Current: <a href="https://www.deliveryhero.com/" target="_blank">Delivery Hero</a><br/>
        Past: <a href="https://www.blacklane.com/en/" target="_blank">Blacklane</a>
        ,{' '}<a href="https://www.intel.com/content/www/us/en/homepage.html" target="_blank">Intel</a>
        ,{' '}<a href="https://netas.com.tr/" target="_blank">Netaş</a>
        ,{' '}Markafoni
      </h4>
      <></>
    </section>
  )
}

export default Intro
