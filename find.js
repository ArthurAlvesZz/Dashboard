const { execSync } = require('child_process');
console.log(execSync('find . -name "DashboardView.tsx"').toString());
