import {desk} from "@shared/desk";
import {wrap} from "@shared/surface";
let people=["Ada","Bo","Cam","Dee"];type S={at:number;counts:Record<string,number>;history:string[]};
desk<S>({name:"Circle Keeper",accent:"#ED8B86",motion:{"motif":"interval","color":"#ED8B86","shine":"#FFF0DB"},initial:()=>({at:0,counts:{},history:[]}),configure:(s,v)=>{const p=String(v.people||"").split(",").map(x=>x.trim()).filter(Boolean).slice(0,10);if(p.length)people=p;s.at%=people.length;},
 render:s=>{const p=people[s.at],unheard=people.filter(x=>!s.counts[x]);return {title:p,value:(s.counts[p]||0)+" turns",lines:[p+" / "+(s.counts[p]||0),"Unheard: "+unheard.length,
 unheard.slice(0,2).join(", ")||"Everyone contributed","Wheel: speaker / Click: turn","Start: least heard","Hold OK: undo / hold Start: new"]};},
 action:(s,k)=>{const p=people[s.at];if(k==="up"||k==="down")s.at=wrap(s.at+(k==="up"?1:-1),people.length);
 if(k==="ok"){s.counts[p]=(s.counts[p]||0)+1;s.history=s.history.concat([p]).slice(-100);}
 if(k==="start"){let best=wrap(s.at+1,people.length);for(let j=1;j<=people.length;j++){const i=wrap(s.at+j,people.length);if((s.counts[people[i]]||0)<(s.counts[people[best]]||0))best=i;}s.at=best;}
 if(k==="hold-ok"&&s.history.length){const last=s.history.pop()!;s.counts[last]=Math.max(0,(s.counts[last]||0)-1);}
 if(k==="hold-start"){s.counts={};s.history=[];}}});
