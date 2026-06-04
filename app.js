const LSKEY='dc_v2';
const el=id=>document.getElementById(id);
const fmtM=n=>'฿'+(n||0).toLocaleString();
const today=()=>new Date().toISOString().split('T')[0];
const fmtD=d=>{if(!d)return'-';return new Date(d).toLocaleDateString('th-TH',{year:'numeric',month:'short',day:'numeric'});};
const fmtT=d=>new Date(d).toLocaleTimeString('th-TH',{hour:'2-digit',minute:'2-digit'});
const age=dob=>dob?new Date().getFullYear()-new Date(dob).getFullYear():'-';
const gid=p=>(p||'')+(Date.now()).toString(36)+Math.random().toString(36).slice(2,5);

const TX=[
  {id:1,name:'อุดฟัน (Composite)',cat:'restorative',price:800,df:50,icon:'fa-fill-drip',color:'blue'},
  {id:2,name:'ถอนฟัน (Extraction)',cat:'surgical',price:600,df:50,icon:'fa-minus-circle',color:'red'},
  {id:3,name:'ขูดหินปูน (Scaling)',cat:'preventive',price:1000,df:40,icon:'fa-broom',color:'green'},
  {id:4,name:'รักษารากฟัน (RCT)',cat:'endodontic',price:8000,df:55,icon:'fa-syringe',color:'purple'},
  {id:5,name:'ครอบฟัน (Crown)',cat:'prosthetic',price:12000,df:45,icon:'fa-crown',color:'amber'},
  {id:6,name:'ฟันปลอม (Denture)',cat:'prosthetic',price:15000,df:40,icon:'fa-teeth',color:'amber'},
  {id:7,name:'เคลือบฟลูออไรด์',cat:'preventive',price:500,df:35,icon:'fa-shield',color:'teal'},
  {id:8,name:'เคลือบหลุมร่องฟัน',cat:'preventive',price:400,df:35,icon:'fa-fill',color:'teal'},
  {id:9,name:'ฟอกสีฟัน (Whitening)',cat:'cosmetic',price:6000,df:45,icon:'fa-star',color:'yellow'},
  {id:10,name:'จัดฟัน/เดือน',cat:'orthodontic',price:2000,df:50,icon:'fa-align-center',color:'indigo'},
  {id:11,name:'รากฟันเทียม (Implant)',cat:'surgical',price:50000,df:50,icon:'fa-bolt',color:'rose'},
  {id:12,name:'อุดฟันน้ำนม',cat:'pediatric',price:500,df:40,icon:'fa-baby',color:'pink'},
];

const STATS=[
  {key:'t-normal',lbl:'ปกติ',icon:'fa-check',bg:'bg-gray-50',bd:'border-gray-300',tx:'text-gray-600'},
  {key:'t-caries',lbl:'ฟันผุ',icon:'fa-circle-exclamation',bg:'bg-orange-50',bd:'border-orange-400',tx:'text-orange-700'},
  {key:'t-filled',lbl:'อุดแล้ว',icon:'fa-fill-drip',bg:'bg-yellow-50',bd:'border-yellow-400',tx:'text-yellow-700'},
  {key:'t-extracted',lbl:'ถอนแล้ว',icon:'fa-minus',bg:'bg-red-50',bd:'border-red-400',tx:'text-red-700'},
  {key:'t-crown',lbl:'ครอบ',icon:'fa-crown',bg:'bg-purple-50',bd:'border-purple-400',tx:'text-purple-700'},
  {key:'t-rct',lbl:'RCT',icon:'fa-syringe',bg:'bg-blue-50',bd:'border-blue-400',tx:'text-blue-700'},
  {key:'t-implant',lbl:'รากเทียม',icon:'fa-bolt',bg:'bg-emerald-50',bd:'border-emerald-400',tx:'text-emerald-700'},
  {key:'t-missing',lbl:'ไม่มีฟัน',icon:'fa-xmark',bg:'bg-gray-50',bd:'border-gray-400',tx:'text-gray-700'},
];

const DRS=[
  {id:'DR01',name:'ทพ. สมชาย แก้วใส',ini:'ส',spec:'ทันตกรรมทั่วไป',branch:'สาขาหลัก',schedule:[1,2,3,4,5],theme:'blue',df:{restorative:50,surgical:50,preventive:40,endodontic:55,prosthetic:45,cosmetic:45,orthodontic:50,pediatric:40}},
  {id:'DR02',name:'ทพญ. นภา สุขสม',ini:'น',spec:'จัดฟัน',branch:'สาขา 2',schedule:[2,4,6],theme:'pink',df:{restorative:45,surgical:45,preventive:35,endodontic:50,prosthetic:40,cosmetic:50,orthodontic:55,pediatric:35}},
  {id:'DR03',name:'ทพ. ภาณุ รุ่งเรือง',ini:'ภ',spec:'รากฟันเทียม',branch:'สาขา 3',schedule:[1,3,5,0],theme:'emerald',df:{restorative:50,surgical:55,preventive:40,endodontic:55,prosthetic:50,cosmetic:45,orthodontic:45,pediatric:40}},
];

const DEFAULT_INV=[
  {id:'I01',name:'Amoxicillin 500mg',cat:'ยา',stock:250,unit:'แคปซูล',price:15,min:50,icon:'fa-capsules',color:'blue'},
  {id:'I02',name:'Ibuprofen 400mg',cat:'ยา',stock:180,unit:'เม็ด',price:8,min:50,icon:'fa-pills',color:'orange'},
  {id:'I03',name:'Metronidazole 400mg',cat:'ยา',stock:120,unit:'เม็ด',price:12,min:30,icon:'fa-pills',color:'green'},
  {id:'I04',name:'Lidocaine 2%',cat:'ยา',stock:45,unit:'หลอด',price:85,min:20,icon:'fa-syringe',color:'purple'},
  {id:'I05',name:'Composite Resin A2',cat:'วัสดุทันตกรรม',stock:8,unit:'หลอด',price:1800,min:3,icon:'fa-fill-drip',color:'amber'},
  {id:'I06',name:'Composite Resin A3',cat:'วัสดุทันตกรรม',stock:12,unit:'หลอด',price:1800,min:3,icon:'fa-fill-drip',color:'amber'},
  {id:'I07',name:'GIC (Glass Ionomer)',cat:'วัสดุทันตกรรม',stock:6,unit:'กล่อง',price:950,min:2,icon:'fa-box',color:'cyan'},
  {id:'I08',name:'Impression Material',cat:'วัสดุทันตกรรม',stock:5,unit:'กระป๋อง',price:2200,min:2,icon:'fa-layer-group',color:'teal'},
  {id:'I09',name:'ถุงมือยาง',cat:'อุปกรณ์',stock:15,unit:'กล่อง(100)',price:280,min:5,icon:'fa-hand',color:'gray'},
  {id:'I10',name:'หน้ากากอนามัย',cat:'อุปกรณ์',stock:8,unit:'กล่อง(50)',price:150,min:3,icon:'fa-mask-face',color:'blue'},
  {id:'I11',name:'Suture 3-0',cat:'วัสดุทันตกรรม',stock:25,unit:'ซอง',price:450,min:10,icon:'fa-stitches',color:'rose'},
  {id:'I12',name:'H2O2 3%',cat:'ยา',stock:3,unit:'ขวด',price:120,min:5,icon:'fa-flask',color:'red'},
];

const NAV_ITEMS=[
  {id:'dashboard',lbl:'แดชบอร์ด',sub:'ภาพรวมคลินิก',icon:'fa-chart-pie',clr:'bg-p-100 text-p-600'},
  {id:'patients',lbl:'ระบบบริหารลูกค้า',sub:'OPD Registration',icon:'fa-users',clr:'bg-blue-100 text-blue-600'},
  {id:'dental',lbl:'ระบบวินิจฉัย/หัตถการ',sub:'Odontogram + SOAP',icon:'fa-tooth',clr:'bg-emerald-100 text-emerald-600'},
  {id:'billing',lbl:'การเงิน / บันทึก DF',sub:'Billing & Doctor Fee',icon:'fa-file-invoice-dollar',clr:'bg-amber-100 text-amber-600',badge:'cart-badge'},
  {id:'queue',lbl:'คิว / นัดหมาย',sub:'Queue + LINE Notify',icon:'fa-people-arrows',clr:'bg-cyan-100 text-cyan-600',badge:'queue-badge'},
  {id:'inventory',lbl:'ระบบจัดการสินค้า',sub:'Inventory',icon:'fa-pills',clr:'bg-rose-100 text-rose-600'},
  {id:'export',lbl:'ส่งออกข้อมูล',sub:'Data Export',icon:'fa-file-export',clr:'bg-indigo-100 text-indigo-600'},
];

// Build sidebar nav
el('sidebar-nav').innerHTML='<p class="text-xs text-gray-400 font-semibold uppercase tracking-widest px-3 py-2 sb-hide overflow-hidden transition-opacity duration-300">เมนูหลัก</p>'+NAV_ITEMS.map(n=>`<button id="nav-${n.id}" onclick="showView('${n.id}')" class="nav-item ${n.id==='dashboard'?'active':''} w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left"><div class="w-8 h-8 ${n.clr.split(' ')[0]} rounded-lg flex items-center justify-center shrink-0 mx-auto md:mx-0"><i class="fa-solid ${n.icon} ${n.clr.split(' ')[1]} text-sm"></i></div><div class="flex-1 sb-hide overflow-hidden transition-opacity duration-300"><p class="text-gray-700 font-medium text-sm whitespace-nowrap">${n.lbl}</p><p class="text-gray-400 text-xs whitespace-nowrap">${n.sub}</p></div>${n.badge?`<span id="${n.badge}" class="bg-${n.badge.includes('cart')?'red':'cyan'}-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center shrink-0 hidden">0</span>`:''}</button>`).join('');

// STATE
let pts,cart,toothD,notes,receipts,qArr,qCtr,lineLog,INV,selPt=null,selDr=null,curT=null,vatOn=false,payM='เงินสด',qF='all',invCat='all',invSrch='',nhOpen=false,mthOpen=false,mTab='proc',soapT='S',pendL=null,isLoggedIn=false;
let asTmr=null;
let activeExportType=null,activeExportData=[],exportDatesInitialized=false;
let ptViewMode='list',ptPage=1,ptItemsPerPage=6,ptFilterCov='all',ptFilterAlg='all',editPtHN=null;

const MOCK_PTS = [
    {hn:'HN-2025-001',name:'นายอนันต์ บุตรดี',gender:'ชาย',dob:'1990-03-15',phone:'081-234-5678',lineId:'@ananth',disease:'เบาหวาน',allergy:'Penicillin',blood:'B',cov:'ประกันสุขภาพ',regDate:'2025-01-05'},
    {hn:'HN-2025-002',name:'นางสาวสุดา ใจดี',gender:'หญิง',dob:'1995-07-22',phone:'089-876-5432',lineId:'',disease:'-',allergy:'',blood:'A',cov:'ชำระเอง',regDate:'2025-01-13'},
    {hn:'HN-2025-003',name:'นายวีระ มั่นคง',gender:'ชาย',dob:'1985-11-08',phone:'062-345-6789',lineId:'weeramankong',disease:'ความดันโลหิตสูง',allergy:'Aspirin, NSAIDs',blood:'O',cov:'บัตรทอง',regDate:'2025-01-21'},
    {hn:'HN-2025-004',name:'นางปราณี รักษา',gender:'หญิง',dob:'1972-05-30',phone:'091-567-8901',lineId:'',disease:'ไขมันในเลือดสูง',allergy:'',blood:'AB',cov:'ประกันสังคม',regDate:'2025-02-05'},
    {hn:'HN-2025-005',name:'ด.ช.ธนา ทันตกรรม',gender:'ชาย',dob:'2015-02-14',phone:'088-111-2222',lineId:'',disease:'-',allergy:'Amoxicillin',blood:'B',cov:'ชำระเอง',regDate:'2025-02-13'},
    {hn:'HN-2025-006',name:'นางสมศรี ใจสว่าง',gender:'หญิง',dob:'1965-09-09',phone:'081-333-4444',lineId:'somsri.j',disease:'โรคหัวใจ',allergy:'',blood:'O',cov:'เบิกต้นสังกัด',regDate:'2025-02-21'},
    {hn:'HN-2025-007',name:'นายกิตติ เก่งกล้า',gender:'ชาย',dob:'1988-12-01',phone:'089-555-6666',lineId:'kitti_88',disease:'-',allergy:'Seafood',blood:'A',cov:'ประกันสังคม',regDate:'2025-03-05'},
    {hn:'HN-2025-008',name:'น.ส.รัตนา สดใส',gender:'หญิง',dob:'2000-04-20',phone:'092-777-8888',lineId:'ratty',disease:'หอบหืด',allergy:'',blood:'AB',cov:'บัตรทอง',regDate:'2025-03-13'},
    {hn:'HN-2025-009',name:'นายพิชิต ชัยชนะ',gender:'ชาย',dob:'1978-06-11',phone:'081-999-0000',lineId:'',disease:'-',allergy:'Sulfa drugs',blood:'O',cov:'ประกันสุขภาพ',regDate:'2025-03-21'},
    {hn:'HN-2025-010',name:'นางจันทร์เพ็ญ เด่นดวง',gender:'หญิง',dob:'1982-10-25',phone:'084-222-3333',lineId:'janphen',disease:'ไทรอยด์',allergy:'',blood:'B',cov:'ชำระเอง',regDate:'2025-04-05'},
    {hn:'HN-2025-011',name:'นายสุชาติ ชาติเจริญ',gender:'ชาย',dob:'1992-01-05',phone:'086-444-5555',lineId:'',disease:'-',allergy:'',blood:'A',cov:'ประกันสังคม',regDate:'2025-04-13'},
    {hn:'HN-2025-012',name:'ด.ญ.มาลี สีสวย',gender:'หญิง',dob:'2012-08-16',phone:'085-666-7777',lineId:'malee_mom',disease:'-',allergy:'',blood:'O',cov:'ชำระเอง',regDate:'2025-04-21'},
    {hn:'HN-2025-013',name:'นายวิชัย ใจตรง',gender:'ชาย',dob:'1955-03-28',phone:'087-888-9999',lineId:'',disease:'เบาหวาน, ความดัน',allergy:'Ibuprofen',blood:'AB',cov:'เบิกต้นสังกัด',regDate:'2025-05-05'},
    {hn:'HN-2025-014',name:'นางนงนุช ชื่นใจ',gender:'หญิง',dob:'1998-11-12',phone:'083-123-4567',lineId:'nuchy',disease:'-',allergy:'',blood:'B',cov:'ประกันสุขภาพ',regDate:'2025-05-13'},
    {hn:'HN-2025-015',name:'นายปรีชา สามารถ',gender:'ชาย',dob:'1980-07-07',phone:'089-987-6543',lineId:'preecha.s',disease:'ภูมิแพ้',allergy:'Dust, Pollen',blood:'A',cov:'บัตรทอง',regDate:'2025-05-21'}
];

