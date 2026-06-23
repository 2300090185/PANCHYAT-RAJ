import { translations } from "../constants/translations";
import { useState } from 'react';
import { Lock, User, FileText, Star, Shield, ArrowRight } from 'lucide-react';

export default function LoginPage({ role, onLogin, currentLanguage }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const handleLogin = (e) => {
    e.preventDefault();
    if(email && password) {
      onLogin(role);
    }
  };

  const t = translations[currentLanguage] || translations.ENG;

  const getRoleConfig = () => {
    switch (role) {
      case 'nominee':
        return {
          title: t.nomineeTitle,
          subtitle: t.nomineeSub,
          icon: FileText,
          color: 'text-indigo-400',
          bg: 'bg-indigo-950/20',
          border: 'border-indigo-900/50',
          btn: 'bg-indigo-600 hover:bg-indigo-500 shadow-indigo-600/20'
        };
      case 'jury':
        return {
          title: t.juryTitle,
          subtitle: t.jurySub,
          icon: Star,
          color: 'text-amber-400',
          bg: 'bg-amber-950/20',
          border: 'border-amber-900/50',
          btn: 'bg-amber-600 hover:bg-amber-500 shadow-amber-600/20 text-slate-950'
        };
      case 'admin':
        return {
          title: t.adminTitle,
          subtitle: t.adminSub,
          icon: Shield,
          color: 'text-rose-400',
          bg: 'bg-rose-950/20',
          border: 'border-rose-900/50',
          btn: 'bg-rose-600 hover:bg-rose-500 shadow-rose-600/20'
        };
      default:
        return {
          title: 'Portal Login',
          subtitle: 'Sign in to access your dashboard.',
          icon: User,
          color: 'text-emerald-400',
          bg: 'bg-emerald-950/20',
          border: 'border-emerald-900/50',
          btn: 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-600/20'
        };
    }
  };

  const config = getRoleConfig();
  const Icon = config.icon;

  return (
    <div className="flex items-center justify-center min-h-[70vh] px-4">
      <div className={`glass-panel w-full max-w-md p-8 rounded-3xl border ${config.border} shadow-2xl animate-float`}>
        <div className="flex justify-center mb-6">
          <div className={`h-16 w-16 rounded-full ${config.bg} flex items-center justify-center border ${config.border}`}>
            <Icon className={`h-8 w-8 ${config.color}`} />
          </div>
        </div>
        
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-white font-display">{config.title}</h2>
          <p className="text-xs text-gray-400 mt-2">{config.subtitle}</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-gray-400 mb-1">{t.emailLabel}</label>
            <div className="relative">
              <User className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t.emailPlaceholder}
                className="w-full rounded-xl bg-gray-900 border border-gray-800 pl-9 pr-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-gray-600 transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-400 mb-1">{t.passwordLabel}</label>
            <div className="relative">
              <Lock className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={t.passwordPlaceholder}
                className="w-full rounded-xl bg-gray-900 border border-gray-800 pl-9 pr-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-gray-600 transition-colors"
              />
            </div>
          </div>

          <div className="flex items-center justify-between mt-2 mb-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="h-3 w-3 rounded border-gray-800 bg-gray-900 text-emerald-500 focus:ring-0" />
              <span className="text-[10px] text-gray-400">{t.rememberMe}</span>
            </label>
            <span className={`text-[10px] font-bold ${config.color} cursor-pointer hover:underline`}>{t.forgotPass}</span>
          </div>

          <button
            type="submit"
            className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-bold text-white transition-all shadow-lg ${config.btn}`}
          >
            <span>{t.secureSignIn}</span>
            <ArrowRight className="h-4 w-4" />
          </button>
          
          <p className="text-center text-[10px] text-gray-500 mt-6">
            {t.demoNotice}
          </p>
        </form>
      </div>
    </div>
  );
}
