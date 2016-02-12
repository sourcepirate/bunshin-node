##BunShin-node

Appengine Like version environment for hosting node apps.

wip

![bunshin-defense](https://cloud.githubusercontent.com/assets/5940286/13014468/f862143a-d1d9-11e5-8aba-1acf180fa137.gif)

##Installation

```javascript
sudo npm install bunshin-node

```

##Usage

```
bunshin-node -d <path-to-db>
             -p <port-to-run-proxy>
             -a <apps-directory>
```

##Description

This recipe is made for managing multiple-node apps on the same physical
machine.

* install bunshin-node
* for now we can use our example folder assosiated with the project.
* The example/deployments directory has multiple node apps pointed to
  different port on the same machine.
  <b>Note:</b> Make sure you specify port of the app in package.json
  (see example/deployments/app1/package.json)
* now run
  ```
  mkdir mock
  # this direcotory will posses our db .json file.
  # In our case it will be versions.json file.
  bunshin-node -a example/ -d mock/ -p 8080

  ```

## Working

This bunshine-node is a http-proxy which runs on a sandboxed environments of
node-apps. Each node app running under this sandbox environment should supply
its port and version in package.json file.

In our case app1/package.json consists of '1-0-0' and '8086' as version and port
and app2/package.json consists of '1-0-1' and '8087' as version and port.

In order to make a request to the specific module on sandbox.
this is the scheme which is to be followed.

```
<version>.dot.localhost:8080/
# assuming the bunshin-node is running on 8080

```

##License
MIT
