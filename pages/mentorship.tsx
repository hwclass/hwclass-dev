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
                <div className="max-w-2xl mx-auto">
                  Before weeks ago, I’ve firstly announced the mentorship programme I’ve decided to take individuals into a structured career path into, to help them navigate in a huge tech ocean to let them choose what’s best for their very own career.<br/><br/>

                  And it included 3 paths like <strong>Career Path</strong>, <strong>Contributor Path</strong> & <strong>Master Path</strong>. All of those were carefully crafted patterns to be followed based on what’s expected to get at the end: Either you would like to put your career going on into the right presence with CV reviewing, prep interviews, insights and guiding with valuable insights on being more apparent in front of recruiters and interviewers, or you would like to learn by building things which may disrupt the current app ecosystem on my guidence with code reviews support, architectural decisions taken together with fully-hands-on effort by oneself, or you may expect to have a full care on your career from both perspectives: career and coding.<br/><br/>

                  You can also check the article I’ve published about the first initiative I’ve taken here: <strong><a href="https://hwclass.dev/posts/mentoring-over-coaching-art-of-mentoring-bored-techies" target="_blank"><u>Mentoring over Coaching: Art of Mentoring "Bored" Techies</u></a></strong> & here about what I have organised for making your career better: <strong><a href="https://hwclass.dev/posts/empowering-engineers-navigating-excellence-through-mentorship" target="_blank"><u>Empowering Engineers: Navigating Excellence Through Mentorship.</u></a></strong><br/><br/>

                  So now after a couple of months with mentoring experience, I am happy to share that I’ve partitioned the paths into more focused set of guidance patterns by the role you have (maybe my future potential mentee, who knows 😊) and curated the whole set of paths with an additional one for you.<br/><br/>

                  So are you ready to take your engineering career to the next level? Whether you're just starting out, aiming for the stars, steering a team, or leading from the executive helm, my mentorship program has tailored paths to suit your specific role and aspirations.<br/><br/>

                  Let's explore which path aligns best with your position.<br/><br/>

                  <h2 className="mb-4 text-4xl lg:text-5xl leading-tight">1. Career Odyssey Path</h2>

                  <i><strong><h3>Crafting Your Professional Journey</h3></strong></i><br/>

                  <strong>Ideal for:</strong><br/><br/>

                  &#9745; Junior Engineers<br/><br/>

                  &#9745; Entry-level Developers<br/><br/>

                  &#9745; Recent Graduates<br/><br/>

                  &#9745; or Software Engineers at any level, for sure<br/><br/>

                  Imagine your engineering career as an epic adventure, and you're the hero. The <strong>Career Odyssey Path</strong> is your trusted guide on this heroic journey. As your mentor, we'll work together to map out your career constellations, helping you navigate the vast universe of possibilities. Here's what you can expect:<br/><br/>

                  <strong>Career Guidance:</strong> 🌟 Discover your true north in the engineering cosmos.<br/>
                  <strong>Competency Quest:</strong> 🏆 Embark on a quest to unearth your skills and strengths.<br/>
                  <strong>Interview Artistry:</strong> 🎙️ Master the art of captivating interviews.<br/>
                  <strong>Challenges Unveiled:</strong> 🌊 Dive deep into real-world challenges and emerge stronger.<br/>
                  <strong>Insights as Constellations:</strong> 💫 Learn from the stars of wisdom born from experience.<br/><br/>

                  This path is designed to sharpen your skills, enhance your resume, and prepare you for the exciting challenges ahead.<br/><br/>

                  
                  <h2 className="mb-4 text-4xl lg:text-5xl leading-tight">2. Contributor's Forge Path</h2>

                  <i><strong><h3>Where Skills are Forged and Projects Are Masterpieces</h3></strong></i><br/>

                  <strong>Ideal for:</strong><br/><br/>

                  &#9745; Software Engineers<br/><br/>

                  &#9745; Developers<br/><br/>

                  &#9745; Intermediate-Level Professionals<br/><br/>

                  Do you have a burning desire to immerse yourself in the world of software engineering? The <strong>Contributor's Forge Path</strong> is where I shape you into a coding blacksmith, forging your skills through hands-on experience. Picture a forge where projects are not just code but works of art. Join me in this journey:<br/><br/>

                  <strong>Project Alchemy</strong>: 🪄 Craft projects that are true works of art.<br/>
                  <strong>Goal-Forged Deliveries</strong>: 🎯 Transform milestones into masterpieces.<br/>
                  <strong>Cloud & Tech Sorcery</strong>: ☁️🔮 Master the arcane arts of cloud and bleeding-edge tech.<br/>
                  <strong>Code Anvil</strong>: 🔨 Strengthen your code through rigorous review.<br/>
                  <strong>From Sprint to Marathon</strong>: 🏃‍♂️🏁 Experience the epic journey of deployment.<br/>
                  <strong>End-Result Mastery</strong>: 🏆 Create with the satisfaction of tangible outcomes.<br/><br/>

                  This path is for those who believe that learning by doing is the best way to master the craft of software engineering.<br/><br/>

                  <h2 className="mb-4 text-4xl lg:text-5xl leading-tight">3. Master Artisan Path</h2>

                  <i><strong><h3>Elevate Your Skills to the Zenith of Engineering</h3></strong></i><br/>

                  <strong>Ideal for:</strong><br/><br/>

                  &#9745; Senior Software Engineers<br/><br/>

                  &#9745; Technical Leads<br/><br/>

                  &#9745; Seasoned Professionals<br/><br/>

                  &#9745; <i>or Software Engineers at any level, for sure</i><br/><br/>

                  Are you ready to become a true master of your craft? The <strong>Master Artisan Path</strong> is the pinnacle of our mentorship program. Here, we transcend boundaries and delve into the art of system design. Beyond career guidance and hands-on coding, I will elevate your skills to new heights:<br/><br/>

                  <strong>The Complete Voyage</strong>: 🌍 A tapestry of experiences woven into your career.<br/><br/>

                  <strong>System Design Symphony</strong>: 🎶 Compose elegant systems that resonate with brilliance.<br/><br/>

                  <strong>Holistic Fusion</strong>: 🤝 A harmonious blend of Career & Contributor Paths.<br/><br/>

                  <strong>Ground-Up Genesis</strong>: 🌱 Give life to projects from their core.<br/><br/>

                  <strong>Satisfaction of Growth</strong>: 📈 Measure your progress in tangible, concrete results.<br/><br/>

                  In this path, I don't just mentor; we create masterpieces together.<br/><br/>

                  <h2 className="mb-4 text-4xl lg:text-5xl leading-tight">4. Executive Leadership Path</h2>

                  <i><strong><h3>Guiding Engineering Visionaries to Excellence</h3></strong></i><br/>

                  <strong>Ideal for:</strong><br/><br/>

                  &#9745; Software Engineering Managers<br/><br/>

                  &#9745; Technical Directors<br/><br/>

                  &#9745; Engineering Executives<br/><br/>

                  Are you leading a team of engineers or responsible for engineering decisions at a strategic level? The **Executive Leadership Path** is tailored to seasoned Software Engineering Managers and Executives like you. Here, we will take a deep dive into the world of leadership, strategy, and technical vision:<br/><br/>

                  <strong>Leadership Alchemy</strong>: 🪄 Transform management into leadership magic.<br/><br/>

                  <strong>Strategic Engineering</strong>: 🏗️ Craft a vision for engineering excellence.<br/><br/>

                  <strong>Team Orchestration</strong>: 🎻👥 Master the art of team leadership and collaboration.<br/><br/>

                  <strong>Innovation Elevation</strong>: 🚀 Elevate your organization through technical innovation.<br/><br/>

                  <strong>Results-Driven Leadership</strong>: 📊 Achieve tangible outcomes through effective leadership.<br/><br/>

                  This path is your key to becoming an engineering visionary who shapes the future.<br/><br/>

                  <strong>Conclusion</strong><br/><br/>

                  Whichever path you choose, remember that your engineering journey is a canvas waiting to be painted with knowledge, skills, and achievements. Our mentorship program is here to provide you with the guidance and support you need to succeed.<br/><br/>

                  So, are you ready to embark on your engineering odyssey? Choose your path and let's start crafting your future today. Whether you're seeking career clarity, hands-on coding experience, aiming to become a master artisan, or leading the way as an executive, I've got the tools, knowledge, and mentorship to help you thrive.<br/><br/>

                  🚀 Join me on this exciting journey, and together, we'll unlock your full engineering potential! To get started, please fill out the form below to begin our mentorship adventure! 🌟

                  <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSdftco7e7fzJaizB2B9Pv93DN6neRfO0I8gY9E2YVhojixyxA/viewform?embedded=true" width="640" height="2306" frameBorder="0">Loading…</iframe>
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