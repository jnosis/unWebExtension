export const configTemplate = () => {
  return [GITIGNORE, TSCONFIG];
};

const GITIGNORE = `npm-debug.log
node_modules/
dist/
tmp/
*.zip`;

const TSCONFIG = `{
  "compilerOptions": {
    "target": "es2020",
    "module": "es2020",
    "outDir": "./dist",
    "rootDir": "./src",
    "removeComments": true,
    "noEmitOnError": true,
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedIndexedAccess": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  }
}
`;
