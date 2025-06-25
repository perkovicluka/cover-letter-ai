'use client'

import { useState, useContext } from 'react'

import PDFUpload from './components/pdfupload'

import { ThemeContext } from './components/themeprovider'
import ThemeToggle from './components/themetoggle'

export default function Home() {

  const [resume, setResume] = useState('')
  const [jobDesc, setJobDesc] = useState('')
  const [coverLetter, setCoverLetter] = useState('')
  const [loading, setLoading] = useState(false)
  const [tone, setTone] = useState("formal")
  const { isDark } = useContext(ThemeContext)

  async function generateCoverLetter() {
    setLoading(true)

    /*await new Promise((resolve) => setTimeout(resolve, 1000))
    const mockLetter = `
      Dear Hiring Manager,

      I'm thrilled to apply for the Backend Developer position at your company. With experience in Python, C++, and scalable systems from my time at Scotiabank and University of Waterloo, I'm confident I can contribute meaningfully to your team.

      Looking forward to the opportunity to discuss further!

      Sincerely,
      Luka Perkovic
        `.trim()*/
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ resume, jobDesc, tone }),
    })

    const data = await response.json()
    setCoverLetter(data.coverLetter)
    //setCoverLetter(mockLetter)
    setLoading(false)
  }

  return (
    
    <main
      className={`min-h-screen flex items-center justify-center px-4 py-16 transition-colors ${
        isDark ? 'bg-gray-900' : 'bg-gray-50'
      }`}
    >
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>
      
      <div
        className={`shadow-2xl rounded-2xl p-8 max-w-2xl w-full space-y-8 transition-colors ${
          isDark ? 'bg-gray-800' : 'bg-white'
        }`}
      >
        <h1 className={`text-4xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
          ✨ AI Cover Letter Generator
        </h1>
        <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
          Generate tailored cover letters by pasting your resume and a job description below.
        </p>
        <label className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            Upload your resume:
          </label>
        <PDFUpload setResume={setResume} />

        <div className="space-y-2">
          <label className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            Paste your resume:
          </label>
          <textarea
            className={`w-full p-3 border rounded-lg placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              isDark
                ? 'text-white bg-gray-700 border-gray-600 placeholder:text-gray-400'
                : 'text-gray-800 bg-white border-gray-300 placeholder:text-gray-400'
            }`}
            rows={1}
            onInput={(e) => {
              e.currentTarget.style.height = 'auto'
              e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`
            }}
            value={resume}
            onChange={(e) => setResume(e.target.value)}
            placeholder="e.g. University of Waterloo, Scotiabank, Python, C++..."
          />
          <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            Characters: {resume.length} / 6000
            {resume.length > 6000 && (
              <span className={`ml-2 ${isDark ? 'text-red-400' : 'text-red-600'}`}>
                Too long — please trim
              </span>
            )}
          </p>
        </div>

        <div className="space-y-2">
          <label className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            Paste the job description:
          </label>
          <textarea
            className={`w-full p-3 border rounded-lg placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              isDark
                ? 'text-white bg-gray-700 border-gray-600 placeholder:text-gray-400'
                : 'text-gray-800 bg-white border-gray-300 placeholder:text-gray-400'
            }`}
            rows={1}
            onInput={(e) => {
              e.currentTarget.style.height = 'auto'
              e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`
            }}
            value={jobDesc}
            onChange={(e) => setJobDesc(e.target.value)}
            placeholder="e.g. We’re looking for a backend developer passionate about..."
          />
          <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            Characters: {jobDesc.length} / 2500
            {jobDesc.length > 2500 && (
              <span className={`ml-2 ${isDark ? 'text-red-400' : 'text-red-600'}`}>
                Too long — please trim
              </span>
            )}
          </p>
        </div>

        <div className="space-y-2">
          <label className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            Select tone:
          </label>
          <select
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              isDark
                ? 'bg-gray-700 text-white border-gray-600'
                : 'bg-white text-gray-800 border-gray-300'
            }`}
            value={tone}
            onChange={(e) => setTone(e.target.value)}
          >
            <option value="formal">Formal</option>
            <option value="casual">Casual</option>
            <option value="enthusiastic">Enthusiastic</option>
            <option value="confident">Confident</option>
          </select>
        </div>

        <button
          onClick={generateCoverLetter}
          disabled={loading || resume.length > 6000 || jobDesc.length > 2500}
          type="button"
          className={`w-full py-2.5 px-5 text-sm font-medium text-white bg-blue-600 rounded-lg flex items-center justify-center
            ${loading ? 'opacity-90 cursor-not-allowed' : 'hover:bg-blue-700'}
            transition-all duration-200`}
        >
          {loading && (
            <svg
              aria-hidden="true"
              role="status"
              className="inline w-4 h-4 me-3 text-white animate-spin"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 
                100.591C22.3858 100.591 0 78.2051 0 50.5908C0 
                22.9766 22.3858 0.59082 50 0.59082C77.6142 
                0.59082 100 22.9766 100 50.5908ZM9.08144 
                50.5908C9.08144 73.1895 27.4013 91.5094 50 
                91.5094C72.5987 91.5094 90.9186 73.1895 
                90.9186 50.5908C90.9186 27.9921 72.5987 
                9.67226 50 9.67226C27.4013 9.67226 9.08144 
                27.9921 9.08144 50.5908Z"
                fill="#E5E7EB"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 
                35.9116 97.0079 33.5539C95.2932 28.8227 
                92.871 24.3692 89.8167 20.348C85.8452 
                15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 
                4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 
                0.367541 46.6976 0.446843 41.7345 
                1.27873C39.2613 1.69328 37.813 4.19778 
                38.4501 6.62326C39.0873 9.04874 41.5694 
                10.4717 44.0505 10.1071C47.8511 9.54855 
                51.7191 9.52689 55.5402 10.0491C60.8642 
                10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 
                17.9648 79.3347 21.5619 82.5849 25.841C84.9175 
                28.9121 86.7997 32.2913 88.1811 
                35.8758C89.083 38.2158 91.5421 39.6781 
                93.9676 39.0409Z"
                fill="currentColor"
              />
            </svg>
          )}
          {loading ? 'Loading...' : 'Generate Cover Letter'}
        </button>

        {coverLetter && (
          <div
            className={`p-4 rounded-lg border hover:shadow-lg transition-shadow duration-200 animate-fadeIn ${
              isDark
                ? 'bg-gray-700 border-gray-600 text-gray-200'
                : 'bg-gray-100 border-gray-200 text-gray-700'
            }`}
          >
            <h2 className="text-lg font-semibold mb-2">📄 Your Cover Letter</h2>
            <pre className="whitespace-pre-wrap text-sm">{coverLetter}</pre>
          </div>
        )}
      </div>
    </main>
  )
}