#ASP.NET Core 1.0, Angular 2 (rc-5) and Angular 2 Material (alpha.7-2) Starter Project

This is a starter project that uses ASP.NET Core 1.0, Angular 2 (rc-5) (angular-cli) and Angular 2 Material (alpha.7-2) to build the app that was shown at Google I/O. The original code is [here](https://github.com/kara/puppy-love).

The only change that I made to the original puppy-love app was to add a Web API REST service to showcase the interaction with the Angular 2 app.

If you are interested in Angular 1 Material with ASP.NET Core see my Angular AspNet Core Starter project [here](https://github.com/catalintomescu/AngularAspNetCoreSeed).

_At the time of this writing both Angular 2 and Angular 2 Material are pre-production releases so, bugs and issues are expected. Please check the list of issues on GitHub if you see anything that is not working correctly._

##Motivation
After the release of ASP.NET Core 1.0 and angular-cli for Angular 2 the previous starter project that was using Gulp became a little too much to maintain and the workflow was somewhat cumbersome.

So, my goal was to a workflow where I can generate an Angular 2 app using the new ```angular-cli``` tool and integrate it into an ASP.NET Core 1.0 web app. If you are a .NET web developer this kind of solution should be very familiar to you. 

Also, I wanted to maintain the ability to get updates from the Angular 2 pipeline and load them in my ASP.NET app.

Additionally I wanted to start using the new angular-cli for creating components, services, etc.

##Tools needed
For this project I'll be using [Visual Studio Code](https://code.visualstudio.com/) and [Node.js](https://nodejs.org/en/). 

##Solution details
Let's talk about the issues I came across and the solutions I found.

###Output folder
The default setting of ```angular-cli``` is to build the angular code in a folder named ```dist```. This can be easily changed in the ```.ember-cli``` file by setting ```output-path``` property like so:
~~~
{
  "output-path": "./wwwroot/"
}
~~~

Out of the box an ASP.NET Core application serves all static files (CSS, JavaScript, TypeScript, images, etc) from a folder named ```wwwroot```. This location can be changed in WebHostBuilder setup code.
~~~
WebHostBuilder.UseWebRoot(Path.Combine(Directory.GetCurrentDirectory(), "dist"))
~~~

So, you have two options here:
* Keep the default ASP.NET location for static files ```wwwroot``` and build the Angular 2 app in this location.
* Keep ```dist``` as the output location of ```angular-cli``` output and re-route ASP.NET to this location to serve static files.

I decided to got with option #2, but you can choose whatever option works best for you.

###Startup file
ASP.NET uses MVC controllers and views to generate HTML & JavaScript output. By default it invokes ```Home/Index``` as default route which generates the startup page. 

The startup end-point of the Angular 2 app is ```dist/index.html``` which is compiled from ```src/index.html``` during build. 

So, in order by have a working Angular app inside the MVC generated output we have to merge these two output.

My solution, _which I'm not 100% happy with_, was to merge the content of the ```Views/Shared/_Layout.cshtml``` and ```src/index.html``` in ```index.html```.

During the build process the Angular 2 build creates ```dist/index.html``` and with the help of a Gulp task I'm copying the final outcome back into ```Views/Shared/_Layout.cshtml```. 

This gives me a proper ```_Layout.cshtml``` file that contains everything that is needed to load and bootstrap the Angular 2 app as well as ASP.NET Views.

###Gulp tasks
Since I didn't needed any of the predefined Gulp tasks that ASP.NET project creates I removed then from the ASP.NET build pipeline and I added my tasks to deal with ```_Layout.cshtml```. 

###Envrionment variables
Both ASP.NET Core and Angular 2 have different ways to define and use environment variables for generating proper builds for development and production.

I haven't made any changes to this part yet so, if you want to build a release or debug build you must change all files needed manually. 

##Getting started
* Clone or fork this repository
* Run ```npm install``` from the command line to install all required Node packages
* Run ```npm start``` from the command line to start the Angular 2 app. We'll not be using the HTTP server started by the command, but we need the watch function to update the ```dist``` folder with our Angular code changes.
* Run ```dotnet run -c Debug``` from a different command line to start the ASP.NET app using Kestrel. This will start a HTTP server on port 5000.
* Open ```http://localhost:5000``` in a browser to see the ASP.NET app + Angular 2 app together.

##Deploying to IIS
* Run the ASP.NET application ```dotnet publish -c Debug -o bin\Debug\PublishOutput``` to create the publish output.
* Configure IIS to run an ASP.NET Core app from ```bin\Debug\PublishOutput```.

##Known issues
* When running the ASP.NET app with IIS Express Angular 2 templates are delivered with invalid characters. I'm not sure what this issue is so I'm using Kestrel or IIS to run the app.
* When using Visual Studio Community the IDE becomes unresponsive when updates are delivered to ```dist``` folder. My guess is that the IDE is trying to parse all files under ```dist``` again. For now I'm using VS Code as my code editor.
