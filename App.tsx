
import React, { useState, useEffect } from 'react';
import { MemberDetails, BloodTypes, MemberRoles } from './types';
import MembershipCard from './components/MembershipCard';
import CardForm from './components/CardForm';
import { APP_TITLE, COMMITTEE_NAME, LOGO_URL } from './constants';

const App: React.FC = () => {
  const [details, setDetails] = useState<MemberDetails>({
    fullNameAr: '',
    fullNameFr: '',
    birthDate: '',
    birthPlace: 'سيدي بلعباس',
    bloodType: BloodTypes.O_PLUS,
    idNumber: '',
    role: MemberRoles.RESCUER,
    issueDate: new Date().toISOString().split('T')[0],
    expiryDate: new Date(new Date().setFullYear(new Date().getFullYear() + 2)).toISOString().split('T')[0],
    photo: null,
    gender: 'M / ذكر'
  });

  useEffect(() => {
    if (!details.idNumber) {
      const randomId = '22' + Math.floor(100000 + Math.random() * 900000).toString();
      setDetails(prev => ({ ...prev, idNumber: randomId }));
    }
  }, []);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#f1f5f9] text-slate-900 pb-16 overflow-x-hidden selection:bg-red-500 selection:text-white">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-xl border-b border-slate-200 sticky top-0 z-50 no-print shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-5">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-xl shadow-red-100 ring-1 ring-slate-100 p-2">
              <img src={LOGO_URL} alt="CRA Logo" className="w-full h-full object-contain" />
            </div>
            <div className="text-right">
              <h1 className="text-xl font-black text-slate-900 tracking-tight leading-none mb-1">{APP_TITLE}</h1>
              <div className="flex items-center gap-2">
                 <span className="w-2 h-2 bg-red-600 rounded-full"></span>
                 <p className="text-[11px] text-slate-500 font-bold uppercase tracking-widest">{COMMITTEE_NAME}</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button
              onClick={handlePrint}
              className="flex items-center gap-3 bg-red-600 hover:bg-red-700 active:scale-95 text-white px-8 py-3.5 rounded-2xl font-black transition-all shadow-lg shadow-red-200"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              <span>تحميل وطباعة البطاقة</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 mt-10 grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Editor Form */}
        <div className="lg:col-span-5 no-print space-y-8 order-2 lg:order-1">
          <CardForm details={details} setDetails={setDetails} />
          
          <div className="bg-white/60 p-6 rounded-3xl border border-white shadow-sm space-y-4 backdrop-blur-sm">
             <div className="flex items-center gap-3 text-slate-800">
                <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" /></svg>
                <h4 className="font-black text-sm uppercase tracking-widest">توجيهات فنية</h4>
             </div>
             <p className="text-xs text-slate-500 font-bold leading-relaxed">
               تم تصميم هذه البطاقة لتتوافق مع معايير ISO-ID1. يرجى استخدام ورق PVC مخصص للبطاقات وتفعيل خيار "رسومات الخلفية" في المتصفح قبل الطباعة.
             </p>
          </div>
        </div>

        {/* Live Preview */}
        <div className="lg:col-span-7 flex flex-col items-center order-1 lg:order-2">
          <div className="no-print w-full flex justify-between items-center mb-6 px-4">
             <div className="flex items-center gap-3">
               <span className="relative flex h-2.5 w-2.5">
                 <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                 <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-600"></span>
               </span>
               <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Live Rendering (ISO-ID1)</h3>
             </div>
             <div className="flex gap-2">
               <span className="bg-slate-900 text-white text-[9px] font-black px-4 py-1.5 rounded-lg shadow-sm">85.6 x 54 mm</span>
               <span className="bg-white text-slate-400 text-[9px] font-black px-4 py-1.5 rounded-lg border border-slate-200">300 DPI Ready</span>
             </div>
          </div>

          <div className="w-full relative flex flex-col items-center justify-center bg-slate-200/20 p-8 lg:p-20 rounded-[4rem] border-2 border-dashed border-slate-300 shadow-inner group transition-all duration-700 hover:bg-white print:bg-transparent print:p-0 print:border-none print:shadow-none min-h-[500px]">
             <div className="relative transform transition-all duration-700 group-hover:scale-[1.01]">
               <MembershipCard details={details} />
             </div>
             
             {/* Decorative Corner Guides */}
             <div className="absolute top-10 left-10 w-12 h-12 border-t-2 border-l-2 border-slate-300 rounded-tl-3xl opacity-40 group-hover:opacity-100 transition-all no-print"></div>
             <div className="absolute bottom-10 right-10 w-12 h-12 border-b-2 border-r-2 border-slate-300 rounded-br-3xl opacity-40 group-hover:opacity-100 transition-all no-print"></div>
          </div>

          <div className="mt-8 no-print text-center max-w-sm">
             <p className="text-[11px] text-slate-400 font-bold opacity-60 leading-relaxed uppercase tracking-tighter">
               Professional Biometric Card System<br/>Designed for <span className="text-red-500 font-black">CRA - Sidi Bel Abbes</span>
             </p>
          </div>
        </div>
      </main>

      <footer className="mt-20 py-10 border-t border-slate-200 text-center no-print">
         <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">&copy; {new Date().getFullYear()} CRA SBA Membership Portal</p>
      </footer>
    </div>
  );
};

export default App;
