# unWebExtension

Tool for making WebExtension.

## Installation

```
# Compile executable
deno task compile
deno compile --allow-read --allow-write -r --output=unwebext https://raw.githubusercontent.com/jnosis/unWebExtension/master/src/main.ts

# Install globally
deno task install
deno install --allow-read --allow-write -r --name=unwebext https://raw.githubusercontent.com/jnosis/unWebExtension/master/src/main.ts
```

## Usage

```
# Showing help.
unwebext -h
unwebext --help

# Creating without options.
unwebext -b [extensionName:string]
unwebext --create-background [extensionName:string]

# Creating with background files.
unwebext -b [extensionName:string]
unwebext --create-background [extensionName:string]

# Creating with content scripts files.
unwebext -c [extensionName:string]
unwebext --create-content-scripts [extensionName:string]

# Creating with options files.
unwebext -o [extensionName:string]
unwebext --create-options [extensionName:string]

# Creating with popup files.
unwebext -p [extensionName:string]
unwebext --create-popup [extensionName:string]

# Creating on custom directory. (default: './')
unwebext -d <directory:file> [extensionName:string]
unwebext --directory=<directory:file> [extensionName:string]

# Run directly from github
deno run --allow-read --allow-write -r https://raw.githubusercontent.com/jnosis/unWebExtension/master/src/main.ts
```

## ChangeLog

- 0.1.0: initial release

## Known Issues

-

## TODO

- Update background and content script template
- Add images creation
- Upload to deno.land
- Add automatically permissions by CreateOptions
- Support side panel
- Support custom source directory
- Add testing
- and more...
