<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
  <img src='https://github.com/lehuuhieu-0805/api-sale-phone/actions/workflows/ci-cd.yml/badge.svg'/>
</p>

```
Swagger API: https://api-sale-phone.handepgai.xyz/api
```

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Note

#### TypeORM command

```bash
# generate migration
$ npm run migration:generate ./src/database/migrations/initDb

# run migration
$ npm run migration:run
```

#### Server command

```bash
# show all port in ubuntu
$ sudo netstat -plnt

# run project FE
$ pm2 serve html 4002 --name sale-phone-ui

$ sudo docker run -e "ACCEPT_EULA=Y" -e "MSSQL_SA_PASSWORD=Hieu1234" -p 1433:1433 -v vmssql:/var/opt/mssql -d mcr.microsoft.com/mssql/server:2019-latest

$ sudo docker run --name redis -p 6379:6379 -v vredis:/var/opt/mssql -d redis redis-server --appendonly yes --replica-read-only no
```

#### Reference

https://dev.to/deadwin19/deploy-nest-js-app-using-pm2-on-linux-ubuntu-server-88f

https://khanh.website/2020/05/17/huong-dan-host-node-js-voi-pm2-nginx-va-kich-hoat-https-bang-certbot-tren-ubuntu/
