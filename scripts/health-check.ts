#!/usr/bin/env bun

/**
 * Health Check Script
 * 
 * This script validates that all TypeScript scripts are properly configured
 * and can compile without errors. It performs the following checks:
 * 
 * 1. TypeScript compilation check
 * 2. Environment variable validation
 * 3. Script syntax validation
 * 4. Dependency availability check
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

// ============================================================================
// Type Definitions
// ============================================================================

interface HealthCheckResult {
  name: string;
  status: 'pass' | 'fail' | 'warn';
  message: string;
  details?: string;
}

interface HealthCheckReport {
  timestamp: string;
  overall: 'healthy' | 'unhealthy' | 'degraded';
  checks: HealthCheckResult[];
}

// ============================================================================
// Health Check Functions
// ============================================================================

function checkTypeScriptCompilation(): HealthCheckResult {
  try {
    console.log('🔍 Checking TypeScript compilation...');
    
    // Run TypeScript compiler in no-emit mode
    execSync('bun run type-check', {
      stdio: 'pipe',
      encoding: 'utf-8',
    });

    return {
      name: 'TypeScript Compilation',
      status: 'pass',
      message: 'All TypeScript files compile successfully',
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return {
      name: 'TypeScript Compilation',
      status: 'fail',
      message: 'TypeScript compilation failed',
      details: errorMessage,
    };
  }
}

function checkScriptFiles(): HealthCheckResult {
  try {
    console.log('🔍 Checking script files...');
    
    const scriptsDir = path.join(process.cwd(), 'scripts');
    const requiredScripts = ['wakatime.ts', 'news.ts', 'health-check.ts'];
    const missingScripts: string[] = [];

    for (const script of requiredScripts) {
      const scriptPath = path.join(scriptsDir, script);
      if (!fs.existsSync(scriptPath)) {
        missingScripts.push(script);
      }
    }

    if (missingScripts.length > 0) {
      return {
        name: 'Script Files',
        status: 'fail',
        message: 'Required script files are missing',
        details: `Missing: ${missingScripts.join(', ')}`,
      };
    }

    return {
      name: 'Script Files',
      status: 'pass',
      message: 'All required script files are present',
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return {
      name: 'Script Files',
      status: 'fail',
      message: 'Failed to check script files',
      details: errorMessage,
    };
  }
}

function checkConfiguration(): HealthCheckResult {
  try {
    console.log('🔍 Checking configuration files...');
    
    const requiredConfigs = [
      { file: 'tsconfig.json', name: 'TypeScript config' },
      { file: 'package.json', name: 'Package config' },
    ];
    const missingConfigs: string[] = [];

    for (const config of requiredConfigs) {
      const configPath = path.join(process.cwd(), config.file);
      if (!fs.existsSync(configPath)) {
        missingConfigs.push(config.name);
      }
    }

    if (missingConfigs.length > 0) {
      return {
        name: 'Configuration Files',
        status: 'fail',
        message: 'Required configuration files are missing',
        details: `Missing: ${missingConfigs.join(', ')}`,
      };
    }

    return {
      name: 'Configuration Files',
      status: 'pass',
      message: 'All required configuration files are present',
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return {
      name: 'Configuration Files',
      status: 'fail',
      message: 'Failed to check configuration files',
      details: errorMessage,
    };
  }
}

function checkDependencies(): HealthCheckResult {
  try {
    console.log('🔍 Checking dependencies...');
    
    const packageJsonPath = path.join(process.cwd(), 'package.json');
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
    
    const allDeps = {
      ...packageJson.dependencies,
      ...packageJson.devDependencies,
    };

    const requiredDeps = ['axios', 'mongodb', 'qs', 'typescript', 'bun-types'];
    const missingDeps: string[] = [];

    for (const dep of requiredDeps) {
      if (!(dep in allDeps)) {
        missingDeps.push(dep);
      }
    }

    if (missingDeps.length > 0) {
      return {
        name: 'Dependencies',
        status: 'fail',
        message: 'Required dependencies are missing from package.json',
        details: `Missing: ${missingDeps.join(', ')}`,
      };
    }

    return {
      name: 'Dependencies',
      status: 'pass',
      message: 'All required dependencies are declared',
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return {
      name: 'Dependencies',
      status: 'fail',
      message: 'Failed to check dependencies',
      details: errorMessage,
    };
  }
}

function checkEnvironmentVariables(): HealthCheckResult {
  console.log('🔍 Checking environment configuration...');
  
  // Note: We don't check if the actual values exist since this is a health check
  // that should run in CI without real secrets. We just validate the structure.
  
  const requiredEnvVars = [
    'MONGODB_URI',
    'WAKATIME_CLIENT_ID',
    'WAKATIME_CLIENT_SECRET',
    'WAKATIME_REDIRECT_URI',
    'URL', // For news script
  ];

  const warnings: string[] = [];

  for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
      warnings.push(envVar);
    }
  }

  if (warnings.length === requiredEnvVars.length) {
    // All env vars missing - this is expected in CI health checks
    return {
      name: 'Environment Variables',
      status: 'warn',
      message: 'Environment variables not set (expected in CI)',
      details: 'Scripts require runtime environment variables',
    };
  } else if (warnings.length > 0) {
    return {
      name: 'Environment Variables',
      status: 'warn',
      message: 'Some environment variables are not set',
      details: `Missing: ${warnings.join(', ')}`,
    };
  }

  return {
    name: 'Environment Variables',
    status: 'pass',
    message: 'All environment variables are configured',
  };
}

// ============================================================================
// Report Generation
// ============================================================================

function generateReport(checks: HealthCheckResult[]): HealthCheckReport {
  const hasFailures = checks.some((check) => check.status === 'fail');
  const hasWarnings = checks.some((check) => check.status === 'warn');

  let overall: 'healthy' | 'unhealthy' | 'degraded';
  if (hasFailures) {
    overall = 'unhealthy';
  } else if (hasWarnings) {
    overall = 'degraded';
  } else {
    overall = 'healthy';
  }

  return {
    timestamp: new Date().toISOString(),
    overall,
    checks,
  };
}

function printReport(report: HealthCheckReport): void {
  console.log('\n' + '='.repeat(60));
  console.log('HEALTH CHECK REPORT');
  console.log('='.repeat(60));
  console.log(`Timestamp: ${report.timestamp}`);
  console.log(`Overall Status: ${report.overall.toUpperCase()}`);
  console.log('='.repeat(60));

  for (const check of report.checks) {
    const icon =
      check.status === 'pass' ? '✅' : check.status === 'warn' ? '⚠️' : '❌';
    console.log(`\n${icon} ${check.name}`);
    console.log(`   Status: ${check.status.toUpperCase()}`);
    console.log(`   Message: ${check.message}`);
    if (check.details) {
      console.log(`   Details: ${check.details}`);
    }
  }

  console.log('\n' + '='.repeat(60));
}

function saveReportToFile(report: HealthCheckReport): void {
  const reportDir = path.join(process.cwd(), '.health');
  if (!fs.existsSync(reportDir)) {
    fs.mkdirSync(reportDir, { recursive: true });
  }

  const reportPath = path.join(reportDir, 'latest.json');
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  console.log(`\n📄 Report saved to: ${reportPath}`);
}

// ============================================================================
// Main Function
// ============================================================================

async function main(): Promise<void> {
  console.log('🏥 Starting Health Check...\n');

  const checks: HealthCheckResult[] = [
    checkConfiguration(),
    checkScriptFiles(),
    checkDependencies(),
    checkTypeScriptCompilation(),
    checkEnvironmentVariables(),
  ];

  const report = generateReport(checks);
  printReport(report);
  saveReportToFile(report);

  // Exit with appropriate code
  if (report.overall === 'unhealthy') {
    console.log('\n❌ Health check FAILED');
    process.exit(1);
  } else if (report.overall === 'degraded') {
    console.log('\n⚠️  Health check completed with WARNINGS');
    process.exit(0); // Don't fail CI on warnings
  } else {
    console.log('\n✅ Health check PASSED');
    process.exit(0);
  }
}

// Run the health check
main();
