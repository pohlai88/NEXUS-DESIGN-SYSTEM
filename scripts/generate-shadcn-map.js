/**
 * Auto-generate comprehensive shadcn/ui to AIBOS Design System mapping
 * Uses shadcn MCP to get actual component types, then maps all AIBOS classes
 * Industrial-grade automated mapping: ~450+ mappings
 */

import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const distDir = join(process.cwd(), 'dist');
const headlessMap = JSON.parse(readFileSync(join(distDir, 'headless-map.json'), 'utf-8'));

// Get all AIBOS classes from headless-map
const aibosClasses = Object.keys(headlessMap.classes || {});

// All shadcn UI components (from MCP - 54 UI components)
const shadcnUIComponents = [
  'accordion', 'alert', 'alert-dialog', 'aspect-ratio', 'avatar', 'badge', 'breadcrumb',
  'button', 'button-group', 'calendar', 'card', 'carousel', 'chart', 'checkbox', 'collapsible',
  'command', 'context-menu', 'dialog', 'drawer', 'dropdown-menu', 'empty', 'field', 'form',
  'hover-card', 'input', 'input-group', 'input-otp', 'item', 'label', 'menubar', 'navigation-menu',
  'pagination', 'popover', 'progress', 'radio-group', 'resizable', 'scroll-area', 'select',
  'separator', 'sheet', 'sidebar', 'skeleton', 'slider', 'sonner', 'spinner', 'switch',
  'table', 'tabs', 'textarea', 'toggle', 'toggle-group', 'tooltip', 'kbd', 'native-select'
];

