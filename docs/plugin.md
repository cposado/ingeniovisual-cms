# Strapi Build System
Pasos deployment with github actions / ftp 

## Generar modelo exclusivo para el plugin
[CLI generate model](https://strapi.io/documentation/developer-docs/latest/developer-resources/cli/CLI.html#strapi-generate-model)
```
yarn strapi generate:model <name> --plugin <plugin>
yarn strapi generate:model deployment --plugin build-plugin
```

## Ocultar Content Type del menu
https://stackoverflow.com/questions/65846609/strapi-hide-content-type

- COPY: node_modules\strapi-plugin-content-manager\services\data-mapper.js
- TO: extensions\content-manager\services\data-mapper.js

```js
// add plugins::[plugin-name].[content-type]
const HIDDEN_CONTENT_TYPES = [
  'plugins::upload.file',
  'plugins::users-permissions.permission',
  'plugins::users-permissions.role',
  'plugins::build-plugin.deployment',
];
```