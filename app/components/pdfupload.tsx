'use client'

import { ChangeEvent, useState } from 'react'
import * as pdfjsLib from 'pdfjs-dist'
import pdfjsWorker from 'pdfjs-dist/legacy/build/pdf.worker.entry'
import { useContext } from 'react'
import { ThemeContext } from './themeprovider'

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker

interface PDFUploadProps {
  resume: string
  setResume: React.Dispatch<React.SetStateAction<string>>
}

export default function PDFUpload({ resume, setResume }: PDFUploadProps) {
  const { isDark } = useContext(ThemeContext)

  const [fileTooBig, setFileTooBig] = useState(false)

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // 🚫 Reject files over 1MB
    if (file.size > 1024 * 1024) {
        setFileTooBig(true)
        return
    }

    setFileTooBig(false)

    const reader = new FileReader()
    reader.onload = async () => {
      const typedArray = new Uint8Array(reader.result as ArrayBuffer)
      const pdf = await pdfjsLib.getDocument({ data: typedArray }).promise

      let extractedText = ''
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i)
        const content = await page.getTextContent()
        const pageText = content.items.map((item: any) => item.str).join(' ')
        extractedText += pageText + '\n'
      }

      setResume(extractedText.trim())
    }

    reader.readAsArrayBuffer(file)
  }

  return (
    <div className="w-full">
      <label
        htmlFor="dropzone-file"
        className={`flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-xl cursor-pointer transition 
          ${isDark
            ? 'border-gray-700 bg-gray-800 hover:border-blue-400 hover:bg-gray-700'
            : 'border-gray-300 bg-white hover:border-blue-400 hover:bg-blue-50'}`}
      >
        {fileTooBig && (
        <p className="text-sm text-red-500 mt-1">
            PDF is too large — please upload a file smaller than 1MB.
        </p>
        )}
        <div className="flex flex-col items-center justify-center text-center">
          <svg
            className={`w-8 h-8 mb-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 16v-8m0 0L8 10m4-2 4 2M20 16a4 4 0 00-4-4H8a4 4 0 00-4 4v2h16v-2z"
            />
          </svg>
          <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            <span className="font-medium text-blue-600">Click to upload</span> or drag a PDF here
          </p>
          <p className={`text-xs mt-1 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>PDF only, max 1MB</p>
        </div>
        <input
          id="dropzone-file"
          type="file"
          accept="application/pdf"
          className="hidden"
          onChange={handleFileChange}
        />
      </label>
    </div>
  )
}