// Component parts mapping (based on shadcn component structure)
const componentParts = {
  'button': ['Button'],
  'button-group': ['ButtonGroup'],
  'card': ['Card', 'CardHeader', 'CardTitle', 'CardDescription', 'CardContent', 'CardFooter', 'CardAction'],
  'dialog': ['Dialog', 'DialogTrigger', 'DialogContent', 'DialogHeader', 'DialogTitle', 'DialogDescription', 'DialogFooter', 'DialogClose'],
  'alert-dialog': ['AlertDialog', 'AlertDialogTrigger', 'AlertDialogContent', 'AlertDialogHeader', 'AlertDialogTitle', 'AlertDialogDescription', 'AlertDialogFooter', 'AlertDialogAction', 'AlertDialogCancel'],
  'alert': ['Alert', 'AlertTitle', 'AlertDescription'],
  'table': ['Table', 'TableHeader', 'TableBody', 'TableFooter', 'TableRow', 'TableHead', 'TableCell', 'TableCaption'],
  'tabs': ['Tabs', 'TabsList', 'TabsTrigger', 'TabsContent'],
  'accordion': ['Accordion', 'AccordionItem', 'AccordionTrigger', 'AccordionContent'],
  'select': ['Select', 'SelectGroup', 'SelectValue', 'SelectTrigger', 'SelectContent', 'SelectLabel', 'SelectItem', 'SelectSeparator', 'SelectScrollUpButton', 'SelectScrollDownButton'],
  'dropdown-menu': ['DropdownMenu', 'DropdownMenuTrigger', 'DropdownMenuContent', 'DropdownMenuItem', 'DropdownMenuLabel', 'DropdownMenuSeparator', 'DropdownMenuGroup', 'DropdownMenuSub', 'DropdownMenuSubTrigger', 'DropdownMenuSubContent', 'DropdownMenuRadioGroup', 'DropdownMenuRadioItem', 'DropdownMenuCheckboxItem'],
  'popover': ['Popover', 'PopoverTrigger', 'PopoverContent'],
  'tooltip': ['Tooltip', 'TooltipTrigger', 'TooltipContent', 'TooltipProvider'],
  'hover-card': ['HoverCard', 'HoverCardTrigger', 'HoverCardContent'],
  'sheet': ['Sheet', 'SheetTrigger', 'SheetContent', 'SheetHeader', 'SheetTitle', 'SheetDescription', 'SheetFooter'],
  'drawer': ['Drawer', 'DrawerTrigger', 'DrawerContent', 'DrawerHeader', 'DrawerTitle', 'DrawerDescription', 'DrawerFooter'],
  'sidebar': ['Sidebar', 'SidebarTrigger', 'SidebarContent', 'SidebarHeader', 'SidebarFooter', 'SidebarGroup', 'SidebarMenu', 'SidebarMenuItem', 'SidebarMenuButton'],
  'form': ['Form', 'FormItem', 'FormLabel', 'FormControl', 'FormDescription', 'FormMessage'],
  'field': ['Field', 'FieldLabel', 'FieldDescription', 'FieldMessage', 'FieldError'],
  'command': ['Command', 'CommandInput', 'CommandList', 'CommandEmpty', 'CommandGroup', 'CommandItem', 'CommandSeparator', 'CommandShortcut'],
  'combobox': ['Combobox', 'ComboboxTrigger', 'ComboboxContent'],
  'calendar': ['Calendar'],
  'breadcrumb': ['Breadcrumb', 'BreadcrumbList', 'BreadcrumbItem', 'BreadcrumbLink', 'BreadcrumbSeparator', 'BreadcrumbEllipsis'],
  'pagination': ['Pagination', 'PaginationContent', 'PaginationItem', 'PaginationLink', 'PaginationPrevious', 'PaginationNext', 'PaginationEllipsis'],
  'carousel': ['Carousel', 'CarouselContent', 'CarouselItem', 'CarouselPrevious', 'CarouselNext'],
  'avatar': ['Avatar', 'AvatarImage', 'AvatarFallback'],
  'separator': ['Separator'],
  'progress': ['Progress'],
  'slider': ['Slider'],
  'switch': ['Switch'],
  'checkbox': ['Checkbox'],
  'radio-group': ['RadioGroup', 'RadioGroupItem'],
  'toggle': ['Toggle'],
  'toggle-group': ['ToggleGroup', 'ToggleGroupItem'],
  'textarea': ['Textarea'],
  'input': ['Input'],
  'input-group': ['InputGroup', 'InputGroupLabel', 'InputGroupText', 'InputGroupInput', 'InputGroupButton'],
  'input-otp': ['InputOTP', 'InputOTPGroup', 'InputOTPSlot', 'InputOTPSeparator'],
  'label': ['Label'],
  'item': ['Item', 'ItemHeader', 'ItemContent', 'ItemFooter'],
  'skeleton': ['Skeleton'],
  'empty': ['Empty', 'EmptyIcon', 'EmptyTitle', 'EmptyDescription', 'EmptyAction'],
  'toast': ['Toast', 'ToastProvider', 'ToastViewport', 'ToastTitle', 'ToastDescription', 'ToastAction', 'ToastClose'],
  'sonner': ['Toaster'],
  'spinner': ['Spinner'],
  'kbd': ['Kbd'],
  'native-select': ['NativeSelect'],
  'scroll-area': ['ScrollArea', 'ScrollBar'],
  'resizable': ['ResizablePanelGroup', 'ResizablePanel', 'ResizableHandle'],
  'aspect-ratio': ['AspectRatio'],
  'collapsible': ['Collapsible', 'CollapsibleTrigger', 'CollapsibleContent'],
  'context-menu': ['ContextMenu', 'ContextMenuTrigger', 'ContextMenuContent', 'ContextMenuItem', 'ContextMenuLabel', 'ContextMenuSeparator', 'ContextMenuGroup', 'ContextMenuSub', 'ContextMenuSubTrigger', 'ContextMenuSubContent', 'ContextMenuRadioGroup', 'ContextMenuRadioItem', 'ContextMenuCheckboxItem'],
  'menubar': ['Menubar', 'MenubarMenu', 'MenubarTrigger', 'MenubarContent', 'MenubarItem', 'MenubarLabel', 'MenubarSeparator', 'MenubarGroup', 'MenubarSub', 'MenubarSubTrigger', 'MenubarSubContent', 'MenubarRadioGroup', 'MenubarRadioItem', 'MenubarCheckboxItem'],
  'navigation-menu': ['NavigationMenu', 'NavigationMenuList', 'NavigationMenuItem', 'NavigationMenuTrigger', 'NavigationMenuContent', 'NavigationMenuLink', 'NavigationMenuViewport', 'NavigationMenuIndicator'],
  'chart': ['ChartContainer', 'ChartTooltip', 'ChartTooltipContent', 'ChartLegend', 'ChartLegendContent']
};

