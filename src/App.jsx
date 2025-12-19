import AppRoutes from './routes/AppRoutes';
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './auth/AuthContext'

function App() {
 

  return (
    
     <BrowserRouter>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
     </BrowserRouter>
    
  )
}

export default App
