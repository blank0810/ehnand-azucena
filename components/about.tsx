import { Download } from "lucide-react"

const About = () => {
  return (
    <div className="about-section">
      <h1>About Me</h1>
      <p>{/* Description about yourself here */}</p>
      <div className="download-button">
        <a
          href="/Ehnand_Azucena_CV.pdf"
          download="Ehnand_Azucena_CV.pdf"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
        >
          <Download className="w-5 h-5" />
          Download Resume
        </a>
      </div>
      {/* ** rest of code here **/}
    </div>
  )
}

export default About
