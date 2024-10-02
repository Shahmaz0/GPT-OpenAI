import { useState } from 'react'
import axios from 'axios'
import { SendIcon } from 'lucide-react'

function App() {
  const [prompt, setPrompt] = useState("")
  const [response, setResponse] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  async function generateAnswer() {
    setIsLoading(true)
    try {
      const response = await axios({
        url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyCpkNSH6rVZexLppn8gfFIlP1tHAkWokdM",
        method: "POST",
        data: {
          "contents": [
            {
              "parts": [{ "text": prompt }]
            }
          ]
        },
      })
      setResponse(response['data']['candidates'][0]['content']['parts'][0]['text'])
    } catch (error) {
      console.error("Error generating answer:", error)
      setResponse("An error occurred while generating the answer.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">OpenAI</h1>
        </div>
      </header>
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="mb-4">
            <label htmlFor="prompt" className="block text-sm font-medium text-gray-700 mb-2">
              Enter your prompt
            </label>
            <textarea
              id="prompt"
              rows={4}
              className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Type your message here..."
            ></textarea>
          </div>
          <div className="flex justify-end">
            <button
              onClick={generateAnswer}
              disabled={isLoading || !prompt.trim()}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <SendIcon className="w-5 h-5 mr-2" />
              )}
              {isLoading ? 'Generating...' : 'Generate'}
            </button>
          </div>
          {response && (
            <div className="mt-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Response:</h2>
              <div className="bg-gray-100 rounded-lg p-4">
                <pre className="whitespace-pre-wrap text-sm text-gray-800">{response}</pre>
              </div>
            </div>
          )}
        </div>
      </main>
      <footer className="bg-white shadow mt-8">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500 text-sm">
            &copy; 2024 ChatGPT Clone. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
export default App