/**
 * Filter Engine: Translator between CLI and Table
 * 
 * This is the missing link that makes the CLI control the table.
 * It parses tokens from the CLI parser and applies them to row data.
 * 
 * See docs/CLI_FILTER_INTEGRATION.md for usage examples.
 */

export interface FilterToken {
  type: 'key-value' | 'operator' | 'raw';
  key?: string;
  operator?: string;
  value?: string;
  text?: string;
}

export interface FilterContext {
  tokens: FilterToken[];
  matchCount: number;
  totalCount: number;
}

export interface AggregateMetrics {
  count: number;
  revenue: { total: number; average: number };
  health: { total: number; average: number; distribution: Record<string, number> };
  status: Record<string, number>;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  description: string;
}

/**
 * FilterEngine
 * 
 * Accepts parsed CLI tokens and applies them to a dataset.
 * Handles:
 * - Enum values (status:healthy)
 * - Numeric operators (revenue>100000, health<70)
 * - String matching (owner:"A. Patel")
 * - AND logic (all filters must match)
 */
export class FilterEngine {
  /**
   * Parse CLI input into filter tokens
   * 
   * Converts raw CLI text like "status:healthy owner:chen revenue>100000"
   * into structured FilterToken objects.
   */
  parseFilters(input: string): FilterToken[] {
    if (!input.trim()) return [];

    const tokens: FilterToken[] = [];
    
    // Match patterns like "key:value", "key>value", "key<value", etc.
    const regex = /([a-z-]+)([:<>=!]*)"?([^"\s]+)"?/gi;
    let match;

    while ((match = regex.exec(input)) !== null) {
      const key = match[1].toLowerCase();
      const operator = match[2] || '=';
      const value = match[3];

      tokens.push({
        type: 'key-value',
        key,
        operator,
        value,
        text: match[0],
      });
    }

    return tokens;
  }

  /**
   * Apply parsed filters to rows
   * 
   * Returns only rows where ALL filters match (AND logic).
   * Handles type coercion (numeric, date, enum).
   */
  applyFilters(
    rows: any[],
    tokens: FilterToken[],
    fieldMap?: Record<string, string>
  ): any[] {
    if (tokens.length === 0) return rows;

    return rows.filter(row => {
      return tokens.every(token => {
        if (token.type !== 'key-value') return true;

        const { key, operator, value } = token;
        if (!key || !value) return true;

        // Map CLI key to actual data field
        const fieldName = fieldMap?.[key] || key;
        const rowValue = row[fieldName] || row.dataset?.[fieldName];

        // Type checking and comparison
        return this.compareValues(rowValue, operator || '=', value);
      });
    });
  }

  /**
   * Compare row value against filter criteria
   * 
   * Handles:
   * - String equality: "healthy" === "healthy"
   * - String contains: "patel".includes("tel")
   * - Numeric comparison: 100000 > 50000
   * - Date comparison: "2024-01-01" > "2023-12-31"
   */
  private compareValues(
    rowValue: any,
    operator: string,
    filterValue: string
  ): boolean {
    // Normalize row value
    const normalizedRow = String(rowValue).toLowerCase().trim();
    const normalizedFilter = filterValue.toLowerCase().trim();

    // Handle numeric operators
    if (['>','<','>=','<=','=','!='].includes(operator)) {
      const rowNum = parseFloat(normalizedRow);
      const filterNum = parseFloat(normalizedFilter);

      if (!isNaN(rowNum) && !isNaN(filterNum)) {
        switch (operator) {
          case '>': return rowNum > filterNum;
          case '<': return rowNum < filterNum;
          case '>=': return rowNum >= filterNum;
          case '<=': return rowNum <= filterNum;
          case '=': return rowNum === filterNum;
          case '!=': return rowNum !== filterNum;
        }
      }
    }

    // Handle string matching (equality by default, or contains)
    if (operator === '=' || operator === ':') {
      return normalizedRow === normalizedFilter || normalizedRow.includes(normalizedFilter);
    }

    if (operator === '!=') {
      return normalizedRow !== normalizedFilter;
    }

    return false;
  }

  /**
   * Get filter statistics
   */
  getStats(rows: any[], matchedRows: any[]): FilterContext {
    return {
      tokens: [],
      matchCount: matchedRows.length,
      totalCount: rows.length,
    };
  }

  /**
   * Generate human-readable filter description
   * 
   * Converts "status:healthy revenue>100000" into
   * "Status is healthy AND Revenue greater than 100000"
   */
  describeFilters(tokens: FilterToken[]): string {
    return tokens
      .filter(t => t.type === 'key-value' && t.key && t.value)
      .map(t => {
        const opSymbol = {
          ':': 'is',
          '=': 'equals',
          '>': 'greater than',
          '<': 'less than',
          '>=': 'at least',
          '<=': 'at most',
          '!=': 'not equals',
        }[t.operator || '='] || 'is';

        return `${t.key} ${opSymbol} ${t.value}`;
      })
      .join(' AND ');
  }

  /**
   * Calculate aggregate metrics from filtered rows
   * 
   * Provides high-level insights:
   * - Total and average revenue
   * - Average health score
   * - Status distribution
   * - Risk assessment
   * 
   * This is the "HUD" data for the Decision Engine.
   */
  aggregateMetrics(rows: any[]): AggregateMetrics {
    if (rows.length === 0) {
      return {
        count: 0,
        revenue: { total: 0, average: 0 },
        health: { total: 0, average: 0, distribution: {} },
        status: {},
        riskLevel: 'low',
        description: 'No data to analyze',
      };
    }

    // Revenue metrics
    const revenues = rows
      .map(row => parseFloat(row.dataset?.revenue || row.revenue || 0))
      .filter(v => !isNaN(v));
    const totalRevenue = revenues.reduce((sum, v) => sum + v, 0);
    const avgRevenue = revenues.length > 0 ? totalRevenue / revenues.length : 0;

    // Health metrics
    const healths = rows
      .map(row => parseFloat(row.dataset?.health || row.health || 0))
      .filter(v => !isNaN(v));
    const totalHealth = healths.reduce((sum, v) => sum + v, 0);
    const avgHealth = healths.length > 0 ? totalHealth / healths.length : 0;

    // Status distribution
    const statusCounts: Record<string, number> = {};
    rows.forEach(row => {
      const status = (row.dataset?.status || row.status || 'unknown').toLowerCase();
      statusCounts[status] = (statusCounts[status] || 0) + 1;
    });

    // Health distribution (buckets)
    const healthBuckets: Record<string, number> = {
      'critical': 0,    // < 40
      'poor': 0,        // 40-60
      'fair': 0,        // 60-80
      'good': 0,        // 80-95
      'excellent': 0,   // 95+
    };
    healths.forEach(h => {
      if (h < 40) healthBuckets.critical++;
      else if (h < 60) healthBuckets.poor++;
      else if (h < 80) healthBuckets.fair++;
      else if (h < 95) healthBuckets.good++;
      else healthBuckets.excellent++;
    });

    // Risk assessment
    const watchCount = statusCounts['watch'] || 0;
    const criticalCount = healthBuckets.critical;
    const riskScore = (watchCount * 0.5) + (criticalCount * 0.3);

    let riskLevel: 'low' | 'medium' | 'high' | 'critical' = 'low';
    if (riskScore >= 2) riskLevel = 'critical';
    else if (riskScore >= 1.5) riskLevel = 'high';
    else if (riskScore >= 0.75) riskLevel = 'medium';

    // Trend indicator
    const trend = avgRevenue > 0 ? (avgHealth / 100) > 0.8 ? '↗' : '↘' : '→';

    return {
      count: rows.length,
      revenue: { total: totalRevenue, average: avgRevenue },
      health: { total: totalHealth, average: avgHealth, distribution: healthBuckets },
      status: statusCounts,
      riskLevel,
      description: `${rows.length} accounts analyzed. ${trend} ${avgHealth.toFixed(0)}% avg health. ${riskLevel === 'low' ? '✓ Clean' : `⚠ ${riskLevel.toUpperCase()}`}`,
    };
  }
}