function getPtRegDate(p) {
  if (p.regDate) return p.regDate;
  if (p.hn && p.hn.startsWith('HN-')) {
    const parts = p.hn.split('-');
    const year = parts[1];
    const num = parseInt(parts[2]) || 1;
    if (year && year.length === 4) {
      const month = String(Math.floor((num - 1) / 3) + 1).padStart(2, '0');
      const day = String(((num - 1) % 3) * 8 + 5).padStart(2, '0');
      return `${year}-${month}-${day}`;
    }
  }
  return '2025-01-15';
}

function initState(){
  const d=JSON.parse(localStorage.getItem(LSKEY)||'null');
  pts=d?.pts||JSON.parse(JSON.stringify(MOCK_PTS));
  
  // Migrate/fill regDate for loaded patients if missing
  let ptUpdated = false;
  pts.forEach(p => {
    if (!p.regDate) {
      p.regDate = getPtRegDate(p);
      ptUpdated = true;
    }
  });
  if(pts.length<=4){pts=JSON.parse(JSON.stringify(MOCK_PTS)); ptUpdated = true;}
  if(ptUpdated) save();
  cart=d?.cart||[];toothD=d?.toothD||{};notes=d?.notes||[];receipts=d?.receipts||[];qArr=d?.qArr||[];qCtr=d?.qCtr||0;lineLog=d?.lineLog||[];
  INV=d?.inv||JSON.parse(JSON.stringify(DEFAULT_INV));
  if(!qArr.length){
    const td=new Date().toISOString().split('T')[0];
    qArr=[
      {id:'Q_M1',queueNo:'Q001',ptHN:'HN-2025-001',name:'นายอนันต์ บุตรดี',phone:'081-234-5678',lineId:'@ananth',svc:'ตรวจทั่วไป',prio:'normal',status:'waiting',date:td,addedAt:new Date(Date.now()-1000*60*15).toISOString(),calledAt:null,doneAt:null},
      {id:'Q_M2',queueNo:'Q002',ptHN:'HN-2025-002',name:'นางสาวสุดา ใจดี',phone:'089-876-5432',lineId:'',svc:'ขูดหินปูน',prio:'normal',status:'waiting',date:td,addedAt:new Date(Date.now()-1000*60*10).toISOString(),calledAt:null,doneAt:null},
      {id:'Q_M3',queueNo:'Q003',ptHN:'HN-2025-003',name:'นายวีระ มั่นคง',phone:'062-345-6789',lineId:'weeramankong',svc:'ถอนฟัน',prio:'urgent',status:'in-treatment',date:td,addedAt:new Date(Date.now()-1000*60*45).toISOString(),calledAt:new Date(Date.now()-1000*60*5).toISOString(),doneAt:null},
      {id:'Q_M4',queueNo:'Q004',ptHN:'HN-2025-004',name:'นางปราณี รักษา',phone:'091-567-8901',lineId:'',svc:'อุดฟัน',prio:'normal',status:'done',date:td,addedAt:new Date(Date.now()-1000*60*120).toISOString(),calledAt:new Date(Date.now()-1000*60*90).toISOString(),doneAt:new Date(Date.now()-1000*60*60).toISOString()}
    ];
    qCtr=Math.max(qCtr,4);
    save();
  }
  if(!lineLog.length){
    lineLog=[
      {time:new Date(Date.now()-1000*60*5).toISOString(),recip:'weeramankong',msg:'🦷 ถึงคิวของคุณแล้ว! กรุณาเข้าห้องตรวจ — Wise Dental'},
      {time:new Date(Date.now()-1000*60*60).toISOString(),recip:'091-567-8901',msg:'✅ รักษาเสร็จแล้ว! ขอบคุณ 🦷'},
      {time:new Date(Date.now()-1000*60*90).toISOString(),recip:'091-567-8901',msg:'🦷 ถึงคิวของคุณแล้ว! กรุณาเข้าห้องตรวจ — Wise Dental'}
    ];
    save();
  }
  if(Object.keys(toothD).length===0){
    const h1='HN-2025-001',h2='HN-2025-003';
    toothD[h1]={'18':{status:'t-extracted',history:[{date:'2025-01-10',tx:'ถอนฟัน',dr:'ทพ. สมชาย แก้วใส'}]},'26':{status:'t-caries',history:[]},'46':{status:'t-filled',history:[{date:'2025-03-12',tx:'อุดฟัน',dr:'ทพญ. นภา สุขสม'}]}};
    toothD[h2]={'11':{status:'t-crown',history:[{date:'2025-02-15',tx:'ครอบฟัน',dr:'ทพ. ภาณุ รุ่งเรือง'}]},'21':{status:'t-rct',history:[{date:'2025-01-20',tx:'รักษารากฟัน',dr:'ทพญ. นภา สุขสม'}]},'36':{status:'t-implant',history:[{date:'2024-11-05',tx:'รากฟันเทียม',dr:'ทพ. ภาณุ รุ่งเรือง'}]}};
    save();
  }
  if(!notes.length){
    const d1=new Date(Date.now()-1000*3600*24*15).toISOString();
    const d2=new Date(Date.now()-1000*3600*24*45).toISOString();
    notes=[
      {id:'N1',ptHN:'HN-2025-001',date:d1.split('T')[0],ts:d1,dr:'ทพ. สมชาย แก้วใส',cc:'ปวดฟันกรามล่างขวาเวลาเคี้ยว',vitals:{bp:'120/80',hr:'75',o2:'98'},soap:{S:'ปวดฟันซี่ 46 เวลาเคี้ยวอาหารแข็ง',O:'ฟันซี่ 46 มีรอยผุลึกถึงเนื้อฟัน',A:'Dental Caries at 46',P:'อุดฟันด้วย Composite Resin'}},
      {id:'N2',ptHN:'HN-2025-003',date:d2.split('T')[0],ts:d2,dr:'ทพญ. นภา สุขสม',cc:'ฟันหน้าบิ่น',vitals:{bp:'135/85',hr:'80',o2:'99'},soap:{S:'อุบัติเหตุหกล้ม ฟันหน้าบิ่น',O:'ฟันซี่ 11, 21 บิ่น ไม่ทะลุโพรงประสาท',A:'Uncomplicated crown fracture 11,21',P:'ครอบฟัน 11, รักษาราก 21'}}
    ];
    save();
  }
  if(!receipts.length){
    const tm=new Date().toISOString().slice(0,7);
    receipts=[
      {id:'RC-100001',ptHN:'HN-2025-001',drId:'DR01',drName:'ทพ. สมชาย แก้วใส',date:tm+'-05',items:[{txCat:'restorative',price:800}],totalPrice:800,df:400,clinic:400,vat:0,discount:0,net:800,pay:'เงินสด'},
      {id:'RC-100002',ptHN:'HN-2025-003',drId:'DR02',drName:'ทพญ. นภา สุขสม',date:tm+'-12',items:[{txCat:'prosthetic',price:12000},{txCat:'endodontic',price:8000}],totalPrice:20000,df:9400,clinic:10600,vat:0,discount:0,net:20000,pay:'บัตรเครดิต'},
      {id:'RC-100003',ptHN:'HN-2025-005',drId:'DR01',drName:'ทพ. สมชาย แก้วใส',date:tm+'-20',items:[{txCat:'pediatric',price:500}],totalPrice:500,df:200,clinic:300,vat:0,discount:0,net:500,pay:'เงินสด'},
      {id:'RC-100004',ptHN:'HN-2025-002',drId:'DR03',drName:'ทพ. ภาณุ รุ่งเรือง',date:today(),items:[{txCat:'preventive',price:1000}],totalPrice:1000,df:400,clinic:600,vat:0,discount:0,net:1000,pay:'โอนเงิน'}
    ];
    save();
  }
  isLoggedIn=d?.isLoggedIn||false;
  if(el('app-layout') && el('login-layout')){
    if(!isLoggedIn){el('app-layout').classList.add('hidden');el('login-layout').classList.remove('hidden');}
    else{el('login-layout').classList.add('hidden');el('app-layout').classList.remove('hidden');}
  }
}

function renderDash(){
  const kpi=el('kpi-grid'),br=el('dash-bars'),ql=el('dash-queue');
  if(!kpi)return;
  const td=today(),mo=td.slice(0,7);
  const tdR=receipts.filter(r=>r.date===td),moR=receipts.filter(r=>r.date.startsWith(mo));
  const tr=moR.reduce((s,r)=>s+r.totalPrice,0),tq=qArr.filter(q=>q.date===td).length;
  const lowI=INV.filter(i=>i.stock<=i.min).length;
  kpi.innerHTML=`
    <div class="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition"><div class="w-12 h-12 bg-p-100 rounded-xl flex items-center justify-center shrink-0"><i class="fa-solid fa-coins text-p-600 text-xl"></i></div><div><p class="text-gray-500 text-xs">รายได้เดือนนี้</p><p class="text-gray-800 font-bold text-lg">${fmtM(tr)}</p></div></div>
    <div class="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition cursor-pointer" onclick="showView('queue')"><div class="w-12 h-12 bg-cyan-100 rounded-xl flex items-center justify-center shrink-0"><i class="fa-solid fa-people-arrows text-cyan-600 text-xl"></i></div><div><p class="text-gray-500 text-xs">คิววันนี้</p><p class="text-gray-800 font-bold text-lg">${tq} คน</p></div></div>
    <div class="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition"><div class="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center shrink-0"><i class="fa-solid fa-user-doctor text-emerald-600 text-xl"></i></div><div><p class="text-gray-500 text-xs">แพทย์เข้าเวร</p><p class="text-gray-800 font-bold text-lg">${DRS.length} ท่าน</p></div></div>
    <div class="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition cursor-pointer" onclick="showView('inventory')"><div class="w-12 h-12 bg-rose-100 rounded-xl flex items-center justify-center shrink-0"><i class="fa-solid fa-box-open text-rose-600 text-xl"></i></div><div><p class="text-gray-500 text-xs">สินค้าใกล้หมด</p><p class="text-${lowI>0?'rose':'gray'}-800 font-bold text-lg">${lowI} รายการ</p></div></div>
  `;
  const cRev={restorative:0,surgical:0,preventive:0,endodontic:0,prosthetic:0,cosmetic:0,orthodontic:0,pediatric:0};
  let mx=0;
  moR.forEach(r=>{r.items.forEach(i=>{if(cRev[i.txCat]!==undefined){cRev[i.txCat]+=i.price;if(cRev[i.txCat]>mx)mx=cRev[i.txCat];}})});
  const cN={restorative:{n:'อุดฟัน',c:'blue'},surgical:{n:'ศัลยกรรม',c:'red'},preventive:{n:'ป้องกัน',c:'green'},endodontic:{n:'รักษาราก',c:'purple'},prosthetic:{n:'ใส่ฟัน',c:'amber'}};
  br.innerHTML=Object.keys(cN).map(k=>{const p=mx?Math.round((cRev[k]||0)/mx*100):0;return`<div class="mb-2"><div class="flex justify-between text-xs mb-1"><span class="text-gray-600">${cN[k].n}</span><span class="font-bold text-gray-800">${fmtM(cRev[k]||0)}</span></div><div class="h-1.5 bg-gray-100 rounded-full overflow-hidden"><div class="h-1.5 bg-${cN[k].c}-500 rounded-full transition-all duration-1000" style="width:${p}%"></div></div></div>`}).join('');
  el('ds-total').textContent=fmtM(tdR.reduce((s,r)=>s+r.totalPrice,0));
  el('ds-df').textContent=fmtM(tdR.reduce((s,r)=>s+r.df,0));
  el('ds-clinic').textContent=fmtM(tdR.reduce((s,r)=>s+r.clinic,0));

  const wQ=qArr.filter(q=>q.status==='waiting').length;
  const tbQc=el('tb-qc'); if(tbQc) tbQc.textContent = wQ;
  const notifDot=el('notif-dot'); if(notifDot) { if(lowI>0) notifDot.classList.remove('hidden'); else notifDot.classList.add('hidden'); }
  
  const qtd=qArr.filter(q=>q.date===td&&q.status!=='done'&&q.status!=='skipped').slice(0,4);
  ql.innerHTML=qtd.length?qtd.map(q=>`<div class="flex items-center gap-3 p-2 bg-gray-50 rounded-xl hover:bg-gray-100 transition"><div class="w-8 h-8 ${q.status==='waiting'?'bg-amber-100 text-amber-600':'bg-blue-100 text-blue-600'} rounded-lg flex items-center justify-center shrink-0 font-bold text-xs">${q.queueNo.replace('Q','')}</div><div class="flex-1 min-w-0"><p class="text-gray-800 text-xs font-semibold truncate">${q.name}</p><p class="text-gray-400 text-[10px] truncate">${q.svc}</p></div><span class="text-[10px] font-bold ${q.status==='waiting'?'text-amber-500':'text-blue-500'} bg-white px-1.5 py-0.5 rounded shadow-sm">${q.status==='waiting'?'รอ':'กำลัง'}</span></div>`).join(''):'<p class="text-gray-400 text-xs text-center py-4">ไม่มีคิวที่รอดำเนินการ</p>';
  const ds=el('dash-q-sel');if(ds){ds.innerHTML='<option value="">-- เลือกผู้ป่วย --</option>'+pts.map(p=>`<option value="${p.hn}">${p.name}</option>`).join('');}
  
  renderCalendar();
}

