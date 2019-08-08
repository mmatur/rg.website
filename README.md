# Mathilde LARATTE website

## Installing the components

### bootstrap

```shell
npm install
```

### Hugo

[Install Hugo](https://gohugo.io/getting-started/installing/)


# Local Development

```shell
hugo serve -D --disableFastRender
```

To build the website, run:

```shell
hugo
```

All the website files will then be available in the public directory.

# Deploy 

Because Netlify doesn't yet support Hugo extended version (which provides pipelining), we currently have to commit / push the content of the resources directory.

See 
https://discourse.gohugo.io/t/are-asset-pipelines-working-on-netlify-for-anyone/12953/9, and https://github.com/netlify/build-image/issues/183
