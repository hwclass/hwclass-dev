import Head from "next/head"
import Layout from "../components/layout"
import Container from "../components/container"
import Intro from "../components/intro"
import DateFormatter from "../components/date-formatter"
DateFormatter
import CoverImage from "../components/cover-image"
import Avatar from "../components/avatar"

export default function Mentorship() {
  return (
    <>
      <Layout>
        <Head>
          <title>Baris Guler's Blog</title>
        </Head>
        <Container>
          <Intro />
          <section>
            <div className="mb-8 md:mb-16">
              <CoverImage title={'asdasd'} src={'/assets/blog/mentorship/cover.png'} slug={'mentorship'} />
              {/* Image here */}
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-x-16 lg:gap-x-8 mb-20 md:mb-28">
              <div>
                <h3 className="mb-4 text-4xl lg:text-5xl leading-tight">
                  Empowering Engineers: Navigating Excellence Through Mentorship
                </h3>
                <div className="mb-4 md:mb-0 text-lg">
                  <DateFormatter dateString={'2023-08-17'} />
                </div>
              </div>
              <div>
                <div className="max-w-2xl mx-auto">
                  Dear Fellow (and potential) Mantee,<br/><br/>

                  I am thrilled to introduce our meticulously crafted mentorship program, designed to propel your journey towards engineering excellence. At its core, this program acknowledges the multifaceted nature of growth and offers three distinctive paths to cater to your diverse aspirations: "Career," "Contributor," and "Master."<br/><br/>
                  
                  Allow me to unveil the essence of each path, a testament to our commitment to your professional evolution:<br/><br/>

                  <strong>Career Path</strong><br/><br/>

                  This trajectory is tailor-made for those who seek to master not only the intricacies of engineering but also the art of career navigation. Together, we will traverse the landscape of career guidance, honing resume brilliance, and refining the finesse of interviews. As your mentor, I am dedicated to furnishing you with invaluable insights that will be your compass in this dynamic industry.<br/><br/>

                  <strong>Contributor Path</strong><br/><br/>

                  Embark on a hands-on journey that delves into the core principles of software engineering and the elegance of design patterns. This path champions experiential learning through collaborative projects, where we'll work side by side to elevate your skills. Immerse yourself in the world of code reviews and proactive guidance, nurturing a holistic growth mindset.<br/><br/>

                  <strong>Master Path</strong><br/><br/>

                  For those who aspire to elevate their craft to unprecedented heights, the Master Path awaits. Beyond the foundations of the Career and Contributor Paths, this journey will lead us into the realm of advanced topics, including the intricate art of system design. Through immersive mentorship, meticulous code reviews, and comprehensive guidance, we will sculpt your prowess into something extraordinary.<br/><br/>

                  <strong>Guiding Principles</strong><br/><br/>

                  <ul>
                    <li>Our sessions will be conducted seamlessly through Google Hangouts, ensuring convenient access regardless of your location.<br/><br/></li>
                    <li>While preparation for each session is not mandatory, there might be instances where a little preparation could enhance the effectiveness of our mentorship journey.<br/><br/></li>
                  </ul>

                  To chart the optimal path for your growth, I invite you to share insights into your aspirations, current skill level, and areas of interest. This information will empower me to curate a personalized mentorship experience that aligns perfectly with your ambitions.<br/><br/>

                  I assure you that the details you provide will remain confidential and exclusively utilized to enrich your journey. Kindly complete the attached questionnaire (it's refreshingly brief, I promise!) to begin this transformative adventure.<br/><br/>

                  As you embark on this odyssey towards excellence, remember that your success is the driving force of this mentorship program. Let's co-create a narrative of growth, innovation, and unfaltering success.<br/><br/>

                  For a deeper understanding of my mentoring philosophy, I invite you to explore <a href="/posts/mentoring-over-coaching-art-of-mentoring-bored-techies" target="_blank"><strong>Mentoring over Coaching: Art of Mentoring 'Bored' Techies.</strong></a><br/><br/>

                  Should you have any inquiries or require additional information, please feel free to reach out to me. I am eagerly anticipating the privilege of collaborating with you, as we shape your dreams into reality.<br/><br/>

                  Here's to your journey of empowerment and achievement.<br/><br/>

                  Warm regards and please feel free to reach me out over the following form below:<br/><br/>

                  <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSdftco7e7fzJaizB2B9Pv93DN6neRfO0I8gY9E2YVhojixyxA/viewform?embedded=true" width="640" height="2306" frameborder="0" marginheight="0" marginwidth="0">Loading…</iframe>

                </div>
                <Avatar name={'Baris Guler'} picture={'/assets/blog/authors/hwclass.png'} />
              </div>
            </div>
          </section>
        </Container>
      </Layout>
    </>
  )
}