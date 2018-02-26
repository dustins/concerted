# Concerted

A web application for organization events with friends.

---

## Software Requirements

- Java 1.8 or higher
- [Yarn](https://yarnpkg.com/en/) package manager

## Building and Running the Application

### Setup

Setting up the project is easy. Simply run the following command from the project directory to download all the 
[Node](https://nodejs.org/en/) dependencies.

    yarn install

### Development

First use [Yarn](https://yarnpkg.com/en/) to run the `watch` script. This tells webpack to build the Javascript for 
development and watch for changes. A rebuild will occur if any watched file under `src/main/web` are changed.

    yarn watch

Then in separate terminal window use the [Gradle Wrapper](https://docs.gradle.org/current/userguide/gradle_wrapper.html)
script to start the project.

    ./gradlew bootRun

### Production

First use [Yarn](https://yarnpkg.com/en/) to run the `build` script. This tells [Webpack](https://webpack.js.org/) to 
build the Javascript for production.

    yarn build

Then use the [Gradle Wrapper](https://docs.gradle.org/current/userguide/gradle_wrapper.html) script to build an 
executable Jar.

    ./gradlew bootJar
    
Finally you can run the Jar using the following `java` command.
    
    java -jar build/libs/concerted-0.0.1-SNAPSHOT.jar
    
