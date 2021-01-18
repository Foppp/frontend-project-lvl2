[![Maintainability](https://api.codeclimate.com/v1/badges/099d6254d37dbb3e28a2/maintainability)](https://codeclimate.com/github/Foppp/frontend-project-lvl2/maintainability)   [![Test Coverage](https://api.codeclimate.com/v1/badges/099d6254d37dbb3e28a2/test_coverage)](https://codeclimate.com/github/Foppp/frontend-project-lvl2/test_coverage)   [![Node CI](https://github.com/Foppp/frontend-project-lvl2/workflows/Node%20CI/badge.svg)](https://github.com/Foppp/frontend-project-lvl2/actions)

### Hexlet tests and linter status:
[![Actions Status](https://github.com/Foppp/frontend-project-lvl2/workflows/hexlet-check/badge.svg)](https://github.com/Foppp/frontend-project-lvl2/actions?query=workflow%3Ahexlet-check)

#### DESCRIPTION

Compares two configuration files and shows a difference.
#### INSTALLATION
```
   $ make install
```

#### LINK
```
   $ make link
```

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

##### Supported formats: JSON, YML
##### Formatters : stylish (default) , plain, json

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
