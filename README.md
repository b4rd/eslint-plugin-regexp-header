# eslint-plugin-regexp-header

Checks the header of a source file against a header that contains a regular expression for each line of the source header

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-regexp-header`:

```
$ npm install eslint-plugin-regexp-header --save-dev
```


## Usage

Add `regexp-header` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "regexp-header"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "regexp-header/regexp-header": [
          2, 
          {
            "headerFile": "./resources/copyright.txt"
          }
        ]
    }
}
```

## Supported Rules

* Fill in provided rules here