let calMode = 'week';
function setCalMode(mode) {
  calMode = mode;
  const wBtn=el('cal-btn-week'), mBtn=el('cal-btn-month');
  if(wBtn) wBtn.className = mode === 'week' ? 'px-4 py-1.5 text-xs font-semibold rounded-md bg-white shadow-sm text-p-600 transition' : 'px-4 py-1.5 text-xs font-semibold rounded-md text-gray-500 hover:text-gray-700 transition';
  if(mBtn) mBtn.className = mode === 'month' ? 'px-4 py-1.5 text-xs font-semibold rounded-md bg-white shadow-sm text-p-600 transition' : 'px-4 py-1.5 text-xs font-semibold rounded-md text-gray-500 hover:text-gray-700 transition';
  renderCalendar();
}

function renderCalendar() {
  const c = el('dash-calendar');
  if (!c) return;
  const days = ['อา.', 'จ.', 'อ.', 'พ.', 'พฤ.', 'ศ.', 'ส.'];
  const today = new Date();
  
  if (calMode === 'week') {
    const d = new Date(today);
    const day = d.getDay();
    const startOfWeek = new Date(d.setDate(d.getDate() - day));
    
    let html = `<div class="grid grid-cols-7 gap-2 min-w-[600px]">`;
    for(let i=0; i<7; i++) {
      const cur = new Date(startOfWeek);
      cur.setDate(startOfWeek.getDate() + i);
      const isToday = cur.toDateString() === today.toDateString();
      
      const drsOnDuty = DRS.filter(dr => dr.schedule.includes(i));
      const drHtml = drsOnDuty.map(dr => `<div class="bg-${dr.theme}-50 text-${dr.theme}-700 text-[10px] font-bold px-2 py-1.5 rounded mt-1.5 border border-${dr.theme}-200 flex items-center gap-1"><div class="w-4 h-4 bg-${dr.theme}-500 text-white rounded-full flex items-center justify-center shrink-0 text-[8px]">${dr.ini}</div> <span class="truncate">${dr.name}</span></div>`).join('');
      
      html += `<div class="border ${isToday ? 'border-p-300 bg-p-50 shadow-sm' : 'border-gray-100 bg-white'} rounded-xl p-2.5 flex flex-col min-h-[100px]">
        <p class="text-center text-xs font-bold ${isToday ? 'text-p-700' : 'text-gray-500'} mb-2 border-b border-gray-100 pb-2">${days[i]} ${cur.getDate()}</p>
        <div class="space-y-1 flex-1">${drHtml || '<p class="text-center text-gray-300 text-[10px] mt-4">-</p>'}</div>
      </div>`;
    }
    html += `</div>`;
    c.innerHTML = html;
  } else {
    const y = today.getFullYear(), m = today.getMonth();
    const firstDay = new Date(y, m, 1).getDay();
    const daysInMonth = new Date(y, m + 1, 0).getDate();
    
    let html = `<div class="grid grid-cols-7 gap-1 min-w-[700px] text-center mb-1">`;
    days.forEach(d => html += `<div class="text-gray-400 text-xs font-bold py-1">${d}</div>`);
    html += `</div><div class="grid grid-cols-7 gap-1 min-w-[700px]">`;
    
    for(let i=0; i<firstDay; i++) html += `<div class="p-2"></div>`;
    
    for(let i=1; i<=daysInMonth; i++) {
      const cur = new Date(y, m, i);
      const dayOfWeek = cur.getDay();
      const isToday = cur.toDateString() === today.toDateString();
      const drsOnDuty = DRS.filter(dr => dr.schedule.includes(dayOfWeek));
      const drHtml = drsOnDuty.map(dr => `<div class="w-2.5 h-2.5 rounded-full bg-${dr.theme}-500 shadow-sm" title="${dr.name}"></div>`).join('');
      
      html += `<div class="border ${isToday ? 'border-p-300 bg-p-50 shadow-sm' : 'border-gray-100 bg-white hover:bg-gray-50'} rounded-lg p-1.5 h-[70px] flex flex-col transition cursor-default">
        <span class="text-[10px] font-bold ${isToday ? 'text-p-700' : 'text-gray-500'} block mb-1">${i}</span>
        <div class="flex flex-wrap gap-1 mt-auto justify-start">${drHtml}</div>
      </div>`;
    }
    html += `</div>`;
    c.innerHTML = html;
  }
}


function quickAddQ(){
  const hn=el('dash-q-sel').value;if(!hn){showToast('warning','ระบุผู้ป่วย','โปรดเลือกผู้ป่วยก่อนเพิ่มคิว');return;}
  const p=pts.find(x=>x.hn===hn);if(!p)return;
  addQItem({name:p.name,phone:p.phone,lineId:p.lineId||'',svc:'ตรวจทั่วไป',ptHN:p.hn,prio:'normal'});
  el('dash-q-sel').value='';
  renderDash();
}

function save(){
  try{
    localStorage.setItem(LSKEY,JSON.stringify({pts,cart,toothD,notes,receipts,qArr,qCtr,lineLog,inv:INV,isLoggedIn}));
  }catch(e){}
}

function doLogin(e){
  e.preventDefault();
  isLoggedIn=true;save();
  el('login-layout').classList.add('hidden');
  el('app-layout').classList.remove('hidden');
  showToast('success','เข้าสู่ระบบสำเร็จ','ยินดีต้อนรับกลับมา');
}

function doLogout(){
  if(!confirm('ยืนยันออกจากระบบ?'))return;
  isLoggedIn=false;save();
  el('app-layout').classList.add('hidden');
  el('login-layout').classList.remove('hidden');
  const lf=el('login-form');if(lf)lf.reset();
  showToast('info','ออกจากระบบ','แล้วพบกันใหม่');
}


// NAV
// NAV
const VIEWS=['dashboard','patients','dental','billing','queue','inventory','export'];
const TITLES={
  dashboard:['แดชบอร์ด','ภาพรวมคลินิก และ ตารางเวร'],
  patients:['ระบบบริหารจัดการลูกค้า','OPD Registration'],
  dental:['ระบบวินิจฉัยและหัตถการ','Doctor Note + Tooth Chart'],
  billing:['การเงิน / บันทึก DF','Billing & Doctor Fee Management'],
  queue:['คิว / นัดหมาย','Queue & Notifications (LINE/App)'],
  inventory:['ระบบจัดการสินค้า','Inventory & Supply'],
  export:['ส่งออกข้อมูล','Data Export (CSV)']
};
function showView(v){
  VIEWS.forEach(x=>{el('view-'+x)?.classList.remove('active');el('nav-'+x)?.classList.remove('active');});
  el('view-'+v)?.classList.add('active');el('nav-'+v)?.classList.add('active');
  const[t,s]=TITLES[v]||[v,''];el('page-title').textContent=t;el('page-sub').textContent=s;
  if(v==='patients')renderPts();
  if(v==='dental')initSels();
  if(v==='billing'){renderBill();initBillDr();renderMth();}
  if(v==='queue'){renderQ();updateQStat();updateQBadge();}
  if(v==='inventory')renderInv();
  if(v==='dashboard')renderDash();
  if(v==='export')initExportView();
  if(window.innerWidth<768)toggleSidebar(false); // Hide sidebar on nav on mobile
}

function toggleSidebar(force){
  const sb=el('sidebar'),ov=el('sidebar-overlay');
  if(!sb||!ov)return;
  if(window.innerWidth < 768) {
    const isShow=force!==undefined?force:sb.classList.contains('-translate-x-full');
    if(isShow){
      sb.classList.remove('-translate-x-full');
      ov.classList.remove('hidden');
    }else{
      sb.classList.add('-translate-x-full');
      ov.classList.add('hidden');
    }
  } else {
    document.body.classList.toggle('sb-collapsed');
  }
}

// DATE
el('cur-date').textContent=new Date().toLocaleDateString('th-TH',{weekday:'short',year:'numeric',month:'short',day:'numeric'});
el('dash-date').textContent='วันนี้ '+fmtD(today());

// TEETH BUILDER
function tBtn(n){return `<div id="tooth-${n}" onclick="openTMod(${n})" class="tooth-btn t-normal w-9 h-10 border-2 rounded-lg flex items-center justify-center text-xs font-bold">${n}</div>`;}
function tRow(arr){const h=Math.ceil(arr.length/2);return `<div class="flex gap-1">${arr.slice(0,h).map(tBtn).join('')}</div><div class="h-10 border-l-2 border-dashed border-gray-300 mx-1"></div><div class="flex gap-1">${arr.slice(h).map(tBtn).join('')}</div>`;}
function buildTeeth(){
  el('chart-pu').innerHTML=tRow([18,17,16,15,14,13,12,11,21,22,23,24,25,26,27,28]);
  el('chart-pl').innerHTML=tRow([48,47,46,45,44,43,42,41,31,32,33,34,35,36,37,38]);
  el('chart-riu').innerHTML=tRow([55,54,53,52,51,61,62,63,64,65]);
  el('chart-ril').innerHTML=tRow([85,84,83,82,81,71,72,73,74,75]);
}

let tType='perm';
function toggleTeeth(t){
  tType=t;el('teeth-perm').classList.toggle('hidden',t!=='perm');el('teeth-prim').classList.toggle('hidden',t!=='prim');
  ['perm','prim'].forEach(x=>{const b=el('btn-'+x);b.classList.toggle('active',x===t);if(x!==t)b.classList.add('text-gray-500');else b.classList.remove('text-gray-500');});
  if(selPt)loadTD(selPt.hn);
}


function onBell(){const ls=INV.filter(i=>i.stock<=i.min);ls.length?showToast('warning','ยาใกล้หมด',ls.map(i=>`${i.name}: ${i.stock}`).join(', ')):showToast('success','ไม่มีการแจ้งเตือน','ทุกอย่างปกติ');}