// Comprehensive semantic mapping patterns
const semanticMappings = {
  // Button - all variants
  'button': {
    base: ['na-btn'],
    variants: {
      default: ['na-btn'],
      primary: ['na-btn-primary'],
      secondary: ['na-btn-secondary'],
      destructive: ['na-btn-danger', 'na-btn-primary'],
      outline: ['na-btn-secondary'],
      ghost: ['na-btn'],
      link: ['na-btn'],
      icon: ['na-iconbtn']
    },
    sizes: {
      default: [],
      sm: [],
      lg: [],
      icon: ['na-iconbtn']
    }
  },
  
  // Card - all parts
  'card': {
    base: ['na-card'],
    parts: {
      Card: ['na-card'],
      CardHeader: ['na-card-title'],
      CardTitle: ['na-h4'],
      CardDescription: ['na-metadata'],
      CardContent: ['na-p-6'],
      CardFooter: ['na-card-meta'],
      CardAction: ['na-btn']
    }
  },
  
  // Input/Form
  'input': {
    base: ['na-input'],
    wrapper: ['na-field'],
    label: ['na-metadata']
  },
  
  'textarea': {
    base: ['na-textarea'],
    wrapper: ['na-field'],
    label: ['na-metadata']
  },
  
  'select': {
    base: ['na-select'],
    wrapper: ['na-field'],
    trigger: ['na-input'],
    label: ['na-metadata']
  },
  
  'label': {
    base: ['na-metadata', 'na-label']
  },
  
  'field': {
    base: ['na-field'],
    label: ['na-metadata'],
    description: ['na-metadata-small'],
    error: ['na-error']
  },
  
  'form': {
    base: ['na-card'],
    field: ['na-field'],
    label: ['na-metadata']
  },
  
  // Table
  'table': {
    base: ['na-table-wrap'],
    parts: {
      Table: [],
      TableHeader: ['na-th'],
      TableRow: ['na-tr'],
      TableHead: ['na-th', 'na-metadata'],
      TableCell: ['na-td', 'na-data'],
      TableBody: [],
      TableFooter: [],
      TableCaption: ['na-metadata-small']
    }
  },
  
  // Badge/Status
  'badge': {
    base: ['na-status'],
    variants: {
      default: ['na-status'],
      secondary: ['na-status'],
      destructive: ['na-status', 'bad'],
      outline: ['na-status']
    }
  },
  
  // Dialog/Modal
  'dialog': {
    base: [],
    content: ['na-card'],
    header: ['na-card-title'],
    title: ['na-h3'],
    description: ['na-metadata'],
    footer: ['na-card-meta']
  },
  
  'sheet': {
    base: [],
    content: ['na-card'],
    header: ['na-card-title'],
    title: ['na-h3'],
    description: ['na-metadata'],
    footer: ['na-card-meta']
  },
  
  'drawer': {
    base: [],
    content: ['na-card'],
    header: ['na-card-title'],
    title: ['na-h3'],
    description: ['na-metadata'],
    footer: ['na-card-meta']
  },
  
  // Toast
  'toast': {
    base: ['na-toast', 'na-card'],
    title: ['na-toast-title', 'na-h5'],
    description: ['na-toast-desc', 'na-metadata'],
    icon: ['na-toast-icon'],
    body: ['na-toast-body'],
    meta: ['na-toast-meta', 'na-metadata-small']
  },
  
  'sonner': {
    base: ['na-toast', 'na-card'],
    title: ['na-toast-title', 'na-h5'],
    description: ['na-toast-desc', 'na-metadata']
  },
  
  // Accordion
  'accordion': {
    base: ['na-card'],
    item: ['na-card', 'na-details'],
    trigger: ['na-h4', 'na-summary-title'],
    content: ['na-p-6', 'na-details-body']
  },
  
  'collapsible': {
    base: ['na-card'],
    trigger: ['na-h4'],
    content: ['na-p-6']
  },
  
  // Skeleton
  'skeleton': {
    base: ['na-skeleton', 'na-skel'],
    line: ['na-skel-line'],
    circle: ['na-skel-dot'],
    rectangle: ['na-skel-pill']
  },
  
  // Empty
  'empty': {
    base: ['na-empty', 'na-card'],
    icon: ['na-empty-illustration'],
    title: ['na-empty-title', 'na-h4'],
    description: ['na-empty-desc', 'na-metadata'],
    action: ['na-btn-primary']
  },
  
  // Alert
  'alert': {
    base: ['na-panel'],
    title: ['na-h5', 'na-error-title'],
    description: ['na-metadata', 'na-error-desc']
  },
  
  // Separator
  'separator': {
    base: ['na-bar']
  },
  
  // Scroll
  'scroll-area': {
    base: ['na-scroll']
  },
  
  // Sidebar
  'sidebar': {
    base: ['na-shell', 'na-shell-rail'],
    header: ['na-shell-head'],
    content: ['na-shell-main'],
    footer: ['na-shell-foot']
  },
  
  // Tabs
  'tabs': {
    base: [],
    list: [],
    trigger: ['na-btn'],
    content: ['na-p-6']
  },
  
  // Typography (for all text components)
  'typography': {
    h1: ['na-h1'],
    h2: ['na-h2'],
    h3: ['na-h3'],
    h4: ['na-h4'],
    h5: ['na-h5'],
    h6: ['na-h6'],
    data: ['na-data'],
    dataLarge: ['na-data-large'],
    metadata: ['na-metadata'],
    metadataSmall: ['na-metadata-small']
  }
};

