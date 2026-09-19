import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowLeft, ArrowRight, BedDouble, ChevronDown, ChevronLeft, ChevronRight, Globe, Heart, Home, Menu, Search, Share, Star, Users, Wifi, Car, Utensils, Waves, AirVent, Tv, X } from 'lucide-react';
import './styles.css';

type Photo = { src:string; alt:string; room:string };
type Amenity = { label:string; icon:React.ReactNode };

const photos: Photo[] = [
  {src:'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1400&q=85',alt:'Bright living room',room:'Living room'},
  {src:'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1000&q=85',alt:'Living room seating',room:'Living room'},
  {src:'https://images.unsplash.com/photo-1615874694520-474822394e73?auto=format&fit=crop&w=1000&q=85',alt:'Dining area',room:'Dining room'},
  {src:'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1000&q=85',alt:'Kitchen',room:'Kitchen'},
  {src:'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1000&q=85',alt:'Bedroom',room:'Bedroom'},
  {src:'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1000&q=85',alt:'Bedroom detail',room:'Bedroom'},
  {src:'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=1000&q=85',alt:'Bathroom',room:'Bathroom'},
  {src:'https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1000&q=85',alt:'Balcony',room:'Outdoor'},
  {src:'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1000&q=85',alt:'Second bedroom',room:'Bedroom'},
  {src:'https://images.unsplash.com/photo-1560185008-b033106af5c3?auto=format&fit=crop&w=1000&q=85',alt:'Guest room',room:'Bedroom'},
  {src:'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1000&q=85',alt:'Bedroom',room:'Bedroom'},
  {src:'https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=1000&q=85',alt:'Bed',room:'Bedroom'},
];

const amenities:Amenity[]=[
  {label:'Wifi',icon:<Wifi size={23}/>},{label:'Free parking',icon:<Car size={23}/>},{label:'Kitchen',icon:<Utensils size={23}/>},{label:'Pool',icon:<Waves size={23}/>},{label:'Air conditioning',icon:<AirVent size={23}/>},{label:'TV',icon:<Tv size={23}/>}
];

function App(){
 const [view,setView]=useState<'page'|'tour'|'lightbox'>('page');
 const [photoIndex,setPhotoIndex]=useState(0);
 const [saved,setSaved]=useState(false);
 const [amenitiesOpen,setAmenitiesOpen]=useState(false);
 const triggerRef=useRef<HTMLButtonElement|null>(null);
 const openTour=(index=0)=>{setPhotoIndex(index);setView('tour');};
 const openLightbox=(index:number)=>{setPhotoIndex(index);setView('lightbox');};
 const closeOverlay=()=>{setView('page'); setTimeout(()=>triggerRef.current?.focus(),0)};
 const next=()=>setPhotoIndex(i=>(i+1)%photos.length);
 const prev=()=>setPhotoIndex(i=>(i-1+photos.length)%photos.length);
 useEffect(()=>{
   if(view==='page') return;
   const onKey=(e:KeyboardEvent)=>{
     if(e.key==='Escape'){ if(view==='lightbox') setView('tour'); else closeOverlay(); }
     if(view==='lightbox' && e.key==='ArrowRight') next();
     if(view==='lightbox' && e.key==='ArrowLeft') prev();
   };
   document.body.classList.add('locked'); document.addEventListener('keydown',onKey);
   return()=>{document.body.classList.remove('locked');document.removeEventListener('keydown',onKey)};
 },[view]);
 return <>
  <Header saved={saved} onSave={()=>setSaved(v=>!v)} />
  <main className="page-shell">
   <div className="crumb">India <span>·</span> Goa <span>·</span> Candolim</div>
   <div className="title-row"><div><h1>Elegant serviced apartment in Candolim, India</h1><p>Entire serviced apartment · 4 guests · 2 bedrooms · 2 beds · 2 bathrooms</p></div><div className="title-actions"><button className="plain-btn"><Share size={18}/> Share</button><button className="plain-btn" onClick={()=>setSaved(v=>!v)}><Heart size={18} fill={saved?'currentColor':'none'}/> {saved?'Saved':'Save'}</button></div></div>
   <section className="hero" aria-label="Property photos">
     <button className="hero-main photo-button" onClick={()=>openTour(0)} aria-label="Open photo tour"><img src={photos[0].src} alt={photos[0].alt}/></button>
     <div className="hero-side">
      {photos.slice(1,5).map((p,i)=><button key={p.src} className="photo-button" onClick={()=>openTour(i+1)}><img src={p.src} alt={p.alt}/></button>)}
     </div>
     <button ref={triggerRef} className="show-photos" onClick={()=>openTour(0)}> <span>▦</span> Show all photos</button>
   </section>
   <div className="content-grid">
    <article>
      <section className="section intro"><div><h2>Entire serviced apartment hosted by Manikantha</h2><p>Comfortable stay for families and small groups</p></div><div className="host-avatar">M</div></section>
      <section className="feature-row"><div><Home/><strong>Entire place</strong><span>You’ll have the apartment to yourself.</span></div><div><BedDouble/><strong>2 bedrooms</strong><span>Relax in two private bedrooms.</span></div><div><Users/><strong>4 guests</strong><span>Comfortable for up to four guests.</span></div></section>
      <section className="section"><h2>About this place</h2><p className="description">Welcome to a bright and thoughtfully designed serviced apartment in Candolim. Enjoy spacious rooms, a comfortable living area, a fully equipped kitchen and easy access to the best of Goa. The home combines a calm residential feel with convenient amenities for a relaxed stay.</p><button className="link-btn">Show more <ArrowRight size={16}/></button></section>
      <section className="section"><h2>Where you'll sleep</h2><div className="sleep-grid">{[photos[4],photos[8]].map((p,i)=><div className="sleep-card" key={i}><img src={p.src} alt={p.alt}/><strong>Bedroom {i+1}</strong><span>1 queen bed</span></div>)}</div></section>
      <section className="section"><h2>What this place offers</h2><div className="amenity-grid">{amenities.slice(0,6).map(a=><div className="amenity" key={a.label}>{a.icon}<span>{a.label}</span></div>)}</div><button className="outline-btn" onClick={()=>setAmenitiesOpen(true)}>Show all 25 amenities</button></section>
      <section className="section"><h2>Where you'll be</h2><div className="map"><div className="map-pin">⌖</div><div className="map-label">Candolim<br/><small>Goa, India</small></div></div></section>
      <section className="section reviews"><h2><Star fill="currentColor" size={20}/> 4.86 · 42 reviews</h2><div className="review-grid">{['Cleanliness','Accuracy','Communication','Location','Check-in','Value'].map((x,i)=><div key={x}><span>{x}</span><div className="bar"><i style={{width:`${96-i*2}%`}}/></div><b>{(4.9-i*.03).toFixed(1)}</b></div>)}</div></section>
    </article>
    <aside><BookingCard/></aside>
   </div>
  </main>
  {view==='tour' && <PhotoTour photos={photos} onClose={closeOverlay} onOpen={openLightbox}/>} 
  {view==='lightbox' && <Lightbox photo={photos[photoIndex]} index={photoIndex} total={photos.length} onClose={()=>setView('tour')} onPrev={prev} onNext={next}/>} 
  {amenitiesOpen && <AmenitiesModal onClose={()=>setAmenitiesOpen(false)}/>} 
 </>
}

