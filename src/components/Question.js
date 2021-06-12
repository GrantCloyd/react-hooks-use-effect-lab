import React, { useState, useEffect } from "react"

function Question({ question, onAnswered, setCurrentQuestion, currentQuestionId }) {
   const [timeRemaining, setTimeRemaining] = useState(10)

   function handleAnswer(isCorrect) {
      setTimeRemaining(10)
      onAnswered(isCorrect)
   }
   useEffect(() => {
      let timer = setTimeout(() => {
         setTimeRemaining(timeRemaining - 1)
         if (timeRemaining === 0) {
            handleAnswer(false)
         }
      }, 1000)
      return () => clearTimeout(timer)
   }, [timeRemaining, question])

   const { id, prompt, answers, correctIndex } = question

   return (
      <>
         <h1>Question {id}</h1>
         <h3>{prompt}</h3>
         {answers.map((answer, index) => {
            const isCorrect = index === correctIndex
            return (
               <button key={answer} onClick={() => handleAnswer(isCorrect)}>
                  {answer}
               </button>
            )
         })}
         <h5>{timeRemaining} seconds remaining</h5>
      </>
   )
}

export default Question
