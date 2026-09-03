import { useState } from 'react';
import { supabase } from '../utils/supabaseClient';

export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (isSignUp) {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) alert(error.message);
      else alert('Đăng ký thành công! Vui lòng kiểm tra email để xác thực.');
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) alert(error.message);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleAuth} className="p-8 bg-white rounded shadow-md">
        <h2 className="mb-4 text-2xl font-bold">{isSignUp ? 'Đăng ký' : 'Đăng nhập'}</h2>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-2 mb-4 border rounded" />
        <input type="password" placeholder="Mật khẩu" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-2 mb-4 border rounded" />
        <button disabled={loading} className="w-full p-2 text-white bg-blue-600 rounded">
          {loading ? 'Đang tải...' : isSignUp ? 'Đăng ký' : 'Đăng nhập'}
        </button>
        <p className="mt-4 text-sm text-center cursor-pointer text-blue-600" onClick={() => setIsSignUp(!isSignUp)}>
          {isSignUp ? 'Đã có tài khoản? Đăng nhập' : 'Chưa có tài khoản? Đăng ký'}
        </p>
      </form>
    </div>
  );
}
