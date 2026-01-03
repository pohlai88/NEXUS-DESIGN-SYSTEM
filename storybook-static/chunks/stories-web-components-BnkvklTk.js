import{b as t}from"./lit-vendor-BPEWH8Br.js";const l={title:"Web Components/Button",component:"na-button",tags:["autodocs"],parameters:{docs:{description:{component:"A versatile button component with multiple variants, sizes, and states."}}},argTypes:{variant:{control:"select",options:["default","primary","secondary","destructive","outline","ghost","link"],description:"Button variant style"},size:{control:"select",options:["sm","md","lg","icon"],description:"Button size"},disabled:{control:"boolean",description:"Whether the button is disabled"},loading:{control:"boolean",description:"Whether the button is in loading state"}}},e={render:a=>t`
    <na-button
      variant="${a.variant||"default"}"
      size="${a.size||"md"}"
      ?disabled="${a.disabled}"
      ?loading="${a.loading}"
    >
      Button
    </na-button>
  `,args:{variant:"default",size:"md",disabled:!1,loading:!1}},n={render:()=>t`<na-button variant="primary">Primary Button</na-button>`},r={render:()=>t`<na-button variant="secondary">Secondary Button</na-button>`},o={render:()=>t`<na-button variant="destructive">Destructive Button</na-button>`},s={render:()=>t`
    <div style="display: flex; gap: 1rem; align-items: center;">
      <na-button size="sm">Small</na-button>
      <na-button size="md">Medium</na-button>
      <na-button size="lg">Large</na-button>
    </div>
  `},i={render:()=>t`
    <div style="display: flex; gap: 1rem;">
      <na-button disabled>Disabled</na-button>
      <na-button variant="primary" disabled>Disabled Primary</na-button>
    </div>
  `},d={render:()=>t`
    <div style="display: flex; gap: 1rem;">
      <na-button loading>Loading</na-button>
      <na-button variant="primary" loading>Loading Primary</na-button>
    </div>
  `};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  render: args => html\`
    <na-button
      variant="\${args.variant || 'default'}"
      size="\${args.size || 'md'}"
      ?disabled="\${args.disabled}"
      ?loading="\${args.loading}"
    >
      Button
    </na-button>
  \`,
  args: {
    variant: 'default',
    size: 'md',
    disabled: false,
    loading: false
  }
}`,...e.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:'{\n  render: () => html`<na-button variant="primary">Primary Button</na-button>`\n}',...n.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:'{\n  render: () => html`<na-button variant="secondary">Secondary Button</na-button>`\n}',...r.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:'{\n  render: () => html`<na-button variant="destructive">Destructive Button</na-button>`\n}',...o.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: () => html\`
    <div style="display: flex; gap: 1rem; align-items: center;">
      <na-button size="sm">Small</na-button>
      <na-button size="md">Medium</na-button>
      <na-button size="lg">Large</na-button>
    </div>
  \`
}`,...s.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  render: () => html\`
    <div style="display: flex; gap: 1rem;">
      <na-button disabled>Disabled</na-button>
      <na-button variant="primary" disabled>Disabled Primary</na-button>
    </div>
  \`
}`,...i.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: () => html\`
    <div style="display: flex; gap: 1rem;">
      <na-button loading>Loading</na-button>
      <na-button variant="primary" loading>Loading Primary</na-button>
    </div>
  \`
}`,...d.parameters?.docs?.source}}};const c=["Default","Primary","Secondary","Destructive","Sizes","Disabled","Loading"];export{e as Default,o as Destructive,i as Disabled,d as Loading,n as Primary,r as Secondary,s as Sizes,c as __namedExportsOrder,l as default};
