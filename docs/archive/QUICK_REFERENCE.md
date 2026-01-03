# 🎯 CLI Reactive HUD - Quick Reference Card

## Filter Syntax Cheat Sheet

### Basic Filters
```
status:healthy              Single enum value
owner:patel                String equality
revenue>100000             Numeric comparison
health>=80                 Greater or equal
```

### Operators Reference
| Op | Meaning | Type | Example |
|----|---------|------|---------|
| `:` | Equals (default) | String/Enum | `status:healthy` |
| `=` | Equals | Any | `status=healthy` |
| `!=` | Not equal | Any | `status!=error` |
| `>` | Greater than | Number | `revenue>100000` |
| `<` | Less than | Number | `health<50` |
| `>=` | Greater/equal | Number | `health>=80` |
| `<=` | Less/equal | Number | `revenue<=250000` |

### Compound Filters (AND Logic)
```
status:healthy revenue>100000
→ Accounts with status="healthy" AND revenue > $100,000

status:healthy revenue>100000 health>=80
→ Accounts with ALL three conditions

status:watch owner:chen
→ Accounts with status="watch" AND owner="chen"
```

---

## Available Filter Keys (25+)

### Account Info
- `account` - Account name
- `status` - Status (healthy, watch, error)
- `owner` - Owner name
- `priority` - Priority level

### Financial
- `revenue` - Annual revenue ($)
- `monthlyrev` - Monthly revenue
- `growth` - Growth rate (%)

### Health & Risk
- `health` - Health score (0-100)
- `score` - Overall score
- `riskLevel` - Risk classification

### Operational
- `region` - Geographic region
- `product` - Product category
- `team` - Assigned team
- `vol` - Volatility (low/medium/high)

### Status Categories
- `watch` - Watch list status
- `error` - Error flag status
- `critical` - Critical alerts

### Metrics
- `customMetric` - Custom data field
- `tags` - Tag classification

---

## HUD Metrics Explained

### 📊 Governed Revenue
```
Total:   Sum of all filtered account revenues
         Example: $272,520 for 3 accounts

Average: Total ÷ count of filtered accounts
         Example: $136,260 per account
```

### 💚 Avg Health
```
Score:   Average health score (0-100%)
         Example: 75%

Trend:   ↗ Trending up (avg health > 80%)
         → Stable (50-80% health)
         ↘ Trending down (avg health < 50%)

Status:  Distribution of status values
         Example: "3 ↔ 1 accounts" = 3 healthy, 1 watch
```

### ⚠️ Risk Level
```
LOW:      Green badge - No watch/error accounts
MEDIUM:   Yellow badge - Some risk indicators
HIGH:     Orange badge - Multiple risk factors
CRITICAL: Red badge - Serious risk situation

Calculation:
  watchCount = accounts with status='watch'
  criticalCount = accounts with health < 40
  riskScore = (watch × 0.5) + (critical × 0.3)
```

### 📌 Accounts
```
Count:       Number of matching records
Description: Summary text
             "6 accounts analyzed. 75% avg health. ✓ Clean"
```

---

## Keyboard Navigation

### In CLI Input
| Key | Action |
|-----|--------|
| Type | Enter filter query |
| Backspace | Delete character |
| Ctrl+A | Select all |

### In Autocomplete Menu (when visible)
| Key | Action |
|-----|--------|
| ↓ | Next suggestion |
| ↑ | Previous suggestion |
| Enter | Insert selected suggestion |
| Escape | Close menu |
| Backspace | Delete & re-suggest |

---

## Test Scenarios

### Scenario 1: Basic Filter
**Query**: `status:healthy`
- Shows: 3 healthy accounts
- Revenue: $272,520 total, $90,840 average
- Health: 79% average with trend
- Risk: LOW (all healthy)
- Count: 3 accounts

### Scenario 2: Financial Filter
**Query**: `revenue>100000`
- Shows: 4 accounts with revenue > $100k
- Revenue: Very high totals
- Health: Mixed scores
- Risk: Depends on health

### Scenario 3: High-Risk
**Query**: `health<50`
- Shows: 2 high-risk accounts
- Revenue: Lower revenues
- Health: 39% average
- Risk: CRITICAL (low health)