// PATIENTS
function savePt(e){
  e.preventDefault();
  const hn=el('i-hn').value.trim();
  if(editPtHN){
    const idx=pts.findIndex(p=>p.hn===editPtHN);
    if(idx>-1) pts[idx]={hn,name:el('i-name').value.trim(),gender:el('i-gender').value,dob:el('i-dob').value,phone:el('i-phone').value.trim(),lineId:el('i-line').value.trim(),disease:el('i-dis').value.trim()||'-',allergy:el('i-allergy').value.trim(),blood:el('i-blood').value,cov:el('i-cov').value,regDate:pts[idx].regDate||today()};
    showToast('success','อัปเดตสำเร็จ',hn);
    cancelEditPt();
  }else{
    if(pts.find(p=>p.hn===hn)){showToast('error','HN ซ้ำ',hn);return;}
    pts.unshift({hn,name:el('i-name').value.trim(),gender:el('i-gender').value,dob:el('i-dob').value,phone:el('i-phone').value.trim(),lineId:el('i-line').value.trim(),disease:el('i-dis').value.trim()||'-',allergy:el('i-allergy').value.trim(),blood:el('i-blood').value,cov:el('i-cov').value,regDate:today()});
    showToast('success','บันทึกสำเร็จ','เพิ่มผู้ป่วยแล้ว');
    el('pt-form').reset();
  }
  save();renderPts();initSels();
}
function editPt(hn){
  const p=pts.find(x=>x.hn===hn);if(!p)return;
  editPtHN=hn;el('i-hn').value=p.hn;el('i-name').value=p.name;el('i-gender').value=p.gender;el('i-dob').value=p.dob||'';el('i-phone').value=p.phone;el('i-line').value=p.lineId||'';el('i-dis').value=p.disease==='-'?'':p.disease;el('i-allergy').value=p.allergy||'';el('i-blood').value=p.blood||'';el('i-cov').value=p.cov||'';
  el('pt-form-title').textContent='แก้ไขข้อมูลผู้ป่วย';el('pt-form-sub').textContent=hn;
  el('pt-btn-text').textContent='อัปเดตข้อมูลผู้ป่วย';el('pt-btn-cancel').classList.remove('hidden');
  el('pt-form-icon').classList.replace('bg-blue-100','bg-amber-100');el('pt-form-icon').innerHTML='<i class="fa-solid fa-pen text-amber-600"></i>';
}
function cancelEditPt(){
  editPtHN=null;el('pt-form').reset();
  el('pt-form-title').textContent='ลงทะเบียนผู้ป่วยใหม่';el('pt-form-sub').textContent='OPD Registration';
  el('pt-btn-text').textContent='บันทึกข้อมูลผู้ป่วย';el('pt-btn-cancel').classList.add('hidden');
  el('pt-form-icon').classList.replace('bg-amber-100','bg-blue-100');el('pt-form-icon').innerHTML='<i class="fa-solid fa-user-plus text-blue-600"></i>';
}
function setPtView(v){
  ptViewMode=v;
  if(v==='list'){
    el('pt-v-list').classList.add('bg-white','text-gray-500','shadow-sm');
    el('pt-v-list').classList.remove('text-gray-400','hover:text-gray-600');
    el('pt-v-grid').classList.remove('bg-white','text-gray-500','shadow-sm');
    el('pt-v-grid').classList.add('text-gray-400','hover:text-gray-600');
    el('pt-list-container').classList.remove('hidden');
    el('pt-grid-container').classList.add('hidden');
  } else {
    el('pt-v-grid').classList.add('bg-white','text-gray-500','shadow-sm');
    el('pt-v-grid').classList.remove('text-gray-400','hover:text-gray-600');
    el('pt-v-list').classList.remove('bg-white','text-gray-500','shadow-sm');
    el('pt-v-list').classList.add('text-gray-400','hover:text-gray-600');
    el('pt-list-container').classList.add('hidden');
    el('pt-grid-container').classList.remove('hidden');
  }
  renderPts();
}
function changePtPage(p){ptPage=p;renderPts();}
function renderPts(){
  const tb=el('pt-tbody'),gc=el('pt-grid-container'),em=el('pt-empty'),ct=el('pt-count');
  const q=(el('pt-search')?el('pt-search').value:'').toLowerCase();
  let fl=pts;
  if(ptFilterCov!=='all') fl=fl.filter(p=>p.cov===ptFilterCov);
  if(ptFilterAlg==='yes') fl=fl.filter(p=>p.allergy&&p.allergy.trim()!=='');
  if(q) fl=fl.filter(p=>p.name.toLowerCase().includes(q)||p.hn.toLowerCase().includes(q));
  
  ct.textContent=fl.length+' รายการ';
  if(!fl.length){tb.innerHTML='';gc.innerHTML='';em.classList.remove('hidden');el('pt-pagination').innerHTML='';el('pt-page-info').textContent='';return;}
  em.classList.add('hidden');
  
  const tp=Math.ceil(fl.length/ptItemsPerPage);
  if(ptPage>tp) ptPage=tp; if(ptPage<1) ptPage=1;
  const start=(ptPage-1)*ptItemsPerPage;
  const end=start+ptItemsPerPage;
  const pageData=fl.slice(start,end);
  
  // Pagination UI
  let pgHTML='';
  pgHTML+=`<button onclick="changePtPage(${ptPage-1})" ${ptPage===1?'disabled':''} class="w-7 h-7 rounded flex items-center justify-center text-gray-500 hover:bg-gray-100 disabled:opacity-30"><i class="fa-solid fa-chevron-left text-[10px]"></i></button>`;
  for(let i=1;i<=tp;i++){
    pgHTML+=`<button onclick="changePtPage(${i})" class="w-7 h-7 rounded text-xs font-semibold flex items-center justify-center transition ${i===ptPage?'bg-p-500 text-white shadow-sm':'text-gray-500 hover:bg-gray-100'}">${i}</button>`;
  }
  pgHTML+=`<button onclick="changePtPage(${ptPage+1})" ${ptPage===tp?'disabled':''} class="w-7 h-7 rounded flex items-center justify-center text-gray-500 hover:bg-gray-100 disabled:opacity-30"><i class="fa-solid fa-chevron-right text-[10px]"></i></button>`;
  el('pt-pagination').innerHTML=pgHTML;
  el('pt-page-info').textContent=`แสดง ${start+1}-${Math.min(end,fl.length)} จาก ${fl.length}`;
  
  // List UI
  tb.innerHTML=pageData.map(p=>`<tr class="trow border-b border-gray-50 hover:bg-gray-50/50"><td class="py-2.5 px-3"><span class="text-p-700 font-bold text-xs bg-p-50 px-2 py-1 rounded-lg">${p.hn}</span></td><td class="py-2.5 px-3"><div class="flex items-center gap-2"><div class="w-7 h-7 ${p.gender==='หญิง'?'bg-pink-100':'bg-blue-100'} rounded-full flex items-center justify-center shrink-0"><i class="fa-solid fa-user text-${p.gender==='หญิง'?'pink':'blue'}-600 text-xs"></i></div><div class="min-w-0"><p class="text-gray-800 text-sm font-semibold truncate">${p.name}</p><p class="text-gray-400 text-[10px] flex items-center gap-1"><span class="bg-gray-100 text-gray-600 px-1 rounded">${p.cov||'-'}</span> ${p.dob?age(p.dob)+' ปี':''}</p></div></div></td><td class="py-2.5 px-3 text-gray-600 text-xs">${p.phone}</td><td class="py-2.5 px-3">${p.allergy?`<span class="bg-red-50 text-red-600 border border-red-100 text-[10px] font-bold px-1.5 py-0.5 rounded-md flex items-center gap-1 w-max"><i class="fa-solid fa-triangle-exclamation"></i> ${p.allergy}</span>`:'<span class="text-gray-300 text-xs">-</span>'}</td><td class="py-2.5 px-3"><div class="flex gap-1"><button onclick="goDental('${p.hn}')" class="w-7 h-7 bg-emerald-50 hover:bg-emerald-500 text-emerald-600 hover:text-white rounded-lg flex items-center justify-center transition shadow-sm" title="ห้องตรวจ"><i class="fa-solid fa-stethoscope text-xs"></i></button><button onclick="addPtQ('${p.hn}')" class="w-7 h-7 bg-cyan-50 hover:bg-cyan-500 text-cyan-600 hover:text-white rounded-lg flex items-center justify-center transition shadow-sm" title="เพิ่มคิว"><i class="fa-solid fa-list-ol text-xs"></i></button><button onclick="editPt('${p.hn}')" class="w-7 h-7 bg-amber-50 hover:bg-amber-500 text-amber-600 hover:text-white rounded-lg flex items-center justify-center transition shadow-sm" title="แก้ไข"><i class="fa-solid fa-pen text-xs"></i></button><button onclick="delPt('${p.hn}')" class="w-7 h-7 bg-red-50 hover:bg-red-500 text-red-500 hover:text-white rounded-lg flex items-center justify-center transition shadow-sm" title="ลบ"><i class="fa-solid fa-trash text-xs"></i></button></div></td></tr>`).join('');
  
  // Grid UI
  gc.innerHTML=pageData.map(p=>`<div class="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm hover:shadow-md transition group relative overflow-hidden"><div class="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br ${p.gender==='หญิง'?'from-pink-50 to-pink-100':'from-blue-50 to-blue-100'} rounded-bl-full -z-10 opacity-50 group-hover:scale-110 transition-transform"></div><div class="flex justify-between items-start mb-3"><div class="flex items-center gap-3"><div class="w-10 h-10 ${p.gender==='หญิง'?'bg-pink-100':'bg-blue-100'} rounded-xl flex items-center justify-center shrink-0 shadow-inner"><i class="fa-solid fa-user text-${p.gender==='หญิง'?'pink':'blue'}-600 text-sm"></i></div><div><h4 class="font-bold text-gray-800 text-sm">${p.name}</h4><span class="text-p-600 font-bold text-[10px] bg-p-50 px-1.5 py-0.5 rounded">${p.hn}</span></div></div><div class="flex gap-1 flex-col"><button onclick="goDental('${p.hn}')" class="w-6 h-6 bg-emerald-50 hover:bg-emerald-500 text-emerald-600 hover:text-white rounded flex items-center justify-center transition" title="ห้องตรวจ"><i class="fa-solid fa-stethoscope text-[10px]"></i></button><button onclick="addPtQ('${p.hn}')" class="w-6 h-6 bg-cyan-50 hover:bg-cyan-500 text-cyan-600 hover:text-white rounded flex items-center justify-center transition" title="เพิ่มคิว"><i class="fa-solid fa-list-ol text-[10px]"></i></button></div></div><div class="space-y-1.5 mb-4"><p class="text-xs text-gray-500 flex items-center gap-2"><i class="fa-solid fa-phone w-3 text-gray-400"></i>${p.phone}</p><p class="text-xs text-gray-500 flex items-center gap-2"><i class="fa-solid fa-shield-halved w-3 text-gray-400"></i><span class="bg-gray-100 px-1 rounded font-medium">${p.cov||'-'}</span></p>${p.allergy?`<p class="text-[10px] font-bold text-red-600 bg-red-50 border border-red-100 rounded-md px-1.5 py-0.5 w-max flex items-center gap-1"><i class="fa-solid fa-triangle-exclamation"></i> แพ้: ${p.allergy}</p>`:''}</div><div class="flex gap-1 border-t border-gray-50 pt-3"><button onclick="editPt('${p.hn}')" class="flex-1 text-xs font-semibold text-amber-600 bg-amber-50 hover:bg-amber-100 py-1.5 rounded-lg transition">แก้ไข</button><button onclick="delPt('${p.hn}')" class="flex-1 text-xs font-semibold text-red-500 bg-red-50 hover:bg-red-100 py-1.5 rounded-lg transition">ลบ</button></div></div>`).join('');
}
function filterPts(){ptPage=1;renderPts();}
function delPt(hn){if(!confirm('ลบ '+hn+'?'))return;pts=pts.filter(p=>p.hn!==hn);save();renderPts();initSels();showToast('warning','ลบแล้ว',hn);}
function goDental(hn){showView('dental');el('dental-pt-sel').value=hn;selDentalPt();}
function addPtQ(hn){const p=pts.find(x=>x.hn===hn);if(!p)return;addQItem({name:p.name,phone:p.phone,lineId:p.lineId||'',svc:'ตรวจทั่วไป',ptHN:p.hn,prio:'normal'});showToast('success','เพิ่มคิว',p.name);}

// DENTAL
function initSels(){
  const ps=el('dental-pt-sel'),pc=ps.value;ps.innerHTML='<option value="">-- เลือกผู้ป่วย --</option>'+pts.map(p=>`<option value="${p.hn}">${p.hn} — ${p.name}</option>`).join('');if(pc)ps.value=pc;
  const ds=el('dental-dr-sel'),dc=ds.value;ds.innerHTML='<option value="">-- เลือกแพทย์ --</option>'+DRS.map(d=>`<option value="${d.id}">${d.name}</option>`).join('');if(dc)ds.value=dc;
  const qp=el('q-pt-sel');if(qp)qp.innerHTML='<option value="">-- เลือก --</option>'+pts.map(p=>`<option value="${p.hn}">${p.name}</option>`).join('');
  const bd=el('bill-dr-sel');if(bd){bd.innerHTML='<option value="">-- เลือก --</option>'+DRS.map(d=>`<option value="${d.id}">${d.name}</option>`).join('');if(selDr)bd.value=selDr.id;}
}
function selDentalPt(){
  const hn=el('dental-pt-sel').value,info=el('dental-pt-info'),ab=el('dental-allb'),db=el('dental-disb'),bq=el('btn-add-q');
  if(!hn){selPt=null;info.classList.add('hidden');bq.classList.add('hidden');clrSOAP();return;}
  selPt=pts.find(p=>p.hn===hn);if(!selPt)return;
  el('dental-pt-name').textContent=selPt.name;info.classList.remove('hidden');bq.classList.remove('hidden');
  selPt.allergy?(ab.classList.remove('hidden'),ab.title='แพ้: '+selPt.allergy):ab.classList.add('hidden');
  (selPt.disease&&selPt.disease!=='-')?(db.classList.remove('hidden'),db.textContent='🫀 '+selPt.disease):db.classList.add('hidden');
  el('bill-pt-lbl').textContent=`ผู้ป่วย: ${selPt.name} (${selPt.hn})`;
  loadTD(hn);loadLatSOAP(hn);updNHCnt(hn);
}
function selDoctor(){
  const did=el('dental-dr-sel').value;selDr=DRS.find(d=>d.id===did)||null;
  const info=el('session-dr-info');
  if(selDr){info.classList.remove('hidden');el('session-dr-name').textContent=selDr.name;el('session-dr-df').textContent=selDr.spec+' — DF per category';cart.forEach(item=>{const t=TX.find(x=>x.id===item.txId);if(t)item.df=selDr.df[t.cat]||t.df;});renderCartS();}
  else info.classList.add('hidden');
  const bds=el('bill-dr-sel');if(bds)bds.value=did||'';
  showToast('info','เลือกแพทย์',selDr?selDr.name:'ยกเลิก');
}
function loadTD(hn){
  if(!toothD[hn])toothD[hn]={};
  const all=[18,17,16,15,14,13,12,11,21,22,23,24,25,26,27,28,48,47,46,45,44,43,42,41,31,32,33,34,35,36,37,38,55,54,53,52,51,61,62,63,64,65,85,84,83,82,81,71,72,73,74,75];
  all.forEach(n=>{const e2=document.getElementById('tooth-'+n);if(!e2)return;const td=toothD[hn][n];e2.className=e2.className.replace(/\bt-\S+/g,'').trim();e2.classList.add(td?td.status:'t-normal');});
}
function addCurPtToQ(){if(selPt)addQItem({name:selPt.name,phone:selPt.phone,lineId:selPt.lineId||'',svc:'ตรวจทั่วไป',ptHN:selPt.hn,prio:'normal'});}

// TOOTH MODAL
function openTMod(n){
  curT=n;el('m-tooth-no').textContent=n;
  const td=(selPt&&toothD[selPt.hn])||{},tdat=td[n];
  const sl=tdat?(STATS.find(s=>s.key===tdat.status)?.lbl||'ปกติ'):'ปกติ';
  el('m-tooth-stat').textContent='สถานะ: '+sl;
  el('m-stat-grid').innerHTML=STATS.map(s=>`<button onclick="setTStat('${s.key}')" class="p-2 border-2 ${s.bd} ${s.bg} rounded-xl flex flex-col items-center gap-1 hover:opacity-80 transition ${tdat&&tdat.status===s.key?'ring-2 ring-p-500':''}"><i class="fa-solid ${s.icon} ${s.tx} text-sm"></i><span class="${s.tx} text-[10px] font-bold text-center">${s.lbl}</span></button>`).join('');
  el('m-proc-list').innerHTML=TX.map(t=>`<button onclick="addCart(${t.id},${n})" class="w-full flex items-center justify-between p-2.5 border border-gray-100 rounded-xl hover:border-p-200 hover:bg-p-50 transition group"><div class="flex items-center gap-2"><div class="w-7 h-7 bg-${t.color}-100 rounded-lg flex items-center justify-center shrink-0"><i class="fa-solid ${t.icon} text-${t.color}-600 text-sm"></i></div><div class="text-left"><p class="text-gray-800 text-xs font-medium group-hover:text-p-700">${t.name}</p><p class="text-gray-400 text-xs">DF: ${selDr?selDr.df[t.cat]:t.df}%</p></div></div><div class="text-right"><p class="text-gray-800 font-bold text-xs">${fmtM(t.price)}</p><p class="text-p-600 text-xs font-bold bg-white px-2 py-0.5 rounded shadow-sm border border-p-100 group-hover:bg-p-600 group-hover:text-white transition">+ เพิ่ม</p></div></button>`).join('');
  ['M','D','B','L','O'].forEach(s=>{const se=document.getElementById('surf-'+s);if(se)se.classList.toggle('on',!!(tdat?.surfaces?.[s]));});
  el('tooth-note').value=tdat?.notes||'';
  renderTHist(n);switchMTab('proc');
  el('modal-ov').classList.remove('hidden');document.body.style.overflow='hidden';
}
function closeTMod(ev){if(!ev||ev.target===el('modal-ov')){el('modal-ov').classList.add('hidden');document.body.style.overflow='';curT=null;}}
function switchMTab(t){
  mTab=t;['proc','surf','hist'].forEach(x=>{el('mpan-'+x)?.classList.toggle('hidden',x!==t);const b=el('mtab-'+x);if(!b)return;b.classList.toggle('bg-white/20',x===t);b.classList.toggle('text-white',x===t);b.classList.toggle('bg-white/10',x!==t);b.classList.toggle('text-p-200',x!==t);});
}
function setTStat(key){
  if(!selPt){showToast('warning','เลือกผู้ป่วยก่อน','');closeTMod();return;}
  if(!toothD[selPt.hn])toothD[selPt.hn]={};if(!toothD[selPt.hn][curT])toothD[selPt.hn][curT]={};
  toothD[selPt.hn][curT].status=key;const e2=document.getElementById('tooth-'+curT);if(e2){e2.className=e2.className.replace(/\bt-\S+/g,'').trim();e2.classList.add(key);}save();
  showToast('success','บันทึกสถานะ','ฟัน '+curT+' — '+(STATS.find(s=>s.key===key)?.lbl||''));
  openTMod(curT);
}
function togSurf(s){document.getElementById('surf-'+s)?.classList.toggle('on');}
function saveSurf(){
  if(!selPt||!curT){showToast('warning','เลือกผู้ป่วยก่อน','');return;}
  if(!toothD[selPt.hn])toothD[selPt.hn]={};if(!toothD[selPt.hn][curT])toothD[selPt.hn][curT]={};
  const surfs={};['M','D','B','L','O'].forEach(s=>surfs[s]=document.getElementById('surf-'+s)?.classList.contains('on')||false);
  toothD[selPt.hn][curT].surfaces=surfs;toothD[selPt.hn][curT].notes=el('tooth-note').value;save();
  showToast('success','บันทึกพื้นผิว','ฟัน '+curT+' — '+Object.entries(surfs).filter(([k,v])=>v).map(([k])=>k).join(',')||'-');closeTMod();
}
function renderTHist(n){
  const c=el('m-hist-list');if(!selPt){c.innerHTML='<p class="text-gray-400 text-sm text-center py-6">เลือกผู้ป่วยก่อน</p>';return;}
  const hist=(toothD[selPt.hn]||{})[n]?.history||[];
  c.innerHTML=!hist.length?'<p class="text-gray-400 text-sm text-center py-6"><i class="fa-solid fa-clock-rotate-left text-gray-200 text-2xl block mb-2"></i>ไม่มีประวัติ</p>':hist.slice().reverse().map(h=>`<div class="flex items-start gap-2.5 p-2.5 bg-gray-50 rounded-xl"><div class="w-6 h-6 bg-p-100 rounded-full flex items-center justify-center shrink-0 mt-0.5"><i class="fa-solid fa-tooth text-p-600 text-xs"></i></div><div><p class="text-gray-800 text-xs font-medium">${h.tx}</p><p class="text-gray-500 text-xs">${h.dr||'-'}</p><p class="text-gray-400 text-xs">${fmtD(h.date)}</p></div></div>`).join('');
}

