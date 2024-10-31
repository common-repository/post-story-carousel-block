(()=>{"use strict";var e,t={791:()=>{const e=window.React,t=window.wp.i18n,o=window.wp.blockEditor,a=window.wp.components,s=window.wp.element,n=[{color:"#000000",name:"Black"},{color:"#FFFFFF",name:"White"},{color:"#FF0000",name:"Red"}];function r(e){return(new DOMParser).parseFromString(e,"text/html").body.textContent||""}wp.blocks.registerBlockType("sspsgb/post-carousel",{title:(0,t.__)("Post Story Carousel","post-story-carousel-block"),icon:"slides",category:"layout",attributes:{numberOfPosts:{type:"number",default:7},postType:{type:"string",default:"posts"},category:{type:"string",default:""},fontSize:{type:"number",default:14},fontFamily:{type:"string",default:"Arial"},fontColor:{type:"string",default:"#ffffff"},lineHeight:{type:"number",default:1},subtitleLength:{type:"number",default:50},paddingTop:{type:"number",default:10},paddingBottom:{type:"number",default:10},paddingLeft:{type:"number",default:10},paddingRight:{type:"number",default:10},marginTop:{type:"number",default:10},marginBottom:{type:"number",default:10},marginLeft:{type:"number",default:10},marginRight:{type:"number",default:10},imageSize:{type:"string",default:"large"},customImageWidth:{type:"number",default:175},customImageHeight:{type:"number",default:350},descriptionFontSize:{type:"number",default:12},descriptionFontColor:{type:"string",default:"#ffffff"},cardSpace:{type:"number",default:5}},edit:l=>{const{attributes:i,setAttributes:p}=l,[c,g]=(0,s.useState)([]),[u,m]=(0,s.useState)(!0),[d,b]=(0,s.useState)([]);(0,s.useEffect)((()=>{(async()=>{try{const e=await fetch(`${wpApiSettings.root}wp/v2/types`,{headers:{"Content-Type":"application/json","X-WP-Nonce":wpApiSettings.nonce}});if(!e.ok)throw new Error("Failed to fetch post types");const t=await e.json(),o=Object.keys(t).filter((e=>!["Media","media","page","Page","attachment"].includes(e)&&t[e].icon)).map((e=>({label:t[e].name,value:e})));b(o)}catch(e){console.error("Fetching post types failed:",e)}})()}),[]),(0,s.useEffect)((()=>{(async()=>{m(!0);try{const e=`${wpApiSettings.root}wp/v2/${i.postType}?per_page=${i.numberOfPosts}${i.category?`&categories=${i.category}`:""}`,t=await fetch(e,{headers:{"Content-Type":"application/json","X-WP-Nonce":wpApiSettings.nonce}});if(!t.ok)throw new Error("Network response was not ok.");const o=await t.json(),a=await Promise.all(o.map((async e=>{const t=e.featured_media?await(async e=>{try{const t=await fetch(`${wpApiSettings.root}wp/v2/media/${e}`,{headers:{"Content-Type":"application/json","X-WP-Nonce":wpApiSettings.nonce}});if(!t.ok)throw new Error("Network response was not ok.");return await t.json()}catch(e){return console.error("Fetching media failed:",e),null}})(e.featured_media):null,o=e.author?await(async e=>{try{const t=await fetch(`${wpApiSettings.root}wp/v2/users/${e}`,{headers:{"Content-Type":"application/json","X-WP-Nonce":wpApiSettings.nonce}});if(!t.ok)throw new Error("Network response was not ok.");return await t.json()}catch(e){return console.error("Fetching author details failed:",e),null}})(e.author):null;return{...e,featured_media:t,author:o}})));g(a)}catch(e){console.error("Fetching posts failed:",e)}finally{m(!1)}})()}),[i.numberOfPosts,i.postType,i.category]);const{numberOfPosts:y,postType:f,category:h,fontSize:_,fontFamily:C,fontColor:v,lineHeight:w,subtitleLength:E,paddingTop:S,paddingBottom:F,paddingLeft:x,paddingRight:P,marginTop:T,marginBottom:k,marginLeft:R,marginRight:N,imageSize:O,customImageWidth:$,customImageHeight:B,descriptionFontSize:z,descriptionFontColor:L,cardSpace:j}=i;return(0,e.createElement)(e.Fragment,null,(0,e.createElement)(o.InspectorControls,null,(0,e.createElement)(a.PanelBody,{title:(0,t.__)("Post Settings","post-story-carousel-block")},(0,e.createElement)(a.SelectControl,{label:(0,t.__)("Image Size","post-story-carousel-block"),value:O,options:[{label:(0,t.__)("Thumbnail","post-story-carousel-block"),value:"thumbnail"},{label:(0,t.__)("Medium","post-story-carousel-block"),value:"medium"},{label:(0,t.__)("Large","post-story-carousel-block"),value:"large"},{label:(0,t.__)("Full","post-story-carousel-block"),value:"full"},{label:(0,t.__)("Custom","post-story-carousel-block"),value:"custom"}],onChange:e=>p({imageSize:e})}),"custom"===O&&(0,e.createElement)(e.Fragment,null,(0,e.createElement)(a.TextControl,{label:(0,t.__)("Custom Image Width (px)","post-story-carousel-block"),type:"number",value:$,onChange:e=>p({customImageWidth:parseInt(e,10)||175})}),(0,e.createElement)(a.TextControl,{label:(0,t.__)("Custom Image Height (px)","post-story-carousel-block"),type:"number",value:B,onChange:e=>p({customImageHeight:parseInt(e,10)||350})})),(0,e.createElement)(a.RangeControl,{label:(0,t.__)("Number of Posts","post-story-carousel-block"),value:y,onChange:e=>p({numberOfPosts:e}),min:1,max:20}),(0,e.createElement)(a.SelectControl,{label:(0,t.__)("Post Type","post-story-carousel-block"),value:f,options:d,onChange:e=>p({postType:e})}),(0,e.createElement)(a.TextControl,{label:(0,t.__)("Category Name (Add Comma sapreated with name or leave empty for all)","post-story-carousel-block"),value:h,onChange:e=>p({category:e})})),(0,e.createElement)(a.PanelBody,{title:(0,t.__)("Title Settings","post-story-carousel-block")},(0,e.createElement)(a.RangeControl,{label:(0,t.__)("Title Font Size","post-story-carousel-block"),value:_,onChange:e=>p({fontSize:e}),min:10,max:50}),(0,e.createElement)(a.TextControl,{label:(0,t.__)("Title Font Family","post-story-carousel-block"),value:C,onChange:e=>p({fontFamily:e})}),(0,e.createElement)(a.ColorPalette,{label:(0,t.__)("Title Font Color","post-story-carousel-block"),colors:n,value:v,onChange:e=>p({fontColor:e})}),(0,e.createElement)(a.RangeControl,{label:(0,t.__)("Title Line Height","post-story-carousel-block"),value:w,onChange:e=>p({lineHeight:e}),min:0,max:2})),(0,e.createElement)(a.PanelBody,{title:(0,t.__)("Subtitle Settings","post-story-carousel-block")},(0,e.createElement)(a.RangeControl,{label:(0,t.__)("Subtitle Font Size","post-story-carousel-block"),value:z,onChange:e=>p({descriptionFontSize:e}),min:10,max:50}),(0,e.createElement)(a.ColorPalette,{label:(0,t.__)("Subtitle Font Color","post-story-carousel-block"),colors:n,value:L,onChange:e=>p({descriptionFontColor:e})}),(0,e.createElement)(a.RangeControl,{label:(0,t.__)("Subtitle Length","post-story-carousel-block"),value:E,onChange:e=>p({subtitleLength:e}),min:10,max:200})),(0,e.createElement)(a.PanelBody,{title:(0,t.__)("Spacing Settings","post-story-carousel-block")},(0,e.createElement)(a.RangeControl,{label:(0,t.__)("Padding Top","post-story-carousel-block"),value:S,onChange:e=>p({paddingTop:e}),min:0,max:50}),(0,e.createElement)(a.RangeControl,{label:(0,t.__)("Padding Bottom","post-story-carousel-block"),value:F,onChange:e=>p({paddingBottom:e}),min:0,max:50}),(0,e.createElement)(a.RangeControl,{label:(0,t.__)("Padding Left","post-story-carousel-block"),value:x,onChange:e=>p({paddingLeft:e}),min:0,max:50}),(0,e.createElement)(a.RangeControl,{label:(0,t.__)("Padding Right","post-story-carousel-block"),value:P,onChange:e=>p({paddingRight:e}),min:0,max:50}),(0,e.createElement)(a.RangeControl,{label:(0,t.__)("Margin Top","post-story-carousel-block"),value:T,onChange:e=>p({marginTop:e}),min:0,max:50}),(0,e.createElement)(a.RangeControl,{label:(0,t.__)("Margin Bottom","post-story-carousel-block"),value:k,onChange:e=>p({marginBottom:e}),min:0,max:50}),(0,e.createElement)(a.RangeControl,{label:(0,t.__)("Margin Left","post-story-carousel-block"),value:R,onChange:e=>p({marginLeft:e}),min:0,max:50}),(0,e.createElement)(a.RangeControl,{label:(0,t.__)("Margin Right","post-story-carousel-block"),value:N,onChange:e=>p({marginRight:e}),min:0,max:50}),(0,e.createElement)(a.RangeControl,{label:(0,t.__)("Card Space","post-story-carousel-block"),value:j,onChange:e=>p({cardSpace:e}),min:0,max:50}))),(0,e.createElement)("div",{...(0,o.useBlockProps)()},u?(0,e.createElement)("div",{className:"post-carousel-loading"},(0,e.createElement)(a.Spinner,null)):c.length>0?(0,e.createElement)("div",{className:"ssspsgb-carousel"},(0,e.createElement)("div",{className:"sspsgb-story-container"},c.map(((t,o)=>{const a=t.featured_media?.source_url||sspsgbpPath+"assets/img/default-story.jpg";return(0,e.createElement)("div",{key:o,className:"sspsgb-story-card",style:{backgroundImage:`url(${a})`,width:`${$}px`,height:`${B}px`,margin:`${j}px`}},(0,e.createElement)("a",{href:t.link,className:"sspsgb-story-info"},t.author&&t.author.avatar_urls&&(0,e.createElement)("img",{className:"sspsgb-user-logo",src:t.author.avatar_urls[24],alt:t.author.name,width:"30",height:"30"}),(0,e.createElement)("div",{className:"sspsgb-story-title",style:{fontSize:`${_}px`,fontFamily:C,color:v,lineHeight:`${w}`}},t.title.rendered)),(0,e.createElement)("div",{className:"sspsgb-story-description",style:{fontSize:`${z}px`,color:L}},r(t.content.rendered).length>E?r(t.content.rendered).substring(0,E)+"...":r(t.content.rendered)))}))),(0,e.createElement)("div",{className:"sspsgb-arrow sspsgb-left"},"‹"),(0,e.createElement)("div",{className:"sspsgb-arrow sspsgb-right"},"›")):(0,e.createElement)("p",null,(0,t.__)("No posts available.","post-story-carousel-block"))))},save:()=>null})}},o={};function a(e){var s=o[e];if(void 0!==s)return s.exports;var n=o[e]={exports:{}};return t[e](n,n.exports,a),n.exports}a.m=t,e=[],a.O=(t,o,s,n)=>{if(!o){var r=1/0;for(c=0;c<e.length;c++){o=e[c][0],s=e[c][1],n=e[c][2];for(var l=!0,i=0;i<o.length;i++)(!1&n||r>=n)&&Object.keys(a.O).every((e=>a.O[e](o[i])))?o.splice(i--,1):(l=!1,n<r&&(r=n));if(l){e.splice(c--,1);var p=s();void 0!==p&&(t=p)}}return t}n=n||0;for(var c=e.length;c>0&&e[c-1][2]>n;c--)e[c]=e[c-1];e[c]=[o,s,n]},a.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e={57:0,350:0};a.O.j=t=>0===e[t];var t=(t,o)=>{var s,n,r=o[0],l=o[1],i=o[2],p=0;if(r.some((t=>0!==e[t]))){for(s in l)a.o(l,s)&&(a.m[s]=l[s]);if(i)var c=i(a)}for(t&&t(o);p<r.length;p++)n=r[p],a.o(e,n)&&e[n]&&e[n][0](),e[n]=0;return a.O(c)},o=self.webpackChunksspsgb_post_carousel=self.webpackChunksspsgb_post_carousel||[];o.forEach(t.bind(null,0)),o.push=t.bind(null,o.push.bind(o))})();var s=a.O(void 0,[350],(()=>a(791)));s=a.O(s)})();