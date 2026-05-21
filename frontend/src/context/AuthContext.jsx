import axios from 'axios';
import{useState, createContext,useContext, use, useEffect} from 'react';


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const fetchUser = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('http://localhost:5000/users/profile', {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        
      });
      if (response.status === 200) {
        setUser(response.data);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      setUser(null);
      setError(error);
    } finally {
      setLoading(false);
    }
    };
    useEffect(() => {
      fetchUser();
  }, []);

    return (
      <AuthContext.Provider value={{ user, loading, error, setUser }}>
        {children}
      </AuthContext.Provider>
    );
  

}
export const useAuth = () => {
  return useContext(AuthContext);
}