// SOAP
function switchSoap(t){
  soapT=t;['S','O','A','P'].forEach(x=>{el('soap-pan-'+x)?.classList.toggle('hidden',x!==t);const b=el('soap-tab-'+x);if(b){b.classList.toggle('active',x===t);if(x!==t)b.classList.add('text-gray-500');else b.classList.remove('text-gray-500');}});
}
function applyTmpl(type){
  const T={routine:{cc:'ตรวจตามนัด',S:'ผู้ป่วยมาตรวจตามนัด ไม่มีอาการผิดปกติ',O:'Gingiva: healthy, Teeth: WNL',A:'Routine check-up',P:'OHI, นัดต่อไป 6 เดือน'},emergency:{cc:'ปวดฟันเฉียบพลัน',S:'ปวดฟันรุนแรง เริ่มมา ___ วัน',O:'Percussion (+), Periapical tenderness',A:'Acute pulpitis / Periapical abscess tooth #___',P:'Emergency RCT/EXT, Rx: Amoxicillin 500mg tid 5d'},followup:{cc:'ติดตามการรักษา',S:'ผู้ป่วยมา follow-up อาการดีขึ้น',O:'Healing well, No swelling',A:'Post-op satisfactory',P:'Continue medication, นัดครั้งต่อไป'}};
  const t=T[type];if(!t)return;el('soap-cc').value=t.cc;el('soap-S').value=t.S;el('soap-O').value=t.O;el('soap-A').value=t.A;el('soap-P').value=t.P;switchSoap('S');showToast('success','เทมเพลต',{routine:'ตรวจตามนัด',emergency:'ฉุกเฉิน',followup:'Follow-up'}[type]);
}
function autoSave(){clearTimeout(asTmr);el('soap-status').textContent='กำลังพิมพ์...';asTmr=setTimeout(()=>{el('soap-status').textContent='✓ บันทึกอัตโนมัติ '+fmtT(new Date());},1500);}
function saveSOAP(){
  if(!selPt){showToast('warning','เลือกผู้ป่วยก่อน','');return;}
  notes.push({id:gid('N'),ptHN:selPt.hn,date:today(),dr:selDr?.name||'-',cc:el('soap-cc').value,vitals:{bp:el('soap-bp').value,hr:el('soap-hr').value,o2:el('soap-o2').value},soap:{S:el('soap-S').value,O:el('soap-O').value,A:el('soap-A').value,P:el('soap-P').value},ts:new Date().toISOString()});
  save();updNHCnt(selPt.hn);if(nhOpen)renderNH(selPt.hn);el('soap-status').textContent='✓ บันทึก SOAP แล้ว '+fmtT(new Date());showToast('success','บันทึก SOAP','เรียบร้อย');
}
function loadLatSOAP(hn){
  clrSOAP();const ns=notes.filter(n=>n.ptHN===hn),lat=ns[ns.length-1];
  if(!lat){el('soap-status').textContent='ผู้ป่วย: '+(selPt?.name||'');return;}
  el('soap-cc').value=lat.cc||'';el('soap-bp').value=lat.vitals?.bp||'';el('soap-hr').value=lat.vitals?.hr||'';el('soap-o2').value=lat.vitals?.o2||'';
  el('soap-S').value=lat.soap?.S||'';el('soap-O').value=lat.soap?.O||'';el('soap-A').value=lat.soap?.A||'';el('soap-P').value=lat.soap?.P||'';
  el('soap-status').textContent='โหลดล่าสุด '+fmtD(lat.date);
}
function clrSOAP(){['soap-cc','soap-bp','soap-hr','soap-o2','soap-S','soap-O','soap-A','soap-P'].forEach(id=>{const e2=el(id);if(e2)e2.value='';});}
function updNHCnt(hn){el('note-hcnt').textContent=notes.filter(n=>n.ptHN===hn).length;}
function toggleNoteHist(){nhOpen=!nhOpen;el('note-hpanel').classList.toggle('hidden',!nhOpen);if(nhOpen&&selPt)renderNH(selPt.hn);}
function renderNH(hn){
  const c=el('note-hlist'),ns=notes.filter(n=>n.ptHN===hn).slice().reverse();
  c.innerHTML=!ns.length?'<p class="text-gray-400 text-xs text-center py-4">ไม่มีประวัติ</p>':ns.map(n=>`<div class="p-3 hover:bg-gray-50 transition cursor-pointer" onclick="loadNF('${n.id}')"><div class="flex justify-between items-start mb-1"><span class="text-gray-700 text-xs font-semibold">${fmtD(n.date)} — ${n.dr}</span><span class="text-gray-400 text-xs">${fmtT(n.ts)}</span></div><p class="text-gray-600 text-xs"><b>CC:</b> ${n.cc||'-'}</p><p class="text-gray-500 text-xs truncate"><b>A:</b> ${n.soap?.A||'-'}</p></div>`).join('');
}
function loadNF(nid){const n=notes.find(x=>x.id===nid);if(!n)return;el('soap-cc').value=n.cc||'';el('soap-bp').value=n.vitals?.bp||'';el('soap-hr').value=n.vitals?.hr||'';el('soap-o2').value=n.vitals?.o2||'';el('soap-S').value=n.soap?.S||'';el('soap-O').value=n.soap?.O||'';el('soap-A').value=n.soap?.A||'';el('soap-P').value=n.soap?.P||'';el('soap-status').textContent='โหลดบันทึก '+fmtD(n.date);showToast('info','โหลด',fmtD(n.date));}

// CART
function addCart(txId,tNo){
  const t=TX.find(x=>x.id===txId);if(!t)return;
  if(cart.find(c=>c.txId===txId&&c.tNo===tNo)){showToast('warning','มีอยู่แล้ว',t.name+' ฟัน '+tNo);closeTMod();return;}
  const dfR=selDr?selDr.df[t.cat]:t.df;
  cart.push({id:Date.now(),txId:t.id,treatmentName:t.name,txCat:t.cat,tNo,price:t.price,df:dfR});
  if(selPt){if(!toothD[selPt.hn])toothD[selPt.hn]={};if(!toothD[selPt.hn][tNo])toothD[selPt.hn][tNo]={};if(!toothD[selPt.hn][tNo].history)toothD[selPt.hn][tNo].history=[];toothD[selPt.hn][tNo].history.push({date:today(),tx:t.name,dr:selDr?.name||'-'});const sm={restorative:'t-filled',surgical:'t-extracted',endodontic:'t-rct',prosthetic:'t-crown'};const ns=sm[t.cat];if(ns){toothD[selPt.hn][tNo].status=ns;const e2=document.getElementById('tooth-'+tNo);if(e2){e2.className=e2.className.replace(/\bt-\S+/g,'').trim();e2.classList.add(ns);}}}
  closeTMod();save();renderCartS();updCartBadge();showToast('success','เพิ่มหัตถการ',t.name+' ฟัน '+tNo);
}
function rmCart(id){cart=cart.filter(c=>c.id!==id);save();renderCartS();updCartBadge();renderBill();}
function renderCartS(){
  const c=el('cart-list'),tot=cart.reduce((s,x)=>s+x.price,0),totDF=cart.reduce((s,x)=>s+Math.round(x.price*x.df/100),0);
  el('sess-total').textContent=fmtM(tot);el('sess-df').textContent=fmtM(totDF);el('sess-cnt').textContent=cart.length+' รายการ';
  if(!cart.length){c.innerHTML='<div class="text-center py-8"><i class="fa-solid fa-tooth text-gray-200 text-4xl block mb-2"></i><p class="text-gray-400 text-sm">คลิกที่ฟัน<br>เพื่อเพิ่มหัตถการหรือจ่ายยา</p></div>';return;}
  c.innerHTML=cart.map(item=>`<div class="flex items-center gap-2 p-2.5 bg-emerald-50 border border-emerald-100 rounded-xl"><div class="w-7 h-7 bg-emerald-500 rounded-lg flex items-center justify-center shrink-0"><span class="text-white text-xs font-bold">${item.tNo==='-'?'💊':item.tNo}</span></div><div class="flex-1 min-w-0"><p class="text-gray-700 text-xs font-medium truncate">${item.treatmentName}</p><p class="text-emerald-700 font-bold text-sm">${fmtM(item.price)} <span class="text-p-500 font-normal text-[10px] bg-white px-1 py-0.5 rounded ml-1">DF ${item.df}%</span></p></div><button onclick="rmCart(${item.id})" class="w-6 h-6 bg-red-100 hover:bg-red-200 text-red-500 rounded-lg flex items-center justify-center transition shrink-0"><i class="fa-solid fa-xmark text-xs"></i></button></div>`).join('');
}
function updCartBadge(){const b=el('cart-badge');cart.length?(b.classList.remove('hidden'),b.textContent=cart.length):b.classList.add('hidden');}

