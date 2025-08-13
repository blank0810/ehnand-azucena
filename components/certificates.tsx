import type React from "react"

const Certificates: React.FC = () => {
  const certificates = [
    {
      title: "Cosmic Coding with Symfony 7",
      issuer: "SymfonyCasts",
      date: "March 2025",
      image: "/images/certificates/cosmic-coding-symfony7.png",
      verificationUrl: "https://symfonycasts.com/certificates/1437702CC155",
    },
    {
      title: "Symfony 7 Fundamentals",
      issuer: "SymfonyCasts",
      date: "March 2025",
      image: "/images/certificates/symfony7-fundamentals.png",
      verificationUrl: "https://symfonycasts.com/certificates/1437702CC155",
    },
    {
      title: "React Basics",
      issuer: "Meta",
      date: "January 2025",
      image: "/images/certificates/react-basics.png",
      verificationUrl: "https://coursera.org/verify/SUL3C9D7GZK3",
    },
    {
      title: "Advanced React",
      issuer: "Meta",
      date: "January 2025",
      image: "/images/certificates/advanced-react.png",
      verificationUrl: "https://coursera.org/verify/2PPLPYD9SZ8B",
    },
    {
      title: "Responsive Web Design",
      issuer: "freeCodeCamp",
      date: "December 2024",
      image: "/images/certificates/responsive-web-design.png",
      verificationUrl: "https://www.freecodecamp.org/certification/Ehnand/responsive-web-design",
    },
    {
      title: "JavaScript Algorithms and Data Structures",
      issuer: "freeCodeCamp",
      date: "December 2024",
      image: "/images/certificates/javascript-algorithms.png",
      verificationUrl: "https://www.freecodecamp.org/certification/Ehnand/javascript-algorithms-and-data-structures-v8",
    },
    {
      title: "CSX Cybersecurity Fundamentals Certificate (CSXF)",
      issuer: "Cybrary",
      date: "August 2023",
      image: "/images/certificates/csxf-cybersecurity.png",
      verificationUrl:
        "https://app.cybrary.it/profile/SimpleCanidae0202?tab=cert-completion&cert=CC-900adb08-fcfc-4837-b719-e9dcbf3129e4",
    },
    {
      title: "Intrusion Detection Setup",
      issuer: "Virtual Cyber Labs",
      date: "January 2023",
      image: "/images/certificates/intrusion-detection-setup.png",
      verificationUrl: "https://verification.givemycertificate.com/v/944bf71e-ac18-468c-ad61-637f7cd7d10a",
    },
    {
      title: "Blue Teaming Internship",
      issuer: "Virtual Cyber Labs",
      date: "January 2023",
      image: "/images/certificates/blue-teaming-internship.png",
      verificationUrl: "https://academy.virtualcyberlabs.com/verify-certificate?serialno=BKS2KRNH",
    },
    {
      title: "Technical Support Fundamentals",
      issuer: "Google",
      date: "November 2022",
      image: "/images/certificates/technical-support-google.png",
      verificationUrl: "https://www.coursera.org/account/accomplishments/verify/SWNULUC8VLYL",
    },
  ]

  return (
    <div>
      <h2>Certificates</h2>
      <ul>
        {certificates.map((cert, index) => (
          <li key={index}>
            <h3>{cert.title}</h3>
            <p>
              <strong>Issuer:</strong> {cert.issuer}
            </p>
            <p>
              <strong>Date:</strong> {cert.date}
            </p>
            <img src={cert.image || "/placeholder.svg"} alt={cert.title} />
            <a href={cert.verificationUrl} target="_blank" rel="noopener noreferrer">
              Verify
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Certificates
