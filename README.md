# [Backstage](https://backstage.io)

This is your newly scaffolded Backstage App, Good Luck!

To start the app, run:

```sh
yarn install
yarn dev
```

# Possible erros on modules while yarn dev

![alt text](image.png)

Fix
```
yarn install --dev swc-loader
```


yarn --cwd packages/app add @backstage/theme