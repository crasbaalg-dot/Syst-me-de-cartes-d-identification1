
import React from 'react';
import { MemberDetails, BloodTypes, MemberRoles } from '../types';

interface CardFormProps {
  details: MemberDetails;
  setDetails: React.Dispatch<React.SetStateAction<MemberDetails>>;
}

const CardForm: React.FC<CardFormProps> = ({ details, setDetails }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setDetails(prev => ({ ...prev, [name]: value }));
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setDetails(prev => ({ ...prev, photo: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-white rounded-[2.5rem] shadow-2xl border border-slate-200 overflow-hidden no-print">
      <div className="bg-slate-900 p-8 text-white flex items-center gap-6">
        <div className="w-14 h-14 bg-red-600 rounded-2xl flex items-center justify-center shadow-xl shadow-red-900/40 ring-4 ring-white/5">
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
        <div>
          <h2 className="text-xl font-black tracking-tight leading-none mb-1.5">مدير البيانات</h2>
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest opacity-80">Member Profile Builder</p>
        </div>
      </div>

      <div className="p-8 space-y-10">
        {/* Identity Section */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
             <span className="w-1.5 h-4 bg-red-600 rounded-full"></span>
             <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Personal Details</h3>
          </div>

          <div className="grid grid-cols-1 gap-6">
             <div className="space-y-2">
               <label className="text-[10px] font-black text-slate-500 mr-2 uppercase tracking-tighter">الاسم واللقب (عربي)</label>
               <input
                 type="text"
                 name="fullNameAr"
                 value={details.fullNameAr}
                 onChange={handleChange}
                 className="w-full px-6 py-4 bg-slate-50 border-2 border-transparent rounded-2xl focus:border-red-600 focus:bg-white focus:outline-none transition-all font-bold text-lg shadow-inner"
                 placeholder="ادخل الاسم الكامل..."
               />
             </div>
             <div className="space-y-2">
               <label className="text-[10px] font-black text-slate-500 mr-2 uppercase tracking-tighter">Full Name (Latin)</label>
               <input
                 type="text"
                 name="fullNameFr"
                 value={details.fullNameFr}
                 onChange={handleChange}
                 className="w-full px-6 py-4 bg-slate-50 border-2 border-transparent rounded-2xl focus:border-red-600 focus:bg-white focus:outline-none transition-all font-bold text-lg text-left shadow-inner"
                 placeholder="NOM ET PRENOM"
               />
             </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500">تاريخ الميلاد</label>
              <input type="date" name="birthDate" value={details.birthDate} onChange={handleChange} className="w-full px-5 py-4 bg-slate-50 border-2 border-transparent rounded-2xl focus:border-red-600 focus:bg-white outline-none font-bold text-sm shadow-inner" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500">الجنس</label>
              <select name="gender" value={details.gender} onChange={handleChange} className="w-full px-5 py-4 bg-slate-50 border-2 border-transparent rounded-2xl focus:border-red-600 focus:bg-white outline-none font-bold text-sm shadow-inner cursor-pointer">
                <option value="M / ذكر">ذكر (M)</option>
                <option value="F / أنثى">أنثى (F)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Professional Details Section */}
        <div className="space-y-6 pt-6 border-t border-slate-100">
          <div className="flex items-center gap-3">
             <span className="w-1.5 h-4 bg-red-600 rounded-full"></span>
             <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Membership Info</h3>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500">رقم العضوية (ID)</label>
              <input type="text" name="idNumber" value={details.idNumber} onChange={handleChange} className="w-full px-5 py-4 bg-slate-50 border-2 border-transparent rounded-2xl focus:border-red-600 focus:bg-white outline-none font-mono font-black shadow-inner" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500">فصيلة الدم</label>
              <select name="bloodType" value={details.bloodType} onChange={handleChange} className="w-full px-5 py-4 bg-red-50 border-2 border-transparent rounded-2xl focus:border-red-600 focus:bg-white outline-none font-black text-red-600 text-xl shadow-inner cursor-pointer">
                {Object.values(BloodTypes).map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500">الصفة المهنية</label>
              <select name="role" value={details.role} onChange={handleChange} className="w-full px-5 py-4 bg-slate-50 border-2 border-transparent rounded-2xl focus:border-red-600 focus:bg-white outline-none font-bold text-sm shadow-inner cursor-pointer">
                {Object.values(MemberRoles).map(role => (
                  <option key={role} value={role}>{role}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500">صلاحية البطاقة</label>
              <input type="date" name="expiryDate" value={details.expiryDate} onChange={handleChange} className="w-full px-5 py-4 bg-slate-50 border-2 border-transparent rounded-2xl focus:border-red-600 focus:bg-white outline-none font-bold text-sm shadow-inner" />
            </div>
          </div>
        </div>

        {/* Biometric Upload Section */}
        <div className="space-y-6 pt-6 border-t border-slate-100">
          <div className="flex items-center gap-10">
            <div className="flex-1 space-y-4">
               <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-3">
                 <span className="w-1.5 h-4 bg-red-600 rounded-full"></span>
                 Biometric Image
               </h3>
               <label className="flex items-center justify-center gap-4 bg-slate-900 hover:bg-black text-white font-black px-8 py-5 rounded-2xl cursor-pointer transition-all shadow-xl shadow-slate-200">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  <span>رفع الصورة الشخصية</span>
                  <input type="file" className="hidden" accept="image/*" onChange={handlePhotoUpload} />
               </label>
            </div>
            {details.photo && (
              <div className="relative group shrink-0">
                <div className="w-24 h-28 rounded-2xl overflow-hidden border-4 border-white shadow-xl ring-1 ring-slate-100">
                   <img src={details.photo} alt="mini preview" className="w-full h-full object-cover" />
                </div>
                <button onClick={() => setDetails(prev => ({ ...prev, photo: null }))} className="absolute -top-3 -right-3 bg-red-600 text-white p-1.5 rounded-full shadow-lg hover:scale-110 transition-transform">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardForm;
