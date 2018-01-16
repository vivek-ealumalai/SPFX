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
    "zippedPackage": "solution/<<Package name>>.<<[Extension] sppkg/spapp>>"
  }
}
```

#### Note : "includeClientSideAssets": true  | Makes the difference between refreing the file from External CDN or Sharepoint CDN


#### Create CDN Folder in sharepoint ()If the above step is not working use below steps
# Steps
1. Open Sharepoint Online management Shell and connect to tenant domain

```sh
$creds = Get-Credential
Connect-SPOService -Url https://xxxxx-admin.sharepoint.com/ -Credential $creds
```
2. Enable Public CDN in the tenant
```sh
Set-SPOTenant -PublicCdnEnabled $true
```

3. Configure allowed file extensions (optional) suppose you want to over ride default options
```sh
Set-SPOTenant -PublicCdnAllowedFileTypes "CSS,EOT,GIF,ICO,JPEG,JPG,JS,MAP,PNG,SVG,TTF,WOFF,TXT"
```
4. Add CDN origin
```sh
New-SPOPublicCdnOrigin -Url "https://contoso.sharepoint.com/siteassets/folder1"
```

5. See the list of CDN origins
```sh
Get-SPOPublicCdnOrigins
```

6. If you want to Remove CDN origin
```sh
Remove-SPOPublicCdnOrigin -Identity <<Identity of the origin (identity can be fetched from Get-SPOPublicCdnOrigins ) >>
```

The structure of CDN URL is following.
```sh
https://publiccdn.sharepointonline.com/<tenant host name>/<ID of the public CDN origin>/<sub-path under the origin> 
```


7. Update ./config/write-manifests.json file and in the cdnBasePath property set the public CDN URL of the newly CDN folder.
```sh
{
  "$schema": "https://dev.office.com/json-schemas/spfx-build/write-manifests.schema.json",
  "cdnBasePath": "https://publiccdn.sharepointonline.com/xxxx.sharepoint.com/<identity>/<subfolder if any>"
}
```

8. Bundle all the client side files
```sh
gulp bundle --ship
```

9. generate the .spapp file
```sh
gulp package-solution --ship
```

10. Upload the client side code from \temp\deploy to CDN folder created from step 4

11. Deploy the Package and add the webpart , Notice that the client side file will be refered from the sharepoint public cdn

