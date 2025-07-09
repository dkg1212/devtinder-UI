// src/App.jsx

function App() {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-3xl font-bold">Project Setup Complete!</h1>
      <p>You can now use Tailwind and DaisyUI.</p>

      {/* --- This is a DaisyUI button --- */}
      <button className="btn btn-primary">Click Me!</button>
    </div>
  )
}

export default App