// Utility classes that work with any component
const utilityClasses = {
  spacing: aibosClasses.filter(c => /^na-(p|m|gap|px|py|mx|my|mt|mb|ml|mr|pt|pb|pl|pr)-/.test(c)),
  layout: aibosClasses.filter(c => /^na-(flex|grid|items|justify|gap)/.test(c)),
  rounded: aibosClasses.filter(c => /^na-rounded/.test(c)),
  typography: aibosClasses.filter(c => /^na-h[1-6]$|^na-data|^na-metadata/.test(c)),
  background: aibosClasses.filter(c => /^na-bg-/.test(c)),
  border: aibosClasses.filter(c => /^na-border/.test(c)),
  shadow: aibosClasses.filter(c => /^na-shadow/.test(c)),
  effects: aibosClasses.filter(c => /^na-(shimmer|scroll|muted|tabular|bg-grain)/.test(c))
};

// Generate comprehensive mappings
const mappings = {};
const aibosToShadcn = {};

// Initialize reverse mapping
aibosClasses.forEach(className => {
  aibosToShadcn[className] = [];
});

// Map each shadcn component with all its parts
shadcnUIComponents.forEach(component => {
  const allMappedClasses = [];
  const componentMapping = {
    shadcn: component,
    description: `shadcn/ui ${component} component`,
    parts: {},
    aibosClasses: {
      base: [],
      all: [],
      semantic: [],
      utilities: [],
      count: 0
    },
    examples: []
  };
  
  // 1. Get semantic mappings
  if (semanticMappings[component]) {
    const semantic = semanticMappings[component];
    
    if (semantic.base) {
      componentMapping.aibosClasses.base = semantic.base[0];
      allMappedClasses.push(...semantic.base);
    }
    
    if (semantic.parts) {
      Object.entries(semantic.parts).forEach(([part, classes]) => {
        componentMapping.parts[part] = classes;
        allMappedClasses.push(...classes);
      });
    }
    
    if (semantic.variants) {
      Object.values(semantic.variants).forEach(classes => {
        allMappedClasses.push(...classes);
      });
    }
    
    if (semantic.wrapper) {
      allMappedClasses.push(...semantic.wrapper);
    }
    
    if (semantic.label) {
      allMappedClasses.push(...semantic.label);
    }
  }
  
  // 2. Add component parts from componentParts mapping
  if (componentParts[component]) {
    componentParts[component].forEach(part => {
      // Map each part to relevant AIBOS classes
      if (part.includes('Title') || part.includes('Header')) {
        allMappedClasses.push('na-h4', 'na-h3', 'na-card-title');
      }
      if (part.includes('Description') || part.includes('Label')) {
        allMappedClasses.push('na-metadata', 'na-label');
      }
      if (part.includes('Content') || part.includes('Body')) {
        allMappedClasses.push('na-p-6', 'na-content');
      }
      if (part.includes('Footer')) {
        allMappedClasses.push('na-card-meta');
      }
      if (part.includes('Trigger') || part.includes('Button')) {
        allMappedClasses.push('na-btn', 'na-btn-primary');
      }
      if (part.includes('Item')) {
        allMappedClasses.push('na-flex', 'na-items-center', 'na-p-2');
      }
    });
  }
  
  // 3. Add utility classes based on component type
  const containerComponents = ['card', 'dialog', 'sheet', 'drawer', 'popover', 'alert', 'empty', 'sidebar', 'hover-card', 'tooltip'];
  const textComponents = ['label', 'alert', 'toast', 'sonner', 'empty', 'item', 'badge'];
  const interactiveComponents = ['button', 'input', 'select', 'textarea', 'checkbox', 'radio-group', 'switch', 'slider', 'toggle'];
  
  if (containerComponents.includes(component)) {
    allMappedClasses.push(...utilityClasses.spacing.filter(c => /^na-p-/.test(c)));
    allMappedClasses.push(...utilityClasses.rounded);
    allMappedClasses.push(...utilityClasses.shadow);
  }
  
  if (textComponents.includes(component) || component.includes('title') || component.includes('description') || component.includes('label') || component.includes('header')) {
    allMappedClasses.push(...utilityClasses.typography);
  }
  
  if (interactiveComponents.includes(component)) {
    allMappedClasses.push(...utilityClasses.rounded.filter(c => /rounded-control/.test(c)));
    allMappedClasses.push(...utilityClasses.spacing.filter(c => /^na-p-/.test(c)));
  }
  
  // 4. Add layout utilities for all components
  allMappedClasses.push(...utilityClasses.layout.slice(0, 10)); // Limit to avoid too many
  
  // 5. Remove duplicates and categorize
  const uniqueClasses = [...new Set(allMappedClasses)];
  const semanticClasses = uniqueClasses.filter(c => !/^na-(p|m|gap|flex|grid|rounded|text|bg)/.test(c));
  const utilityClassList = uniqueClasses.filter(c => /^na-(p|m|gap|flex|grid|rounded|text|bg)/.test(c));
  
  componentMapping.aibosClasses.all = uniqueClasses;
  componentMapping.aibosClasses.semantic = semanticClasses;
  componentMapping.aibosClasses.utilities = utilityClassList;
  componentMapping.aibosClasses.count = uniqueClasses.length;
  
  if (uniqueClasses.length > 0) {
    if (!componentMapping.aibosClasses.base) {
      componentMapping.aibosClasses.base = uniqueClasses[0];
    }
    
    // Generate component name for examples
    const componentName = componentParts[component]?.[0] || 
      component.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('');
    
    // Generate IDE-friendly examples
    const baseExample = `<${componentName} className="${componentMapping.aibosClasses.base}">Content</${componentName}>`;
    const fullExample = semanticClasses.length > 0 
      ? `<${componentName} className="${[componentMapping.aibosClasses.base, ...semanticClasses.slice(0, 3)].join(' ')}">Content</${componentName}>`
      : baseExample;
    
    componentMapping.example = baseExample;
    componentMapping.examples = [baseExample, fullExample].filter((v, i, a) => a.indexOf(v) === i);
    
    componentMapping.usage = `Use AIBOS classes: ${semanticClasses.slice(0, 5).join(', ')}${semanticClasses.length > 5 ? ` (+${semanticClasses.length - 5} more semantic)` : ''}${utilityClassList.length > 0 ? ` + ${utilityClassList.length} utilities` : ''}`;
    
    // Add IDE-friendly IntelliSense metadata
    componentMapping.intellisense = {
      summary: `Apply AIBOS Design System classes to shadcn/ui ${component} component`,
      details: `This mapping provides ${semanticClasses.length} semantic AIBOS classes and ${utilityClassList.length} utility classes for styling the ${component} component. Use semantic classes (${semanticClasses.slice(0, 3).join(', ')}) for consistent design system styling.`,
      recommended: semanticClasses.slice(0, 5),
      patterns: [
        `Base: ${componentMapping.aibosClasses.base}`,
        `Semantic: ${semanticClasses.slice(0, 3).join(', ')}`,
        `Utilities: ${utilityClassList.slice(0, 3).join(', ')}`
      ].filter(p => p.split(': ')[1] && p.split(': ')[1].trim())
    };
    
    mappings[component] = componentMapping;
    
    // Build reverse mapping
    uniqueClasses.forEach(className => {
      if (!aibosToShadcn[className]) {
        aibosToShadcn[className] = [];
      }
      if (!aibosToShadcn[className].includes(component)) {
        aibosToShadcn[className].push(component);
      }
    });
  }
});

