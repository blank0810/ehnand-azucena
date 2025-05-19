"use client"

import { useState, useEffect } from "react"

interface TypingAnimationProps {
  texts: string[]
  typingSpeed?: number
  deletingSpeed?: number
  delayBetweenTexts?: number
  className?: string
}

export default function TypingAnimation({
  texts,
  typingSpeed = 100,
  deletingSpeed = 50,
  delayBetweenTexts = 1500,
  className = "",
}: TypingAnimationProps) {
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [currentText, setCurrentText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    let timeout: NodeJS.Timeout

    if (isDeleting) {
      if (currentText === "") {
        setIsDeleting(false)
        setCurrentTextIndex((prevIndex) => (prevIndex + 1) % texts.length)
        timeout = setTimeout(() => {}, delayBetweenTexts)
      } else {
        timeout = setTimeout(() => {
          setCurrentText(currentText.slice(0, -1))
        }, deletingSpeed)
      }
    } else {
      const fullText = texts[currentTextIndex]
      if (currentText === fullText) {
        timeout = setTimeout(() => {
          setIsDeleting(true)
        }, delayBetweenTexts)
      } else {
        timeout = setTimeout(() => {
          setCurrentText(fullText.slice(0, currentText.length + 1))
        }, typingSpeed)
      }
    }

    return () => clearTimeout(timeout)
  }, [currentText, currentTextIndex, isDeleting, texts, typingSpeed, deletingSpeed, delayBetweenTexts])

  return (
    <div className={className}>
      <span>{currentText}</span>
      <span className="animate-pulse">|</span>
    </div>
  )
}
