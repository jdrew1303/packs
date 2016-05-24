# packs <small>pack surveys :v:</small>

Packs is a tool to build, configure, test and deploy surveys.

### Installation
```
$ npm i -g packs
```

### Static survey generator
```javascript
import { run } from 'packs'
import survey from './survey'
import modules from './modules'

run(survey, modules)
```
```
$ packs serve
```