// Generate comprehensive mapping object
const shadcnMap = {
  version: '2.0.0',
  generated: new Date().toISOString(),
  designSystem: {
    name: 'Neo-Analog Design System',
    version: '2.0.0',
    description: 'Auto-generated AIBOS to shadcn/ui component mapping from headless-map using shadcn MCP'
  },
  stats: {
    totalAIBOSClasses: aibosClasses.length,
    totalShadcnComponents: Object.keys(mappings).length,
    totalMappings: Object.values(mappings).reduce((sum, m) => sum + m.aibosClasses.count, 0),
    totalComponentParts: Object.values(mappings).reduce((sum, m) => sum + Object.keys(m.parts || {}).length, 0),
    coverage: `${Math.round((Object.keys(mappings).length / shadcnUIComponents.length) * 100)}%`
  },
  mappings,
  aibosToShadcn,
  componentParts,
  integration: {
    quickStart: {
      step1: 'Install shadcn/ui: npx shadcn-ui@latest init',
      step2: 'Import AIBOS CSS: import "@aibos/design-system/css"',
      step3: 'Use mapping to apply AIBOS classes to shadcn components',
      step4: 'Reference this mapping file for component-specific classes'
    },
    bestPractices: [
      'Always use semantic AIBOS classes, never arbitrary Tailwind values',
      'Combine AIBOS classes with shadcn component props when needed',
      'Use na-field wrapper for all form inputs',
      'Use na-metadata for labels and na-data for values',
      'Apply na-card to container components (Card, Dialog, etc.)',
      'Use typography classes (na-h1 through na-h6) for all headings',
      'Map component parts (CardHeader, CardTitle, etc.) to specific AIBOS classes'
    ],
    ideIntegration: {
      vsCode: [
        'Import shadcn-map: import shadcnMap from "@aibos/design-system/shadcn-map"',
        'Use IntelliSense: shadcnMap.mappings.button.aibosClasses.base',
        'Autocomplete: Type "shadcnMap.mappings." to see all components',
        'Type safety: Install @aibos/design-system/types for full TypeScript support'
      ],
      webstorm: [
        'Import shadcn-map: import shadcnMap from "@aibos/design-system/shadcn-map"',
        'Use code completion: shadcnMap.mappings[component].aibosClasses',
        'Navigate to definition: Cmd+Click on component names',
        'TypeScript: Full type checking with included .d.ts files'
      ],
      typescript: [
        'Import types: import type { ShadcnMap, ShadcnComponentMapping } from "@aibos/design-system/types"',
        'Type-safe access: const buttonMapping: ShadcnComponentMapping = shadcnMap.mappings.button',
        'Helper types: Use AIBOSClassesForComponent<"button"> for type inference',
        'JSON import: import shadcnMap from "@aibos/design-system/shadcn-map"'
      ]
    }
  }
};

// Write shadcn mapping (minify in production)
const isProduction = process.env.NODE_ENV === 'production';
writeFileSync(
  join(distDir, 'shadcn-map.json'),
  isProduction ? JSON.stringify(shadcnMap) : JSON.stringify(shadcnMap, null, 2),
  'utf-8'
);

console.log('✅ shadcn/ui mapping auto-generated: dist/shadcn-map.json');
console.log(`   - ${Object.keys(mappings).length} shadcn components mapped`);
console.log(`   - ${aibosClasses.length} AIBOS classes available`);
console.log(`   - ${shadcnMap.stats.totalMappings} total mappings generated`);
console.log(`   - ${shadcnMap.stats.totalComponentParts} component parts mapped`);
console.log(`   - Coverage: ${shadcnMap.stats.coverage}`);
