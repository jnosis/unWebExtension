# unWebExtension

[![JSR](https://jsr.io/badges/@unface/unwebext)](https://jsr.io/@unface/unwebext) [![JSR Score](https://jsr.io/badges/@unface/unwebext/score)](https://jsr.io/@unface/unwebext/score)

Tool for making WebExtension.

## Installation

```
# Compile executable
deno task compile
deno compile --allow-read --allow-write --allow-net=storage.googleapis.com,blog.mozilla.org,raw.githubusercontent.com -r --output=unwebext jsr:@unface/unwebext

# Install globally
deno task install
deno install --allow-read --allow-write --allow-net=storage.googleapis.com,blog.mozilla.org,raw.githubusercontent.com -r --name=unwebext jsr:@unface/unwebext
```

## Usage

```
# Showing help.
unwebext -h
unwebext --help

# Run directly from github.
deno run --allow-read --allow-write -r jsr:@unface/unwebext [YOUR COMMAND AND OPTIONS]
```

Create project:

```
# Showing help.
unwebext create -h
unwebext create --help

# Creating without options.
unwebext create -b [extensionName:string]
unwebext create --create-background [extensionName:string]

# Creating with background files.
unwebext create -b [extensionName:string]
unwebext create --create-background [extensionName:string]

# Creating with content scripts files.
unwebext create -c [extensionName:string]
unwebext create --create-content-scripts [extensionName:string]

# Creating with options files.
unwebext create -o [extensionName:string]
unwebext create --create-options [extensionName:string]

# Creating with popup files.
unwebext create -p [extensionName:string]
unwebext create --create-popup [extensionName:string]

# Creating on custom directory. (default: './')
unwebext create -d <directory:file> [extensionName:string]
unwebext create --directory=<directory:file> [extensionName:string]
```

## ChangeLog

- 1.0.0: Publish to [jsr.io](https://jsr.io/@unface/unwebext)
- 0.1.1: Add background, options, UI template and image creation
- 0.1.0: initial release

## Known Issues

- Missing changelog.ts

## TODO

- Update content script template
- Add feature to add files to an existing project
- Add automatically permissions by CreateOptions
- Support side panel
- Support custom source directory
- Add testing
- and more...
