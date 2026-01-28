
import React from 'react';
import { MemberDetails } from '../types';
import { LOGO_URL, COMMITTEE_NAME } from '../constants';

interface MembershipCardProps {
  details: MemberDetails;
}

const BackgroundLogo = () => (
  <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none overflow-hidden select-none z-0">
    <img src={LOGO_URL} alt="Background Logo" className="w-[85%] h-auto grayscale transform rotate-12" />
  </div>
);

const MembershipCard: React.FC<MembershipCardProps> = ({ details }) => {
  const generateMRZ = () => {
    const lastName = (details.fullNameFr.split(' ')[0] || 'NOM').toUpperCase();
    const firstName = (details.fullNameFr.split(' ').slice(1).join('<') || 'PRENOM').toUpperCase();
    const last = lastName.padEnd(25, '<').substring(0, 25);
    const first = firstName.padEnd(15, '<').substring(0, 15);
    const id = details.idNumber.replace(/[^0-9]/g, '').padEnd(8, '0').substring(0, 8);
    const year = details.birthDate ? details.birthDate.substring(2, 4) : '00';
    const month = details.birthDate ? details.birthDate.substring(5, 7) : '00';
    const day = details.birthDate ? details.birthDate.substring(8, 10) : '00';
    
    const line1 = `IDDZA${id}<<${year}${month}${day}<<<<<<<<<`;
    const line2 = `${last}<<${first}<<<<<<<<<<<`;
    return [line1, line2];
  };

  const [mrz1, mrz2] = generateMRZ();

  return (
    <div className="flex flex-col gap-10 items-center print:gap-[15mm] print-area">
      {/* الوجه الأمامي (RECTO) */}
      <div 
        className="id-card-container relative w-[85.6mm] h-[54mm] bg-white rounded-[3mm] overflow-hidden shadow-2xl flex flex-col font-['Tajawal'] text-black select-none border border-gray-200 shrink-0"
        style={{ background: 'linear-gradient(145deg, #ffffff 0%, #fcfcfc 100%)' }}
      >
        <div className="absolute inset-0 guilloche-bg opacity-[0.05] pointer-events-none"></div>
        <BackgroundLogo />
        
        {/* الهيدر - تنسيق جديد للنصوص */}
        <div className="relative h-[12mm] w-full z-20 overflow-hidden shrink-0">
          <div className="absolute inset-0 bg-gradient-to-l from-[#b91c1c] via-[#dc2626] to-[#991b1b]"></div>
          <div className="absolute bottom-0 left-0 right-0 h-[0.6mm] bg-[#166534]"></div>
          
          <div className="absolute inset-0 flex items-center justify-between px-[3mm]">
            <div className="flex items-center gap-3">
              <div className="bg-white rounded-full p-1 shadow-md w-11 h-11 flex items-center justify-center border border-white/40 ring-2 ring-red-900/5">
                <img src={LOGO_URL} alt="Logo" className="w-9 h-9 object-contain" />
              </div>
              {/* تنسيق النصوص هنا */}
              <div className="flex flex-col text-white text-right justify-center">
                <span className="font-extrabold text-[11px] leading-[1.1] drop-shadow-sm">الهلال الأحمر الجزائري</span>
                <span className="font-bold text-[5px] tracking-[0.5px] uppercase opacity-90 leading-none mt-[1px]">Algerian Red Crescent</span>
              </div>
            </div>
            <div className="text-left text-white leading-none">
              <span className="block text-[4px] font-black opacity-80 uppercase mb-0.5 tracking-widest">Wilaya Committee</span>
              <span className="block text-[9px] font-black tracking-tight uppercase whitespace-nowrap">{COMMITTEE_NAME}</span>
            </div>
          </div>
        </div>

        {/* جسم البطاقة */}
        <div className="h-[40.5mm] flex px-[4.5mm] py-[3.5mm] gap-[5mm] relative z-10 items-center overflow-hidden">
          {/* عمود الصورة الشخصية */}
          <div className="flex flex-col items-center shrink-0">
            <div className="w-[30mm] h-[34.5mm] bg-white rounded-[1.5mm] border-[2px] border-white shadow-xl overflow-hidden relative ring-1 ring-slate-200/50">
              {details.photo ? (
                <img src={details.photo} alt="Identity" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center bg-slate-50 text-slate-200">
                   <svg className="w-14 h-14" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" /></svg>
                </div>
              )}
            </div>
          </div>

          {/* عمود البيانات الشخصية */}
          <div className="flex-1 flex flex-col justify-between h-full py-[1mm] text-right overflow-hidden">
            <div className="shrink-0">
              <span className="block text-[6.5px] text-slate-400 font-extrabold uppercase tracking-[1.2px] leading-none mb-1.5">Nom et Prénom / الاسم واللقب</span>
              <div className="text-[13px] font-black text-slate-900 leading-tight truncate drop-shadow-sm">{details.fullNameAr || '---'}</div>
              <div className="text-[9.5px] text-slate-500 uppercase font-black leading-none truncate opacity-80 mt-0.5">{details.fullNameFr || '---'}</div>
            </div>

            <div className="grid grid-cols-2 gap-x-2 gap-y-2 border-t border-slate-100 mt-2 pt-2 shrink-0">
               <div>
                  <span className="block text-[5.5px] text-slate-400 font-black uppercase leading-none mb-1">Né(e) le / الميلاد</span>
                  <span className="text-[10px] font-black text-slate-800 leading-none">{details.birthDate || '--/--/----'}</span>
               </div>
               <div className="text-left">
                  <span className="block text-[5.5px] text-slate-400 font-black uppercase leading-none mb-1">Lieu / المكان</span>
                  <span className="text-[10px] font-black text-slate-800 leading-none truncate block">{details.birthPlace || '----'}</span>
               </div>
               <div>
                  <span className="block text-[5.5px] text-slate-400 font-black uppercase leading-none mb-1">ID / رقم العضوية</span>
                  <span className="text-[10.5px] font-mono font-black text-red-700 leading-none">{details.idNumber || '00000000'}</span>
               </div>
               <div className="text-left">
                  <span className="block text-[5.5px] text-slate-400 font-black uppercase leading-none mb-1">Sexe / الجنس</span>
                  <span className="text-[10px] font-black text-slate-800 leading-none">{details.gender.split('/')[0].trim()}</span>
               </div>
            </div>

            <div className="flex justify-between items-center mt-auto pt-2">
                <div className="flex items-center gap-2 bg-red-600 text-white px-2.5 py-1 rounded-sm shadow-md">
                  <span className="text-[6px] font-black uppercase leading-none tracking-tighter">Blood</span>
                  <span className="text-[11px] font-black leading-none">{details.bloodType}</span>
                </div>
                <div className="bg-slate-900 text-white px-2 py-1 rounded shadow-sm">
                   <span className="text-[7.5px] font-black uppercase truncate block max-w-[22mm]">{details.role.split(' ')[0]}</span>
                </div>
            </div>
          </div>
        </div>

        {/* الشريط السفلي */}
        <div className="h-[1.5mm] w-full flex shrink-0 mt-auto">
          <div className="flex-1 bg-[#166534]"></div>
          <div className="flex-1 bg-[#15803d]"></div>
          <div className="flex-1 bg-[#14532d]"></div>
        </div>
      </div>

      {/* الوجه الخلفي (VERSO) */}
      <div 
        className="id-card-container relative w-[85.6mm] h-[54mm] bg-white rounded-[3mm] overflow-hidden shadow-2xl flex flex-col font-['Tajawal'] text-black select-none border border-gray-100 shrink-0"
        style={{ background: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)' }}
      >
        <div className="absolute inset-0 guilloche-bg opacity-[0.04] pointer-events-none"></div>
        <BackgroundLogo />
        
        <div className="h-[8mm] bg-[#b91c1c] w-full flex items-center justify-center border-b border-white/10 relative z-20 shrink-0">
          <span className="text-white text-[8px] tracking-[3px] uppercase font-black opacity-95">REPUBLIQUE ALGERIENNE DEMOCRATIQUE ET POPULAIRE</span>
        </div>

        <div className="flex-1 flex flex-col px-[5mm] pt-[4mm] pb-[1mm] relative z-10 overflow-hidden">
          <div className="flex gap-[6mm] items-start">
            <div className="w-[18mm] shrink-0">
              <div className="bg-white p-1 rounded-lg border border-slate-200 shadow-md ring-1 ring-slate-100">
                <img 
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=CRA-SBA-ID-${details.idNumber}`} 
                  alt="Security QR" 
                  className="w-full aspect-square" 
                />
              </div>
              <div className="mt-1.5 text-center">
                <span className="text-[5px] text-slate-400 font-black uppercase tracking-[1px]">Security Check</span>
              </div>
            </div>
            
            <div className="flex-1 space-y-2">
              <div className="border-r-3 border-[#dc2626] pr-2.5 space-y-1 bg-white/60 p-2 rounded-l-md shadow-sm">
                <span className="text-[#dc2626] font-black text-[7.5px] block uppercase mb-1">Legal Notice / تنبيه</span>
                <p className="text-[7.5px] font-bold text-slate-800 leading-[1.4] text-justify">
                  هذه البطاقة وثيقة رسمية وتظل ملكية حصرية للهلال الأحمر الجزائري. يرجى التبليغ فوراً عن ضياعها.
                </p>
              </div>
              <div className="text-[7.5px] text-slate-500 font-black space-y-0.5 px-0.5 text-right opacity-80">
                <p>• Sidi Bel Abbes, Algeria.</p>
                <p>• CRA-SBA Official Portal Generated.</p>
              </div>
            </div>
          </div>

          <div className="mt-auto flex justify-between items-end border-t border-slate-100 pt-2 pb-2">
            <div className="flex gap-[3mm]">
              <div className="bg-slate-50 px-2.5 py-0.5 rounded border border-slate-200">
                <span className="block text-[5px] text-slate-400 font-black uppercase leading-none mb-1">Issue / إصدار</span>
                <span className="block text-[8.5px] font-black text-slate-800 leading-none">{details.issueDate}</span>
              </div>
              <div className="bg-red-50 px-2.5 py-0.5 rounded border border-red-100">
                <span className="block text-[5px] text-red-400 font-black uppercase leading-none mb-1">Expiry / صلاحية</span>
                <span className="block text-[8.5px] font-black text-[#dc2626] leading-none">{details.expiryDate}</span>
              </div>
            </div>
            <div className="text-right flex flex-col items-start gap-1">
              <span className="text-[6px] text-slate-400 font-black uppercase tracking-[1.5px] italic">Biometric Standard ID-1</span>
              <div className="h-3 w-10 bg-slate-50 border border-slate-200 rounded-sm"></div>
            </div>
          </div>
        </div>

        <div className="h-[12mm] bg-white border-t border-slate-200 px-[5mm] flex flex-col justify-center mrz-font font-mono text-slate-900 text-[11px] leading-[1.3] tracking-[4px] uppercase overflow-hidden shrink-0">
            <p className="whitespace-pre m-0 opacity-80 truncate">{mrz1}</p>
            <p className="whitespace-pre m-0 opacity-80 truncate">{mrz2}</p>
        </div>
      </div>

      <style>{`
        .id-card-container {
          box-sizing: border-box;
          print-color-adjust: exact;
          -webkit-print-color-adjust: exact;
          image-rendering: -webkit-optimize-contrast;
        }
        @media print {
          .id-card-container {
             border: none !important;
             box-shadow: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default MembershipCard;
