# unWebExtension

Tool for making WebExtension.

## Installation

```
# Compile executable
deno task compile
deno compile --allow-read --allow-write --allow-net=storage.googleapis.com,blog.mozilla.org,raw.githubusercontent.com --output=unwebext ./src/main.ts

# Install globally
deno task install
deno install --allow-read --allow-write --allow-net=storage.googleapis.com,blog.mozilla.org,raw.githubusercontent.com --name=unwebext ./src/main.ts
```

## Usage

```
# Showing help.
unwebext -h
unwebext --help

# Creating without options.
unwebext -b [extensionName]
unwebext --create-background [extensionName]

# Creating with background files.
unwebext -b [extensionName]
unwebext --create-background [extensionName]

# Creating with content scripts files.
unwebext -c [extensionName]
unwebext --create-content-scripts [extensionName]

# Creating with options files.
unwebext -o [extensionName]
unwebext --create-options [extensionName]

# Creating with popup files.
unwebext -p [extensionName]
unwebext --create-popup [extensionName]

# Creating on custom directory. (default: './')
unwebext -d <directory> [extensionName]
unwebext --directory=<directory> [extensionName]
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
