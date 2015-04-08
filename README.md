# Remote connection demo

## Remote Connection
The Remote Connection API allows regular browsers to connect and communicate with applications in OpenFin. The intention of this project is to demonstrate the use of this feature.

We launch an OpenFin application that will create an authentication Token, then launch and pass that token to a browser window, this browser window in turn can use the auth token to connect to the OpenFin Runtime.

## To see the demo
* download [OpenFin installer](https://dl.openfin.co/services/download?fileName=remote-connect-demo&config=http://cdn.openfin.co/remote-connect-demo/app.json)
* unzip and run the installer

## To run this demo locally
You will need:

* NodeJs
* Grunt
* Bower

###Run the following commands from the shell:
```bash
>git clone "this repo"
>cd "repo name"
>npm install
>bower install
```

### Once everything is installed:
```bash
grunt serve
```

## License

MIT