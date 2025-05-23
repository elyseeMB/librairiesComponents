import{j as l}from"./jsx-runtime-D_zvdyIk.js";const x="_dark_o52r0_5",j="_secondary_o52r0_197",q="_primary_o52r0_251",H="_large_o52r0_273",L="_small_o52r0_293",s={dark:x,secondary:j,primary:q,large:H,small:L};function M(...t){return t.filter(Boolean).join(" ")}const V=["primary","secondary","destructive","outline","ghost","link","icon","with-icon","loading","as-child"];function b({children:t,onClick:k,variant:o="secondary",size:c="medium",icon:i,className:w,...z}){if(!o&&!c)return"";const E=s[o]??"",T=s[c]??"";return l.jsxs("button",{onClick:k,className:M(s.button,E,T,w),...z,children:[i&&l.jsx(i,{}),t]})}b.__docgenInfo={description:"",methods:[],displayName:"Button",props:{variant:{required:!1,tsType:{name:"unknown[number]",raw:"(typeof buttonVariants)[number]"},description:"",defaultValue:{value:'"secondary"',computed:!1}},size:{required:!1,tsType:{name:"unknown[number]",raw:"(typeof size)[number]"},description:"",defaultValue:{value:'"medium"',computed:!1}},onClick:{required:!1,tsType:{name:"ReactMouseEventHandler",raw:"React.MouseEventHandler<HTMLButtonElement>",elements:[{name:"HTMLButtonElement"}]},description:""},icon:{required:!1,tsType:{name:"signature",type:"function",raw:"(...arg: any) => JSX.Element",signature:{arguments:[{type:{name:"any"},name:"arg",rest:!0}],return:{name:"JSX.Element"}}},description:""}}};const N={title:"Atoms/Button",component:b,parameters:{layout:"centered"},argTypes:{variant:{control:"select",options:V}}},e={args:{children:"Button +",variant:"primary"}},r={args:{children:"Button +",variant:"secondary"}},a={args:{children:"Button +",size:"large"}},n={args:{children:"Button +",size:"small"}};var u,m,d;e.parameters={...e.parameters,docs:{...(u=e.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    children: "Button +",
    variant: "primary"
  }
}`,...(d=(m=e.parameters)==null?void 0:m.docs)==null?void 0:d.source}}};var p,y,g;r.parameters={...r.parameters,docs:{...(p=r.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {
    children: "Button +",
    variant: "secondary"
  }
}`,...(g=(y=r.parameters)==null?void 0:y.docs)==null?void 0:g.source}}};var _,f,B;a.parameters={...a.parameters,docs:{...(_=a.parameters)==null?void 0:_.docs,source:{originalSource:`{
  args: {
    children: "Button +",
    size: "large"
  }
}`,...(B=(f=a.parameters)==null?void 0:f.docs)==null?void 0:B.source}}};var h,v,S;n.parameters={...n.parameters,docs:{...(h=n.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    children: "Button +",
    size: "small"
  }
}`,...(S=(v=n.parameters)==null?void 0:v.docs)==null?void 0:S.source}}};const R=["Primary","Secondary","Large","Small"];export{a as Large,e as Primary,r as Secondary,n as Small,R as __namedExportsOrder,N as default};