### Scenario 4: Combined
**Query**: `status:healthy revenue>100000`
- Shows: Only 2 healthy accounts with high revenue
- Most optimal accounts by both metrics
- Health: 88% and 75%
- Risk: LOW

### Scenario 5: No Matches
**Query**: `status:error health>90`
- Shows: Empty state message
- HUD: Reset to defaults
- Table: No rows visible

---

## Integration Checklist

- [ ] Copy `lib/` folder to your project
- [ ] Add CLI imports to your module: `import { FilterEngine } from './lib/cli-filter-engine.ts'`
- [ ] Create filter input element with id `cli-input`
- [ ] Create HUD card elements (revenue, health, risk, count)
- [ ] Wire filter input to `updateTable()` function
- [ ] Bind `aggregateMetrics()` results to HUD DOM elements
- [ ] Test with sample data (minimum 6 rows recommended)
- [ ] Customize filter commands in `COMMAND_SCHEMA`
- [ ] Add custom metrics to `aggregateMetrics()`
- [ ] Style HUD cards with your brand colors

---

## Common Issues & Solutions

### Issue: Autocomplete not appearing
**Solution**: Make sure `li-cli-autocomplete.ts` is imported and autocomplete div exists in HTML

### Issue: Metrics showing $0 or 0%
**Solution**: Check that data attributes match command keys exactly (e.g., `data-revenue`, `data-health`)

### Issue: Filter not working
**Solution**: Verify command key exists in `COMMAND_SCHEMA` in `cli-commands.ts`

### Issue: Type errors in TypeScript
**Solution**: Ensure `ValidCommand` type is imported and used for all filter key references

### Issue: HUD not updating
**Solution**: Call `aggregateMetrics()` after `applyFilters()`, then update DOM elements

---

## Performance Tips

### For Small Datasets (< 100 rows)
- No optimization needed
- All operations < 5ms
- Real-time filtering safe

### For Medium Datasets (100-1000 rows)
- Consider debouncing input: `debounce(updateTable, 100ms)`
- Batch DOM updates
- Pre-calculate common metrics

### For Large Datasets (1000+ rows)
- Move filtering to server
- Use pagination (load first 100 rows)
- Cache aggregations
- Use Web Workers for calculations

---

## Customization Guide

### Add New Filter Command
```typescript
// In lib/cli-commands.ts
export const COMMAND_SCHEMA: Record<ValidCommand, CommandSchema> = {
  // ...existing...
  newfilter: {
    description: 'My custom filter',
    type: 'enum',
    values: ['option1', 'option2'],
    operators: ['=', '!=']
  }
}

// Add to ValidCommand type
type ValidCommand = '...' | 'newfilter'

// In HTML table
<tr data-newfilter="option1">
```

### Add New HUD Metric
```javascript
// In FilterEngine.aggregateMetrics()
return {
  ...existing,
  customMetric: {
    value: calculateCustomValue(rows),
    label: 'Custom Metric'
  }
}

// In HTML
<div class="hud-card">
  <div class="hud-card-label">🎯 Custom</div>
  <div class="hud-card-value" id="hud-custom">0</div>
</div>

// In updateTable()
hudCustom.textContent = metrics.customMetric.value;
```

---

## Browser Support

- ✅ Chrome/Edge (latest 2 versions)
- ✅ Firefox (latest 2 versions)
- ✅ Safari (latest 2 versions)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

**Requires**:
- ES2020+ support (optional chaining, nullish coalescing)
- CSS Grid & Flexbox
- Intl.NumberFormat API

---

## Related Documentation

- 📖 [Complete Guide](CLI_REACTIVE_HUD_COMPLETE_GUIDE.md)
- 🔧 [Integration Guide](INTEGRATION_GUIDE.md)
- 📋 [Command Reference](CLI_FILTER_COMMANDS.md)
- 🤖 [Autocomplete Deep Dive](CLI_AUTOCOMPLETE_ENGINE.md)
- ✅ [Status Report](CLI_REACTIVE_HUD_FINAL_STATUS.md)

---

**Version**: 1.0  
**Last Updated**: December 29, 2025  
**Status**: Production Ready ✅
