import Head from "next/head"
import Layout from "../components/layout"
import Container from "../components/container"
import Intro from "../components/intro"
import DateFormatter from "../components/date-formatter"
DateFormatter
import CoverImage from "../components/cover-image"

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
              <CoverImage title={'asdasd'} src={'/assets/blog/mentorship/cover.png'} />
              {/* Image here */}
            </div>
            <div className="md:grid md:grid-cols-1 md:gap-x-16 lg:gap-x-8 mb-20 md:mb-28">
              <div>
                <h1 className="mb-4 text-4xl lg:text-5xl leading-tight">
                  Choose your Engineering Journey: Finding the Right Mentorship For your Role
                </h1>
                <div className="mb-4 md:mb-0 text-lg">
                  <DateFormatter dateString={'2023-08-17'} />
                </div>
              </div>
              <div>
                <div className="max-w-2xl mx-auto"></div>
<iframe src="https://barisguler.super.site" width={'100%'} height={'1060px'}/>
</div>
            </div>
          </section>
        </Container>
      </Layout>
    </>
  )
}