// BILLING
function initBillDr(){const sel=el('bill-dr-sel');if(!sel)return;sel.innerHTML='<option value="">-- เลือก --</option>'+DRS.map(d=>`<option value="${d.id}">${d.name}</option>`).join('');if(selDr)sel.value=selDr.id;}
function onBillDrChg(){const did=el('bill-dr-sel').value;selDr=DRS.find(d=>d.id===did)||null;if(selDr){cart.forEach(item=>{const t=TX.find(x=>x.id===item.txId);if(t)item.df=selDr.df[t.cat]||t.df;});}renderBill();showToast('info','เลือกแพทย์',selDr?selDr.name:'ยกเลิก');}
function renderBill(){
  const tb=el('bill-tbody'),em=el('bill-empty');
  if(!cart.length){tb.innerHTML='';em.classList.remove('hidden');recalcBill();return;}em.classList.add('hidden');
  tb.innerHTML=cart.map((item,i)=>{const da=Math.round(item.price*item.df/100);return`<tr class="trow border-b border-gray-50"><td class="py-2.5 px-3 text-gray-500 text-sm">${i+1}</td><td class="py-2.5 px-3"><p class="text-gray-800 text-sm font-medium">${item.treatmentName}</p></td><td class="py-2.5 px-3"><span class="bg-emerald-100 text-emerald-700 font-bold text-xs px-2 py-0.5 rounded-lg">${item.tNo}</span></td><td class="py-2.5 px-3 text-right text-gray-800 font-semibold text-sm">${fmtM(item.price)}</td><td class="py-2.5 px-3 text-center"><input type="number" min="0" max="100" value="${item.df}" onchange="updDF(${item.id},this.value)" class="w-14 text-center px-1.5 py-1 border border-gray-200 rounded-lg text-xs font-bold text-p-700 focus:outline-none focus:ring-2 focus:ring-p-300 transition"></td><td class="py-2.5 px-3 text-right text-p-700 font-bold text-sm">${fmtM(da)}</td><td class="py-2.5 px-3 text-center"><button onclick="rmCart(${item.id})" class="w-7 h-7 bg-red-50 hover:bg-red-100 text-red-500 rounded-lg flex items-center justify-center transition mx-auto shadow-sm"><i class="fa-solid fa-trash text-xs"></i></button></td></tr>`;}).join('');
  recalcBill();
}
function updDF(id,v){const item=cart.find(c=>c.id===id);if(item){item.df=parseFloat(v)||0;recalcBill();}}
function applyDefDF(){const df=parseFloat(el('def-df').value)||0;cart.forEach(item=>item.df=df);renderBill();}
let vatOn2=false;
function toggleVAT(){vatOn2=!vatOn2;const th=el('vat-thumb'),lbl=el('vat-lbl'),btn=el('vat-btn'),row=el('vat-row');th.style.transform=vatOn2?'translateX(16px)':'translateX(2px)';btn.style.background=vatOn2?'#7c3aed':'#e5e7eb';lbl.textContent=vatOn2?'เปิด':'ปิด';lbl.className=vatOn2?'text-p-600 text-xs font-medium':'text-gray-500 text-xs';row.style.display=vatOn2?'flex':'none';recalcBill();}
function recalcBill(){
  const tot=cart.reduce((s,c)=>s+c.price,0),df=cart.reduce((s,c)=>s+Math.round(c.price*c.df/100),0),clinic=tot-df,vat=vatOn2?Math.round(tot*.07):0,disc=parseFloat(el('discount')?.value)||0,net=Math.max(0,tot+vat-disc);
  el('summ-total').textContent=fmtM(tot);el('summ-vat').textContent=fmtM(vat);el('summ-df').textContent=fmtM(df);el('summ-clinic').textContent=fmtM(clinic);el('summ-net').textContent=fmtM(net);
}
function selPay(btn,m){payM=m;document.querySelectorAll('.pay-btn').forEach(b=>{b.classList.remove('border-p-300','bg-p-50','text-p-700');b.classList.add('border-gray-200','bg-white','text-gray-600');});btn.classList.remove('border-gray-200','bg-white','text-gray-600');btn.classList.add('border-p-300','bg-p-50','text-p-700');}
function confirmPay(){
  if(!cart.length){showToast('error','ไม่มีรายการ','เพิ่มหัตถการก่อน');return;}
  const tot=cart.reduce((s,c)=>s+c.price,0),df=cart.reduce((s,c)=>s+Math.round(c.price*c.df/100),0),clinic=tot-df,vat=vatOn2?Math.round(tot*.07):0,disc=parseFloat(el('discount').value)||0,net=Math.max(0,tot+vat-disc),ptName=selPt?.name||'Walk-in',rcNo='RC-'+Date.now().toString().slice(-6);
  receipts.push({id:rcNo,ptHN:selPt?.hn||'-',drId:selDr?.id||'',drName:selDr?.name||'-',date:today(),items:[...cart],totalPrice:tot,df,clinic,vat,discount:disc,net,pay:payM});save();
  el('succ-msg').textContent=`ผู้ป่วย: ${ptName} | วิธี: ${payM}`;
  el('succ-detail').innerHTML=`<div class="flex justify-between text-sm"><span class="text-gray-500">เลขใบเสร็จ</span><span class="font-bold">${rcNo}</span></div><div class="flex justify-between text-sm"><span class="text-gray-500">ผู้ป่วย</span><span>${ptName}</span></div><div class="flex justify-between text-sm"><span class="text-gray-500">แพทย์</span><span>${selDr?.name||'-'}</span></div><div class="flex justify-between text-sm border-t border-gray-200 pt-2 mt-1"><span class="font-bold">ยอดสุทธิ</span><span class="text-emerald-700 font-bold text-lg">${fmtM(net)}</span></div><div class="flex justify-between text-sm"><span class="text-gray-500">Doctor Fee</span><span class="text-p-700 font-semibold">${fmtM(df)}</span></div>`;
  el('succ-modal').classList.remove('hidden');renderDash();
}
function closeSuccMod(){el('succ-modal').classList.add('hidden');cart=[];save();renderCartS();updCartBadge();renderBill();if(el('discount'))el('discount').value=0;showToast('success','ปิดการรักษา','ล้างรายการแล้ว');}
function printBill(){showToast('info','พิมพ์','กำลังส่งไปยังเครื่องพิมพ์...');}
function renderMth(){
  const c=el('mth-tbl'),mo=today().slice(0,7),recs=receipts.filter(r=>r.date.startsWith(mo));
  if(!recs.length){c.innerHTML='<p class="text-gray-400 text-sm text-center py-4">ยังไม่มีข้อมูลเดือนนี้</p>';return;}
  const ag={};DRS.forEach(d=>ag[d.id]={name:d.name,rev:0,df:0,cnt:0});recs.forEach(r=>{if(r.drId&&ag[r.drId]){ag[r.drId].rev+=r.totalPrice;ag[r.drId].df+=r.df;ag[r.drId].cnt++;}});
  const tots={rev:recs.reduce((s,r)=>s+r.totalPrice,0),df:recs.reduce((s,r)=>s+r.df,0)};
  c.innerHTML=`<table class="w-full text-sm"><thead><tr class="bg-gray-50"><th class="text-left text-gray-400 text-xs py-2 px-3">ทันตแพทย์</th><th class="text-right text-gray-400 text-xs py-2 px-3">รายได้</th><th class="text-right text-gray-400 text-xs py-2 px-3">DF (฿)</th><th class="text-right text-gray-400 text-xs py-2 px-3">DF %</th></tr></thead><tbody>${Object.values(ag).map(d=>`<tr class="trow border-b border-gray-50"><td class="py-2.5 px-3 text-gray-700 font-medium text-sm">${d.name}</td><td class="py-2.5 px-3 text-right text-gray-700 text-sm">${fmtM(d.rev)}</td><td class="py-2.5 px-3 text-right text-p-700 font-bold text-sm">${fmtM(d.df)}</td><td class="py-2.5 px-3 text-right text-sm">${d.rev>0?Math.round(d.df/d.rev*100)+'%':'-'}</td></tr>`).join('')}</tbody><tfoot><tr class="bg-p-50"><td class="py-2.5 px-3 font-bold text-gray-800 text-sm">รวม</td><td class="py-2.5 px-3 text-right font-bold text-gray-800 text-sm">${fmtM(tots.rev)}</td><td class="py-2.5 px-3 text-right font-bold text-p-700 text-sm">${fmtM(tots.df)}</td><td class="py-2.5 px-3 text-right font-bold text-sm">${tots.rev>0?Math.round(tots.df/tots.rev*100)+'%':'-'}</td></tr></tfoot></table>`;
}
function toggleMthSumm(){mthOpen=!mthOpen;el('mth-body').classList.toggle('hidden',!mthOpen);el('mth-ico').style.transform=mthOpen?'rotate(180deg)':'';if(mthOpen)renderMth();}
function showDFRpt(){
  const c=el('df-rpt');if(!receipts.length){c.innerHTML='<p class="text-gray-400 text-center py-8">ยังไม่มีข้อมูล</p>';el('df-modal').classList.remove('hidden');return;}
  const ag={};DRS.forEach(d=>ag[d.id]={dr:d,rev:0,df:0,clinic:0,cnt:0});receipts.forEach(r=>{if(r.drId&&ag[r.drId]){ag[r.drId].rev+=r.totalPrice;ag[r.drId].df+=r.df;ag[r.drId].clinic+=r.clinic;ag[r.drId].cnt++;}});
  const catN={restorative:'อุดฟัน',surgical:'ศัลยกรรม',preventive:'ป้องกัน',endodontic:'รักษาราก',prosthetic:'ใส่ฟัน',cosmetic:'ความงาม',orthodontic:'จัดฟัน',pediatric:'เด็ก'};
  c.innerHTML=`<div class="grid grid-cols-3 gap-4 mb-5"><div class="bg-p-50 rounded-xl p-4 text-center shadow-sm border border-p-100"><p class="text-p-600 text-xs">รายได้รวม</p><p class="text-p-800 font-bold text-xl">${fmtM(receipts.reduce((s,r)=>s+r.totalPrice,0))}</p></div><div class="bg-blue-50 rounded-xl p-4 text-center shadow-sm border border-blue-100"><p class="text-blue-600 text-xs">Doctor Fee</p><p class="text-blue-800 font-bold text-xl">${fmtM(receipts.reduce((s,r)=>s+r.df,0))}</p></div><div class="bg-emerald-50 rounded-xl p-4 text-center shadow-sm border border-emerald-100"><p class="text-emerald-600 text-xs">กำไรคลินิก</p><p class="text-emerald-800 font-bold text-xl">${fmtM(receipts.reduce((s,r)=>s+r.clinic,0))}</p></div></div>${Object.values(ag).map(({dr:d,rev,df,clinic,cnt})=>`<div class="bg-white border border-gray-100 rounded-xl p-4 mb-3 shadow-sm"><div class="flex items-center gap-2 mb-3"><div class="w-8 h-8 bg-gradient-to-br from-p-500 to-p-700 rounded-full flex items-center justify-center shadow-sm"><span class="text-white text-xs font-bold">${d.ini}</span></div><div><p class="text-gray-800 font-semibold text-sm">${d.name}</p><p class="text-gray-400 text-xs">${d.spec} | ${cnt} ใบเสร็จ</p></div><span class="ml-auto bg-blue-50 border border-blue-200 text-blue-600 text-[10px] px-2 py-0.5 rounded-full font-bold">ตารางเวร: ${d.branch}</span></div><div class="grid grid-cols-3 gap-2 text-center mb-3"><div class="bg-gray-50 rounded-xl p-2"><p class="text-gray-500 text-xs">รายได้</p><p class="text-gray-800 font-bold text-sm">${fmtM(rev)}</p></div><div class="bg-p-50 rounded-xl p-2"><p class="text-p-600 text-xs">DF</p><p class="text-p-800 font-bold text-sm">${fmtM(df)}</p></div><div class="bg-emerald-50 rounded-xl p-2"><p class="text-emerald-600 text-xs">คลินิก</p><p class="text-emerald-800 font-bold text-sm">${fmtM(clinic)}</p></div></div><p class="text-gray-600 text-xs font-semibold mb-2">DF Rates (per category):</p><div class="grid grid-cols-4 gap-1">${Object.entries(d.df).map(([k,v])=>`<div class="bg-gray-50 rounded-lg p-1.5 text-center"><p class="text-gray-400 text-[10px]">${catN[k]||k}</p><p class="text-p-700 font-bold text-xs">${v}%</p></div>`).join('')}</div></div>`).join('')}`;
  el('df-modal').classList.remove('hidden');
}
function closeDFMod(){el('df-modal').classList.add('hidden');}

// QUEUE
function openQModal(){initSels();['q-name','q-phone','q-lineid','q-svc'].forEach(id=>{const e2=el(id);if(e2)e2.value='';});el('q-prio').value='normal';el('q-modal').classList.remove('hidden');}
function closeQModal(){el('q-modal').classList.add('hidden');}
function prefillQ(){const hn=el('q-pt-sel').value,p=pts.find(x=>x.hn===hn);if(p){el('q-name').value=p.name;el('q-phone').value=p.phone;el('q-lineid').value=p.lineId||'';}}
function addQFromModal(){const name=el('q-name').value.trim();if(!name){showToast('error','กรุณากรอกชื่อ','');return;}addQItem({name,phone:el('q-phone').value.trim(),lineId:el('q-lineid').value.trim(),svc:el('q-svc').value.trim()||'ตรวจทั่วไป',prio:el('q-prio').value,ptHN:el('q-pt-sel').value});closeQModal();}
function addQItem({name,phone,lineId,svc,prio,ptHN}){qCtr++;const qNo='Q'+String(qCtr).padStart(3,'0');qArr.push({id:gid('Q'),queueNo:qNo,ptHN:ptHN||'',name,phone:phone||'',lineId:lineId||'',svc,prio:prio||'normal',status:'waiting',date:today(),addedAt:new Date().toISOString(),calledAt:null,doneAt:null});save();renderQ();updateQStat();updateQBadge();el('q-max').textContent=qNo;showToast('success','เพิ่มคิว',qNo+' — '+name);}
function callNextQ(){
  const tr=qArr.find(q=>q.status==='in-treatment');if(tr){tr.status='done';tr.doneAt=new Date().toISOString();}
  const next=qArr.find(q=>q.status==='waiting');if(!next){showToast('info','ไม่มีคิว','');renderQ();updateQStat();return;}
  next.status='in-treatment';next.calledAt=new Date().toISOString();save();renderQ();updateQStat();updateQBadge();
  if(next.lineId||next.phone)showLP(next,'ready');showToast('success','เรียกคิว',next.queueNo+' — '+next.name);
}
function markDone(id){const q=qArr.find(x=>x.id===id);if(!q)return;q.status='done';q.doneAt=new Date().toISOString();save();renderQ();updateQStat();updateQBadge();if(q.lineId||q.phone)showLP(q,'done');showToast('success','เสร็จสิ้น',q.name);}
function skipQ(id){const q=qArr.find(x=>x.id===id);if(!q)return;q.status='skipped';save();renderQ();updateQStat();updateQBadge();showToast('warning','ข้ามคิว',q.name);}
function callSpec(id){const q=qArr.find(x=>x.id===id);if(!q||q.status!=='waiting')return;const tr=qArr.find(x=>x.status==='in-treatment');if(tr){tr.status='done';tr.doneAt=new Date().toISOString();}q.status='in-treatment';q.calledAt=new Date().toISOString();save();renderQ();updateQStat();updateQBadge();if(q.lineId||q.phone)showLP(q,'ready');showToast('success','เรียกคิว',q.queueNo+' — '+q.name);}
function sendQL(id){const q=qArr.find(x=>x.id===id);if(q)showLP(q,'ready');}
function filterQ(s){qF=s;const ids={all:'qf-all',waiting:'qf-wait','in-treatment':'qf-treat',done:'qf-done'};Object.keys(ids).forEach(k=>{const b=el(ids[k]);if(b)b.classList.toggle('active',k===s);});renderQ();}
function renderQ(){
  const c=el('q-list');let f=qArr.filter(q=>q.date===today());if(qF!=='all')f=f.filter(q=>q.status===qF);
  if(!f.length){c.innerHTML='<div class="text-center py-10 text-gray-400"><i class="fa-solid fa-people-arrows text-gray-200 text-4xl block mb-3"></i><p class="text-sm">ไม่มีคิว</p></div>';return;}
  const cfg={waiting:{cls:'qw',badge:'bg-amber-100 text-amber-700 border-amber-200',lbl:'รอ'},'in-treatment':{cls:'qt',badge:'bg-blue-100 text-blue-700 border-blue-200',lbl:'กำลัง'},done:{cls:'qd',badge:'bg-emerald-100 text-emerald-700 border-emerald-200',lbl:'เสร็จ'},skipped:{cls:'qs',badge:'bg-red-100 text-red-700 border-red-200',lbl:'ข้าม'}};
  c.innerHTML=f.map(q=>{const cf=cfg[q.status]||cfg.waiting,wt=q.addedAt?Math.floor((Date.now()-new Date(q.addedAt))/60000):0;return`<div class="flex items-center gap-3 p-3 hover:bg-gray-50 transition ${cf.cls}"><div class="text-center shrink-0 w-14"><p class="text-gray-800 font-bold text-sm">${q.queueNo}</p>${q.prio==='urgent'?'<span class="text-[10px] bg-red-100 text-red-600 px-1 rounded font-bold">เร่ง</span>':''}</div><div class="flex-1 min-w-0"><p class="text-gray-800 font-semibold text-sm truncate">${q.name}</p><p class="text-gray-500 text-xs">${q.svc}</p><p class="text-gray-400 text-xs">รอ ${wt} นาที${q.lineId?' | LINE/App: '+q.lineId:''}</p></div><span class="border text-xs px-2 py-1 rounded-full ${cf.badge} font-medium shrink-0 shadow-sm">${cf.lbl}</span><div class="flex gap-1 shrink-0">${q.status==='waiting'?`<button onclick="callSpec('${q.id}')" class="w-7 h-7 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center transition shadow-sm" title="เรียก"><i class="fa-solid fa-bell text-xs"></i></button>`:''}${q.status==='in-treatment'?`<button onclick="markDone('${q.id}')" class="w-7 h-7 bg-emerald-50 hover:bg-emerald-100 text-emerald-600 rounded-lg flex items-center justify-center transition shadow-sm" title="เสร็จ"><i class="fa-solid fa-check text-xs"></i></button>`:''}${q.status!=='done'&&q.status!=='skipped'?`<button onclick="sendQL('${q.id}')" class="w-7 h-7 bg-green-50 hover:bg-green-100 text-green-600 rounded-lg flex items-center justify-center transition shadow-sm" title="LINE"><i class="fa-brands fa-line text-xs"></i></button><button onclick="skipQ('${q.id}')" class="w-7 h-7 bg-gray-100 hover:bg-gray-200 text-gray-500 rounded-lg flex items-center justify-center transition shadow-sm" title="ข้าม"><i class="fa-solid fa-forward text-xs"></i></button>`:''}</div></div>`;}).join('');
}
function updateQStat(){const td=today(),qs=qArr.filter(q=>q.date===td);el('q-wait').textContent=qs.filter(q=>q.status==='waiting').length;el('q-treat').textContent=qs.filter(q=>q.status==='in-treatment').length;el('q-done').textContent=qs.filter(q=>q.status==='done').length;el('q-line').textContent=lineLog.length;}
function updateQBadge(){const w=qArr.filter(q=>q.status==='waiting'&&q.date===today()).length;const b=el('queue-badge');w?(b.classList.remove('hidden'),b.textContent=w):b.classList.add('hidden');el('tb-qc').textContent=w;}

