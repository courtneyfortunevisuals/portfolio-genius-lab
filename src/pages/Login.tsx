
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Lock } from 'lucide-react';

const Login = () => {
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    const success = login(password);
    
    setTimeout(() => {
      setIsLoading(false);
      
      if (success) {
        toast({
          title: "Authentication successful",
          description: "Welcome to the portfolio",
          variant: "default",
        });
        navigate('/');
      } else {
        toast({
          title: "Authentication failed",
          description: "Incorrect password",
          variant: "destructive",
        });
        setPassword('');
      }
    }, 800); // Small delay to simulate authentication
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted">
      <div className="glass w-full max-w-md p-8 rounded-xl shadow-lg">
        <div className="flex flex-col items-center mb-6">
          <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <Lock size={28} className="text-primary" />
          </div>
          <h1 className="text-2xl font-bold">Portfolio Access</h1>
          <p className="text-muted-foreground text-center mt-2">
            Enter the password to view this portfolio
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full"
              required
              autoFocus
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full" 
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center">
                <span className="h-4 w-4 mr-2 rounded-full border-2 border-t-transparent border-white animate-spin"></span>
                Verifying...
              </span>
            ) : (
              "Enter Portfolio"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
