(()=>{function g(n){let e=n.ops,l=document.getElementById("convertedText");l.innerHTML="";let o="";e.forEach((r,d)=>{let i=r==null?void 0:r.attributes,c=r.insert;if(o+=b(c,i),c==`
`||d==e.length-1){let u=p(o),t=u[0],f=u[1];l.innerText+=t.length>0?t+`
`:"",o=f,(i==null?void 0:i.align)&&i.align!="justify"&&(o=`[${i.align}]${o.trim()}[/${i.align}]
`),(i==null?void 0:i.header)&&(o=`[h${i.header}]${o.trim()}[/h${i.header}]
`),(i==null?void 0:i.blockquote)&&(o=`[quote]${o.trim()}[/quote]
`),l.innerText+=o,o=""}});let s=/(<br>)+/g;l.innerHTML=l.innerHTML.replaceAll(s,`
<br /><br />`)}function p(n){let e=n.trimEnd().lastIndexOf(`
`);return[n.substring(0,e),n.substring(e).trim()]}function b(n,e){return n==""?"":(e&&(e.italic&&(n="[i]"+n+"[/i]"),e.bold&&(n="[b]"+n+"[/b]"),e.underline&&(n="[u]"+n+"[/u]"),e.link&&(n=`[url=${e.link}]${n}[/url]`),e.script&&(e.script=="super"&&(n="[sup]"+n+"[/sup]"),n="[sub]"+n+"[/sub]"),e.color?n=`[color=${e.color}]${n}[/color]`:console.log("Didn't identify inline attribute "+JSON.stringify(e))),n)}document.getElementById("convertButton").onclick=n=>{n.preventDefault(),console.log("converting text..."),g(quill.getContents())};document.getElementById("copyButton").onclick=n=>{n.preventDefault(),console.log("adding text to clipboard");let e=document.getElementById("convertedText").textContent;navigator.clipboard.writeText(e)};})();
//# sourceMappingURL=converter.js.map