// LINE MOCK
function showLP(q,type){const tmpls={ready:el('tmpl-ready')?.value||'🦷 ถึงคิวแล้ว!',soon:el('tmpl-soon')?.value||'🔔 อีก 2 คน',done:el('tmpl-done')?.value||'✅ เสร็จแล้ว!'};const msg=tmpls[type]||tmpls.ready;const recip=q.lineId||q.phone||'ผู้ป่วย';el('line-prev-txt').textContent=msg;el('line-prev-time').textContent=fmtT(new Date());el('line-prev-recip').textContent=recip;pendL={q,msg,recip};el('line-modal').classList.remove('hidden');}
function closeLineMod(){el('line-modal').classList.add('hidden');pendL=null;}
function confirmLINESend(){if(!pendL)return;const log={time:new Date().toISOString(),recip:pendL.recip,msg:pendL.msg};lineLog.push(log);save();const lc=el('line-log');lc.innerHTML=lineLog.slice().reverse().map(l=>`<div class="text-xs text-green-400 flex items-start gap-2 mb-1"><span class="text-gray-500 shrink-0">${fmtT(l.time)}</span><div class="flex-1"><span class="text-green-300">→ ${l.recip}</span><p class="text-gray-300 truncate">${l.msg}</p></div><span class="text-emerald-400 shrink-0">✓</span></div>`).join('');el('q-line').textContent=lineLog.length;closeLineMod();showToast('success','ส่ง LINE (Mock)','→ '+pendL.recip);}
function testLINE(){showLP({name:'ทดสอบ',lineId:'test-line-id',phone:'089-000-0000',queueNo:'Q000'},'ready');}
function clearLineLog(){lineLog=[];save();el('line-log').innerHTML='<p class="text-gray-500 text-xs text-center py-4">ยังไม่มีประวัติส่ง</p>';el('q-line').textContent=0;}
function toggleTkn(){const i=el('line-token');i.type=i.type==='password'?'text':'password';}
function broadcastLINE(){const w=qArr.filter(q=>q.status==='waiting'&&q.date===today());if(!w.length){showToast('warning','ไม่มีคิว','');return;}w.forEach(q=>{if(q.lineId||q.phone)lineLog.push({time:new Date().toISOString(),recip:q.lineId||q.phone,msg:el('tmpl-soon')?.value||'🔔 อีก 2 คน'});});save();el('q-line').textContent=lineLog.length;el('line-log').innerHTML=lineLog.slice().reverse().map(l=>`<div class="text-xs text-green-400 flex items-start gap-2 mb-1"><span class="text-gray-500 shrink-0">${fmtT(l.time)}</span><div class="flex-1"><span class="text-green-300">→ ${l.recip}</span><p class="text-gray-300 truncate">${l.msg}</p></div><span class="text-emerald-400 shrink-0">✓</span></div>`).join('');showToast('success','ส่ง LINE (Mock)',`แจ้ง ${w.length} คน`);}

// INVENTORY
function renderInv(){
  const g=el('inv-grid'),f=INV.filter(i=>{const mc=invCat==='all'||i.cat===invCat;const ms=i.name.toLowerCase().includes(invSrch.toLowerCase());return mc&&ms;});
  if(!f.length){g.innerHTML='<div class="col-span-full text-center py-12"><i class="fa-solid fa-box-open text-gray-200 text-4xl block mb-3"></i><p class="text-gray-400">ไม่พบรายการ</p></div>';return;}
  const catClr={'ยา':'blue','วัสดุทันตกรรม':'amber','อุปกรณ์':'gray'};
  g.innerHTML=f.map(item=>{const low=item.stock<=item.min,pct=Math.min(100,Math.round(item.stock/(item.min*4)*100)),cc=catClr[item.cat]||'gray';return`<div class="inv-c bg-white border-2 border-gray-100 rounded-2xl p-5 flex flex-col gap-3 transition cursor-pointer"><div class="flex items-start justify-between"><div class="w-11 h-11 bg-${item.color}-100 rounded-xl flex items-center justify-center shadow-sm"><i class="fa-solid ${item.icon} text-${item.color}-600 text-lg"></i></div><div class="flex flex-col items-end gap-1"><span class="text-[10px] bg-${cc}-100 text-${cc}-700 px-2 py-0.5 rounded-full font-bold">${item.cat}</span>${low?'<span class="text-[10px] bg-red-100 text-red-600 px-2 py-0.5 rounded-full font-bold pulse">⚠ ใกล้หมด</span>':''}</div></div><div><p class="text-gray-800 font-semibold text-sm leading-snug">${item.name}</p><p class="text-gray-400 text-xs mt-0.5">${item.id}</p></div><div><div class="flex justify-between items-center mb-1.5"><span class="text-gray-500 text-xs">คงเหลือ: <span class="font-bold text-${low?'red':'gray'}-700">${item.stock} ${item.unit}</span></span><span class="text-gray-400 text-xs">ขั้นต่ำ: ${item.min}</span></div><div class="bg-gray-100 rounded-full h-1.5 overflow-hidden"><div class="h-1.5 rounded-full ${low?'bg-gradient-to-r from-red-400 to-red-500':'bg-gradient-to-r from-emerald-400 to-emerald-500'}" style="width:${pct}%"></div></div></div><div class="flex items-center justify-between border-t border-gray-100 pt-3"><div><p class="text-gray-400 text-[10px]">ราคา/หน่วย</p><p class="text-gray-800 font-bold text-sm">${fmtM(item.price)}</p></div><div class="flex gap-1.5"><button onclick="openInvModal('${item.id}')" class="bg-emerald-50 hover:bg-emerald-100 text-emerald-600 text-xs font-semibold px-2 py-1.5 rounded-lg transition flex items-center shadow-sm" title="จัดการ"><i class="fa-solid fa-pen"></i></button><button onclick="addInvCart('${item.id}')" class="bg-p-600 hover:bg-p-700 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 shadow-sm"><i class="fa-solid fa-plus text-xs"></i>เบิกใช้</button></div></div></div>`;}).join('');
}
function setCat(c){invCat=c;document.querySelectorAll('.cat-btn').forEach(b=>{b.classList.remove('bg-p-600','text-white');b.classList.add('bg-white','border','border-gray-200','text-gray-600');});const ab={all:'cat-all','ยา':'cat-drug','วัสดุทันตกรรม':'cat-mat','อุปกรณ์':'cat-eq'}[c];const b=el(ab);if(b){b.classList.remove('bg-white','border','border-gray-200','text-gray-600');b.classList.add('bg-p-600','text-white');}renderInv();}
function filterInv(){invSrch=el('inv-search').value;renderInv();}
function addInvCart(iid){const item=INV.find(i=>i.id===iid);if(!item)return;if(item.stock<=0){showToast('error','สินค้าหมด',item.name);return;}cart.push({id:Date.now(),txId:null,treatmentName:'[ยา/วัสดุ] '+item.name,txCat:'medicine',tNo:'-',price:item.price,df:0});item.stock--;save();updCartBadge();renderInv();showToast('success','เบิกสำเร็จ',item.name+' (เหลือ '+item.stock+')');}

function openInvModal(id){
  const item = id ? INV.find(i=>i.id===id) : null;
  el('inv-m-title').textContent = item ? 'จัดการสต๊อก / แก้ไขสินค้า' : 'เพิ่มสินค้าใหม่';
  el('inv-m-id').value = item ? item.id : '';
  el('inv-m-name').value = item ? item.name : '';
  el('inv-m-cat').value = item ? item.cat : 'ยา';
  el('inv-m-unit').value = item ? item.unit : '';
  el('inv-m-stock').value = item ? item.stock : '';
  el('inv-m-price').value = item ? item.price : '';
  el('inv-m-min').value = item ? item.min : '';
  el('inv-modal').classList.remove('hidden');
}
function closeInvModal(ev){
  if(!ev || ev.target===el('inv-modal')){
    el('inv-modal').classList.add('hidden');
  }
}
function saveInvItem(){
  const id = el('inv-m-id').value;
  const name = el('inv-m-name').value.trim();
  const cat = el('inv-m-cat').value;
  const unit = el('inv-m-unit').value.trim();
  const stock = parseInt(el('inv-m-stock').value)||0;
  const price = parseFloat(el('inv-m-price').value)||0;
  const min = parseInt(el('inv-m-min').value)||0;
  if(!name){showToast('warning','กรุณากรอกชื่อสินค้า','');return;}
  
  if(id){
    const item = INV.find(i=>i.id===id);
    if(item){
      item.name = name; item.cat = cat; item.unit = unit;
      item.stock = stock; item.price = price; item.min = min;
    }
  } else {
    const newId = 'I' + String(INV.length + 1).padStart(2,'0');
    INV.push({
      id: newId, name, cat, unit, stock, price, min,
      icon: cat==='ยา'?'fa-pills':(cat==='อุปกรณ์'?'fa-box':'fa-tooth'),
      color: cat==='ยา'?'blue':(cat==='อุปกรณ์'?'gray':'amber')
    });
  }
  save(); renderInv(); closeInvModal();
  showToast('success','บันทึกข้อมูลสินค้า',name);
}

// TOAST
let toastTmr;
function showToast(type,title,msg){const t=el('toast'),ic=el('toast-icon'),ti=el('toast-title'),tm=el('toast-msg');const cfg={success:{bg:'bg-emerald-500',icon:'fa-check'},error:{bg:'bg-red-500',icon:'fa-xmark'},warning:{bg:'bg-amber-500',icon:'fa-triangle-exclamation'},info:{bg:'bg-blue-500',icon:'fa-info'}};const{bg,icon}=cfg[type]||cfg.info;ic.className=`w-8 h-8 ${bg} rounded-full flex items-center justify-center shrink-0 shadow-sm`;ic.innerHTML=`<i class="fa-solid ${icon} text-white text-sm"></i>`;ti.textContent=title;tm.textContent=msg;t.classList.add('show');clearTimeout(toastTmr);toastTmr=setTimeout(()=>t.classList.remove('show'),3500);}

// EXPORT CSV
function exportCSV(filename, rows) {
  const csvContent = "\uFEFF" + rows.map(e => e.join(",")).join("\n");
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement("a");
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", filename + "_" + today() + ".csv");
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}

function initExportView() {
  if (exportDatesInitialized) return;
  const t = new Date();
  const year = t.getFullYear();
  const month = String(t.getMonth() + 1).padStart(2, '0');
  el('export-start-date').value = `${year}-${month}-01`;
  el('export-end-date').value = today();
  setExportPreset('month');
  exportDatesInitialized = true;
}

