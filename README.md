# SPFX
My share-point framework repo


# Steps
1. Clone this repository

#### Restore packages in local using NPM

```sh
npm install
```
#### Install angular-ui-bootrap dependency with NPM

```sh
npm install angular-ui-bootstrap
```
#### Start

```sh
gulp serve
```

#### Host the client side scripts into sharepoint public CDN instead of external CDN


# Steps
1. Install Office 365 CLI

```sh
npm i -g @pnp/office365-cli
```

2. Switch the command mode to o365

```sh
office365
```

3. Connect to SPO site

```sh
spo connect  https://xxxx.sharepoint.com (or) https://xxxx-admin.sharepoint.com for admin related activties
```

4. Get list of available commands for SPO

```sh
help spo *
```

5. Make sure Public CDN is enable by executing below command

```sh
spo cdn get -t Public
```
6. If public CDN is not enabled you can enable by executing below command

```sh
spo cdn set -t Public -e true
```


7. Similarly make sure the cdn and policy has been enable by executing below command

```sh
spo cdn origin list
```

8. If the output for the above command is like below then the configuration is in progress

```sh
*/MASTERPAGE (configuration pending)
*/STYLE LIBRARY (configuration pending)
*/CLIENTSIDEASSETS (configuration pending)
```

wait till you get the result like below

```sh
*/MASTERPAGE
*/STYLE LIBRARY
*/CLIENTSIDEASSETS
```

Make sure yous Package-solution.json is configured like below

```sh
{
  "$schema": "https://dev.office.com/json-schemas/spfx-build/package-solution.schema.json",
  "solution": {
    "name": "<<solution name>>",
    "id": "<<GUID for the solution>>",
    "version": "1.0.0.0",
   "includeClientSideAssets": true 
  },
  "paths": {
    "zippedPackage": "solution/poc-webpart.sppkg"
  }
}
```

#### Note : "includeClientSideAssets": true  | Makes the difference between refreing the file from External CDN or Sharepoint CDN

