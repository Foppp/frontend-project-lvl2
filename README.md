[![Maintainability](https://api.codeclimate.com/v1/badges/099d6254d37dbb3e28a2/maintainability)](https://codeclimate.com/github/Foppp/frontend-project-lvl2/maintainability)   [![Test Coverage](https://api.codeclimate.com/v1/badges/099d6254d37dbb3e28a2/test_coverage)](https://codeclimate.com/github/Foppp/frontend-project-lvl2/test_coverage)   [![Node CI](https://github.com/Foppp/frontend-project-lvl2/workflows/Node%20CI/badge.svg)](https://github.com/Foppp/frontend-project-lvl2/actions)

### Hexlet tests and linter status:
[![Actions Status](https://github.com/Foppp/frontend-project-lvl2/workflows/hexlet-check/badge.svg)](https://github.com/Foppp/frontend-project-lvl2/actions?query=workflow%3Ahexlet-check)

#### DESCRIPTION

## CLI Utility that compares two configuration files (YAML / JSON) and shows a difference in comfortable formates. The main goal was to learn how to work with tree data structures and recursive algorithms.

* Working with the file system with Node.js
* Working with trees and tree recursion
* Connection and working with third-party libraries: Commander, lodash
* Automated testing (TDD): Jest
* Working with command line parameters
* Reading files, parsing incoming data


#### HELP
```
$ gendiff -h

   Usage: gendiff [options] <filepath1> <filepath2>

   Compares two configuration files and shows difference.

   Options:
      -V, --version        output the version number
      -f, --format [type]  output format (default: "stylish")
      -h, --help           display help for command
```

#### CLI USE
##### Simple structure
```
$ gendiff filepath1.json filepath2.json

{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}
```
##### Nested Structure
```
$ gendiff filepath1.json filepath2.json

{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: null
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
        setting6: {
            doge: {
              - wow: 
              + wow: so much
            }
            key: value
          + ops: vops
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
  + group3: {
        deep: {
            id: {
                number: 45
            }
        }
        fee: 100500
    }
}
```
##### Plain Format 
```
$ gendiff --format plain filepath1.json filepath2.json

Property 'common.follow' was added with value: false
Property 'common.setting2' was removed
Property 'common.setting3' was updated. From true to null
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with value: [complex value]
Property 'common.setting6.doge.wow' was updated. From '' to 'so much'
Property 'common.setting6.ops' was added with value: 'vops'
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group1.nest' was updated. From [complex value] to 'str'
Property 'group2' was removed
Property 'group3' was added with value: [complex value]
```

#### Supported formats: JSON, YML
#### Formatters : stylish (default) , plain, json

### EXAMPLES :

##### Simple .json file example

[![asciicast](https://asciinema.org/a/0sTTZYnxy7zxpQxJ4A8MNwO74.svg)](https://asciinema.org/a/0sTTZYnxy7zxpQxJ4A8MNwO74)

##### Simple .yaml file example

[![asciicast](https://asciinema.org/a/qnvtnPCgCbCbNCdIzqMl81YFi.svg)](https://asciinema.org/a/qnvtnPCgCbCbNCdIzqMl81YFi)

##### Nested .json and .yaml files example

[![asciicast](https://asciinema.org/a/qqdqbo6NJD5ahVVdSBB410E7D.svg)](https://asciinema.org/a/qqdqbo6NJD5ahVVdSBB410E7D)

##### Nested .json and .yaml files with plain format example

[![asciicast](https://asciinema.org/a/WGrE5e3GknX2y3eQYnIubc2g2.svg)](https://asciinema.org/a/WGrE5e3GknX2y3eQYnIubc2g2)

##### Nested .json and .yaml files with json format example

[![asciicast](https://asciinema.org/a/3fkwLXmoY6o6I5fZNIRDdTm7d.svg)](https://asciinema.org/a/3fkwLXmoY6o6I5fZNIRDdTm7d)


#### INSTALLATION
```
$ make install
```

#### LINK
```
$ make link
```