function setExportPreset(preset) {
  const buttons = ['all', 'today', '7days', 'month', 'year'];
  buttons.forEach(p => {
    const btn = el('btn-exp-preset-' + p);
    if (btn) btn.className = 'px-3 py-1 bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 rounded-lg text-xs font-medium transition shadow-sm';
  });
  const activeBtn = el('btn-exp-preset-' + preset);
  if (activeBtn) activeBtn.className = 'px-3 py-1 bg-indigo-50 border border-indigo-200 text-indigo-700 rounded-lg text-xs font-medium transition shadow-sm';
  
  const end = today();
  let start = today();
  
  if (preset === 'all') {
    start = '2025-01-01';
  } else if (preset === 'today') {
    start = today();
  } else if (preset === '7days') {
    const d = new Date();
    d.setDate(d.getDate() - 6);
    start = d.toISOString().split('T')[0];
  } else if (preset === 'month') {
    const d = new Date();
    start = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-01`;
  } else if (preset === 'year') {
    start = `${new Date().getFullYear()}-01-01`;
  }
  
  el('export-start-date').value = start;
  el('export-end-date').value = end;
  if (activeExportType) refreshExportPreview();
}

function onExportDateChange() {
  const buttons = ['all', 'today', '7days', 'month', 'year'];
  buttons.forEach(p => {
    const btn = el('btn-exp-preset-' + p);
    if (btn) btn.className = 'px-3 py-1 bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 rounded-lg text-xs font-medium transition shadow-sm';
  });
  if (activeExportType) refreshExportPreview();
}

function refreshExportPreview() {
  if (activeExportType === 'patients') previewPatients();
  else if (activeExportType === 'financials') previewFinancials();
  else if (activeExportType === 'inventory') previewInventory();
}

function previewPatients() {
  activeExportType = 'patients';
  const start = el('export-start-date').value;
  const end = el('export-end-date').value;
  if (!start || !end) { showToast('warning', 'กรุณาระบุช่วงเวลา', 'โปรดระบุวันที่เริ่มต้นและสิ้นสุดให้ครบถ้วน'); return; }
  const filtered = pts.filter(p => {
    const regDate = getPtRegDate(p);
    return regDate >= start && regDate <= end;
  });
  activeExportData = filtered;
  
  el('preview-title').textContent = "ข้อมูลคนไข้ (Patient Data)";
  el('preview-meta-info').textContent = `พบข้อมูล ${filtered.length} รายการ ในช่วงวันที่ ${fmtD(start)} ถึง ${fmtD(end)}`;
  el('preview-no-date-alert').classList.add('hidden');
  
  const headers = ["HN", "ชื่อ-นามสกุล", "เพศ", "วันเกิด", "เบอร์โทร", "โรคประจำตัว", "แพ้ยา", "สิทธิ์รักษา", "วันที่ลงทะเบียน"];
  el('preview-table-header').innerHTML = headers.map(h => `<th class="py-2.5 px-3 whitespace-nowrap">${h}</th>`).join('');
  
  const previewRows = filtered.slice(0, 10);
  const tbody = el('preview-table-body');
  if (!filtered.length) {
    tbody.innerHTML = `<tr><td colspan="${headers.length}" class="py-8 text-center text-gray-400">ไม่พบข้อมูลในช่วงเวลาดังกล่าว</td></tr>`;
  } else {
    tbody.innerHTML = previewRows.map(p => `
      <tr class="hover:bg-gray-50/50">
        <td class="py-2.5 px-3 font-semibold text-p-700 whitespace-nowrap">${p.hn}</td>
        <td class="py-2.5 px-3 whitespace-nowrap">${p.name}</td>
        <td class="py-2.5 px-3 whitespace-nowrap">${p.gender}</td>
        <td class="py-2.5 px-3 whitespace-nowrap">${p.dob||'-'}</td>
        <td class="py-2.5 px-3 whitespace-nowrap">${p.phone}</td>
        <td class="py-2.5 px-3 max-w-[120px] truncate" title="${p.disease||'-'}">${p.disease||'-'}</td>
        <td class="py-2.5 px-3 max-w-[120px] truncate text-red-500 font-semibold" title="${p.allergy||'-'}">${p.allergy||'-'}</td>
        <td class="py-2.5 px-3 whitespace-nowrap">${p.cov||'-'}</td>
        <td class="py-2.5 px-3 whitespace-nowrap">${fmtD(getPtRegDate(p))}</td>
      </tr>
    `).join('');
  }
  
  if (filtered.length > 10) {
    el('preview-limit-msg').classList.remove('hidden');
    el('preview-limit-msg').innerHTML = `<i class="fa-solid fa-circle-exclamation text-indigo-400"></i> แสดงเฉพาะ 10 แถวแรกจากทั้งหมด ${filtered.length} แถว เพื่อความรวดเร็ว`;
  } else {
    el('preview-limit-msg').classList.add('hidden');
  }
  
  const card = el('export-preview-card');
  card.classList.remove('hidden');
  
  const dlBtn = el('btn-export-download');
  dlBtn.onclick = () => doExportPatientsCSV(filtered, start, end);
  dlBtn.disabled = !filtered.length;
  if (!filtered.length) dlBtn.classList.add('opacity-50', 'cursor-not-allowed');
  else dlBtn.classList.remove('opacity-50', 'cursor-not-allowed');
  card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function previewFinancials() {
  activeExportType = 'financials';
  const start = el('export-start-date').value;
  const end = el('export-end-date').value;
  if (!start || !end) { showToast('warning', 'กรุณาระบุช่วงเวลา', 'โปรดระบุวันที่เริ่มต้นและสิ้นสุดให้ครบถ้วน'); return; }
  const filtered = receipts.filter(r => r.date >= start && r.date <= end);
  activeExportData = filtered;
  
  el('preview-title').textContent = "รายงานการเงิน & DF (Financial Report)";
  el('preview-meta-info').textContent = `พบข้อมูล ${filtered.length} รายการ ในช่วงวันที่ ${fmtD(start)} ถึง ${fmtD(end)}`;
  el('preview-no-date-alert').classList.add('hidden');
  
  const headers = ["เลขใบเสร็จ", "วันที่", "HN คนไข้", "ชื่อแพทย์", "ยอดรวม", "ส่วนลด", "ยอดสุทธิ", "DF", "ส่วนแบ่งคลินิก", "ช่องทางชำระ"];
  el('preview-table-header').innerHTML = headers.map(h => `<th class="py-2.5 px-3 whitespace-nowrap">${h}</th>`).join('');
  
  const previewRows = filtered.slice(0, 10);
  const tbody = el('preview-table-body');
  if (!filtered.length) {
    tbody.innerHTML = `<tr><td colspan="${headers.length}" class="py-8 text-center text-gray-400">ไม่พบข้อมูลในช่วงเวลาดังกล่าว</td></tr>`;
  } else {
    tbody.innerHTML = previewRows.map(r => `
      <tr class="hover:bg-gray-50/50">
        <td class="py-2.5 px-3 font-semibold text-amber-700 whitespace-nowrap">${r.id}</td>
        <td class="py-2.5 px-3 whitespace-nowrap">${fmtD(r.date)}</td>
        <td class="py-2.5 px-3 whitespace-nowrap font-bold">${r.ptHN}</td>
        <td class="py-2.5 px-3 whitespace-nowrap">${r.drName||'-'}</td>
        <td class="py-2.5 px-3 text-right whitespace-nowrap">${fmtM(r.totalPrice)}</td>
        <td class="py-2.5 px-3 text-right whitespace-nowrap">${fmtM(r.discount)}</td>
        <td class="py-2.5 px-3 text-right font-bold text-emerald-600 whitespace-nowrap">${fmtM(r.net)}</td>
        <td class="py-2.5 px-3 text-right text-p-600 whitespace-nowrap">${fmtM(r.df)}</td>
        <td class="py-2.5 px-3 text-right text-gray-600 whitespace-nowrap">${fmtM(r.clinic)}</td>
        <td class="py-2.5 px-3 whitespace-nowrap"><span class="bg-gray-100 text-gray-700 px-1.5 py-0.5 rounded text-[10px]">${r.pay}</span></td>
      </tr>
    `).join('');
  }
  
  if (filtered.length > 10) {
    el('preview-limit-msg').classList.remove('hidden');
    el('preview-limit-msg').innerHTML = `<i class="fa-solid fa-circle-exclamation text-indigo-400"></i> แสดงเฉพาะ 10 แถวแรกจากทั้งหมด ${filtered.length} แถว เพื่อความรวดเร็ว`;
  } else {
    el('preview-limit-msg').classList.add('hidden');
  }
  
  const card = el('export-preview-card');
  card.classList.remove('hidden');
  
  const dlBtn = el('btn-export-download');
  dlBtn.onclick = () => doExportFinancialsCSV(filtered, start, end);
  dlBtn.disabled = !filtered.length;
  if (!filtered.length) dlBtn.classList.add('opacity-50', 'cursor-not-allowed');
  else dlBtn.classList.remove('opacity-50', 'cursor-not-allowed');
  card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function previewInventory() {
  activeExportType = 'inventory';
  const filtered = INV;
  activeExportData = filtered;
  
  el('preview-title').textContent = "สต๊อกสินค้าคงคลัง (Inventory Stock)";
  el('preview-meta-info').textContent = `พบข้อมูลในคลังทั้งหมด ${filtered.length} รายการ (ระดับสินค้าคงคลังแบบเรียลไทม์)`;
  el('preview-no-date-alert').classList.remove('hidden');
  
  const headers = ["รหัสสินค้า", "ชื่อรายการ", "หมวดหมู่", "คงเหลือ", "หน่วยนับ", "จุดสั่งซื้อขั้นต่ำ", "ราคา/หน่วย"];
  el('preview-table-header').innerHTML = headers.map(h => `<th class="py-2.5 px-3 whitespace-nowrap">${h}</th>`).join('');
  
  const previewRows = filtered.slice(0, 10);
  const tbody = el('preview-table-body');
  if (!filtered.length) {
    tbody.innerHTML = `<tr><td colspan="${headers.length}" class="py-8 text-center text-gray-400">ไม่มีข้อมูลสินค้าในคลัง</td></tr>`;
  } else {
    tbody.innerHTML = previewRows.map(i => {
      const low = i.stock <= i.min;
      return `
        <tr class="hover:bg-gray-50/50">
          <td class="py-2.5 px-3 font-semibold text-emerald-700 whitespace-nowrap">${i.id}</td>
          <td class="py-2.5 px-3 font-bold whitespace-nowrap">${i.name}</td>
          <td class="py-2.5 px-3 whitespace-nowrap"><span class="bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded text-[10px]">${i.cat}</span></td>
          <td class="py-2.5 px-3 font-semibold whitespace-nowrap ${low ? 'text-red-500 font-extrabold' : 'text-gray-700'}">${i.stock}</td>
          <td class="py-2.5 px-3 whitespace-nowrap text-gray-500">${i.unit}</td>
          <td class="py-2.5 px-3 whitespace-nowrap text-gray-400">${i.min}</td>
          <td class="py-2.5 px-3 text-right font-semibold whitespace-nowrap">${fmtM(i.price)}</td>
        </tr>
      `;
    }).join('');
  }
  
  if (filtered.length > 10) {
    el('preview-limit-msg').classList.remove('hidden');
    el('preview-limit-msg').innerHTML = `<i class="fa-solid fa-circle-exclamation text-indigo-400"></i> แสดงเฉพาะ 10 แถวแรกจากทั้งหมด ${filtered.length} แถว เพื่อความรวดเร็ว`;
  } else {
    el('preview-limit-msg').classList.add('hidden');
  }
  
  const card = el('export-preview-card');
  card.classList.remove('hidden');
  
  const dlBtn = el('btn-export-download');
  dlBtn.onclick = () => doExportInventoryCSV(filtered);
  dlBtn.disabled = !filtered.length;
  if (!filtered.length) dlBtn.classList.add('opacity-50', 'cursor-not-allowed');
  else dlBtn.classList.remove('opacity-50', 'cursor-not-allowed');
  card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function closeExportPreview() {
  el('export-preview-card').classList.add('hidden');
  activeExportType = null;
  activeExportData = [];
}

function doExportPatientsCSV(filtered, start, end) {
  if(!filtered.length) { showToast('warning', 'ไม่มีข้อมูล', 'ไม่มีข้อมูลคนไข้ในช่วงเวลาที่เลือก'); return; }
  const rows = [ ["HN", "ชื่อ-นามสกุล", "เพศ", "วันเกิด", "เบอร์โทร", "โรคประจำตัว", "สิ่งที่แพ้", "สิทธิการรักษา", "วันที่ลงทะเบียน"] ];
  filtered.forEach(p => {
    rows.push([ p.hn, `"${p.name}"`, p.gender, p.dob||'-', p.phone, `"${p.disease||'-'}"`, `"${p.allergy||'-'}"`, `"${p.cov||'-'}"`, getPtRegDate(p) ]);
  });
  exportCSV(`Patients_Export_${start}_to_${end}`, rows);
  showToast('success', 'ดาวน์โหลดสำเร็จ', `ส่งออกข้อมูลคนไข้จำนวน ${filtered.length} รายการแล้ว`);
}

function doExportFinancialsCSV(filtered, start, end) {
  if(!filtered.length) { showToast('warning', 'ไม่มีข้อมูล', 'ไม่มีประวัติการชำระเงินในช่วงเวลาที่เลือก'); return; }
  const rows = [ ["เลขใบเสร็จ", "วันที่", "HN คนไข้", "ชื่อแพทย์", "ยอดรวม(฿)", "ส่วนลด(฿)", "ยอดสุทธิ(฿)", "DF(฿)", "ส่วนแบ่งคลินิก(฿)", "ช่องทางชำระเงิน"] ];
  filtered.forEach(r => {
    rows.push([ r.id, r.date, r.ptHN, `"${r.drName||'-'}"`, r.totalPrice, r.discount||0, r.net||0, r.df, r.clinic, r.pay ]);
  });
  exportCSV(`Financials_Export_${start}_to_${end}`, rows);
  showToast('success', 'ดาวน์โหลดสำเร็จ', `ส่งออกรายงานการเงินจำนวน ${filtered.length} รายการแล้ว`);
}

function doExportInventoryCSV(filtered) {
  if(!filtered.length) { showToast('warning', 'ไม่มีข้อมูล', 'ไม่มีสินค้าในคลัง'); return; }
  const rows = [ ["รหัส", "ชื่อรายการ", "หมวดหมู่", "คงเหลือ", "หน่วยนับ", "จุดสั่งซื้อ", "ราคา/หน่วย(฿)"] ];
  filtered.forEach(i => {
    rows.push([ i.id, `"${i.name}"`, i.cat, i.stock, i.unit, i.min, i.price ]);
  });
  exportCSV("Inventory_Export", rows);
  showToast('success', 'ดาวน์โหลดสำเร็จ', `ส่งออกข้อมูลสต๊อกสินค้าจำนวน ${filtered.length} รายการแล้ว`);
}

// INIT
initState();buildTeeth();initSels();renderPts();renderInv();renderDash();
