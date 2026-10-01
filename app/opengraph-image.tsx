import { ImageResponse } from "next/og";
export const runtime="nodejs";
export const alt="DIGITALE MEDIA — Creative × Growth × Technology × Experiences";
export const size={width:1200,height:630};
export const contentType="image/png";
export default function Image(){
 return new ImageResponse(<div style={{width:"100%",height:"100%",background:"#fbfbf9",color:"#11110f",display:"flex",flexDirection:"column",justifyContent:"space-between",padding:"70px",fontFamily:"Arial"}}>
  <div style={{fontSize:28,fontWeight:700,letterSpacing:2}}>DIGITALE MEDIA®</div>
  <div style={{display:"flex",flexDirection:"column",fontSize:92,fontWeight:800,lineHeight:.82,letterSpacing:-7}}>
   <span>IDEAS</span><span>HAVE</span><span style={{color:"#f06b18"}}>A LIFE.</span>
  </div>
  <div style={{fontSize:20,letterSpacing:2}}>CREATIVE × GROWTH × TECHNOLOGY × EXPERIENCES</div>
 </div>,size);
}