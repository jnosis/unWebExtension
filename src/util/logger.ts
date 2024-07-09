import { colors } from '@cliffy/ansi/colors';
import VERSION from '../version.ts';

const bold = colors.bold;
const blueText = bold.blue;
const greenText = bold.green;
const yellowText = bold.yellow;

function start(name?: string) {
  console.log(
    blueText(`Create${name ? ` ${toUpperCaseFirstLetter(name)}` : ''}...`),
  );
}

function end(time: number) {
  console.log(
    `unWebExtension ${VERSION} created ${
      greenText('successfully')
    } in ${time} ms`,
  );
}

function create(file: string, path: string) {
  console.log(`  create ${greenText(file)} to ${yellowText(path)}`);
}

function make(root: string, name: string) {
  console.log(
    `  make ${
      bold(root ? `${root}${name ? `/${name}` : ''}` : name)
    } directory`,
  );
}

function toUpperCaseFirstLetter(name: string) {
  return name.replace(/\b[a-z]/, (letter) => letter.toUpperCase());
}

const logger = { start, create, make, end };
export default logger;