function Header({saved,onSave}:{saved:boolean;onSave:()=>void}){return <header className="header"><div className="header-inner"><div className="brand"><span className="brand-mark">A</span><span>staybnb</span></div><nav><button>Stays</button><button>Experiences</button></nav><div className="search-pill"><span>Anywhere</span><i/> <span>Any week</span><i/><span>Add guests</span><button aria-label="Search"><Search size={17}/></button></div><div className="header-right"><button>Staybnb your home</button><button aria-label="Choose language"><Globe size={18}/></button><button className="menu"><Menu size={18}/><span className="mini-avatar">M</span></button></div></div></header>}
function BookingCard(){return <div className="booking"><div className="price"><strong>₹8,950</strong> night</div><div className="dates"><button><small>CHECK-IN</small><b>Dec 12, 2026</b></button><button><small>CHECKOUT</small><b>Dec 15, 2026</b></button></div><button className="guests">Guests <span>4 guests</span><ChevronDown size={16}/></button><button className="reserve">Reserve</button><p className="notice">You won't be charged yet</p><div className="line-item"><span>₹8,950 × 3 nights</span><span>₹26,850</span></div><div className="line-item"><span>Service fee</span><span>₹3,222</span></div><hr/><div className="line-item total"><b>Total</b><b>₹30,072</b></div></div>}
function PhotoTour({photos,onClose,onOpen}:{photos:Photo[];onClose:()=>void;onOpen:(i:number)=>void}){const groups=useMemo(()=>Array.from(new Set(photos.map(p=>p.room))),[photos]); return <div className="tour"><div className="tour-top"><button className="round" onClick={onClose} aria-label="Close photo tour"><X/></button><strong>Photo tour</strong><span/></div><div className="tour-inner"><div className="tour-tabs">{groups.map(g=><button key={g}>{g}</button>)}</div><div className="tour-grid">{photos.map((p,i)=><button key={i} className="tour-photo" onClick={()=>onOpen(i)}><img src={p.src} alt={p.alt}/><span>{p.room}</span></button>)}</div></div></div>}
function Lightbox({photo,index,total,onClose,onPrev,onNext}:{photo:Photo;index:number;total:number;onClose:()=>void;onPrev:()=>void;onNext:()=>void}){return <div className="lightbox" role="dialog" aria-modal="true" aria-label={`Photo ${index+1} of ${total}`}><button className="lb-close" onClick={onClose} aria-label="Close"><X/></button><div className="lb-counter">{index+1} / {total}</div><button className="lb-arrow left" onClick={onPrev} aria-label="Previous photo"><ChevronLeft/></button><img src={photo.src} alt={photo.alt}/><button className="lb-arrow right" onClick={onNext} aria-label="Next photo"><ChevronRight/></button></div>}
function AmenitiesModal({onClose}:{onClose:()=>void}){return <div className="modal-backdrop" onMouseDown={e=>{if(e.target===e.currentTarget)onClose()}}><div className="amenities-modal" role="dialog" aria-modal="true"><button className="round" onClick={onClose} aria-label="Close"><X/></button><h2>What this place offers</h2><div className="all-amenities">{[...amenities,...amenities,...amenities,...amenities].map((a,i)=><div key={i}>{a.icon}<span>{a.label}</span></div>)}</div></div></div>}

createRoot(document.getElementById('root')!).render(<React.StrictMode><App/></React.StrictMode>);
